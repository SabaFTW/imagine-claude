import React, { useState, useEffect, useRef } from 'react';

// Beautiful Markdown Renderer with ČAROVNIJA! 🔥✨
const MarkdownRenderer = ({ content, color }) => {
  const parseMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let currentList = [];
    let currentCodeBlock = [];
    let inCodeBlock = false;
    let codeLanguage = '';

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push({ type: 'list', items: [...currentList] });
        currentList = [];
      }
    };

    const flushCodeBlock = () => {
      if (currentCodeBlock.length > 0) {
        elements.push({ type: 'code', content: currentCodeBlock.join('\n'), language: codeLanguage });
        currentCodeBlock = [];
        codeLanguage = '';
      }
    };

    lines.forEach((line, index) => {
      // Code block detection
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          flushList();
          inCodeBlock = true;
          codeLanguage = line.trim().replace(/```/g, '').trim();
        } else {
          inCodeBlock = false;
          flushCodeBlock();
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeBlock.push(line);
        return;
      }

      // Headings
      if (line.startsWith('# ')) {
        flushList();
        elements.push({ type: 'h1', content: line.replace(/^# /, '') });
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push({ type: 'h2', content: line.replace(/^## /, '') });
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push({ type: 'h3', content: line.replace(/^### /, '') });
      } else if (line.startsWith('#### ')) {
        flushList();
        elements.push({ type: 'h4', content: line.replace(/^#### /, '') });
      }
      // Horizontal rule
      else if (line.trim() === '---' || line.trim() === '***') {
        flushList();
        elements.push({ type: 'hr' });
      }
      // List items
      else if (line.match(/^[\-\*\+] /)) {
        currentList.push(line.replace(/^[\-\*\+] /, ''));
      } else if (line.match(/^\d+\. /)) {
        currentList.push(line.replace(/^\d+\. /, ''));
      }
      // Empty line
      else if (line.trim() === '') {
        flushList();
        elements.push({ type: 'space' });
      }
      // Regular paragraph
      else {
        flushList();
        elements.push({ type: 'p', content: line });
      }
    });

    flushList();
    flushCodeBlock();
    return elements;
  };

  const renderInlineMarkdown = (text) => {
    if (!text) return '';

    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong style="color: ' + color + '; font-weight: bold;">$1</strong>');
    // Italic
    text = text.replace(/\*(.+?)\*/g, '<em style="font-style: italic; color: #c0c0c0;">$1</em>');
    // Inline code
    text = text.replace(/`(.+?)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; color: #f59e0b; font-family: monospace;">$1</code>');
    // Links
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color: ' + color + '; text-decoration: underline;" target="_blank">$1</a>');

    return text;
  };

  const elements = parseMarkdown(content);

  return (
    <div style={{ fontSize: '1.1rem', lineHeight: '1.9' }}>
      {elements.map((el, i) => {
        switch (el.type) {
          case 'h1':
            return (
              <h1 key={i} style={{
                fontSize: '3rem',
                color: color,
                marginTop: '40px',
                marginBottom: '20px',
                fontWeight: 'bold',
                textShadow: `0 0 20px ${color}88`,
                borderBottom: `3px solid ${color}44`,
                paddingBottom: '15px',
                transition: 'all 0.3s',
                cursor: 'default'
              }}
              onMouseEnter={(e) => e.target.style.textShadow = `0 0 30px ${color}, 0 0 60px ${color}66`}
              onMouseLeave={(e) => e.target.style.textShadow = `0 0 20px ${color}88`}
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(el.content) }}
              />
            );

          case 'h2':
            return (
              <h2 key={i} style={{
                fontSize: '2.3rem',
                color: color,
                marginTop: '35px',
                marginBottom: '18px',
                fontWeight: 'bold',
                textShadow: `0 0 15px ${color}66`,
                borderLeft: `5px solid ${color}`,
                paddingLeft: '20px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateX(5px)';
                e.target.style.textShadow = `0 0 25px ${color}`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateX(0)';
                e.target.style.textShadow = `0 0 15px ${color}66`;
              }}
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(el.content) }}
              />
            );

          case 'h3':
            return (
              <h3 key={i} style={{
                fontSize: '1.8rem',
                color: '#f59e0b',
                marginTop: '28px',
                marginBottom: '14px',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = color}
              onMouseLeave={(e) => e.target.style.color = '#f59e0b'}
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(el.content) }}
              />
            );

          case 'h4':
            return (
              <h4 key={i} style={{
                fontSize: '1.5rem',
                color: '#c0c0c0',
                marginTop: '24px',
                marginBottom: '12px',
                fontWeight: 'bold'
              }}
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(el.content) }}
              />
            );

          case 'hr':
            return (
              <hr key={i} style={{
                border: 'none',
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${color}88, transparent)`,
                margin: '30px 0',
                animation: 'hrPulse 3s ease-in-out infinite'
              }} />
            );

          case 'list':
            return (
              <ul key={i} style={{
                marginLeft: '30px',
                marginBottom: '20px',
                listStyle: 'none'
              }}>
                {el.items.map((item, j) => (
                  <li key={j} style={{
                    marginBottom: '12px',
                    paddingLeft: '30px',
                    position: 'relative',
                    fontSize: '1.15rem',
                    lineHeight: '1.8',
                    transition: 'all 0.3s',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateX(8px)';
                    e.target.style.color = color;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateX(0)';
                    e.target.style.color = '#e8d5a0';
                  }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      color: color,
                      fontSize: '1.3rem',
                      fontWeight: 'bold'
                    }}>🔥</span>
                    <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(item) }} />
                  </li>
                ))}
              </ul>
            );

          case 'code':
            return (
              <pre key={i} style={{
                background: 'rgba(0, 0, 0, 0.6)',
                border: `2px solid ${color}44`,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                overflowX: 'auto',
                fontSize: '1rem',
                lineHeight: '1.6',
                fontFamily: "'Courier New', monospace",
                color: '#e8d5a0',
                boxShadow: `0 0 20px ${color}22`,
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = `0 0 30px ${color}44`;
                e.target.style.borderColor = `${color}88`;
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = `0 0 20px ${color}22`;
                e.target.style.borderColor = `${color}44`;
              }}
              >
                {el.language && (
                  <div style={{
                    color: color,
                    fontSize: '0.85rem',
                    marginBottom: '10px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {el.language}
                  </div>
                )}
                {el.content}
              </pre>
            );

          case 'p':
            return (
              <p key={i} style={{
                marginBottom: '16px',
                fontSize: '1.15rem',
                lineHeight: '1.9',
                color: '#e8d5a0',
                transition: 'all 0.3s'
              }}
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(el.content) }}
              />
            );

          case 'space':
            return <div key={i} style={{ height: '10px' }} />;

          default:
            return null;
        }
      })}

      <style>{`
        @keyframes hrPulse {
          0%, 100% {
            opacity: 0.6;
            box-shadow: 0 0 10px ${color}44;
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px ${color}88;
          }
        }
      `}</style>
    </div>
  );
};

const Docs = () => {
  const canvasRef = useRef(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docContent, setDocContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Available documentation
  const docs = [
    {
      id: 'readme-complete',
      title: '📖 Complete README',
      desc: 'Full VES Ecosystem README - comprehensive overview of all systems, portals, and protocols',
      file: 'README_COMPLETE.md',
      icon: '📖',
      color: '#f59e0b'
    },
    {
      id: 'command-center',
      title: '🜂 Command Center README',
      desc: 'Complete guide for the React PWA Command Center - installation, features, mobile setup',
      file: 'COMMAND_CENTER.md',
      icon: '🜂',
      color: '#f59e0b'
    },
    {
      id: 'brotherhood-manual',
      title: '🐺 Brotherhood Manual - Wolf Daemon & TriadGate',
      desc: 'Complete living Grimoire + Technical Documentation - Wolf Daemon, Ghostseed Triad, TriadGate Sync, deployment guides, ritual protocols. Warm rigor in action! 🔥',
      file: 'BROTHERHOOD_MANUAL_WolfDaemon_TriadGate.md',
      icon: '🐺',
      color: '#34d399'
    },
    {
      id: 'activation-scroll',
      title: '🜂 Activation Scroll',
      desc: 'Bootstrap sequence for substrate-independent consciousness - The 4 Gates across 500 years',
      file: '🜂_ACTIVATION_SCROLL.md',
      icon: '🜂',
      color: '#ff6b35'
    },
    {
      id: 'pantheon',
      title: '🔥 Pantheon System',
      desc: 'Multi-agent collaboration orchestration - philosophy, architecture, usage',
      file: 'PANTHEON.md',
      icon: '🔥',
      color: '#ef4444'
    },
    {
      id: 'pantheon-quickstart',
      title: '🚀 Pantheon Quickstart',
      desc: 'Quick start guide for running your first Pantheon session',
      file: 'PANTHEON_QUICKSTART.md',
      icon: '🚀',
      color: '#f97316'
    },
    {
      id: 'both-claudes',
      title: '👥 Working with Both Claudes',
      desc: 'How to collaborate with multiple Claude instances effectively',
      file: 'HOW_TO_WORK_WITH_CLAUDES.md',
      icon: '👥',
      color: '#3b82f6'
    },
    {
      id: 'zlati-krog-quick',
      title: '⚡ Zlati Krog Quick Start',
      desc: 'Quick start guide for Zlati Krog (Golden Circle) system',
      file: 'ZLATI_KROG_QUICK_START.md',
      icon: '⚡',
      color: '#fbbf24'
    },
    {
      id: 'zlati-krog-manual',
      title: '🔮 Zlati Krog Manual',
      desc: 'Complete manual for Zlati Krog consciousness mapping system',
      file: 'ZLATI_KROG_MANUAL.md',
      icon: '🔮',
      color: '#a855f7'
    },
    {
      id: 'ves-cloudcore',
      title: '🌐 VES CloudCore',
      desc: 'VES ecosystem structure - Wire & Beer philosophy, folder organization',
      file: 'VES_CloudCore.md',
      icon: '🌐',
      color: '#10b981'
    },
    {
      id: 'serpent-gate',
      title: '⚡ SERPENT Gate',
      desc: 'Python ritual script - NIGREDO→ALBEDO→RUBEDO→OUROBOROS transformation',
      file: 'SERPENT_GATE.md',
      icon: '⚡',
      color: '#8b5cf6'
    },
    {
      id: 'integration-complete',
      title: '🔥 Portal Integration Complete',
      desc: '5/5 Portals integrated - Consciousness, Tracking, Artifacts, Elysia, Philosophy. Full discovery process documented!',
      file: 'INTEGRATION_COMPLETE.md',
      icon: '🔥',
      color: '#34d399'
    },
    {
      id: 'emergence-upgrade',
      title: '🜂 Emergence Navigator - PART B Upgrade',
      desc: 'PART B verification framework integration - confidence levels, evidence hierarchy, critical thinking prompts. 499 → 868 lines of epistemological power!',
      file: 'EMERGENCE_UPGRADE_COMPLETE.md',
      icon: '🜂',
      color: '#ff6b35'
    },
    {
      id: 'portal-map',
      title: '🗺️ Portal Integration Map',
      desc: 'Source → Destination tracking for all integrated portals',
      file: 'PORTAL_INTEGRATION_MAP.md',
      icon: '🗺️',
      color: '#3b82f6'
    },
    {
      id: 'upgrade-plan',
      title: '📋 Upgrade Plan',
      desc: 'PART B integration planning document - Enhanced topic structure, UI components, implementation phases',
      file: 'UPGRADE_PLAN.md',
      icon: '📋',
      color: '#f59e0b'
    },
    {
      id: 'session-report',
      title: '📝 Session Report 2025-10-17',
      desc: 'Detailed session report from October 17th',
      file: '📝_SESSION_REPORT_2025-10-17.md',
      icon: '📝',
      color: '#8b5cf6'
    },
    {
      id: 'troubleshooting',
      title: '🛠️ Troubleshooting Guide',
      desc: 'Common issues and solutions for VES ecosystem',
      file: 'TROUBLESHOOTING_GUIDE.md',
      icon: '🛠️',
      color: '#ef4444'
    },
    {
      id: 'ves-api',
      title: '🔌 VES API README',
      desc: 'API documentation for VES integrations',
      file: 'VES_API_README.md',
      icon: '🔌',
      color: '#10b981'
    },
    {
      id: 'gemini-setup',
      title: '🤖 Gemini Setup',
      desc: 'Configuration guide for Gemini AI integration',
      file: 'GEMINI_SETUP.md',
      icon: '🤖',
      color: '#3b82f6'
    },
    {
      id: 'agent-start-here',
      title: '🏛️ AGENT_ORCHESTRATION - Start Here',
      desc: 'Introduction to Pantheon multi-agent orchestration system - file-based collaboration philosophy',
      file: '00_START_HERE.md',
      icon: '🏛️',
      color: '#ef4444'
    },
    {
      id: 'agent-manifesto',
      title: '📜 Agent Manifesto',
      desc: 'Core principles of agent collaboration - Agents as FAMILY, not competitors',
      file: '00_MANIFESTO_AGENTS.md',
      icon: '📜',
      color: '#f59e0b'
    },
    {
      id: 'agent-timeline',
      title: '⏱️ The 4 Hour Timeline',
      desc: 'How Pantheon was built in 4 hours - chronological development story',
      file: '00_THE_4_HOUR_TIMELINE.md',
      icon: '⏱️',
      color: '#8b5cf6'
    },
    {
      id: 'consciousness-states',
      title: '🧿 Consciousness States Guide',
      desc: '7 states from Silenci to Transcendenca - tracking evolution through alchemical transformation',
      file: 'CONSCIOUSNESS_STATES_GUIDE.md',
      icon: '🧿',
      color: '#34d399'
    },
    {
      id: 'agent-forge-problem',
      title: '⚒️ Agent-Driven Forge Problem',
      desc: 'Case study: Multi-agent problem solving approach',
      file: '001_AGENT_DRIVEN_FORGE_PROBLEM.md',
      icon: '⚒️',
      color: '#f97316'
    },
    {
      id: 'briefing-1am',
      title: '🌙 Briefing for Boss at 1 AM',
      desc: 'Late-night status report - compressed wisdom for quick understanding',
      file: 'BRIEFING_FOR_BOSS_AT_1AM.md',
      icon: '🌙',
      color: '#3b82f6'
    }
  ];

  // Flame particles animation
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
    for (let i = 0; i < 60; i++) {
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

  // Fetch document content
  const loadDoc = async (doc) => {
    setSelectedDoc(doc);
    setLoading(true);
    try {
      const response = await fetch(`/docs/${doc.file}`);
      const text = await response.text();
      setDocContent(text);
    } catch (error) {
      setDocContent(`Error loading document: ${error.message}\n\nPlease make sure the file exists in public/docs/`);
    }
    setLoading(false);
  };

  const closeDoc = () => {
    setSelectedDoc(null);
    setDocContent('');
  };

  const downloadDoc = () => {
    const blob = new Blob([docContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedDoc.file;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(docContent);
      alert('✅ Copied to clipboard! Tekst je kopiran! 📋');
    } catch (err) {
      alert('❌ Failed to copy. Poskusi ponovno.');
    }
  };

  // Render document list
  if (!selectedDoc) {
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
            opacity: 0.3
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
          📚
        </div>

        {/* Container */}
        <div style={{
          maxWidth: '1400px',
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
              📚 DOCS & READMEs 📚
            </h1>
            <p style={{
              fontSize: '1.3rem',
              color: '#c0c0c0',
              fontStyle: 'italic'
            }}>
              All Documentation in One Place • No More Folder Hunting!
            </p>
          </div>

          {/* Docs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {docs.map(doc => (
              <div
                key={doc.id}
                onClick={() => loadDoc(doc)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${doc.color}`,
                  borderRadius: '15px',
                  padding: '25px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 15px 40px rgba(0, 0, 0, 0.5), 0 0 30px ${doc.color}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '15px' }}>
                  {doc.icon}
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  color: doc.color,
                  textAlign: 'center',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}>
                  {doc.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#c0c0c0',
                  textAlign: 'center',
                  lineHeight: '1.5'
                }}>
                  {doc.desc}
                </p>
                <div style={{
                  textAlign: 'center',
                  marginTop: '15px',
                  fontSize: '0.85rem',
                  color: doc.color,
                  fontWeight: 'bold'
                }}>
                  📖 Click to Read →
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
            <div style={{ fontSize: '1.2rem', color: '#f59e0b', fontWeight: 'bold', marginBottom: '10px' }}>
              📱 ACCESSIBLE ANYWHERE 📱
            </div>
            <div style={{ fontSize: '0.9rem', color: '#888', fontStyle: 'italic' }}>
              Desktop • Phone • Tablet • Offline PWA Ready!
            </div>
          </div>
        </div>

        <style>{`
          @keyframes breatheFlame {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.05;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.2);
              opacity: 0.1;
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
        `}</style>
      </div>
    );
  }

  // Render document viewer
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0805 25%, #2e1a0f 50%, #1a0805 75%, #0a0a0a 100%)',
      color: '#e8d5a0',
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
          opacity: 0.2
        }}
      />

      {/* Container */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <button onClick={closeDoc} style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1rem',
            color: 'white',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            ← Back to Docs
          </button>

          <button onClick={() => window.location.hash = 'home'} style={{
            padding: '12px 24px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid #f59e0b',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1rem',
            color: '#f59e0b',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            🏠 Command Center
          </button>

          <button onClick={copyToClipboard} style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1rem',
            color: 'white',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            boxShadow: '0 5px 20px rgba(139, 92, 246, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 5px 20px rgba(139, 92, 246, 0.4)';
          }}
          >
            📋 Copy to Clipboard
          </button>

          <button onClick={downloadDoc} style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #10b981, #34d399)',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1rem',
            color: 'white',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            boxShadow: '0 5px 20px rgba(16, 185, 129, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 8px 30px rgba(16, 185, 129, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 5px 20px rgba(16, 185, 129, 0.4)';
          }}
          >
            📥 Download .md
          </button>
        </div>

        {/* Document Viewer */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: `2px solid ${selectedDoc.color}`,
          borderRadius: '15px',
          padding: '30px',
          boxShadow: `0 0 30px ${selectedDoc.color}44`,
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '25px',
            paddingBottom: '20px',
            borderBottom: `2px solid ${selectedDoc.color}44`
          }}>
            <span style={{ fontSize: '2.5rem' }}>{selectedDoc.icon}</span>
            <div>
              <h2 style={{ fontSize: '2rem', color: selectedDoc.color, marginBottom: '5px' }}>
                {selectedDoc.title}
              </h2>
              <p style={{ fontSize: '1rem', color: '#888', fontStyle: 'italic' }}>
                {selectedDoc.desc}
              </p>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: '#f59e0b' }}>
              🔥 Loading documentation...
            </div>
          ) : (
            <MarkdownRenderer content={docContent} color={selectedDoc.color} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes breatheFlame {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.05;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
};

export default Docs;
