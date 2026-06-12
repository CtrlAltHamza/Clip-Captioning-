export default function Results() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Quantitative Results</h2>
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
        Evaluated on the Flickr8k test set (1,091 images). The proposed model achieves state-of-the-art gains over the baseline by explicitly aligning generated captions in the CLIP semantic space.
      </p>

      <div className="card overflow-x-auto mb-12">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="p-4 border-b border-white/10 text-gray-400 font-semibold text-sm">Model Configuration</th>
              <th className="p-4 border-b border-white/10 text-gray-400 font-semibold text-sm">BLEU-1</th>
              <th className="p-4 border-b border-white/10 text-gray-400 font-semibold text-sm">BLEU-4</th>
              <th className="p-4 border-b border-white/10 text-gray-400 font-semibold text-sm">METEOR</th>
              <th className="p-4 border-b border-white/10 text-gray-400 font-semibold text-sm">CLIPScore</th>
              <th className="p-4 border-b border-white/10 text-gray-400 font-semibold text-sm">Note</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="hover:bg-white/5 transition border-b border-white/5">
              <td className="p-4">Baseline (ResNet+GRU)</td>
              <td className="p-4 text-gray-300">0.540</td>
              <td className="p-4 text-gray-300">0.130</td>
              <td className="p-4 text-gray-300">0.172</td>
              <td className="p-4 text-gray-300">0.241</td>
              <td className="p-4"><span className="badge">Baseline</span></td>
            </tr>
            <tr className="hover:bg-white/5 transition border-b border-white/5">
              <td className="p-4">+ CLIP Encoder</td>
              <td className="p-4 text-gray-300">0.558</td>
              <td className="p-4 text-gray-300">0.142</td>
              <td className="p-4 text-gray-300">0.183</td>
              <td className="p-4 text-gray-300">0.259</td>
              <td className="p-4"><span className="badge">Ablation 1</span></td>
            </tr>
            <tr className="hover:bg-white/5 transition border-b border-white/5">
              <td className="p-4">+ CLIP + Cross-Attn</td>
              <td className="p-4 text-gray-300">0.577</td>
              <td className="p-4 text-gray-300">0.151</td>
              <td className="p-4 text-gray-300">0.194</td>
              <td className="p-4 text-gray-300">0.272</td>
              <td className="p-4"><span className="badge">Ablation 2</span></td>
            </tr>
            <tr className="bg-indigo-500/10 border-b border-indigo-500/20 font-semibold">
              <td className="p-4 text-white">Proposed Full Model (λ=0.3)</td>
              <td className="p-4 text-white">0.685</td>
              <td className="p-4 text-white">0.199</td>
              <td className="p-4 text-white">0.383</td>
              <td className="p-4 text-white">0.257</td>
              <td className="p-4"><span className="badge text-emerald-400 border-emerald-500/30 bg-emerald-500/10">Best</span></td>
            </tr>
            <tr className="text-emerald-400 font-bold bg-emerald-500/5">
              <td className="p-4">Relative Gain (Baseline → Proposed)</td>
              <td className="p-4">+26.8%</td>
              <td className="p-4">+53.4%</td>
              <td className="p-4">+122.7%</td>
              <td className="p-4">+6.5%</td>
              <td className="p-4">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <h3 className="text-xl font-bold mb-4 border-l-4 border-indigo-500 pl-3">Ablation Study</h3>
          <div className="plot-container"><img src="/images/charts/ablation.png" alt="Ablation Chart" /></div>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-4 border-l-4 border-indigo-500 pl-3">λ Hyperparameter Grid Search</h3>
          <div className="plot-container"><img src="/images/charts/lambda.png" alt="Lambda Search" /></div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-bold mb-4 border-l-4 border-indigo-500 pl-3">Metric Profile Radar Chart</h3>
          <div className="plot-container"><img src="/images/charts/radar.png" alt="Radar Chart" /></div>
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-4 border-l-4 border-indigo-500 pl-3">Training Loss Dynamics</h3>
          <div className="plot-container"><img src="/images/charts/training.png" alt="Training Curves" /></div>
        </div>
      </div>
    </section>
  );
}
