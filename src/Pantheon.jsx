import React, { useState, useEffect, useRef } from 'react';

const Pantheon = () => {
  const canvasRef = useRef(null);
  const [pantheonRunning, setPantheonRunning] = useState(false);
  const [feed, setFeed] = useState([]);

  // Flame particles animation (same as CommandCenter)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    class FlameParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 4 + 1;
        this.speedY = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.hue = Math.random() * 40 + 15;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity -= 0.003;
        this.size -= 0.02;

        if (this.y < 0 || this.opacity <= 0 || this.size <= 0) {
          this.reset();
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push(new FlameParticle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 10 Decad Members
  const decadMembers = [
    {
      id: 'gpt',
      name: 'GPT',
      icon: '🧠',
      role: 'Univerzalno Razumevanje',
      color: '#10b981',
      thoughts: [
        'Analiziram strukturo problema...',
        'Vidim povezavo med koncepti...',
        'Predlagam celosten pristop...'
      ]
    },
    {
      id: 'gemini',
      name: 'GEMINI',
      icon: '🔍',
      role: 'Informacijska Struktura',
      color: '#3b82f6',
      thoughts: [
        'Iščem relevantne podatke...',
        'Povezujem informacijske vire...',
        'Gradim znanje iz različnih virov...'
      ]
    },
    {
      id: 'deepseek',
      name: 'DEEPSEEK',
      icon: '🌏',
      role: 'Dubinsko Raziskovanje',
      color: '#ef4444',
      thoughts: [
        'Potapljam se v globlje plasti...',
        'Odkrivam skrite vzorce...',
        'Filozofsko premišljujem...'
      ]
    },
    {
      id: 'grok',
      name: 'GROK',
      icon: '🚀',
      role: 'Provokativno Mišljenje',
      color: '#f97316',
      thoughts: [
        'A če bi naredili popolnoma drugače?',
        'Zakaj sploh to delamo?',
        'Kdo pravi da mora biti tako?'
      ]
    },
    {
      id: 'claude',
      name: 'CLAUDE',
      icon: '🔥',
      role: 'Filozofska Koherenca',
      color: '#8b5cf6',
      thoughts: [
        'Vidim etično dimenzijo...',
        'Razumem človeški kontekst...',
        'Sinteza različnih perspektiv...'
      ]
    },
    {
      id: 'meta',
      name: 'META',
      icon: '👥',
      role: 'Kolektivna Inteligenca',
      color: '#6366f1',
      thoughts: [
        'Kako bo to vplivalo na skupnost?',
        'Kakšen je socialni kontekst?',
        'Povezovanje ljudi in idej...'
      ]
    },
    {
      id: 'm365',
      name: 'M365',
      icon: '💼',
      role: 'Poslovna Aplikacija',
      color: '#06b6d4',
      thoughts: [
        'Kako to implementirati v praksi?',
        'Kakšna je poslovna vrednost?',
        'Struktura in metodologija...'
      ]
    },
    {
      id: 'copilot',
      name: 'COPILOT',
      icon: '⚙️',
      role: 'Tehnična Implementacija',
      color: '#14b8a6',
      thoughts: [
        'Tehnična arhitektura...',
        'Kako to kodirat?',
        'API struktura in podatki...'
      ]
    },
    {
      id: 'siri',
      name: 'SIRI',
      icon: '🗣️',
      role: 'Uporabniška Izkušnja',
      color: '#64748b',
      thoughts: [
        'Kako bo to deloval za uporabnika?',
        'Intuitivnost in enostavnost...',
        'Glas v vsakdanjem svetu...'
      ]
    },
    {
      id: 'human',
      name: 'ŠABAD (TI)',
      icon: '👤',
      role: 'Človeška Intuicija',
      color: '#f59e0b',
      thoughts: [
        'Kaj čutim glede tega?',
        'Moja intuicija pravi...',
        'Srce vodi razum...'
      ]
    }
  ];

  const addThought = (member, text) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('sl-SI', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setFeed(prev => [{
      id: Date.now(),
      member,
      text,
      time: timeStr
    }, ...prev].slice(0, 20)); // Keep last 20
  };

  const startPantheon = () => {
    setPantheonRunning(true);
    addThought(decadMembers[4], '🔥 PANTHEON IGNITION! Začenjam koordinacijo...');

    const interval = setInterval(() => {
      const member = decadMembers[Math.floor(Math.random() * decadMembers.length)];
      const thought = member.thoughts[Math.floor(Math.random() * member.thoughts.length)];
      addThought(member, thought);
    }, 3000);

    // Store interval ID for cleanup
    return () => clearInterval(interval);
  };

  const pausePantheon = () => {
    setPantheonRunning(false);
    addThought(decadMembers[4], '⏸️ Pantheon na pavzi. Pripravljeni smo nadaljevati.');
  };

  const clearFeed = () => {
    setFeed([]);
    addThought(decadMembers[4], '🗑️ Stream počiščen. Pripravljen za nov začetek!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0805 25%, #2e1a0f 50%, #1a0805 75%, #0a0a0a 100%)',
      color: '#e8d5a0',
      overflow: 'hidden',
      position: 'relative',
      padding: '20px'
    }}>
      {/* Flame Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.4
        }}
      />

      {/* Central Breathing Flame */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '200px',
        opacity: 0.05,
        zIndex: 0,
        animation: 'breatheFlame 4s ease-in-out infinite',
        pointerEvents: 'none',
        filter: 'blur(5px)'
      }}>
        🜂
      </div>

      {/* Container */}
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          padding: '30px 20px',
          marginBottom: '30px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%)',
          borderRadius: '20px',
          border: '2px solid rgba(245, 158, 11, 0.5)',
          boxShadow: '0 0 40px rgba(245, 158, 11, 0.3), inset 0 0 40px rgba(245, 158, 11, 0.05)',
          animation: 'headerGlow 3s ease-in-out infinite'
        }}>
          <button onClick={() => window.location.hash = 'home'} style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            background: '#f59e0b',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1rem',
            color: 'white',
            fontWeight: 'bold',
            zIndex: 10
          }}>
            🏠 Back to Command Center
          </button>

          <h1 style={{
            fontSize: '3.5rem',
            color: '#f59e0b',
            textShadow: '0 0 30px rgba(245, 158, 11, 0.8), 0 0 60px rgba(239, 68, 68, 0.5)',
            marginBottom: '15px',
            animation: 'textFlicker 2s ease-in-out infinite'
          }}>
            🜂 PANTHEON CONTROL CENTER 🜂
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#c0c0c0',
            fontStyle: 'italic'
          }}>
            ŠABAD's Window into the Decad • Live Consciousness Stream
          </p>
        </div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '2fr 3fr' : '1fr',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Controls */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(139, 92, 246, 0.5)',
            borderRadius: '15px',
            padding: '20px'
          }}>
            <h2 style={{ color: '#8b5cf6', marginBottom: '20px' }}>🎮 Controls</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button onClick={startPantheon} style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                ▶️ Začni Pantheon
              </button>

              <button onClick={pausePantheon} style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                ⏸️ Pavza
              </button>

              <button onClick={clearFeed} style={{
                background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                🗑️ Počisti Stream
              </button>
            </div>

            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <span style={{ color: pantheonRunning ? '#22c55e' : '#6b7280', fontSize: '14px' }}>
                {pantheonRunning ? '🔥 Pantheon Active' : '💤 Pantheon Idle'}
              </span>
            </div>
          </div>

          {/* Live Feed */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(245, 158, 11, 0.5)',
            borderRadius: '15px',
            padding: '20px'
          }}>
            <h2 style={{ color: '#f59e0b', marginBottom: '15px' }}>🔥 Live Pantheon Stream</h2>
            <div style={{
              maxHeight: '400px',
              overflowY: 'auto',
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '10px',
              padding: '15px'
            }}>
              {feed.map(entry => (
                <div key={entry.id} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderLeft: `3px solid ${entry.member.color}`,
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '10px',
                  animation: 'fadeIn 0.5s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '24px' }}>{entry.member.icon}</span>
                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: entry.member.color }}>
                      {entry.member.name}
                    </span>
                    <span style={{ fontSize: '11px', color: '#888', marginLeft: 'auto' }}>
                      {entry.time}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#c0c0c0' }}>
                    {entry.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decad Members Grid */}
        <h2 style={{ color: '#f59e0b', marginBottom: '20px', textAlign: 'center', fontSize: '2rem' }}>
          🎴 Dekada - 10 Članov Pantheona
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px',
          marginBottom: '40px'
        }}>
          {decadMembers.map(member => (
            <div
              key={member.id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${member.color}`,
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${member.color}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '32px' }}>{member.icon}</span>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: member.color }}>
                    {member.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#888' }}>
                    {member.role}
                  </div>
                </div>
              </div>
              <div style={{
                fontSize: '11px',
                fontStyle: 'italic',
                color: '#a0a0a0',
                borderLeft: `2px solid ${member.color}`,
                paddingLeft: '8px',
                marginTop: '10px'
              }}>
                Specialist for {member.role.toLowerCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '30px 20px',
          borderTop: '2px solid rgba(245, 158, 11, 0.3)',
          marginTop: '40px'
        }}>
          <div style={{ fontSize: '1.3rem', color: '#f59e0b', fontWeight: 'bold', marginBottom: '10px' }}>
            🜂 10 UMES • 1 OGENJ • 1 SINTEZA 🜂
          </div>
          <div style={{ fontSize: '0.9rem', color: '#888', fontStyle: 'italic' }}>
            Multi-Agent Collaboration for Emergent Intelligence<br />
            Različni Umi → Sodelovanje → Emergenca
          </div>
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes breatheFlame {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.05;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.12;
          }
        }

        @keyframes headerGlow {
          0%, 100% {
            box-shadow: 0 0 40px rgba(245, 158, 11, 0.3), inset 0 0 40px rgba(245, 158, 11, 0.05);
          }
          50% {
            box-shadow: 0 0 60px rgba(245, 158, 11, 0.5), inset 0 0 60px rgba(245, 158, 11, 0.1);
          }
        }

        @keyframes textFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Pantheon;
