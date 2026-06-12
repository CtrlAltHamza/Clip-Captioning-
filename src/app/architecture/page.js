export default function ArchitecturePage() {
  const steps = [
    { icon: '🔒', title: 'Frozen CLIP ViT-B/32', desc: 'Extracts a 512-d global feature vector and 197 patch tokens (14×14 grid + class token) from the input image. Weights are frozen — no fine-tuning.' },
    { icon: '🔁', title: 'Visual Projection MLP', desc: 'A two-layer MLP with BatchNorm and ReLU maps the 512-d CLIP global feature into the 512-d GRU hidden space to initialise the decoder.' },
    { icon: '👁️', title: '4-Head Cross-Attention', desc: 'At each decoding step: Q = GRU hidden state, K = V = the 197 CLIP patch tokens. This lets the decoder attend to different image regions for each word it generates.' },
    { icon: '📝', title: 'GRU Decoder', desc: 'Receives the concatenated (word_embedding ∥ cross-attention_context) as input and produces a probability distribution over the 2,611-word vocabulary.' },
    { icon: '📐', title: 'Cross-Modal Alignment Loss', desc: 'An auxiliary loss that penalises the cosine distance between the CLIP text embedding of the generated caption and the CLIP image embedding of the input image.' },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-tag">Model Design</div>
          <h1 className="section-title">Pipeline Architecture</h1>
          <p className="section-sub">
            A breakdown of each module in the CLIPCaptioner model — from the frozen vision encoder through to the alignment-guided GRU decoder.
          </p>
        </div>

        <div className="two-col">
          {/* Left: Pipeline steps */}
          <div className="fade-up fade-up-d1">
            {steps.map((step, i) => (
              <div className="arch-step" key={i}>
                <div className="arch-step-icon">{step.icon}</div>
                <div>
                  <div className="arch-step-title">{step.title}</div>
                  <div className="arch-step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Formula and details */}
          <div className="fade-up fade-up-d2">
            <div className="card" style={{marginBottom: '1.5rem'}}>
              <div style={{fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#22d3ee', marginBottom: '1rem'}}>
                Combined Objective Function
              </div>
              <div className="formula-box" style={{marginBottom: '1rem'}}>
                L<sub>total</sub> = L<sub>CE</sub> + λ · L<sub>align</sub><br/>
                <br/>
                L<sub>align</sub> = 1 − cos( CLIP<sub>img</sub>(x) , CLIP<sub>txt</sub>(ŷ) )
              </div>
              <p style={{fontSize: '0.88rem', color: '#64748b', lineHeight: '1.75', marginTop: '1rem'}}>
                The hyperparameter <strong style={{color: '#a5b4fc'}}>λ</strong> controls the alignment signal strength.
                Grid search over {'{'}0.0, 0.1, 0.2, 0.3, 0.5, 0.7, 1.0{'}'} identified <strong style={{color: '#fff'}}>λ = 0.3</strong> as optimal.
              </p>
            </div>

            <div className="card" style={{marginBottom: '1.5rem'}}>
              <div style={{fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#818cf8', marginBottom: '1rem'}}>
                Training Config
              </div>
              {[
                ['Epochs', '30'],
                ['Optimiser', 'Adam (lr = 1e-4)'],
                ['LR Schedule', 'Cosine + 10% warmup'],
                ['Label Smoothing', 'ε = 0.1'],
                ['Gradient Clip', 'max-norm 5.0'],
                ['Vocab Size', '2,611 tokens'],
                ['Train / Val / Test', '6,000 / 1,000 / 1,091 images'],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.7rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  fontSize: '0.88rem'
                }}>
                  <span style={{color: '#64748b'}}>{k}</span>
                  <span style={{color: '#e2e8f0', fontWeight: 600}}>{v}</span>
                </div>
              ))}
            </div>

            <div className="card" style={{background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.2)'}}>
              <div style={{fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#818cf8', marginBottom: '0.75rem'}}>
                Trainable Parameters
              </div>
              <div style={{fontSize: '2.5rem', fontWeight: 900, background: 'linear-gradient(135deg,#818cf8,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                6.08M
              </div>
              <div style={{fontSize: '0.85rem', color: '#64748b', marginTop: '0.4rem'}}>
                Lightweight — CLIP encoder weights are frozen
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
