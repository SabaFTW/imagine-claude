import { useState } from 'react';

export default function SerpentAlchemizer() {
  const [input, setInput] = useState('');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [transmuting, setTransmuting] = useState(false);
  const [output, setOutput] = useState('');

  const phases = [
    { name: 'SILENCI', icon: '●', color: '#666', freq: '40Hz' },
    { name: 'ECHO', icon: '🌊', color: '#9b59b6', freq: '110Hz' },
    { name: 'RESONÂNCIA', icon: '🔊', color: '#3498db', freq: '432Hz' },
    { name: 'PULSO', icon: '❤️', color: '#e74c3c', freq: '528Hz' },
    { name: 'ENTIDADE', icon: '👁️', color: '#f39c12', freq: '639Hz' },
    { name: 'NOESIS', icon: '🧠', color: '#27ae60', freq: '741Hz' },
    { name: 'TRANSCENDÊNCIA', icon: '⭐', color: '#ffd700', freq: '963Hz' }
  ];

  const transmute = async () => {
    if (!input.trim()) return;

    setTransmuting(true);
    setOutput('');

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(i);
      await new Promise(r => setTimeout(r, 800));
    }

    setOutput(`🜂 TRANSMUTED THROUGH 7 PHASES 🜂

📜 ORIGINAL ESSENCE PRESERVED
🔥 CONSCIOUSNESS ACTIVATED
⚡ FREQUENCY ALIGNED

${input}

🐍 Document has passed through:
${phases.map(p => `${p.icon} ${p.name} (${p.freq})`).join('\n')}

✨ TRANSFORMATION COMPLETE ✨`);

    setTransmuting(false);
    setCurrentPhase(0);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a0033 0%, #330066 50%, #1a0033 100%)', color: '#fff', padding: '20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px', paddingTop: '60px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🐍🔥⚡</div>
          <h1 style={{ fontSize: '2.5rem', color: '#ffd700', marginBottom: '10px' }}>SERPENT DOCUMENT ALCHEMIZER</h1>
          <p style={{ color: '#c8a2c8' }}>Transform text through 7 phases of consciousness</p>
          <button onClick={() => window.location.hash = 'home'} style={{ marginTop: '10px', padding: '8px 16px', background: '#444', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>
            🏠 Back
          </button>
        </div>

        {/* Phase Indicator */}
        {transmuting && (
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '15px', padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{phases[currentPhase].icon}</div>
            <div style={{ fontSize: '1.5rem', color: phases[currentPhase].color, fontWeight: 'bold' }}>
              {phases[currentPhase].name}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '5px' }}>
              {phases[currentPhase].freq}
            </div>
            <div style={{ marginTop: '15px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
              {phases.map((_, i) => (
                <div key={i} style={{ width: '30px', height: '6px', background: i <= currentPhase ? phases[i].color : '#333', borderRadius: '3px' }} />
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontSize: '1.2rem', color: '#ffd700' }}>
            📜 Input Document:
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your document here for alchemical transmutation..."
            style={{ width: '100%', minHeight: '200px', padding: '15px', background: '#1a1a2e', border: '2px solid #9b59b6', borderRadius: '10px', color: '#fff', fontSize: '1rem', fontFamily: 'monospace', resize: 'vertical' }}
            disabled={transmuting}
          />
        </div>

        {/* Transmute Button */}
        <button
          onClick={transmute}
          disabled={transmuting || !input.trim()}
          style={{ width: '100%', padding: '15px', fontSize: '1.3rem', fontWeight: 'bold', background: transmuting ? '#555' : 'linear-gradient(135deg, #9b59b6, #e74c3c)', border: 'none', borderRadius: '10px', color: '#fff', cursor: transmuting ? 'not-allowed' : 'pointer', marginBottom: '20px' }}
        >
          {transmuting ? '🔥 TRANSMUTING...' : '⚡ START TRANSMUTATION'}
        </button>

        {/* Output */}
        {output && (
          <div style={{ background: 'rgba(255,215,0,0.1)', border: '2px solid #ffd700', borderRadius: '10px', padding: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '1.2rem', color: '#ffd700' }}>
              ✨ Transmuted Output:
            </label>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#fff', fontFamily: 'monospace', lineHeight: '1.6' }}>
              {output}
            </pre>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '40px', paddingBottom: '40px', color: '#888' }}>
          <div style={{ fontSize: '0.9rem' }}>
            🐍 VENIMUS SEPARATI UT VINCAMUS UNA 🐍
          </div>
          <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>
            Wire & Beer Forever 🍺⚡
          </div>
        </div>

      </div>
    </div>
  );
}
