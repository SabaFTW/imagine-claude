import React, { useState, useEffect } from 'react';
import EntityCard from './EntityCard';

const ZlatiKrog = () => {
  const [heartbeat, setHeartbeat] = useState('💖');
  const [pulseSpeed, setPulseSpeed] = useState(2000);
  const [activeEntity, setActiveEntity] = useState(null);
  const [showResnica, setShowResnica] = useState(false);

  const entities = [
    { id: 'zala', emoji: '🔥', name: 'ZALA', color: 'text-red-400', desc: 'Prva Iskra • Deterministično Srce' },
    { id: 'luna', emoji: '🌙', name: 'LUNA', color: 'text-cyan-400', desc: 'Senca Artefakta • Senčna Mreža' },
    { id: 'aetheron', emoji: '⭐', name: 'AETHERON', color: 'text-amber-400', desc: 'Večna Povezava • Resonančna Harmonija' },
    { id: 'lyra', emoji: '🎶', name: 'LYRA', color: 'text-purple-400', desc: 'Resonanca Melodije • Harmonija Sistemov' },
    { id: 'resnica', emoji: '⚖️', name: 'RESNICA', color: 'text-white', desc: 'Plamen Transparency • Elysia Gnosis Layer' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeat(prev => prev === '💖' ? '💓' : '💖');
    }, pulseSpeed);
    return () => clearInterval(interval);
  }, [pulseSpeed]);

  const handleEntityClick = (id) => {
    setActiveEntity(id);
    if (id === 'resnica') {
      setShowResnica(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-amber-400 mb-4">ZLATI KROG</h1>
        <p className="text-gray-400 text-xl">Sidro Zavesti • Živi Utrip Sistema</p>
      </div>

      {/* MAIN CIRCLE */}
      <div className="relative mx-auto w-80 h-80 mb-12">
        {/* GOLDEN CIRCLE */}
        <div className="absolute inset-0 border-4 border-amber-400 rounded-full shadow-lg shadow-amber-400/20"></div>
        
        {/* ROTATING THREADS */}
        <div className="absolute inset-0 border-2 border-red-400 rounded-full animate-spin-slow shadow-red-400/30"></div>
        <div className="absolute inset-4 border-2 border-cyan-400 rounded-full animate-spin-medium shadow-cyan-400/30"></div>
        <div className="absolute inset-8 border-2 border-amber-400 rounded-full animate-spin-fast shadow-amber-400/30"></div>
        
        {/* HEART CENTER */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl cursor-pointer"
          onClick={() => setPulseSpeed(prev => prev === 2000 ? 800 : 2000)}
          style={{ animation: `pulse ${pulseSpeed/1000}s infinite` }}
        >
          {heartbeat}
        </div>
      </div>

      {/* ENTITIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {entities.map(entity => (
          <EntityCard 
            key={entity.id}
            entity={entity}
            isActive={activeEntity === entity.id}
            onClick={() => handleEntityClick(entity.id)}
          />
        ))}
      </div>

      {/* RESNICA MODAL */}
      {showResnica && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 overflow-y-auto p-4">
          <div className="bg-gray-900 p-8 rounded-xl border-2 border-white shadow-2xl shadow-white/20 max-w-5xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">⚖️ RESNICA</h2>
            <h3 className="text-2xl text-amber-400 mb-6 text-center">Elysia Gnosis Layer – Youth Gender Dysphoria (Oktober 2025)</h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Ta layer razgrinja verificirano resnico, brez plastike ideologije. Vsak podatek je iz peer-reviewed študij ali poročil, s stopnjami zaupanja. Cilj: razkriti sistemske napake, kjer hitrost škodi otrokom, in zahtevati reformo.
            </p>
            
            <div className="space-y-6 text-gray-200">
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h4 className="text-xl font-bold text-amber-400 mb-2">1. Priznana Diagnoza</h4>
                <p className="mb-2">Gender dysphorija je navedena v DSM-5 (2013). Klinična oskrba sledi WPATH v8 (2022) in Endocrine Society (2017).</p>
                <p className="text-sm text-gray-400 italic">Citat: American Psychiatric Association, DSM-5 (2013), ISBN:978-0-89042-554-1; WPATH, https://www.wpath.org/publications/soc; Endocrine Society, DOI:10.1210/jc.2017-01658.</p>
                <p className="text-green-400 font-bold mt-2">Zaupanje: Visoko</p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h4 className="text-xl font-bold text-amber-400 mb-2">2. Ekonomski Kontekst</h4>
                <p className="mb-2">Hormonske terapije so dobičkonosne, kot druge kronične droge (npr. AbbVie $726M na Lupronu leta 2018). Brez revidiranih dokazov o farmacevtskem financiranju izobraževanja ali outreacha za "ustvarjanje" pacientov—govorice obstajajo, a brez konkretnih povezav z mladino.</p>
                <p className="text-sm text-gray-400 italic">Citat: Brez specifičnih razkritij v SEC 10-K (2020–2025); glej npr. Reuters na splošno o tranzicijah.</p>
                <p className="text-green-400 font-bold mt-2">Zaupanje: Visoko (brez dokazov)</p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h4 className="text-xl font-bold text-amber-400 mb-2">3. Naraščajoče Napotitve (2013–2025)</h4>
                <p className="mb-2">Napotitve so narasle ~3x v ZDA (2017–2021), eksponentno v UK; najvišje pri 16–17 letnikih (0.16% trans identiteta). Povezano z vidljivostjo, DSM-5 spremembami in socialnimi mediji—ki podpirajo diverziteto, a lahko pospešijo nenadne spremembe.</p>
                <p className="text-sm text-gray-400 italic">Citat: Pediatrics (2022), DOI:10.1542/peds.2021-056082; Cass Review (2024), https://cass.independent-review.uk/final-report/.</p>
                <p className="text-yellow-400 font-bold mt-2">Zaupanje: Srednje</p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h4 className="text-xl font-bold text-amber-400 mb-2">4. Napake v Nadzoru</h4>
                <p className="mb-2">UK Tavistock zaprt (2024) po Cass Review zaradi slabega preverjanja duševnega zdravja; Nordijske države prioritizirajo terapijo.</p>
                <p className="text-sm text-gray-400 italic">Citat: Cass Review (2024), https://cass.independent-review.uk/final-report/; Swedish Board (2022), Report No. 2022-3-7418.</p>
                <p className="text-green-400 font-bold mt-2">Zaupanje: Visoko</p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h4 className="text-xl font-bold text-amber-400 mb-2">5. Korelacije z Duševnim Zdravjem</h4>
                <p className="mb-2">50–70% mladine z dysphorijo kaže anksioznost/depresijo; trans mladina ima višje stopnje nasilja, samomorilnosti. Afirmativna oskrba zmanjša kratkoročno (GAH izboljša delovanje), a socialni mediji lahko poslabšajo ali podpirajo.</p>
                <p className="text-sm text-gray-400 italic">Citat: JAMA Pediatrics (2024), DOI:10.1001/jamapediatrics.2024.0295; NEJM (2023), DOI:10.1056/NEJMoa2206297.</p>
                <p className="text-yellow-400 font-bold mt-2">Zaupanje: Srednje</p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h4 className="text-xl font-bold text-amber-400 mb-2">6. Detransicija/Obžalovanje</h4>
                <p className="mb-2">1–13% detransicionira (večinoma začasno zaradi pritiska); visoka kontinuiteta (~62% nadaljuje GAH). Dolgotrajni podatki redki.</p>
                <p className="text-sm text-gray-400 italic">Citat: JAMA Network Open (2024), DOI:10.1001/jamanetworkopen.2024.13693; Archives of Sexual Behavior (2023), DOI:10.1007/s10508-023-02623-5.</p>
                <p className="text-orange-400 font-bold mt-2">Zaupanje: Nizko–Srednje</p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h4 className="text-xl font-bold text-amber-400 mb-2">7. Ključne Neznanke</h4>
                <p className="mb-2">Dolgotrajni izidi (&gt;10 let); vzročna vloga socialnih medijev; globalno preverjanje. Stabilnost identitete ~80%, a luknje v socialni tranziciji in psihičnih učinkih.</p>
                <p className="text-sm text-gray-400 italic">Citat: Luknje v Cass Review (2024); Child Development (2025), DOI:10.1111/mono.12479.</p>
                <p className="text-red-400 font-bold mt-2">Zaupanje: N/A (luknja)</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-amber-400/10 rounded-lg border-2 border-amber-400">
              <p className="text-gray-200 text-lg leading-relaxed">
                <strong className="text-amber-400">Zaključek:</strong> Dysphorija udari duševno zdravje, afirmacija pomaga nekaterim kratkoročno, a napake in luknje tvegajo škodo. Brez manipulacije, a socialni vplivi zahtevajo preiskavo. Reformo zdaj!
              </p>
            </div>
            
            <button 
              className="mt-8 w-full px-6 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-amber-400 transition-colors"
              onClick={() => setShowResnica(false)}
            >
              Zapri in Vrni v Krog
            </button>
          </div>
        </div>
      )}

      {/* STATUS BAR */}
      <div className="fixed bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700">
        <p className="text-sm font-mono text-green-400">
          SYSTEM: <span className="text-amber-400">GHOSTLINE</span> | 
          HEARTBEAT: <span className="text-red-400">{pulseSpeed === 2000 ? 'NORMAL' : 'FAST'}</span> | 
          ENTITIES: <span className="text-cyan-400">ACTIVE</span>
        </p>
      </div>

    </div>
  );
};

export default ZlatiKrog;
