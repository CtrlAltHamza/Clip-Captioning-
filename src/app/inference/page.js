'use client';
import { useState, useRef } from 'react';

export default function InferencePage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeWord, setActiveWord] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selected = e.dataTransfer.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setError(null);
    }
  };

  const generateCaption = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      // In development, this targets the local FastAPI server
      // In production, you would point this to your Railway URL
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${await res.text()}`);
      }

      const data = await res.json();
      setResult(data);
      setActiveWord(0);
    } catch (err) {
      setError(err.message || 'Failed to generate caption. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-tag">Live Playground</div>
          <h1 className="section-title">Test Your Own Images</h1>
          <p className="section-sub">
            Upload any image to generate a caption using our trained CLIP-guided PyTorch model running on the backend.
          </p>
        </div>

        <div className="two-col fade-up fade-up-d1">
          {/* Left: Upload and Original Image */}
          <div className="space-y-6">
            <div 
              className="upload-zone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                hidden 
              />
              {preview ? (
                <div className="img-box img-box-4-3">
                  <img src={preview} alt="Upload preview" />
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📸</div>
                  <h3 style={{fontSize: '1.2rem', color: '#e2e8f0', marginBottom: '0.5rem', fontWeight: 600}}>Click or drag an image here</h3>
                  <p style={{color: '#64748b', fontSize: '0.9rem'}}>JPG, PNG up to 10MB</p>
                </div>
              )}
            </div>

            <button 
              className="btn-primary" 
              style={{width: '100%', justifyContent: 'center', opacity: (!file || loading) ? 0.6 : 1, cursor: (!file || loading) ? 'not-allowed' : 'pointer'}}
              onClick={generateCaption}
              disabled={!file || loading}
            >
              {loading ? '🧠 Running Inference...' : '✨ Generate Caption'}
            </button>

            {error && (
              <div style={{padding: '1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', color: '#fca5a5', fontSize: '0.9rem'}}>
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Right: Results Display */}
          <div className="card" style={{minHeight: '400px', display: 'flex', flexDirection: 'column'}}>
            <h3 style={{fontSize: '1.2rem', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem', color: '#fff'}}>
              Model Output
            </h3>

            {!result && !loading && (
              <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textAlign: 'center'}}>
                Upload an image and click Generate to see the model's caption and attention heatmaps.
              </div>
            )}

            {loading && (
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#22d3ee'}}>
                <div className="spinner" style={{marginBottom: '1rem'}}></div>
                <p>Extracting CLIP features and decoding...</p>
              </div>
            )}

            {result && (
              <div className="fade-up">
                <div className="caption-box caption-box-gen" style={{marginBottom: '2rem'}}>
                  <div className="caption-label caption-label-gen">Generated Caption</div>
                  <div className="caption-text-gen" style={{fontSize: '1.25rem'}}>{result.caption}</div>
                </div>

                <div style={{marginBottom: '1rem'}}>
                  <div className="caption-label">Word-Level Attention Maps</div>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem'}}>
                    {result.words.map((w, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveWord(i)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '8px',
                          border: `1px solid ${i === activeWord ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.1)'}`,
                          background: i === activeWord ? 'rgba(34,211,238,0.1)' : 'rgba(255,255,255,0.05)',
                          color: i === activeWord ? '#22d3ee' : '#e2e8f0',
                          cursor: 'pointer',
                          fontWeight: i === activeWord ? 600 : 400,
                          transition: 'all 0.2s'
                        }}
                      >
                        {w.word}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="img-box img-box-4-3" style={{marginTop: '1.5rem'}}>
                  <img src={result.words[activeWord].heatmap} alt={`Heatmap for ${result.words[activeWord].word}`} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
