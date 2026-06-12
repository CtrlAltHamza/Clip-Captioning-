'use client';
import { useState } from 'react';

const SAMPLES = [
  {
    id: 1, title: 'Running Dog',
    img: '/images/samples/img1.jpg',
    attn: '/images/attention/attn1.png',
    ref: 'A brown dog is running on the grass.',
    gen: 'a brown dog runs through the grass .',
    cs: '0.3285'
  },
  {
    id: 2, title: 'Dog on Dirt Path',
    img: '/images/samples/img2.jpg',
    attn: '/images/attention/attn2.png',
    ref: 'A brown dog is running on a dirt path.',
    gen: 'a dog dog running through the grass .',
    cs: '0.2839'
  },
  {
    id: 3, title: 'Black Dog on Stairs',
    img: '/images/samples/img3.jpg',
    attn: '/images/attention/attn3.png',
    ref: 'A black and brown dog rests head on lower steps of stairs.',
    gen: 'a black dog is on a wooden structure .',
    cs: '0.2664'
  },
  {
    id: 4, title: 'Vending Machine',
    img: '/images/samples/img4.jpg',
    attn: '/images/attention/attn4.png',
    ref: 'A man and two youngsters standing in front of a Japanese vending machine.',
    gen: 'two people are in a store .',
    cs: '0.2066'
  },
  {
    id: 5, title: 'Man with Bike',
    img: '/images/samples/img5.jpg',
    attn: '/images/attention/attn5.png',
    ref: 'A cyclist sits on some steps with his bike.',
    gen: 'a man sits on steps near a bicycle .',
    cs: '0.2015'
  }
];

export default function DemoPage() {
  const [active, setActive] = useState(0);
  const s = SAMPLES[active];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-tag">Interactive</div>
          <h1 className="section-title">Demo — Attention Explorer</h1>
          <p className="section-sub">
            Select a test sample to see the original image, attention heatmap overlay, and compare generated vs. reference captions.
          </p>
        </div>

        <div className="sample-tabs fade-up fade-up-d1">
          {SAMPLES.map((sample, i) => (
            <button
              key={sample.id}
              onClick={() => setActive(i)}
              className={`sample-tab${i === active ? ' active' : ''}`}
            >
              Sample {sample.id} — {sample.title}
            </button>
          ))}
        </div>

        <div className="card fade-up fade-up-d2" style={{padding: '2.5rem'}}>
          <div className="demo-grid">
            {/* Left: images */}
            <div>
              <div className="img-label">Original Image</div>
              <div className="img-box img-box-4-3" style={{marginBottom: '1.5rem'}}>
                <img src={s.img} alt="original" key={`img-${active}`} />
              </div>

              <div className="img-label">Attention Heatmap (Word-Level Overlay)</div>
              <div className="img-box img-box-4-3">
                <img src={s.attn} alt="attention" key={`attn-${active}`} />
              </div>
            </div>

            {/* Right: text */}
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem'}}>
              <div>
                <h3 style={{fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem'}}>
                  Sample {s.id} — {s.title}
                </h3>
                <span className="clip-badge">CLIPScore: {s.cs}</span>
              </div>

              <div>
                <div className="caption-box caption-box-ref">
                  <div className="caption-label">Reference Caption</div>
                  <div className="caption-text">{s.ref}</div>
                </div>

                <div className="caption-box caption-box-gen">
                  <div className="caption-label caption-label-gen">Generated (Proposed Model)</div>
                  <div className="caption-text-gen">{s.gen}</div>
                </div>
              </div>

              <div style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '14px',
                background: 'rgba(99,102,241,0.06)',
                border: '1px solid rgba(99,102,241,0.15)',
                fontSize: '0.88rem',
                color: '#64748b',
                lineHeight: '1.7'
              }}>
                <strong style={{color: '#a5b4fc', display: 'block', marginBottom: '0.4rem'}}>How it works</strong>
                The attention heatmap shows where the CLIP cross-attention mechanism focuses for each generated word. Brighter regions indicate higher attention weight, demonstrating spatial grounding of the decoder.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
