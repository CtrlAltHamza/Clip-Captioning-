export default function Architecture() {
  const steps = [
    {
      icon: '🔒',
      title: 'Frozen CLIP ViT-B/32',
      desc: 'Extracts a 512-d global feature and 197 patch tokens from the input image without updating weights.'
    },
    {
      icon: '🔁',
      title: 'Visual Projection MLP',
      desc: 'Maps the visual features into the 512-d GRU hidden space.'
    },
    {
      icon: '👁️',
      title: '4-Head Cross-Attention',
      desc: 'Attends to different image patches at each decoding step. Q = GRU hidden, K/V = CLIP patches.'
    },
    {
      icon: '📝',
      title: 'GRU Decoder',
      desc: 'Consumes the concatenated word embedding and cross-attention context to produce vocabulary logits.'
    },
    {
      icon: '📐',
      title: 'Alignment Loss',
      desc: 'Auxiliary loss that penalises cosine distance between generated caption embeddings and image embeddings in CLIP space.'
    }
  ];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Pipeline Architecture</h2>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="card p-5 hover:bg-white/5 cursor-default flex gap-4 items-start">
              <div className="text-2xl bg-white/5 w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                {step.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card h-full flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-4 text-indigo-400">Combined Objective</h3>
          <div className="bg-black/40 border border-emerald-500/30 border-l-4 border-l-emerald-500 rounded-lg p-6 font-mono text-emerald-400 text-sm leading-loose overflow-x-auto mb-6">
            L<sub>total</sub> = L<sub>CE</sub> + λ · L<sub>align</sub><br/><br/>
            L<sub>align</sub> = 1 − cos( CLIP<sub>img</sub>(x), CLIP<sub>txt</sub>(ŷ) )
          </div>
          <p className="text-gray-400 text-sm">
            The hyperparameter λ controls the strength of the alignment signal. 
            Through extensive grid search, we found that <strong>λ = 0.3</strong> yields the best balance 
            between fluency (BLEU) and semantic correctness (CLIPScore).
          </p>
        </div>
      </div>
    </section>
  );
}
