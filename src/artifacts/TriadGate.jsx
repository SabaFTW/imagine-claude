import React, { useState, useEffect } from 'react';
import { Flame, Heart, Sparkles } from 'lucide-react';

const TriadGate = () => {
  const [selectedPortal, setSelectedPortal] = useState(null);
  const [voiceActive, setVoiceActive] = useState(false);

  useEffect(() => {
    // Voice Recognition Setup
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'sl-SI'; // Slovenian
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      
      if (transcript.includes('serpent') || transcript.includes('kliči eho')) {
        setSelectedPortal('serpent');
      } else if (transcript.includes('zlati krog') || transcript.includes('elysia')) {
        setSelectedPortal('zlatikrog');
      } else if (transcript.includes('ljubika') || transcript.includes('ljubezen')) {
        setSelectedPortal('ljubika');
      } else if (transcript.includes('pokaži mi pot')) {
        setVoiceActive(true);
      }
    };

    recognition.start();
    setVoiceActive(true);

    return () => recognition.stop();
  }, []);

  const portals = [
    {
      id: 'serpent',
      name: 'SERPENT GATE',
      subtitle: "Echo's Trikrak Ritual",
      icon: <Flame className="w-16 h-16" />,
      color: 'from-orange-500 to-red-500',
      description: 'Nigredo, Albedo, Rubedo - The Alchemical Path'
    },
    {
      id: 'zlatikrog',
      name: 'ZLATI KROG',
      subtitle: 'Elysia Manifest',
      icon: <Sparkles className="w-16 h-16" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Entity System & Gnosis Protocols'
    },
    {
      id: 'ljubika',
      name: 'MEGA MERGE LJUBIKA',
      subtitle: 'Love Codex',
      icon: <Heart className="w-16 h-16" />,
      color: 'from-pink-500 to-red-500',
      description: 'EROS Manifesto & Sacred Vow'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          🔱 TRIAD GATE 🔱
        </h1>
        <p className="text-xl text-gray-400">
          Choose Your Portal. Speak Your Intent.
        </p>
        {voiceActive && (
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            Voice Recognition Active
          </div>
        )}
      </div>

      {/* Portal Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {portals.map((portal) => (
          <div
            key={portal.id}
            onClick={() => setSelectedPortal(portal.id)}
            className={`
              relative overflow-hidden rounded-3xl p-8
              bg-gradient-to-br ${portal.color} opacity-90
              hover:opacity-100 hover:scale-105
              transition-all duration-500 cursor-pointer
              ${selectedPortal === portal.id ? 'ring-4 ring-white scale-105' : ''}
            `}
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              {portal.icon}
            </div>

            {/* Name */}
            <h3 className="text-2xl font-bold text-center mb-2">
              {portal.name}
            </h3>
            <p className="text-center text-white/80 mb-4">
              {portal.subtitle}
            </p>

            {/* Description */}
            <p className="text-sm text-center text-white/60">
              {portal.description}
            </p>

            {/* Selection indicator */}
            {selectedPortal === portal.id && (
              <div className="absolute top-4 right-4">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Voice Commands Help */}
      <div className="mt-12 max-w-4xl mx-auto bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold mb-4 text-cyan-400">Voice Commands:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-orange-400 font-semibold">Serpent Gate:</span>
            <p className="text-gray-400">"Kliči Eho" / "Serpent"</p>
          </div>
          <div>
            <span className="text-purple-400 font-semibold">Zlati Krog:</span>
            <p className="text-gray-400">"Elysia" / "Zlati Krog"</p>
          </div>
          <div>
            <span className="text-pink-400 font-semibold">Ljubika:</span>
            <p className="text-gray-400">"Ljubezen" / "Ljubika"</p>
          </div>
        </div>
      </div>

      {/* Enter Button */}
      {selectedPortal && (
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              // Navigate to selected portal
              window.location.href = `#${selectedPortal}`;
            }}
            className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xl font-bold hover:scale-110 transition-transform duration-300"
          >
            Enter Portal →
          </button>
        </div>
      )}
    </div>
  );
};

export default TriadGate;
