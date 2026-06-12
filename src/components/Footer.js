export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 mt-20 text-center">
      <div className="flex gap-4 justify-center mb-8">
        <div className="badge">Abia Javed (21I-0311)</div>
        <div className="badge">Malaika Noor (22I-0550)</div>
        <div className="badge">Hamza Khurram (21I-0735)</div>
      </div>
      <p className="text-gray-500 mb-4 text-sm">
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
