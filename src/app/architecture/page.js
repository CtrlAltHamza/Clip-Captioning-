export default function ArchitecturePage() {
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
    <div className="py-16 px-4 max-w-6xl mx-auto animate-fade">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Pipeline Architecture</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          A breakdown of how the frozen CLIP encoder integrates with the multi-head cross-attention mechanism and the auxiliary alignment loss.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-10 items-stretch">
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="card p-6 flex gap-5 items-start hover:-translate-y-1 transition-transform">
              <div className="text-3xl bg-slate-800 w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-slate-700 shadow-inner">
                {step.icon}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-3">
              <span>Objective Function</span>
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              The model is trained end-to-end to minimize the sum of the standard cross-entropy loss (L<sub>CE</sub>) 
              and our proposed cross-modal alignment loss (L<sub>align</sub>).
            </p>
            <div className="bg-[#020617]/80 border border-cyan-500/30 border-l-4 border-l-cyan-500 rounded-xl p-6 font-mono text-cyan-300 text-sm md:text-base leading-loose overflow-x-auto shadow-inner">
              <div className="mb-2">L<sub>total</sub> = L<sub>CE</sub> + λ · L<sub>align</sub></div>
              <div>L<sub>align</sub> = 1 − cos( CLIP<sub>img</sub>(x), CLIP<sub>txt</sub>(ŷ) )</div>
            </div>
          </div>
          <div className="p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
            <h4 className="font-bold text-indigo-300 mb-2">Hyperparameter λ</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              The hyperparameter λ controls the strength of the alignment signal. 
              Through extensive grid search, we found that <strong className="text-white">λ = 0.3</strong> yields the best balance 
              between fluency (BLEU) and semantic correctness (CLIPScore).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
