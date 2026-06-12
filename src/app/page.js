import Link from 'next/link';

export default function Home() {
  const sections = [
    { title: 'Interactive Demo', desc: 'Explore Flickr8k test samples with word-by-word attention heatmap overlays.', link: '/demo', icon: '🖼️' },
    { title: 'Pipeline Architecture', desc: 'Understand the CLIP + Cross-Attention + GRU decoder and alignment loss.', link: '/architecture', icon: '🧠' },
    { title: 'Quantitative Results', desc: 'Tables, ablation studies, λ sensitivity and training curves.', link: '/results', icon: '📊' },
    { title: 'Gap Analysis', desc: 'Current limitations and proposed directions for future improvements.', link: '/analysis', icon: '🔍' },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="hero-content container">

          <div className="hero-tags fade-up">
            <span className="tag tag-indigo">CS3001 Term Project</span>
            <span className="tag">FAST NUCES Islamabad</span>
            <span className="tag">Flickr8k Dataset</span>
          </div>

          <h1 className="hero-title fade-up fade-up-d1">
            <span className="gradient-text">CLIP-Guided</span><br />Image Captioning
          </h1>

          <p className="hero-sub fade-up fade-up-d2">
            Enhancing prompt-to-image consistency using a frozen CLIP ViT-B/32 encoder,
            multi-head cross-attention GRU decoder, and a novel cross-modal alignment loss.
          </p>

          <div className="hero-cta fade-up fade-up-d3">
            <Link href="/demo" className="btn-primary">🖼️ Try the Demo</Link>
            <a href="https://github.com/CtrlAltHamza/Clip-Captioning-" target="_blank" rel="noreferrer" className="btn-secondary">★ GitHub</a>
          </div>

          <div className="metrics-grid fade-up fade-up-d4">
            {[
              { label: 'BLEU-4', val: '0.199', delta: '↑ +53.4% vs Baseline' },
              { label: 'METEOR', val: '0.383', delta: '↑ +122.7% vs Baseline' },
              { label: 'CLIPScore', val: '0.257', delta: '↑ +6.5% vs Baseline' },
              { label: 'Parameters', val: '6.08M', delta: 'Lightweight Model' },
            ].map((m, i) => (
              <div className="metric-card" key={i}>
                <div className="metric-val">{m.val}</div>
                <div className="metric-label">{m.label}</div>
                <div className="metric-delta">{m.delta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Navigate</div>
            <h2 className="section-title">Explore the Project</h2>
            <p className="section-sub">Dive into any section to understand the model, view results, or explore qualitative examples.</p>
          </div>

          <div className="explore-grid">
            {sections.map((sec, i) => (
              <Link key={i} href={sec.link} className="explore-card">
                <div className="explore-icon">{sec.icon}</div>
                <div>
                  <div className="explore-card-title">{sec.title}</div>
                  <div className="explore-card-desc">{sec.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
