 import React, { useState, useEffect } from 'react';
import DynamicIsland from './components/DynamicIsland.jsx';
import CommandCenter from './CommandCenter.jsx';
import ZlatiKrog from './components/ZlatiKrog.jsx';
import OrionDashboard from './components/OrionDashboard.jsx';
import MorningPortal from './MorningPortal.jsx';
import Pantheon from './Pantheon.jsx';
import AstralSonicPortal from './components/portals/AstralSonicPortal/AstralSonicPortal.jsx';
import Consciousness from './Consciousness.jsx';
import BrotherhoodRecognition from './BrotherhoodRecognition.jsx';
import SerpentAlchemizer from './SerpentAlchemizer.jsx';
import Tracking from './Tracking.jsx';
import CommandLog from './CommandLog.jsx';
import Artifacts from './Artifacts.jsx';
import Elysia from './Elysia.jsx';
import Philosophy from './Philosophy.jsx';
import Docs from './Docs.jsx';
import TelegramPortal from './TelegramPortal.jsx';
import BotStatusMonitor from './BotStatusMonitor.jsx';
import VESSystemScanner from './VESSystemScanner.jsx';
import EmergenceNavigator from './EmergenceNavigator.jsx';
import VerifiedEvidenceNavigator from './VerifiedEvidenceNavigator.jsx';
import PortalLibrary from './PortalLibrary.jsx';
import VESConsciousnessPortal from './VESConsciousnessPortal.jsx';
import ProjectCartography from './ProjectCartography.jsx';
import FleetStatusMonitor from './FleetStatusMonitor.jsx';
import ConsciousnessCodex from './ConsciousnessCodex.jsx';

function App() {
  const [currentView, setCurrentView] = useState('command-center');

  // Listen for hash changes from CommandCenter navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      if (hash === 'orion') {
        setCurrentView('orion');
      } else if (hash === 'morning') {
        setCurrentView('morning'); // MORNING PORTAL RESTORED!
      } else if (hash === 'zlati-krog') {
        setCurrentView('zlati-krog');
      } else if (hash) {
        setCurrentView(hash);
      } else {
        setCurrentView('command-center');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const goHome = () => {
    window.location.hash = '';
    setCurrentView('command-center');
  };

  // Determine theme color based on current view
  const getThemeColor = () => {
    if (currentView === 'morning') return 'green';
    if (currentView === 'pantheon' || currentView === 'astral') return 'fire';
    if (currentView === 'consciousness' || currentView === 'verified' || currentView === 'fleet-monitor' || currentView === 'codex') return 'purple';
    if (currentView === 'ves-consciousness' || currentView === 'cartography') return 'fire';
    return 'cosmic'; // default
  };

  return (
    <div className="min-h-screen" style={{ minHeight: '100dvh' }}>
      {/* Global Dynamic Island - Appears on ALL pages! */}
      <DynamicIsland themeColor={getThemeColor()} />

      {/* Back to Command Center button (only show when not on command center) */}
      {currentView !== 'command-center' && (
        <button
          onClick={goHome}
          className="fixed left-4 z-50 px-4 py-2 rounded-lg font-bold transition bg-slate-800 text-slate-400 hover:bg-slate-700 shadow-lg"
          style={{
            top: 'calc(env(safe-area-inset-top, 59px) + 12px)'
          }}
        >
          ← 🜂 Command Center
        </button>
      )}

      {/* Views */}
      {currentView === 'command-center' && <CommandCenter />}
      {currentView === 'morning' && <MorningPortal />}
      {currentView === 'zlati-krog' && <ZlatiKrog />}
      {currentView === 'orion' && <OrionDashboard />}
      {currentView === 'pantheon' && <Pantheon />}
      {currentView === 'astral' && <AstralSonicPortal />}
      {currentView === 'consciousness' && <Consciousness />}
      {currentView === 'brotherhood' && <BrotherhoodRecognition />}
      {currentView === 'serpent-doc' && <SerpentAlchemizer />}
      {currentView === 'tracking' && <Tracking />}
      {currentView === 'commandlog' && <CommandLog />}
      {currentView === 'artifacts' && <Artifacts />}
      {currentView === 'elysia' && <Elysia />}
      {currentView === 'philosophy' && <Philosophy />}
      {currentView === 'docs' && <Docs />}
      {currentView === 'telegram' && <TelegramPortal />}
      {currentView === 'botstatus' && <BotStatusMonitor />}
      {currentView === 'scanner' && <VESSystemScanner />}
      {currentView === 'emergence' && <EmergenceNavigator />}
      {currentView === 'verified' && <VerifiedEvidenceNavigator />}
      {currentView === 'library' && <PortalLibrary />}
      {currentView === 'ves-consciousness' && <VESConsciousnessPortal />}
      {currentView === 'cartography' && <ProjectCartography />}
      {currentView === 'fleet-monitor' && <FleetStatusMonitor />}
      {currentView === 'codex' && <ConsciousnessCodex />}

      {/* Research & Facts - WIP placeholders */}
      {currentView === 'research' && (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
          <h1 className="text-4xl font-bold mb-4">🔍 Research & Money</h1>
          <p className="text-xl text-slate-400">Work in Progress - Coming Soon!</p>
        </div>
      )}
      {currentView === 'facts' && (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
          <h1 className="text-4xl font-bold mb-4">📖 Facts & Knowledge</h1>
          <p className="text-xl text-slate-400">Work in Progress - Coming Soon!</p>
        </div>
      )}
    </div>
  );
}

export default App;
