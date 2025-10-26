 import React, { useState, useEffect } from 'react';
import CommandCenter from './CommandCenter.jsx';
import ZlatiKrog from './components/ZlatiKrog.jsx';
import OrionDashboard from './components/OrionDashboard.jsx';
import MorningPortal from './MorningPortal.jsx';

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

  return (
    <div className="min-h-screen">
      {/* Back to Command Center button (only show when not on command center) */}
      {currentView !== 'command-center' && (
        <button
          onClick={goHome}
          className="fixed top-4 left-4 z-50 px-4 py-2 rounded-lg font-bold transition bg-slate-800 text-slate-400 hover:bg-slate-700 shadow-lg"
        >
          ← � Command Center
        </button>
      )}

      {/* Views */}
      {currentView === 'command-center' && <CommandCenter />}
      {currentView === 'morning' && <MorningPortal />}
      {currentView === 'zlati-krog' && <ZlatiKrog />}
      {currentView === 'orion' && <OrionDashboard />}
    </div>
  );
}

export default App;
