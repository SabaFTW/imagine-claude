import React, { useState } from 'react';
import ZlatiKrog from './components/ZlatiKrog.jsx';
import OrionDashboard from './components/OrionDashboard.jsx';

function App() {
  const [activePortal, setActivePortal] = useState('zlati-krog');

  return (
    <div className="min-h-screen">
      {/* Portal Switcher - Mobile Optimized */}
      <div className="fixed top-4 right-4 z-50 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setActivePortal('zlati-krog')}
          className={`px-6 py-3 sm:px-4 sm:py-2 rounded-lg font-bold transition text-lg sm:text-base shadow-lg ${
            activePortal === 'zlati-krog'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 shadow-amber-500/50'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          🜂 Zlati Krog
        </button>
        <button
          onClick={() => setActivePortal('orion')}
          className={`px-6 py-3 sm:px-4 sm:py-2 rounded-lg font-bold transition text-lg sm:text-base shadow-lg ${
            activePortal === 'orion'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-500/50'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          🛰️ Orion
        </button>
      </div>

      {/* Portal Content */}
      {activePortal === 'zlati-krog' && <ZlatiKrog />}
      {activePortal === 'orion' && <OrionDashboard />}
    </div>
  );
}

export default App;
