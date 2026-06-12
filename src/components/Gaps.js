export default function Gaps() {
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
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Gap Analysis & Future Work</h2>
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
        Identifying the current limitations of our architecture and charting a path forward for subsequent iterations.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {gaps.map((g, i) => (
          <div key={i} className="card p-6">
            <h3 className="text-xl font-bold mb-3 text-rose-400 border-l-4 border-rose-500 pl-3">{g.title}</h3>
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Observed Issue</span>
              <p className="text-gray-300 mt-1">{g.issue}</p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Proposed Fix</span>
              <p className="text-white mt-1">{g.fix}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
