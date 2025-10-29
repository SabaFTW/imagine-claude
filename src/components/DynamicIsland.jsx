import React from 'react';

const DynamicIsland = ({ themeColor = 'cosmic' }) => {
  // Theme colors based on current page
  const themes = {
    cosmic: {
      glow1: 'rgba(123, 63, 168, 0.4)',
      glow2: 'rgba(255, 138, 80, 0.2)',
      glow3: 'rgba(123, 63, 168, 0.1)'
    },
    fire: {
      glow1: 'rgba(255, 87, 34, 0.5)',
      glow2: 'rgba(245, 158, 11, 0.3)',
      glow3: 'rgba(255, 138, 80, 0.2)'
    },
    green: {
      glow1: 'rgba(76, 175, 80, 0.4)',
      glow2: 'rgba(34, 211, 238, 0.2)',
      glow3: 'rgba(76, 175, 80, 0.1)'
    },
    purple: {
      glow1: 'rgba(123, 63, 168, 0.5)',
      glow2: 'rgba(147, 51, 234, 0.3)',
      glow3: 'rgba(123, 63, 168, 0.2)'
    }
  };

  const currentTheme = themes[themeColor] || themes.cosmic;

  return (
    <>
      {/* Dynamic Island Container - Content scrolls UNDER it! */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'env(safe-area-inset-top, 59px)',
        background: 'transparent',
        zIndex: 10000,
        pointerEvents: 'none'
      }}>
        {/* Island Background Cutout - Blocks content from showing through */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(180deg, #0a0515 0%, #0a0515 85%, transparent 100%)',
          zIndex: 1
        }} />

        {/* Breathing Glow Island */}
        <div
          className="dynamic-island-glow"
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 10px) - 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '126px',
            height: '37px',
            borderRadius: '24px',
            background: '#0a0515',
            boxShadow: `
              0 0 30px 8px ${currentTheme.glow1},
              0 0 50px 15px ${currentTheme.glow2},
              0 0 70px 25px ${currentTheme.glow3}
            `,
            animation: 'island-breathe 4s ease-in-out infinite',
            zIndex: 2
          }}
        />
      </div>

      {/* Global CSS for Dynamic Island */}
      <style>{`
        @keyframes island-breathe {
          0%, 100% {
            box-shadow:
              0 0 30px 8px ${currentTheme.glow1},
              0 0 50px 15px ${currentTheme.glow2},
              0 0 70px 25px ${currentTheme.glow3};
            transform: translateX(-50%) scale(1);
          }
          50% {
            box-shadow:
              0 0 40px 12px ${currentTheme.glow2},
              0 0 60px 20px ${currentTheme.glow1},
              0 0 90px 35px ${currentTheme.glow2};
            transform: translateX(-50%) scale(1.02);
          }
        }
      `}</style>
    </>
  );
};

export default DynamicIsland;
