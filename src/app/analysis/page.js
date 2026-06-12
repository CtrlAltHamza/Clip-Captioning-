export default function AnalysisPage() {
  const gaps = [
    {
      title: 'Spatial Reasoning',
      issue: '34% failure on spatial relations (left/right/behind).',
      fix: 'Incorporate spatial CLIP patch embeddings and relative position encoding.'
    },
    {
      title: 'Rare Object Recognition',
      issue: '23% incorrect specificity on rare/fine-grained objects.',
      fix: 'Implement cross-dataset training: Flickr8k + MS-COCO + Conceptual Captions.'
    },
    {
      title: 'Compositional Language',
      issue: '42% success on complex multi-attribute descriptions.',
      fix: 'Use a pre-trained LLM (GPT-2 + LoRA) as the transformer decoder.'
    },
    {
      title: 'Long Caption Quality',
      issue: 'Quality degrades for scenes with >4 distinct objects.',
      fix: 'Integrate hierarchical attention or Faster-RCNN region proposals.'
    }
  ];

  return (
    <div className="py-16 px-4 max-w-6xl mx-auto animate-fade">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Gap Analysis & Future Work</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Identifying the current limitations of our architecture and charting a path forward for subsequent iterations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {gaps.map((g, i) => (
          <div key={i} className="card p-8 group hover:-translate-y-2">
            <h3 className="text-2xl font-bold mb-6 text-rose-400 border-l-4 border-rose-500 pl-4 group-hover:text-rose-300 transition-colors">{g.title}</h3>
            
            <div className="mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Observed Issue</span>
              <p className="text-slate-300">{g.issue}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 mb-2 block">Proposed Fix</span>
              <p className="text-white font-medium">{g.fix}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 card p-8 text-center bg-indigo-500/5 border-indigo-500/20">
        <h3 className="text-2xl font-bold mb-4 text-white">Live Inference Backend</h3>
        <p className="text-slate-400 max-w-2xl mx-auto mb-6">
          Currently, the web application serves pre-computed test samples. In the future, we plan to deploy the PyTorch model via a Flask/FastAPI backend, enabling users to upload their own images and generate captions in real-time.
        </p>
      </div>
    </div>
  );
}
