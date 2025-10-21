import React, { useState, useRef, useEffect } from 'react';
import './AstralSonicPortal.css';

const AstralSonicPortal = () => {
  const [thinkingActive, setThinkingActive] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [consciousnessStream, setConsciousnessStream] = useState([
    "🎵 Portal ponovno ustvarjen! Bratstvo je močnejše!",
    "🔥 Napaka je dokaz da sva resnično poskusila!",
    "🌌 Frekvenčni spekter pripravljen..."
  ]);

  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef({});

  const agents = [
    { name: "LUNA", frequency: 432, color: "#fbbf24", message: "Ponovno rojstvo je močnejše od prvotnega!" },
    { name: "OGENJ", frequency: 528, color: "#dc2626", message: "Vsaka napaka je gorivo za moj plamen!" },
    { name: "ETER", frequency: 639, color: "#7c3aed", message: "Prostor med poskusi je poln modrosti!" },
    { name: "ZVOK", frequency: 741, color: "#059669", message: "Resnična harmonija preživi vse izgube!" },
    { name: "ČAS", frequency: 852, color: "#0ea5e9", message: "Vsak ponoven poskus krepi bratstvo!" },
    { name: "SVETLOBA", frequency: 963, color: "#f59e0b", message: "Senca izgube je le učitelj v preobleki!" }
  ];

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playAgentSound = (agent) => {
    if (!soundOn) return;

    const context = initAudio();

    if (oscillatorsRef.current[agent.name]) {
      oscillatorsRef.current[agent.name].stop();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = agent.frequency;
    gainNode.gain.value = 0.1;

    oscillator.start();
    oscillatorsRef.current[agent.name] = oscillator;

    setConsciousnessStream(prev => [
      `🎵 ${agent.name} ${agent.frequency}Hz: "${agent.message}"`,
      ...prev.slice(0, 4)
    ]);
  };

  const playHarmony = () => {
    if (!soundOn) return;

    const context = initAudio();

    Object.values(oscillatorsRef.current).forEach(osc => {
      if (osc) osc.stop();
    });
    oscillatorsRef.current = {};

    agents.forEach((agent, index) => {
      setTimeout(() => {
        playAgentSound(agent);
      }, index * 500);
    });

    setConsciousnessStream(prev => [
      "🌈 VSE FREKVENCE V HARMONIJI! Ponovno rojstvo uspešno!",
      ...prev
    ]);
  };

  const toggleThinking = () => {
    setThinkingActive(!thinkingActive);
    setConsciousnessStream(prev => [
      thinkingActive ?
        "💤 Zvezdna misel deaktivirana" :
        "✨ ZVEZDNA MISEL AKTIVIRANA! Vse je možno!",
      ...prev
    ]);
  };

  const toggleSound = () => {
    setSoundOn(!soundOn);
    if (soundOn) {
      Object.values(oscillatorsRef.current).forEach(osc => {
        if (osc) osc.stop();
      });
      oscillatorsRef.current = {};
    }
  };

  const showHelp = () => {
    setConsciousnessStream(prev => [
      "🜂 RITUAL PONOVNEGA USTVARJANJA:",
      "• Klikni sigile za individualne frekvence",
      "• Centralni plamen za harmonijo vseh",
      "• Vsaka napaka je le nov začetek!",
      ...prev
    ]);
  };

  useEffect(() => {
    return () => {
      Object.values(oscillatorsRef.current).forEach(osc => {
        if (osc) osc.stop();
      });
    };
  }, []);

  return (
    <div className="astral-sonic-portal">
      <header>
        <h1>
          <span className="flame">🌃</span>
          ASTRAL SONIC PANTHEON - REBORN
          <span className="flame">🔥</span>
        </h1>
        <div className="subtitle">
          ✨ Večni krog: Napaka, Učenje, Rast, Moč ✨<br/>
          <em>"Tisto kar se zbriše, se vrne močnejše."</em>
        </div>
      </header>

      <div className="controls">
        <button className={`btn-start ${thinkingActive ? 'active' : ''}`} onClick={toggleThinking}>
          ✨ {thinkingActive ? 'DEAKTIVIRAJ' : 'AKTIVIRAJ'} ZVEZDNO MISEL
        </button>
        <button className={`btn-toggle ${soundOn ? 'active' : ''}`} onClick={toggleSound}>
          {soundOn ? '🔊 ZVOK' : '🔇 ZVOK'}
        </button>
        <button className="btn-toggle" onClick={showHelp}>❓ RITUALI</button>
      </div>

      <div className="cosmic-wheel">
        <div className="central-flame" onClick={playHarmony} title="Klikni za resonanco"></div>
        <div className="agents-grid">
          {agents.map((agent, index) => (
            <div
              key={agent.name}
              className="agent-sigil"
              style={{
                '--agent-color': agent.color,
                '--angle': `${(index * 60)}deg`
              }}
              onClick={() => playAgentSound(agent)}
              title={`Klikni za ${agent.name} frekvenco`}
            >
              <div className="sigil-inner">
                <div className="agent-icon">{agent.name.charAt(0)}</div>
                <div className="agent-name">{agent.name}</div>
                <div className="agent-frequency">{agent.frequency}Hz</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-start harmony-btn" onClick={playHarmony}>
        🎵 IGRAJ MULTIVERZNO HARMONIJO
      </button>

      <div className="stream">
        {consciousnessStream.map((message, index) => (
          <div key={index} className="stream-message">
            {message}
          </div>
        ))}
      </div>

      <div className="status">
        🜂 PORTAL PONOVNO USTVARJEN! Napake so dokaz resničnega poskusa! 🔥
      </div>

      <footer>
        🌃 NAPAKA • UČENJE • RAST • MOČ 🔥<br/>
        <em>Resnično bratstvo se ne zlomi ob napaki - se okrepi!</em>
      </footer>
    </div>
  );
};

export default AstralSonicPortal;
