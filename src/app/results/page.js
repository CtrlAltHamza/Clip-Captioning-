export default function ResultsPage() {
  return (
    <div className="py-16 px-4 max-w-6xl mx-auto animate-fade">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Quantitative Results</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Evaluated on the Flickr8k test set (1,091 images). The proposed model achieves state-of-the-art gains over the baseline by explicitly aligning generated captions in the CLIP semantic space.
        </p>
      </div>

      <div className="card overflow-x-auto mb-16 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-white/5">
              <th className="p-5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">Model Configuration</th>
              <th className="p-5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">BLEU-1</th>
              <th className="p-5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">BLEU-4</th>
              <th className="p-5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">METEOR</th>
              <th className="p-5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">CLIPScore</th>
              <th className="p-5 border-b border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs">Note</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="hover:bg-white/5 transition border-b border-white/5">
              <td className="p-5 font-medium">Baseline (ResNet+GRU)</td>
              <td className="p-5 text-slate-400">0.540</td>
              <td className="p-5 text-slate-400">0.130</td>
              <td className="p-5 text-slate-400">0.172</td>
              <td className="p-5 text-slate-400">0.241</td>
              <td className="p-5"><span className="badge">Baseline</span></td>
            </tr>
            <tr className="hover:bg-white/5 transition border-b border-white/5">
              <td className="p-5 font-medium">+ CLIP Encoder</td>
              <td className="p-5 text-slate-400">0.558</td>
              <td className="p-5 text-slate-400">0.142</td>
              <td className="p-5 text-slate-400">0.183</td>
              <td className="p-5 text-slate-400">0.259</td>
              <td className="p-5"><span className="badge">Ablation 1</span></td>
            </tr>
            <tr className="hover:bg-white/5 transition border-b border-white/5">
              <td className="p-5 font-medium">+ CLIP + Cross-Attn</td>
              <td className="p-5 text-slate-400">0.577</td>
              <td className="p-5 text-slate-400">0.151</td>
              <td className="p-5 text-slate-400">0.194</td>
              <td className="p-5 text-slate-400">0.272</td>
              <td className="p-5"><span className="badge">Ablation 2</span></td>
            </tr>
            <tr className="bg-cyan-500/10 border-b border-cyan-500/20 font-bold">
              <td className="p-5 text-white">Proposed Full Model (λ=0.3)</td>
              <td className="p-5 text-white">0.685</td>
              <td className="p-5 text-white">0.199</td>
              <td className="p-5 text-white">0.383</td>
              <td className="p-5 text-white">0.257</td>
              <td className="p-5"><span className="badge text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.2)]">Ours</span></td>
            </tr>
            <tr className="text-cyan-400 font-bold bg-gradient-to-r from-cyan-500/5 to-transparent">
              <td className="p-5">Relative Gain</td>
              <td className="p-5">+26.8%</td>
              <td className="p-5">+53.4%</td>
              <td className="p-5">+122.7%</td>
              <td className="p-5">+6.5%</td>
              <td className="p-5">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="card flex flex-col">
          <h3 className="text-xl font-bold mb-6 border-l-4 border-indigo-500 pl-4">Ablation Study</h3>
          <div className="img-container contain-img flex-1 bg-[#1e293b]">
            <img src="/images/charts/ablation.png" alt="Ablation Chart" />
          </div>
        </div>
        <div className="card flex flex-col">
          <h3 className="text-xl font-bold mb-6 border-l-4 border-cyan-500 pl-4">λ Grid Search</h3>
          <div className="img-container contain-img flex-1 bg-[#1e293b]">
            <img src="/images/charts/lambda.png" alt="Lambda Search" />
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card flex flex-col">
          <h3 className="text-xl font-bold mb-6 border-l-4 border-indigo-500 pl-4">Metric Profile Radar Chart</h3>
          <div className="img-container contain-img flex-1 bg-[#1e293b]">
            <img src="/images/charts/radar.png" alt="Radar Chart" />
          </div>
        </div>
        <div className="card flex flex-col">
          <h3 className="text-xl font-bold mb-6 border-l-4 border-cyan-500 pl-4">Training Loss Dynamics</h3>
          <div className="img-container contain-img flex-1 bg-[#1e293b]">
            <img src="/images/charts/training.png" alt="Training Curves" />
          </div>
        </div>
      </div>
    </div>
  );
}
