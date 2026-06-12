from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import clip
from PIL import Image
import io
import base64
import numpy as np
import matplotlib.pyplot as plt
import cv2
import os

from model import CLIPCaptioner, DEVICE

app = FastAPI(title="CLIPCaptioner API")

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model variables
model = None
vocab = None
i2w = None
preprocess = None

# Initialize Model on Startup
@app.on_event("startup")
async def load_model():
    global model, vocab, i2w, preprocess
    print("Loading model and CLIP preprocess...")
    
    # Load CLIP preprocessing
    _, preprocess = clip.load('ViT-B/32', device=DEVICE)
    
    # Check if model exists
    # If running locally vs Railway, paths might differ.
    model_path = os.environ.get("MODEL_PATH", "../results/best_model.pt")
    if not os.path.exists(model_path):
        print(f"Warning: Model not found at {model_path}. Please set MODEL_PATH.")
        return
        
    checkpoint = torch.load(model_path, map_location=DEVICE, weights_only=False)
    vocab = checkpoint['vocab']
    i2w = {i: w for i, w in enumerate(vocab)}
    
    model = CLIPCaptioner(vocab_size=len(vocab)).to(DEVICE)
    model.load_state_dict(checkpoint['state_dict'])
    model.eval()
    print(f"Model loaded! Vocab size: {len(vocab)}, Device: {DEVICE}")

def generate_heatmap_image(original_img_pil, attn_weights, word):
    """
    Overlays attention weights on the original image and returns a base64 string.
    attn_weights: (197,) numpy array. The first token is the CLS token, so we drop it
                  and reshape the remaining 196 tokens into 14x14.
    """
    # 1. Prepare image
    img = np.array(original_img_pil.convert('RGB'))
    img_h, img_w, _ = img.shape
    
    # 2. Reshape attention (skip CLS token)
    # CLIP ViT-B/32 has 197 tokens: [CLS] + 14x14 patches
    attn = attn_weights[1:].reshape(14, 14)
    
    # Normalize attention
    attn = attn - attn.min()
    if attn.max() > 0:
        attn = attn / attn.max()
        
    # 3. Resize heatmap to match image size
    heatmap = cv2.resize(attn, (img_w, img_h))
    
    # 4. Apply colormap
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    
    # 5. Overlay heatmap on original image
    superimposed_img = cv2.addWeighted(img, 0.6, heatmap, 0.4, 0)
    
    # 6. Save to base64
    pil_img = Image.fromarray(cv2.cvtColor(superimposed_img, cv2.COLOR_BGR2RGB))
    buf = io.BytesIO()
    pil_img.save(buf, format="PNG")
    base64_str = base64.b64encode(buf.getvalue()).decode("utf-8")
    
    return f"data:image/png;base64,{base64_str}"

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=503, detail="Model is not loaded. Ensure best_model.pt is available.")
        
    contents = await file.read()
    try:
        pil_image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid image file")

    # Preprocess for CLIP
    img_tensor = preprocess(pil_image).unsqueeze(0).to(DEVICE)
    
    # Generate caption and attention
    captions, attentions = model.generate_with_attention(img_tensor, i2w, max_len=30)
    caption = captions[0]
    words = caption.split()
    attn_list = attentions[0] # List of arrays for each word
    
    # Generate heatmaps
    heatmaps = []
    for w, attn in zip(words, attn_list):
        heatmap_b64 = generate_heatmap_image(pil_image, attn, w)
        heatmaps.append({
            "word": w,
            "heatmap": heatmap_b64
        })
        
    return {
        "caption": caption,
        "words": heatmaps
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": model is not None}
