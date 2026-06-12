export default function ResultsPage() {
  const rows = [
    { model: 'Baseline (ResNet+GRU)', b1: '0.540', b4: '0.130', met: '0.172', cs: '0.241', badge: 'Baseline', cls: '' },
    { model: '+ CLIP Encoder', b1: '0.558', b4: '0.142', met: '0.183', cs: '0.259', badge: 'Ablation 1', cls: '' },
    { model: '+ CLIP + Cross-Attn', b1: '0.577', b4: '0.151', met: '0.194', cs: '0.272', badge: 'Ablation 2', cls: '' },
    { model: 'Proposed Full Model (λ=0.3)', b1: '0.685', b4: '0.199', met: '0.383', cs: '0.257', badge: 'Ours ✓', cls: 'row-best' },
    { model: 'Relative Gain', b1: '+26.8%', b4: '+53.4%', met: '+122.7%', cs: '+6.5%', badge: '—', cls: 'row-gain' },
  ];

  const charts = [
    { title: 'Ablation Study', src: '/images/charts/ablation.png', border: '#6366f1' },
    { title: 'λ Hyperparameter Grid Search', src: '/images/charts/lambda.png', border: '#22d3ee' },
    { title: 'Metric Profile Radar Chart', src: '/images/charts/radar.png', border: '#6366f1' },
    { title: 'Training Loss Dynamics (30 Epochs)', src: '/images/charts/training.png', border: '#22d3ee' },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-tag">Evaluation</div>
          <h1 className="section-title">Quantitative Results</h1>
          <p className="section-sub">
            Evaluated on the Flickr8k test set (1,091 images, 5 references each). All metrics show consistent improvement over the baseline.
          </p>
        </div>

        {/* Results Table */}
        <div className="card fade-up fade-up-d1" style={{padding: 0, overflow: 'hidden', marginBottom: '3rem'}}>
          <div style={{overflowX: 'auto'}}>
            <table className="results-table" style={{minWidth: '700px'}}>
              <thead>
                <tr>
                  <th>Model Configuration</th>
                  <th>BLEU-1</th>
                  <th>BLEU-4</th>
                  <th>METEOR</th>
                  <th>CLIPScore</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={r.cls}>
                    <td style={{color: r.cls === 'row-best' ? '#fff' : undefined, fontWeight: r.cls === 'row-best' ? 700 : undefined}}>
                      {r.model}
                    </td>
                    <td>{r.b1}</td>
                    <td>{r.b4}</td>
                    <td>{r.met}</td>
                    <td>{r.cs}</td>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        background: r.cls === 'row-best' ? 'rgba(99,102,241,0.2)' : r.cls === 'row-gain' ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.05)',
                        color: r.cls === 'row-best' ? '#a5b4fc' : r.cls === 'row-gain' ? '#34d399' : '#64748b',
                        border: `1px solid ${r.cls === 'row-best' ? 'rgba(99,102,241,0.3)' : r.cls === 'row-gain' ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.08)'}`,
                      }}>
                        {r.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="chart-grid fade-up fade-up-d2">
          {charts.map((ch, i) => (
            <div key={i} className="card" style={{padding: '1.75rem'}}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#e2e8f0',
                marginBottom: '1.25rem',
                paddingLeft: '0.9rem',
                borderLeft: `4px solid ${ch.border}`,
              }}>
                {ch.title}
              </h3>
              <div className="img-box contain-mode img-box-4-3" style={{background: '#0a1628'}}>
                <img src={ch.src} alt={ch.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
