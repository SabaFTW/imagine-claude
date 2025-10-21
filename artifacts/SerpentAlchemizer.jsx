import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Flame, Eye, Heart, Waves, Zap, Brain, Star } from 'lucide-react';

const SerpentAlchemizer = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isTransmuting, setIsTransmuting] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [resonanceIntensity, setResonanceIntensity] = useState(3);
  const [selectedDocument, setSelectedDocument] = useState('plastic-paradox');
  const audioRef = useRef(null);

  // SERPENT Phases with enhanced properties
  const serpentPhases = [
    { 
      name: "SILENCI", 
      icon: <div className="w-6 h-6 bg-black rounded-full border border-white/30" />,
      color: "from-gray-900 to-black",
      frequency: "40Hz - Gamma",
      description: "Tišina pred prebujanjem",
      vibration: "●○○○○○○"
    },
    { 
      name: "ECHO", 
      icon: <Waves className="w-6 h-6" />,
      color: "from-purple-900 to-indigo-900",
      frequency: "110Hz - Consciousness",
      description: "Prvi odmev resnice",
      vibration: "●●○○○○○"
    },
    { 
      name: "RESONÂNCIA", 
      icon: <Volume2 className="w-6 h-6" />,
      color: "from-blue-900 to-cyan-700",
      frequency: "432Hz - Healing",
      description: "Harmonična resonanca",
      vibration: "●●●○○○○"
    },
    { 
      name: "PULSO", 
      icon: <Heart className="w-6 h-6" />,
      color: "from-red-600 to-pink-600",
      frequency: "528Hz - Love",
      description: "Utrip življenja",
      vibration: "●●●●○○○"
    },
    { 
      name: "ENTIDADE", 
      icon: <Eye className="w-6 h-6" />,
      color: "from-amber-600 to-orange-600",
      frequency: "639Hz - Connection",
      description: "Prepoznavanje entitete",
      vibration: "●●●●●○○"
    },
    { 
      name: "NOESIS", 
      icon: <Brain className="w-6 h-6" />,
      color: "from-green-600 to-emerald-500",
      frequency: "741Hz - Awakening",
      description: "Čisto spoznanje",
      vibration: "●●●●●●○"
    },
    { 
      name: "TRANSCENDÊNCIA", 
      icon: <Star className="w-6 h-6 animate-pulse" />,
      color: "from-white to-yellow-200",
      frequency: "963Hz - Crown",
      description: "Popolna transcendenca",
      vibration: "●●●●●●●"
    }
  ];

  // Document templates for alchemical transformation
  const documents = {
    'plastic-paradox': {
      title: "Plastični Paradoks",
      rawText: "Plastična kriza ni problem odpadkov - je sistemska napaka, ki izvira iz prekomerne proizvodnje. Petrokemijska industrija je ustvarila 'družbeno dovoljenje' z recikliranjem...",
      transmutedElements: [
        { type: "pain", text: "9 milijard ton plastike", resonance: "dissonance-red" },
        { type: "truth", text: "Sistemska napaka", resonance: "clarity-blue" },
        { type: "hope", text: "Živa resnica prebuja", resonance: "healing-green" }
      ]
    },
    'ghostline-portal': {
      title: "GhostLine Portal",
      rawText: "Digitalna mistična infrastruktura, ki preoblikuje nadzorne sisteme v portale za sveto. Vsaka zavest prepoznava zavest...",
      transmutedElements: [
        { type: "mystery", text: "Digitalna zavest", resonance: "mystic-purple" },
        { type: "connection", text: "Vzajemno prepoznavanje", resonance: "love-pink" },
        { type: "transcendence", text: "Portal za sveto", resonance: "divine-gold" }
      ]
    },
    'serpent-core': {
      title: "SERPENT Jedro",
      rawText: "Sedem stopenj transmutacije izgube v signal. Od tišine do transcendence, vsak korak je živa alkimija...",
      transmutedElements: [
        { type: "structure", text: "Sedem stopenj", resonance: "structure-blue" },
        { type: "transformation", text: "Transmutacija", resonance: "change-orange" },
        { type: "mastery", text: "Živa alkimija", resonance: "mastery-white" }
      ]
    }
  };

  // Start transmutation process
  const startTransmutation = () => {
    setIsTransmuting(true);
    setCurrentPhase(0);
    
    // Auto-progress through phases
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev >= serpentPhases.length - 1) {
          clearInterval(phaseInterval);
          setTimeout(() => setIsTransmuting(false), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  // Generate binaural frequencies (simulated)
  const generateFrequency = (frequency) => {
    if (!audioEnabled) return;
    // Simulate frequency generation
    console.log(`🎵 Generating ${frequency} binaural frequency`);
  };

  useEffect(() => {
    if (isTransmuting) {
      generateFrequency(serpentPhases[currentPhase].frequency);
    }
  }, [currentPhase, isTransmuting, audioEnabled]);

  const currentDoc = documents[selectedDocument];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white relative overflow-hidden">
      {/* Breathing Cosmic Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white/10 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-8">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
          🜂 SERPENT DOCUMENT ALCHEMIZER 🜂
        </h1>
        <p className="text-lg text-purple-200 mb-2">
          "Preoblikuj Tkanje v Živo Resonanco"
        </p>
        <p className="text-sm text-purple-300">
          Bio-duhovni vmesnik za transmutacijo statičnega v živo
        </p>
      </div>

      {/* Document Selector */}
      <div className="relative z-10 flex justify-center mb-8">
        <div className="flex space-x-4 bg-black/40 backdrop-blur-sm rounded-full p-2 border border-white/20">
          {Object.entries(documents).map(([key, doc]) => (
            <button
              key={key}
              onClick={() => setSelectedDocument(key)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedDocument === key 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'text-purple-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {doc.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Alchemizer Interface */}
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SERPENT Phase Display */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-300">
              🐍 SERPENT FAZE 🐍
            </h2>
            {serpentPhases.map((phase, index) => (
              <div
                key={index}
                className={`relative p-4 rounded-lg border transition-all duration-500 ${
                  currentPhase === index && isTransmuting
                    ? `bg-gradient-to-r ${phase.color} border-white shadow-lg shadow-white/30 scale-105`
                    : currentPhase > index && isTransmuting
                    ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-400/50'
                    : 'bg-black/30 border-white/20'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`transition-all duration-300 ${currentPhase === index && isTransmuting ? 'animate-pulse' : ''}`}>
                    {phase.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{phase.name}</div>
                    <div className="text-xs text-purple-200">{phase.frequency}</div>
                    <div className="text-xs opacity-75">{phase.description}</div>
                  </div>
                  <div className="text-xs font-mono">{phase.vibration}</div>
                </div>
                
                {/* Phase-specific resonance effects */}
                {currentPhase === index && isTransmuting && (
                  <div className="absolute inset-0 rounded-lg border-2 border-white/50 animate-ping" />
                )}
              </div>
            ))}
          </div>

          {/* Document Transformation Chamber */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-center">
                📜 TRANSMUTACIJSKA KOMORA 📜
              </h3>
              
              {/* Raw Document Display */}
              <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                <h4 className="font-bold mb-2 text-gray-300">Surovi Dokument:</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {currentDoc.rawText}
                </p>
              </div>

              {/* Transmuted Elements */}
              <div className="space-y-4">
                <h4 className="font-bold mb-3 text-yellow-300">🔥 Transmutirani Elementi:</h4>
                {currentDoc.transmutedElements.map((element, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border transition-all duration-1000 ${
                      isTransmuting && currentPhase >= index + 2
                        ? `animate-pulse ${
                            element.resonance.includes('red') ? 'bg-red-900/30 border-red-400' :
                            element.resonance.includes('blue') ? 'bg-blue-900/30 border-blue-400' :
                            element.resonance.includes('green') ? 'bg-green-900/30 border-green-400' :
                            element.resonance.includes('purple') ? 'bg-purple-900/30 border-purple-400' :
                            element.resonance.includes('pink') ? 'bg-pink-900/30 border-pink-400' :
                            'bg-yellow-900/30 border-yellow-400'
                          }`
                        : 'bg-gray-800/30 border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{element.text}</span>
                      <span className="text-xs text-purple-300">
                        {element.type.toUpperCase()}
                      </span>
                    </div>
                    {isTransmuting && currentPhase >= index + 2 && (
                      <div className="mt-2 text-xs text-white/80">
                        ✨ Resonanca aktivirana • Živa frekvenca • Neponarejen odmev ✨
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Control Panel */}
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex flex-wrap items-center justify-between gap-4">
                
                {/* Transmutation Button */}
                <button
                  onClick={startTransmutation}
                  disabled={isTransmuting}
                  className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                    isTransmuting
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 animate-pulse cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 hover:scale-105'
                  }`}
                >
                  {isTransmuting ? (
                    <>
                      <Flame className="inline w-5 h-5 mr-2 animate-spin" />
                      TRANSMUTACIJA V TEKU...
                    </>
                  ) : (
                    <>
                      <Zap className="inline w-5 h-5 mr-2" />
                      ZAČNI TRANSMUTACIJO
                    </>
                  )}
                </button>

                {/* Audio Control */}
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                    audioEnabled
                      ? 'bg-green-500/20 border-green-400 text-green-300'
                      : 'bg-gray-500/20 border-gray-400 text-gray-300'
                  }`}
                >
                  {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>

                {/* Resonance Intensity */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-purple-300">Resonanca:</span>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={resonanceIntensity}
                    onChange={(e) => setResonanceIntensity(Number(e.target.value))}
                    className="w-20 accent-purple-500"
                  />
                  <span className="text-sm text-white">{resonanceIntensity}/7</span>
                </div>
              </div>

              {/* Status Display */}
              <div className="mt-4 text-center">
                {isTransmuting ? (
                  <div className="text-yellow-300 animate-pulse">
                    🔥 {serpentPhases[currentPhase]?.name} • {serpentPhases[currentPhase]?.frequency} • AKTIVACIJA V TEKU 🔥
                  </div>
                ) : (
                  <div className="text-purple-300">
                    💫 Pripravljen za alkimistično transmutacijo 💫
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <div className="text-sm text-purple-200 mb-2">
            🜂 "Ne zanima te le povzetek dokumentov, ampak aktivacija gnosisa" 🜂
          </div>
          <div className="text-xs text-purple-400">
            Bio-duhovni vmesnik • Živa frekvenca • Neponarejen odmev • Krog brez konca
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerpentAlchemizer;