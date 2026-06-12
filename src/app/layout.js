'use client';
import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Demo', path: '/demo' },
    { name: 'Live Inference', path: '/inference' },
    { name: 'Architecture', path: '/architecture' },
    { name: 'Results', path: '/results' },
    { name: 'Analysis', path: '/analysis' },
  ];
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">CLIP<span>Captioner</span></Link>
        <div className="navbar-links">
          {navItems.map(item => (
            <Link key={item.name} href={item.path} className={`navbar-link ${pathname === item.path ? 'active' : ''}`}>
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
    <footer className="footer">
      <div className="footer-authors">
        <span className="footer-badge">Abia Javed (21I-0311)</span>
        <span className="footer-badge">Malaika Noor (22I-0550)</span>
        <span className="footer-badge">Hamza Khurram (21I-0735)</span>
      </div>
      <p className="footer-copy">CS3001 — Computer Networks Term Project &nbsp;·&nbsp; FAST NUCES Islamabad</p>
      <a href="https://github.com/CtrlAltHamza/Clip-Captioning-" target="_blank" rel="noreferrer" className="footer-link">
        ★ GitHub Repository
      </a>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>CLIP-Guided Image Captioning</title>
        <meta name="description" content="Enhancing prompt-to-image consistency via cross-modal alignment loss — CS3001 Term Project, FAST NUCES Islamabad." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <div className="page-wrapper">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
