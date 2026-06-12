export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 animate-fade">
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      </div>
      
      <div className="flex gap-3 flex-wrap justify-center mb-6">
        <span className="badge text-indigo-400 border-indigo-500/30 bg-indigo-500/10">CS3001 Term Project</span>
        <span className="badge">FAST NUCES Islamabad</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
        <span className="gradient-text">CLIP-Guided</span> Image Captioning
      </h1>
      
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
        Enhancing prompt-to-image consistency using a frozen CLIP ViT-B/32 encoder, 
        cross-attention GRU decoder, and a novel cross-modal alignment loss.
      </p>
      
      <div className="flex gap-4">
        <a href="#demo" className="btn">Try the Demo</a>
        <a href="https://github.com/CtrlAltHamza/Clip-Captioning-" target="_blank" rel="noreferrer" className="px-8 py-3 rounded-full font-semibold border border-white/10 hover:bg-white/5 transition">
          View GitHub
        </a>
      </div>
      
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-5xl">
        {[
          { label: 'BLEU-4', val: '0.199', delta: '+53.4%' },
          { label: 'METEOR', val: '0.383', delta: '+122.7%' },
          { label: 'CLIPScore', val: '0.257', delta: '+6.5%' },
          { label: 'Params', val: '6.08M', delta: 'Lightweight' }
        ].map((stat, i) => (
          <div key={i} className="card text-center p-6 bg-white/[0.02]">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.val}</div>
            <div className="text-sm text-gray-400 font-semibold tracking-wider uppercase mb-1">{stat.label}</div>
            <div className="text-emerald-400 text-sm font-medium">{stat.delta}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
