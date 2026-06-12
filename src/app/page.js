import Link from 'next/link';

export default function Home() {
  const sections = [
    { title: 'Interactive Demo', desc: 'Explore test samples from the Flickr8k dataset with attention heatmaps.', link: '/demo', icon: '🖼️' },
    { title: 'Pipeline Architecture', desc: 'Understand the CLIP + Cross-Attention + GRU model.', link: '/architecture', icon: '🧠' },
    { title: 'Quantitative Results', desc: 'View tables, ablation studies, and training curves.', link: '/results', icon: '📊' },
    { title: 'Gap Analysis', desc: 'Limitations and future improvements.', link: '/analysis', icon: '🔍' },
  ];

  return (
    <div className="pt-24 pb-20 flex flex-col items-center justify-center text-center px-4 animate-fade">
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      </div>
      
      <div className="flex gap-3 flex-wrap justify-center mb-8">
        <span className="badge text-indigo-300 border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]">CS3001 Term Project</span>
        <span className="badge text-slate-300 border-white/10 bg-white/5">FAST NUCES Islamabad</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
        <span className="gradient-text">CLIP-Guided</span> Image Captioning
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
        Enhancing prompt-to-image consistency using a frozen CLIP ViT-B/32 encoder, 
        cross-attention GRU decoder, and a novel cross-modal alignment loss.
      </p>
      
      <div className="flex gap-4 mb-20">
        <Link href="/demo" className="btn">Try the Demo</Link>
        <a href="https://github.com/CtrlAltHamza/Clip-Captioning-" target="_blank" rel="noreferrer" className="px-8 py-3 rounded-full font-semibold border border-white/10 text-white hover:bg-white/5 transition">
          View GitHub
        </a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-5xl mb-16">
        {[
          { label: 'BLEU-4', val: '0.199', delta: '+53.4%' },
          { label: 'METEOR', val: '0.383', delta: '+122.7%' },
          { label: 'CLIPScore', val: '0.257', delta: '+6.5%' },
          { label: 'Params', val: '6.08M', delta: 'Lightweight' }
        ].map((stat, i) => (
          <div key={i} className="card text-center p-6 bg-[#0f172a]/80">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.val}</div>
            <div className="text-sm text-slate-400 font-bold tracking-wider uppercase mb-1">{stat.label}</div>
            <div className="text-cyan-400 text-sm font-semibold">{stat.delta}</div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-left border-b border-white/10 pb-4">Explore the Project</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((sec, i) => (
            <Link key={i} href={sec.link} className="card p-6 flex items-start gap-4 hover:border-indigo-500/40 group text-left">
              <div className="text-3xl bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                {sec.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{sec.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{sec.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
