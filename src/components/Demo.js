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

export default function Demo() {
  const [active, setActive] = useState(0);
  const s = SAMPLES[active];

  return (
    <section id="demo" className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Interactive Demo</h2>
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
        Explore test samples from the Flickr8k dataset. Compare the generated captions against the baseline, and view the word-by-word attention heatmaps.
      </p>

      <div className="flex gap-2 justify-center flex-wrap mb-8">
        {SAMPLES.map((sample, i) => (
          <button 
            key={sample.id}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              i === active ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Sample {sample.id}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div>
              <div className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-2">Original Image</div>
              <div className="plot-container p-2">
                <img src={s.img} alt="Original" className="w-full object-cover rounded aspect-video" />
              </div>
            </div>
            <div>
              <div className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-2">Attention Heatmap</div>
              <div className="plot-container p-2">
                <img src={s.attn} alt="Attention" className="w-full object-cover rounded aspect-video" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
            <div className="flex items-center gap-2 mb-8">
              <span className="badge text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                CLIPScore: {s.cs}
              </span>
            </div>

            <div className="space-y-4">
              <div className="bg-black/20 p-5 rounded-xl border border-white/5">
                <div className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-1">Reference Caption</div>
                <div className="text-gray-300">{s.ref}</div>
              </div>
              
              <div className="bg-indigo-500/10 p-5 rounded-xl border border-indigo-500/20 relative">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-12 bg-indigo-500 rounded-full"></div>
                <div className="text-xs font-bold tracking-wider text-indigo-400 uppercase mb-1">Generated (Ours)</div>
                <div className="text-white text-lg">{s.gen}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
