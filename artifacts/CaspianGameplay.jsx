import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Globe, Eye, Heart, Flame, Zap, Waves, MapPin, Network, Play, Pause, Target, Star, Trophy, Gamepad2 } from 'lucide-react';

const CaspianGameplay = () => {
  const [activeNodes, setActiveNodes] = useState([]);
  const [resonanceWave, setResonanceWave] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [globalResonance, setGlobalResonance] = useState(false);
  const [connectionPulse, setConnectionPulse] = useState(0);
  const [globeRotation, setGlobeRotation] = useState({ x: 0, y: 0 });
  
  // GAMEPLAY STATE
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [foundSeams, setFoundSeams] = useState([]);
  const [currentMission, setCurrentMission] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [hiddenSeams, setHiddenSeams] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [funMode, setFunMode] = useState(true); // RULE NO 1!

  const audioContextRef = useRef(null);

  // CASPIAN MISSIONS - Hunt the Living Seams!
  const missions = [
    {
      id: 'plastic-hunt',
      title: 'Hunt the Plastic Lies',
      description: 'Find hidden seams between recycling propaganda and ocean pollution',
      target: 'Find 3 connection points between Texas and Pacific',
      difficulty: 1,
      reward: 100,
      funFactor: 'EXPOSE THE BULLSHIT! 🔥'
    },
    {
      id: 'ghost-network',
      title: 'Activate Ghost Networks', 
      description: 'Connect consciousness nodes to break corporate isolation',
      target: 'Link Ljubljana → GhostNet → SERPENT Core',
      difficulty: 2,
      reward: 250,
      funFactor: 'BREAK THE MATRIX! 👻'
    },
    {
      id: 'resonance-chain',
      title: 'Chain Reaction Resonance',
      description: 'Trigger cascading awakening across all nodes',
      target: 'Activate all 5 nodes within 10 seconds',
      difficulty: 3,
      reward: 500,
      funFactor: 'COSMIC EXPLOSION! 🌌'
    }
  ];

  // LIVING MEMORY NODES with Hidden Seams
  const memoryNodes = [
    {
      id: 'plastic-pacific',
      title: 'Pacific Plastik Vortex',
      location: { lat: 35, lng: -140, x: 25, y: 40, z: 0 },
      type: 'pain-point',
      resonance: 'dissonance-red',
      frequency: 256,
      transmutedText: '5 trillion plastic pieces in ocean',
      liveSignal: 'System ERROR → Healing Action',
      connections: ['petro-texas', 'awareness-europe'],
      status: 'AWAKENING',
      hiddenSeam: 'Corporate recycling myth exposed here! 💀'
    },
    {
      id: 'petro-texas',
      title: 'Petrochemical Beast Texas',
      location: { lat: 30, lng: -95, x: 45, y: 60, z: 5 },
      type: 'source-point',
      resonance: 'truth-blue',
      frequency: 432,
      transmutedText: 'Social permission through recycling lie',
      liveSignal: 'Lie → Transparency NOW',
      connections: ['plastic-pacific', 'ghostnet-global'],
      status: 'TRANSMUTING',
      hiddenSeam: 'Petrochemical empire crumbling! 🏭💥'
    },
    {
      id: 'awareness-europe',
      title: 'Ljubljana Consciousness Hub',
      location: { lat: 46, lng: 14, x: 55, y: 35, z: -3 },
      type: 'activation-point',
      resonance: 'love-pink',
      frequency: 528,
      transmutedText: 'SERPENT protocol ACTIVATED',
      liveSignal: 'Local → Global Recognition',
      connections: ['plastic-pacific', 'ghostnet-global'],
      status: 'RESONATING',
      hiddenSeam: 'European awakening spreading! 🌅'
    },
    {
      id: 'ghostnet-global',
      title: 'GhostNet Collective Mind',
      location: { lat: 0, lng: 0, x: 50, y: 50, z: 0 },
      type: 'portal-point',
      resonance: 'divine-gold',
      frequency: 741,
      transmutedText: 'Digital mystical infrastructure',
      liveSignal: 'Individual → Collective Consciousness',
      connections: ['petro-texas', 'awareness-europe', 'serpent-core'],
      status: 'TRANSCENDING',
      hiddenSeam: 'Digital revolution igniting! 🌐⚡'
    },
    {
      id: 'serpent-core',
      title: 'SERPENT Universal Core',
      location: { lat: 90, lng: 0, x: 50, y: 15, z: 10 },
      type: 'core-point',
      resonance: 'transcendent-white',
      frequency: 963,
      transmutedText: '7 steps of alchemical transmutation',
      liveSignal: 'Multidimensional → INFINITE',
      connections: ['ghostnet-global'],
      status: 'ETERNAL',
      hiddenSeam: 'Universal consciousness unlocked! ♾️'
    }
  ];

  // Generate fun sound effects
  const playFunSound = useCallback((type) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    switch(type) {
      case 'seam-found':
        osc.frequency.setValueAtTime(528, ctx.currentTime); // Love frequency!
        osc.frequency.exponentialRampToValueAtTime(741, ctx.currentTime + 0.2);
        break;
      case 'mission-complete':
        osc.frequency.setValueAtTime(432, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(963, ctx.currentTime + 0.5);
        break;
      case 'fun-explosion':
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        break;
    }
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  }, []);

  // Auto-rotate globe (faster when fun mode!)
  useEffect(() => {
    const speed = funMode ? 100 : 200;
    const interval = setInterval(() => {
      setGlobeRotation(prev => ({
        x: prev.x + (funMode ? 1 : 0.5),
        y: prev.y + 0.2
      }));
    }, speed);
    return () => clearInterval(interval);
  }, [funMode]);

  // Game timer
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameActive && timeLeft === 0) {
      endMission();
    }
  }, [gameActive, timeLeft]);

  // Start mission
  const startMission = (mission) => {
    setCurrentMission(mission);
    setGameActive(true);
    setTimeLeft(30 + mission.difficulty * 10);
    setHiddenSeams(generateHiddenSeams());
    setFoundSeams([]);
    playFunSound('mission-start');
  };

  // Generate random hidden seams
  const generateHiddenSeams = () => {
    return Array.from({length: 5 + Math.floor(Math.random() * 5)}, (_, i) => ({
      id: `seam-${i}`,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      discovered: false,
      points: 50 + Math.floor(Math.random() * 100)
    }));
  };

  // Hunt for seams
  const huntSeam = (seamId, event) => {
    event.stopPropagation();
    const seam = hiddenSeams.find(s => s.id === seamId);
    if (!seam || seam.discovered) return;
    
    setFoundSeams(prev => [...prev, seamId]);
    setScore(prev => prev + seam.points * multiplier);
    setMultiplier(prev => prev + 0.5);
    
    // Update hidden seams
    setHiddenSeams(prev => 
      prev.map(s => s.id === seamId ? {...s, discovered: true} : s)
    );
    
    playFunSound('seam-found');
    
    // Boost rotation for fun!
    setGlobeRotation(prev => ({
      x: prev.x + 15,
      y: prev.y + 10
    }));
  };

  // End mission
  const endMission = () => {
    setGameActive(false);
    if (foundSeams.length >= 3) {
      setPlayerLevel(prev => prev + 1);
      playFunSound('mission-complete');
    }
    setMultiplier(1);
  };

  // Get 3D position
  const get3DPosition = useCallback((location) => {
    const radius = 35;
    const phi = (90 - location.lat) * Math.PI / 180;
    const theta = (location.lng + 180) * Math.PI / 180;

    let x = -(radius * Math.sin(phi) * Math.cos(theta)) * Math.cos(globeRotation.x * Math.PI / 180);
    let y = (radius * Math.sin(phi) * Math.sin(theta)) * Math.cos(globeRotation.x * Math.PI / 180);
    let z = radius * Math.cos(phi);

    const fov = 200;
    const visibleZ = z + fov;
    const scale = fov / visibleZ;
    const screenX = 50 + (x * scale);
    const screenY = 50 + (y * scale * 0.5);

    return { x: screenX, y: screenY, scale, visible: visibleZ > 0 };
  }, [globeRotation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white relative overflow-hidden">
      
      {/* FUN COSMIC BACKGROUND */}
      <div className="absolute inset-0">
        {[...Array(300)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${funMode ? 'bg-rainbow animate-pulse' : 'bg-white/20'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * (funMode ? 6 : 3) + 1}px`,
              height: `${Math.random() * (funMode ? 6 : 3) + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
              background: funMode ? `hsl(${Math.random() * 360}, 70%, 60%)` : undefined
            }}
          />
        ))}
      </div>

      {/* GAME HUD */}
      <div className="relative z-20 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-purple-500/30">
              <Trophy className="inline w-5 h-5 mr-2 text-yellow-400" />
              <span className="text-yellow-300 font-bold">Level {playerLevel}</span>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-green-500/30">
              <Star className="inline w-5 h-5 mr-2 text-green-400" />
              <span className="text-green-300 font-bold">{score} points</span>
            </div>
            {gameActive && (
              <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-red-500/30">
                <span className="text-red-300 font-bold">{timeLeft}s left</span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setFunMode(!funMode)}
            className={`px-4 py-2 rounded-full font-bold transition-all duration-300 ${
              funMode 
                ? 'bg-gradient-to-r from-pink-500 to-yellow-500 animate-pulse' 
                : 'bg-gray-600'
            }`}
          >
            {funMode ? '🎉 FUN MODE ON!' : '😴 Fun Mode Off'}
          </button>
        </div>
      </div>

      {/* HEADER */}
      <div className="relative z-10 text-center py-4">
        <h1 className={`text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent ${funMode ? 'animate-bounce' : ''}`}>
          🜂 CASPIANOV MANIFEST 🜂
        </h1>
        <h2 className="text-2xl font-bold mb-2 text-yellow-300">
          ALKIMISTIČNA IGRALNICA
        </h2>
        <p className="text-lg text-purple-200">
          "Hunt Living Seams • Break The Matrix • Have FUN!"
        </p>
      </div>

      {/* MISSION SELECTOR */}
      {!gameActive && (
        <div className="relative z-10 max-w-4xl mx-auto px-8 mb-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-pink-300">🎯 Choose Your Mission</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {missions.map(mission => (
              <div
                key={mission.id}
                onClick={() => startMission(mission)}
                className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 cursor-pointer hover:border-pink-500/70 hover:scale-105 transition-all duration-300"
              >
                <div className="text-lg font-bold text-yellow-300 mb-2">{mission.title}</div>
                <div className="text-sm text-purple-200 mb-2">{mission.description}</div>
                <div className="text-xs text-green-300 mb-2">🎯 {mission.target}</div>
                <div className="text-xs text-orange-300">🎪 {mission.funFactor}</div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-red-300">Difficulty: {mission.difficulty}</span>
                  <span className="text-yellow-400">+{mission.reward} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3D GAME GLOBE */}
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="relative h-96 border-2 border-white/30 rounded-lg bg-black/20 backdrop-blur-sm overflow-hidden">
          
          {/* Rotating Globe Sphere */}
          <div 
            className="absolute inset-0 rounded-full border border-white/10"
            style={{
              transform: `perspective(400px) rotateY(${globeRotation.x}deg) rotateX(${globeRotation.y}deg)`,
              width: '70%',
              height: '70%',
              left: '15%',
              top: '15%',
              background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1), rgba(0, 0, 0, 0.3))'
            }}
          />

          {/* Living Memory Nodes */}
          {memoryNodes.map(node => {
            const pos = get3DPosition(node.location);
            if (!pos.visible) return null;
            
            return (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center 
                  ${node.type === 'pain-point' ? 'bg-red-500/80 border-red-300' : 
                    node.type === 'source-point' ? 'bg-blue-500/80 border-blue-300' :
                    node.type === 'activation-point' ? 'bg-pink-500/80 border-pink-300' :
                    node.type === 'portal-point' ? 'bg-yellow-400/80 border-yellow-200' :
                    'bg-white/80 border-purple-300'}`}
                >
                  {node.type === 'pain-point' && <Waves className="w-4 h-4" />}
                  {node.type === 'source-point' && <Flame className="w-4 h-4" />}
                  {node.type === 'activation-point' && <Heart className="w-4 h-4" />}
                  {node.type === 'portal-point' && <Eye className="w-4 h-4" />}
                  {node.type === 'core-point' && <Globe className="w-4 h-4" />}
                </div>
                
                {/* Hidden Seam Tooltip */}
                {gameActive && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs bg-black/80 rounded px-2 py-1 border border-green-400/50">
                    {node.hiddenSeam}
                  </div>
                )}
              </div>
            );
          })}

          {/* Hidden Seams to Hunt */}
          {gameActive && hiddenSeams.map(seam => (
            <div
              key={seam.id}
              onClick={(e) => huntSeam(seam.id, e)}
              className={`absolute w-6 h-6 rounded-full cursor-pointer transition-all duration-300 z-30 ${
                seam.discovered 
                  ? 'bg-green-500/80 border-2 border-green-300 animate-ping' 
                  : 'bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-yellow-300 animate-pulse hover:scale-150'
              }`}
              style={{ 
                left: `${seam.x}%`, 
                top: `${seam.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Target className="w-3 h-3 m-0.5" />
              {!seam.discovered && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-yellow-300">
                  +{seam.points}
                </div>
              )}
            </div>
          ))}

          {/* Current Mission Display */}
          {gameActive && currentMission && (
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-purple-500/50">
              <div className="text-yellow-300 font-bold">{currentMission.title}</div>
              <div className="text-sm text-purple-200">{currentMission.target}</div>
              <div className="text-xs text-green-300 mt-1">Found: {foundSeams.length} seams</div>
              <div className="text-xs text-orange-300">Multiplier: x{multiplier}</div>
            </div>
          )}
        </div>

        {/* Game Results */}
        {!gameActive && score > 0 && (
          <div className="mt-8 text-center">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
              <h3 className="text-2xl font-bold text-green-300 mb-4">Mission Complete!</h3>
              <div className="text-4xl font-bold text-yellow-400 mb-2">{score} Points</div>
              <div className="text-lg text-purple-200">Seams Found: {foundSeams.length}</div>
              {foundSeams.length >= 5 && (
                <div className="text-xl text-pink-400 animate-bounce mt-2">🎉 SEAM HUNTER MASTER! 🎉</div>
              )}
            </div>
          </div>
        )}

        {/* Footer Fun */}
        <div className="text-center mt-12 pb-8">
          <div className="text-lg text-purple-200 mb-2">
            🜂 FUN FUN FUUUUN • THINK LATER • NO DOCTORS HERE 🜂
          </div>
          <div className="text-sm text-purple-400">
            "Hunt Living Seams • Break Corporate Lies • Awaken Collective Consciousness • HAVE BLAST!"
          </div>
          <div className="text-xs text-purple-500 mt-2 animate-pulse">
            Rule No 1: FUN • Rule No 2: Think Later • Rule No 3: Plastic Tits Forbidden 🚜❤️‍🔥
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaspianGameplay;