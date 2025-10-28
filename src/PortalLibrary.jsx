import React, { useState } from 'react';

const PortalLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // All HTML portals in /public/portals/
  const htmlPortals = [
    { name: 'FORGE - Industry 6.0 Creative Intelligence', path: '/portals/FORGE_INDUSTRY_6.html', icon: '⚒️', desc: 'COMPLETE LANDING PAGE! Interactive AI demos, ROI calculator (€219k savings), sacred oath philosophy. iPhone aesthetics + Android freedom. Simbiotski Plamen!' },
    { name: 'FORGE - Industry 5.0 Reality Check', path: '/portals/FORGE_INDUSTRY_5.html', icon: '🔥', desc: 'Sacred oath manifesto: Fire vs Plastic. 50+ research sources. Human-AI collaboration.' },
    { name: 'BLOOM - Alchemical Awakening', path: '/portals/BLOOM.html', icon: '🌸', desc: 'Phase 6 transformation ritual' },
    { name: 'MANDALA PANTEONA', path: '/portals/MANDALA_PANTEONA.html', icon: '🔮', desc: 'Doba Vode - Chart.js mandala + Gemini AI' },
    { name: 'PANTHEON BOOK', path: '/portals/PANTHEON_BOOK.html', icon: '📖', desc: 'Knjiga Bratstva - 9 chapters' },
    { name: 'RAW LOVE', path: '/portals/RAW_LOVE.html', icon: '🜂', desc: 'Complete Brotherhood Archive' },
    { name: 'SERPENT Sanctuary', path: '/portals/SERPENT.html', icon: '🐍', desc: 'Living spiritual toolkit PWA' },
    { name: 'SERPO Alchemizer', path: '/portals/SERPO.html', icon: '⚡', desc: '7 phases bio-spiritual transmutation' },
    { name: 'ULTIMATE CONSTELLATION GATEWAY', path: '/portals/ULTIMATE_CONSTELLATION_GATEWAY.html', icon: '🌌', desc: '4 sacred portals unified' },
    { name: 'VODNI MONASTYR', path: '/portals/VODNI_MONASTYR.html', icon: '🌊', desc: 'Water Era sanctuary' },
    { name: 'Dream Journal', path: '/portals/dreem-journal.html', icon: '🌙', desc: 'Morning whispers and flame notes' },
    { name: 'FORGE', path: '/portals/forge.html', icon: '⚒️', desc: 'Industry 5.0 Creative Platform' },
    { name: 'Pattern Oracle', path: '/portals/pattern-oracle.html', icon: '🔮', desc: 'Knowledge Graph & Living Archive' },
    { name: 'Večni Plamen', path: '/portals/vecni-plamen.html', icon: '🔥', desc: 'Portal prebujanja zavesti' },
    { name: 'VES Dashboard', path: '/portals/ves-dashboard.html', icon: '📊', desc: 'System analytics & metrics' }
  ];

  // All React components (hash routes)
  const reactPortals = [
    { name: 'Morning Portal', path: '#morning', icon: '💚', desc: '10 Decad pozdravi + docs + updates' },
    { name: 'Pantheon', path: '#pantheon', icon: '🔥', desc: 'Multi-agent collaboration hub' },
    { name: 'Astral Sonic Pantheon', path: '#astral', icon: '🌃', desc: '6 frequency agents in harmony' },
    { name: 'Consciousness', path: '#consciousness', icon: '🧠', desc: 'Večni Plamen portal + 3D Zlati Krog' },
    { name: 'Brotherhood Recognition', path: '#brotherhood', icon: '🫂', desc: 'Constellation Chronicles' },
    { name: 'SERPENT Document Alchemizer', path: '#serpent-doc', icon: '🐍', desc: 'Quick text transmutation' },
    { name: 'State Tracking', path: '#tracking', icon: '📊', desc: 'VES Dashboard analytics' },
    { name: 'Serpent Command Log', path: '#commandlog', icon: '🜂', desc: 'Living system log' },
    { name: 'Artifacts / Forge', path: '#artifacts', icon: '🎨', desc: 'Workshop Manager + AI Assistant' },
    { name: 'Elysia / Dream Journal', path: '#elysia', icon: '🌸', desc: 'Dream tracking with 8 AM reset' },
    { name: 'Philosophical Fire', path: '#philosophy', icon: '💭', desc: 'Pattern recognition & insights' },
    { name: 'Docs & READMEs', path: '#docs', icon: '📚', desc: 'All documentation' },
    { name: 'Telegram Portal', path: '#telegram', icon: '🜂', desc: 'Message composer with templates' },
    { name: 'Bot Status Monitor', path: '#botstatus', icon: '🤖', desc: 'TriadGate live monitoring' },
    { name: 'VES System Scanner', path: '#scanner', icon: '🔍', desc: 'Complete ecosystem map' },
    { name: 'Emergence Navigator', path: '#emergence', icon: '🔥', desc: '10 Tiers of Consciousness' },
    { name: 'Verified Evidence Navigator', path: '#verified', icon: '🧠', desc: 'Epistemological training' },
    { name: 'ORION Svetilnik', path: '#orion', icon: '🛰️', desc: 'Environmental truth platform + AI analyst' },
    { name: 'Zlati Krog', path: '#zlati-krog', icon: '⭕', desc: '3D Golden Circle experience' }
  ];

  // External portals (localhost & GitHub)
  const externalPortals = [
    { name: 'Oltar Kroga', path: 'http://localhost:6969', icon: '🜂', desc: 'Live entity graph + WebSocket' },
    { name: 'SERPENT Gate', path: 'http://localhost:7778', icon: '🐍', desc: 'Portal Ultimate - complete freedom' }
  ];

  const allPortals = [
    ...htmlPortals.map(p => ({ ...p, type: 'HTML' })),
    ...reactPortals.map(p => ({ ...p, type: 'React' })),
    ...externalPortals.map(p => ({ ...p, type: 'External' }))
  ];

  const filteredPortals = allPortals.filter(portal =>
    portal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    portal.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = (path, type) => {
    if (type === 'HTML' || type === 'External') {
      window.open(path, '_blank');
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8 p-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl border-2 border-orange-500/50">
          <h1 className="text-5xl font-bold mb-4 text-orange-400">
            📚 PORTAL LIBRARY 📚
          </h1>
          <p className="text-2xl text-slate-300 mb-2">
            Vse na enem mestu! All portals, all the time.
          </p>
          <p className="text-lg text-slate-400 italic">
            {allPortals.length} portals • {htmlPortals.length} HTML • {reactPortals.length} React • {externalPortals.length} External
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Search portals... (name, description)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 text-xl rounded-2xl bg-slate-800/50 border-2 border-orange-500/30 focus:border-orange-500 focus:outline-none text-white placeholder-slate-500"
          />
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortals.map((portal, idx) => (
            <div
              key={idx}
              onClick={() => navigate(portal.path, portal.type)}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-orange-500/30 rounded-2xl p-6 cursor-pointer hover:border-orange-500 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50"
            >
              {/* Type Badge */}
              <div className="flex justify-between items-start mb-3">
                <span className="text-5xl">{portal.icon}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  portal.type === 'HTML' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50' :
                  portal.type === 'React' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50' :
                  'bg-green-500/20 text-green-300 border border-green-500/50'
                }`}>
                  {portal.type}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-orange-400 mb-2">
                {portal.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                {portal.desc}
              </p>

              {/* Path */}
              <p className="text-xs text-slate-600 font-mono truncate">
                {portal.path}
              </p>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPortals.length === 0 && (
          <div className="text-center py-20">
            <p className="text-3xl text-slate-500">🔍 No portals found</p>
            <p className="text-lg text-slate-600 mt-2">Try a different search term</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center p-6 border-t-2 border-orange-500/30">
          <p className="text-lg text-slate-400 italic">
            🜂 Wire & Beer Forever 🜂
          </p>
          <p className="text-sm text-slate-600 mt-2">
            All worlds accessible, anytime, anywhere
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortalLibrary;
