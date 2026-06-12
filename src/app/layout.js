'use client';
import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Demo', path: '/demo' },
    { name: 'Architecture', path: '/architecture' },
    { name: 'Results', path: '/results' },
    { name: 'Analysis', path: '/analysis' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-outfit font-bold text-xl text-white tracking-wide">
          CLIP<span className="text-cyan-400">Captioner</span>
        </Link>
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className={`nav-link ${pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t border-white/10 mt-20 text-center">
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <div className="badge">Abia Javed (21I-0311)</div>
        <div className="badge">Malaika Noor (22I-0550)</div>
        <div className="badge">Hamza Khurram (21I-0735)</div>
      </div>
      <p className="text-slate-500 mb-4 text-sm font-medium">
        CS3001 — Computer Networks Term Project • FAST NUCES Islamabad
      </p>
      <div className="flex justify-center gap-6 text-sm font-semibold">
        <a href="https://github.com/CtrlAltHamza/Clip-Captioning-" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 transition">
          GitHub Repository
        </a>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>CLIP-Guided Image Captioning</title>
        <meta name="description" content="Interactive web application for the CLIP Captioning project." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
