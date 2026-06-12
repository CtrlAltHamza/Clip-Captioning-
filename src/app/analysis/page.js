export default function AnalysisPage() {
  const gaps = [
    {
      title: 'Spatial Reasoning',
      issue: '34% failure on spatial relations (left / right / behind).',
      fix: 'Spatial CLIP patch embeddings + relative position encoding in the cross-attention layer.',
    },
    {
      title: 'Rare Object Recognition',
      issue: '23% incorrect specificity on rare or fine-grained object categories.',
      fix: 'Cross-dataset training: Flickr8k + MS-COCO + Google Conceptual Captions.',
    },
    {
      title: 'Compositional Language',
      issue: '42% success on complex multi-attribute descriptions.',
      fix: 'Replace GRU decoder with a GPT-2 + LoRA transformer decoder for richer language generation.',
    },
    {
      title: 'Long Caption Quality',
      issue: 'Fluency degrades for scenes containing more than 4 distinct objects.',
      fix: 'Hierarchical attention mechanism or Faster-RCNN region proposals for object-level grounding.',
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-tag">Limitations</div>
          <h1 className="section-title">Gap Analysis & Future Work</h1>
          <p className="section-sub">
            Identifying the current limitations of our architecture and charting concrete directions for future iterations.
          </p>
        </div>

        <div className="gap-grid fade-up fade-up-d1">
          {gaps.map((g, i) => (
            <div key={i} className="gap-card">
              <div className="gap-card-title">{g.title}</div>
              <div className="gap-issue">
                <div className="gap-sub-label gap-sub-label-issue">Observed Issue</div>
                <div className="gap-text-issue">{g.issue}</div>
              </div>
              <div className="gap-fix">
                <div className="gap-sub-label gap-sub-label-fix">Proposed Fix</div>
                <div className="gap-text-fix">{g.fix}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Future roadmap card */}
        <div className="card fade-up fade-up-d2" style={{
          marginTop: '2.5rem',
          background: 'rgba(99,102,241,0.05)',
          borderColor: 'rgba(99,102,241,0.2)',
          textAlign: 'center',
          padding: '3rem 2rem'
        }}>
          <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>🚀</div>
          <h3 style={{fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem'}}>
            Live Inference Backend — Coming Soon
          </h3>
          <p style={{fontSize: '0.95rem', color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: '1.75'}}>
            We are planning to deploy the PyTorch model as a FastAPI microservice, allowing users to
            upload their own images and receive real-time CLIP-guided captions with attention heatmap
            visualisation — all from this web application.
          </p>
        </div>
      </div>
    </section>
  );
}
