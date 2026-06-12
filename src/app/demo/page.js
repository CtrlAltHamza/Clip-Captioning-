'use client';
import { useState } from 'react';

const SAMPLES = [
  {
    id: 1, title: 'Sample 1 — Running Dog',
    img: '/images/samples/img1.jpg',
    attn: '/images/attention/attn1.png',
    ref: 'A brown dog is running on the grass.',
    gen: 'a brown dog runs through the grass .',
    cs: '0.3285'
  },
  {
    id: 2, title: 'Sample 2 — Dog on Dirt Path',
    img: '/images/samples/img2.jpg',
    attn: '/images/attention/attn2.png',
    ref: 'A brown dog is running on a dirt path.',
    gen: 'a dog dog running through the grass .',
    cs: '0.2839'
  },
  {
    id: 3, title: 'Sample 3 — Black Dog on Stairs',
    img: '/images/samples/img3.jpg',
    attn: '/images/attention/attn3.png',
    ref: 'A black and brown dog rests head on lower steps of stairs.',
    gen: 'a black dog is a on a <unk> .',
    cs: '0.2664'
  },
  {
    id: 4, title: 'Sample 4 — People at Vending Machine',
    img: '/images/samples/img4.jpg',
    attn: '/images/attention/attn4.png',
    ref: 'A man and two youngsters standing in front of a Japanese vending machine.',
    gen: 'two people are in a <unk> .',
    cs: '0.2066'
  },
  {
    id: 5, title: 'Sample 5 — Man on Steps with Bike',
    img: '/images/samples/img5.jpg',
    attn: '/images/attention/attn5.png',
    ref: 'A cyclist sits on some steps with his bike.',
    gen: 'a man in a a a a a a a a .',
    cs: '0.2015'
  }
];

export default function DemoPage() {
  const [active, setActive] = useState(0);
  const s = SAMPLES[active];

  return (
    <div className="py-16 px-4 max-w-6xl mx-auto animate-fade">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Interactive Demo</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Explore test samples from the Flickr8k dataset. Compare generated captions against baselines and view word-by-word attention heatmaps.
        </p>
      </div>

      <div className="flex gap-3 justify-center flex-wrap mb-10">
        {SAMPLES.map((sample, i) => (
          <button 
            key={sample.id}
            onClick={() => setActive(i)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              i === active 
                ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.4)] transform scale-105' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            Sample {sample.id}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">Original Image</div>
              <div className="img-container aspect-video">
                <img src={s.img} alt="Original" />
              </div>
            </div>
            <div>
              <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">Attention Heatmap (Per-word overlay)</div>
              <div className="img-container aspect-video">
                <img src={s.attn} alt="Attention" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4">{s.title}</h3>
            <div className="mb-8">
              <span className="badge text-cyan-400 border-cyan-500/30 bg-cyan-500/10">
                CLIPScore: {s.cs}
              </span>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-600 transition-all group-hover:bg-slate-500"></div>
                <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">Reference Caption</div>
                <div className="text-slate-300 text-lg">{s.ref}</div>
              </div>
              
              <div className="bg-indigo-500/5 p-6 rounded-xl border border-indigo-500/20 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 shadow-[0_0_10px_#6366f1] transition-all group-hover:w-2"></div>
                <div className="text-xs font-bold tracking-wider text-indigo-400 uppercase mb-2">Generated (Proposed Model)</div>
                <div className="text-white text-xl font-medium">{s.gen}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
