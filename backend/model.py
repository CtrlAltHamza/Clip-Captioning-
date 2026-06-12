import torch
import torch.nn as nn
import torch.nn.functional as F
import math
import clip
import random

DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
PAD = 0
START = 1
END = 2
UNK = 3

class CrossAttention(nn.Module):
    def __init__(self, hidden_dim=512, clip_dim=512, num_heads=4, dropout=0.1):
        super().__init__()
        assert hidden_dim % num_heads == 0
        self.h   = num_heads
        self.d_k = hidden_dim // num_heads

        self.Wq = nn.Linear(hidden_dim, hidden_dim)
        self.Wk = nn.Linear(clip_dim,   hidden_dim)
        self.Wv = nn.Linear(clip_dim,   hidden_dim)
        self.Wo = nn.Linear(hidden_dim, hidden_dim)
        self.drop = nn.Dropout(dropout)

    def forward(self, hidden, patches):
        B, N, _ = patches.shape
        Q = self.Wq(hidden).view(B, self.h, self.d_k).unsqueeze(2)         
        K = self.Wk(patches).view(B, N, self.h, self.d_k).permute(0,2,1,3) 
        V = self.Wv(patches).view(B, N, self.h, self.d_k).permute(0,2,1,3)

        scores  = (Q @ K.transpose(-2,-1)) / math.sqrt(self.d_k)  
        weights = self.drop(F.softmax(scores, dim=-1))              
        ctx     = (weights @ V).squeeze(2).contiguous().view(B, -1) 
        return self.Wo(ctx), weights.squeeze(2)                     

class CLIPCaptioner(nn.Module):
    def __init__(self, vocab_size, embed_dim=256, hidden_dim=512,
                 num_heads=4, dropout=0.3):
        super().__init__()
        self.hidden_dim = hidden_dim
        self.vocab_size = vocab_size

        self.clip, _ = clip.load('ViT-B/32', device=DEVICE)
        for p in self.clip.parameters():
            p.requires_grad_(False)
        self.clip.eval()

        self.vis_proj = nn.Sequential(
            nn.Linear(512, hidden_dim * 2),
            nn.BatchNorm1d(hidden_dim * 2),
            nn.ReLU(inplace=True),
            nn.Dropout(dropout),
            nn.Linear(hidden_dim * 2, hidden_dim),
            nn.BatchNorm1d(hidden_dim),
            nn.ReLU(inplace=True),
        )

        self.cross_attn = CrossAttention(hidden_dim, 512, num_heads, dropout)
        self.emb  = nn.Embedding(vocab_size, embed_dim, padding_idx=PAD)
        self.drop = nn.Dropout(dropout)
        self.gru  = nn.GRU(embed_dim + hidden_dim, hidden_dim,
                            batch_first=True, dropout=0.0)
        self.fc   = nn.Linear(hidden_dim, vocab_size)

    def _clip_visual(self, imgs):
        vis = self.clip.visual
        dtype = vis.conv1.weight.dtype

        x = imgs.to(dtype=dtype)
        x = vis.conv1(x)
        B, C, H, W = x.shape
        x = x.reshape(B, C, H * W).permute(0, 2, 1)

        cls = vis.class_embedding.to(dtype=dtype).unsqueeze(0).unsqueeze(0).expand(B, -1, -1)
        x = torch.cat([cls, x], dim=1)
        x = x + vis.positional_embedding.to(dtype=dtype)

        x = vis.ln_pre(x)
        x = x.permute(1, 0, 2)
        x = vis.transformer(x)
        x = x.permute(1, 0, 2)
        x = vis.ln_post(x)

        if vis.proj is not None:
            patches = x @ vis.proj.to(dtype=dtype)
        else:
            patches = x

        global_f = patches[:, 0, :]
        return global_f.float(), patches.float()

    def forward(self, imgs, cap_ids, teacher_forcing_ratio=0.5):
        B, T = cap_ids.shape
        with torch.no_grad():
            global_f, patches = self._clip_visual(imgs)

        h = self.vis_proj(global_f).unsqueeze(0)
        logits_list, attn_list = [], []
        token = cap_ids[:, 0]

        for t in range(T - 1):
            emb = self.drop(self.emb(token))
            ctx, attn_w = self.cross_attn(h.squeeze(0), patches)
            x, h = self.gru(torch.cat([emb, ctx], -1).unsqueeze(1), h)
            logit = self.fc(self.drop(x.squeeze(1)))
            logits_list.append(logit)
            attn_list.append(attn_w)
            if random.random() < teacher_forcing_ratio:
                token = cap_ids[:, t + 1]
            else:
                token = logit.argmax(-1)

        return torch.stack(logits_list, 1), global_f, attn_list

    @torch.no_grad()
    def generate_with_attention(self, imgs, i2w, max_len=35):
        """Generates captions and returns word-level attention maps"""
        self.eval()
        B = imgs.shape[0]
        global_f, patches = self._clip_visual(imgs)
        h = self.vis_proj(global_f).unsqueeze(0)

        tokens   = torch.full((B,), START, dtype=torch.long, device=DEVICE)
        results  = [[] for _ in range(B)]
        attentions = [[] for _ in range(B)]
        finished = [False] * B

        for _ in range(max_len):
            emb = self.emb(tokens)
            ctx, attn_w = self.cross_attn(h.squeeze(0), patches)
            
            # attn_w is (B, num_heads, num_patches)
            # We average across heads: (B, num_patches)
            attn_w_mean = attn_w.mean(dim=1)

            x, h   = self.gru(torch.cat([emb, ctx], -1).unsqueeze(1), h)
            tokens  = self.fc(x.squeeze(1)).argmax(-1)
            for i in range(B):
                if finished[i]: continue
                tok = tokens[i].item()
                if tok == END: finished[i] = True
                elif tok not in (PAD, START):
                    results[i].append(i2w.get(tok, '<unk>'))
                    attentions[i].append(attn_w_mean[i].cpu().numpy())
            if all(finished): break

        return [' '.join(r) for r in results], attentions
