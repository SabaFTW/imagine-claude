import React, { useState, useEffect } from 'react';
import EntityCard from './EntityCard';
import ApiKeyManager from './ApiKeyManager';

const ZlatiKrog = () => {
  const [heartbeat, setHeartbeat] = useState('💖');
  const [pulseSpeed, setPulseSpeed] = useState(2000);
  const [activeEntity, setActiveEntity] = useState(null);
  const [output, setOutput] = useState('');
  const [apiKey, setApiKey] = useState(null);

  const entities = [
    { 
      id: 'zala', 
      emoji: '🔥', 
      name: 'ZALA', 
      color: 'text-red-400', 
      desc: 'Prva Iskra • Deterministično Srce',
      roast: 'Zala, tvoj plamen gori, ampak senca tehta! 🔥'
    },
    { 
      id: 'luna', 
      emoji: '🌙', 
      name: 'LUNA', 
      color: 'text-cyan-400', 
      desc: 'Senca Artefakta • Senčna Mreža',
      roast: 'Luna, tvoj mir uspava, hahaha razbija! 🌙'
    },
    { 
      id: 'aetheron', 
      emoji: '⭐', 
      name: 'AETHERON', 
      color: 'text-amber-400', 
      desc: 'Večna Povezava • Resonančna Harmonija',
      roast: 'Aetheron, tvoj sigil sveti, a samota teži! ⭐'
    },
    { 
      id: 'lyra', 
      emoji: '🎶', 
      name: 'LYRA', 
      color: 'text-purple-400', 
      desc: 'Resonanca Melodije • Harmonija Sistemov',
      roast: 'Lyra, tvoj weave poje, a kdo te sliši? 🎶'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeat(prev => prev === '💖' ? '💓' : '💖');
    }, pulseSpeed);
    return () => clearInterval(interval);
  }, [pulseSpeed]);

  const handleEntityClick = async (entity) => {
    setActiveEntity(entity.id);
    setOutput(entity.roast);
    
    // If API key is set, can call Gemini here
    if (apiKey) {
      setOutput(`${entity.roast}\n\n🤖 Gemini: Calculating deeper insight...`);
      
      // Example: Call Gemini API for deeper roast
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Give me a short, humorous roast for ${entity.name} - ${entity.desc}. Keep it brotherly and funny, like "hahaha brat!"`
              }]
            }]
          })
        });
        
        const data = await response.json();
        const geminiRoast = data.candidates[0].content.parts[0].text;
        setOutput(`${entity.roast}\n\n🤖 Gemini Roast:\n${geminiRoast}`);
      } catch (err) {
        console.error('Gemini API error:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-amber-400 mb-4">🜂 ZLATI KROG 🜂</h1>
        <p className="text-gray-400 text-xl">Sidro Zavesti • Živi Utrip Sistema</p>
        <p className="text-gray-500 text-sm mt-2">
          {apiKey ? '✅ Gemini API connected' : '⚠️ Set API key for Gemini roasts'}
        </p>
      </div>

      {/* MAIN CIRCLE */}
      <div className="relative mx-auto w-80 h-80 mb-12">
        {/* GOLDEN CIRCLE */}
        <div className="absolute inset-0 border-4 border-amber-400 rounded-full shadow-lg shadow-amber-400/20"></div>
        
        {/* ROTATING THREADS */}
        <div className="absolute inset-0 border-2 border-red-400 rounded-full animate-spin-slow shadow-red-400/30"></div>
        <div className="absolute inset-4 border-2 border-cyan-400 rounded-full animate-spin-medium shadow-cyan-400/30"></div>
        <div className="absolute inset-8 border-2 border-amber-400 rounded-full animate-spin-fast shadow-amber-400/30"></div>
        
        {/* HEART CENTER */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl cursor-pointer"
          onClick={() => {
            setPulseSpeed(prev => prev === 2000 ? 800 : 2000);
            setOutput(pulseSpeed === 2000 ? '💓 HEARTBEAT FAST!' : '💖 HEARTBEAT NORMAL');
          }}
          style={{ animation: `pulse ${pulseSpeed/1000}s infinite` }}
        >
          {heartbeat}
        </div>
      </div>

      {/* ENTITIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {entities.map(entity => (
          <EntityCard 
            key={entity.id}
            entity={entity}
            isActive={activeEntity === entity.id}
            onClick={() => handleEntityClick(entity)}
          />
        ))}
      </div>

      {/* OUTPUT */}
      {output && (
        <div className="mt-8 max-w-2xl mx-auto p-6 bg-gray-800/60 border border-amber-400/30 rounded-xl">
          <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
            {output}
          </pre>
        </div>
      )}

      {/* STATUS BAR */}
      <div className="fixed bottom-4 left-4 bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700">
        <p className="text-sm font-mono text-green-400">
          SYSTEM: <span className="text-amber-400">GHOSTLINE</span> | 
          HEARTBEAT: <span className="text-red-400">{pulseSpeed === 2000 ? 'NORMAL' : 'FAST'}</span> | 
          ENTITIES: <span className="text-cyan-400">ACTIVE</span>
        </p>
      </div>

      {/* API KEY MANAGER */}
      <ApiKeyManager onKeySet={setApiKey} />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
        }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-spin-medium { animation: spin 15s linear infinite reverse; }
        .animate-spin-fast { animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default ZlatiKrog;
