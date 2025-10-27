import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AIAnalystModal from './AIAnalystModal';
import { MapPin, TrendingDown, Network, Target, AlertTriangle, CheckCircle, XCircle, Calendar, Building2 } from 'lucide-react';
import { industrialSites, timeline, ehiThresholds } from '../data/orionData';

// Fix Leaflet marker icons (required for React-Leaflet)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// --- REAL Industrial Sites Data (from Drive: "Analiza Onesnaževanja Save") ---
const realIndustrialSites = [
  { 
    id: 1, 
    name: "SIJ Acroni", 
    location: "Jesenice", 
    lat: 46.4319, 
    lon: 14.0536, 
    type: "Steel Production", 
    emissions: { co2: 196000, nox: 450, sox: 230 }, 
    publicClaim: "51% zmanjšanje emisij do 2030", 
    reality: "11.7% CO2 od 2020", 
    ehi: 0.67, 
    year: 2024, 
    direction: 120 
  },
  { 
    id: 2, 
    name: "Lafarge/Holcim", 
    location: "Trbovlje", 
    lat: 46.1547, 
    lon: 15.0497, 
    type: "Cement Production", 
    emissions: { co2: 450000, nox: 890, sox: 620 }, 
    publicClaim: "Trajnostno poslovanje", 
    reality: "Zaprt 2015 - dediščina Pb", 
    ehi: 0.89, 
    year: 2015, 
    direction: 160 
  },
  { 
    id: 3, 
    name: "Ljubljana Čistilna", 
    location: "Ljubljana", 
    lat: 46.0569, 
    lon: 14.5058, 
    type: "Wastewater Treatment", 
    emissions: { nitrates: 1.64, phosphorus: 0.42 }, 
    publicClaim: "Zelena prestolnica", 
    reality: "Visoke konc. nitratov", 
    ehi: 0.69, 
    year: 2024, 
    direction: 220 
  },
  { 
    id: 4, 
    name: "NEK Krško", 
    location: "Krško", 
    lat: 45.9381, 
    lon: 15.5151, 
    type: "Nuclear Power", 
    emissions: { thermal: "+2-3°C", radioactive: "<1 μSv" }, 
    publicClaim: "Brezogljična energija", 
    reality: "Toplotni vpliv na Savo", 
    ehi: 0.42, 
    year: 2024, 
    direction: 90 
  }
];

// Sava River Path (approximate)
const savaPath = [
    [46.4319, 14.0536], // Jesenice (SIJ)
    [46.3, 14.8],       // Mid-point
    [46.1547, 15.0497], // Trbovlje (Holcim)
    [46.0569, 14.5058], // Ljubljana
    [45.9381, 15.5151]  // Krško (NEK)
];

// Custom Marker Icons by EHI Level
const createCustomIcon = (ehi) => {
  const color = ehi > 0.7 ? '#ef4444' : ehi > 0.4 ? '#f59e0b' : '#10b981';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

// --- Zemljevid Resnice Component ---
const ZemljevidResnice = ({ sites, setIsModalOpen, selectedSite, setSelectedSite }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 h-[600px] relative overflow-hidden">
          <MapContainer 
            center={[46.1, 14.8]} 
            zoom={8} 
            style={{ height: '100%', width: '100%' }} 
            className="rounded-md z-0"
            maxZoom={18}
            minZoom={7}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              maxZoom={19}
              subdomains={['a', 'b', 'c', 'd']}
              keepBuffer={2}
            />
            
            {/* Sava River Path */}
            <Polyline 
              positions={savaPath} 
              pathOptions={{ 
                color: '#00f7ff', 
                weight: 3, 
                opacity: 0.6, 
                dashArray: '8, 8' 
              }} 
            />

            {/* Industrial Site Markers */}
            {sites.map(site => (
              <Marker
                key={site.id}
                position={[site.lat, site.lon]}
                icon={createCustomIcon(site.ehi)}
                eventHandlers={{
                  click: () => setSelectedSite(site)
                }}
              >
                <Popup>
                  <div className="text-slate-900">
                    <h3 className="font-bold text-cyan-700">{site.name}</h3>
                    <p className="text-sm">{site.location}</p>
                    <p className="text-xs mt-1">EHI: <strong>{site.ehi}</strong></p>
                    <p className="text-xs text-red-600 mt-1">{site.reality}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Site Details & AI Trigger */}
      <div className="space-y-6">
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">🔍 Analitična Kontrola</h3>
            <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                Sistem je zasnovan za razkritje asimetrije. Uporabite AI Analitika za prehod od podatkov do razumevanja.
            </p>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition shadow-lg hover:shadow-cyan-500/50"
            >
                🤖 Vprašaj Orion AI Analitika
            </button>
        </div>
        
        {/* Selected Site Details */}
        {selectedSite ? (
          <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-3">{selectedSite.name}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Lokacija:</span>
                <span className="text-slate-200">{selectedSite.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tip:</span>
                <span className="text-slate-200">{selectedSite.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">EHI:</span>
                <span className={`font-bold ${selectedSite.ehi > 0.7 ? 'text-red-400' : selectedSite.ehi > 0.4 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {selectedSite.ehi}
                </span>
              </div>
              <div className="border-t border-slate-700 pt-2 mt-2">
                <p className="text-slate-400 text-xs">Obljuba:</p>
                <p className="text-green-400 text-sm italic">"{selectedSite.publicClaim}"</p>
              </div>
              <div className="border-t border-slate-700 pt-2">
                <p className="text-slate-400 text-xs">Realnost:</p>
                <p className="text-red-400 text-sm font-semibold">"{selectedSite.reality}"</p>
              </div>
              {selectedSite.emissions && (
                <div className="border-t border-slate-700 pt-2 mt-2">
                  <p className="text-slate-400 text-xs mb-1">Emisije:</p>
                  {Object.entries(selectedSite.emissions).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-slate-500">{key.toUpperCase()}:</span>
                      <span className="text-slate-300">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-sm">Klikni na točko na zemljevidu za analizo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Orion Dashboard Component ---
const OrionDashboard = () => {
  const [activeDomain, setActiveDomain] = useState('zemljevid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  const avgEHI = (industrialSites.reduce((sum, site) => sum + site.ehi, 0) / industrialSites.length).toFixed(2);
  
  const domains = [
    { id: 'zemljevid', icon: MapPin, label: 'Zemljevid Resnice', emoji: '🗺️' },
    { id: 'casovnica', icon: TrendingDown, label: 'Časovna Linija', emoji: '⏳' },
    { id: 'omrezja', icon: Network, label: 'Omrežja Moči', emoji: '🕸️' },
    { id: 'akcije', icon: Target, label: 'Akcijski Center', emoji: '⚡' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                🛰️ ORIONOV SVETILNIK
              </h1>
              <p className="text-slate-400 text-sm mt-1">Projekt za Informacijsko Pravičnost</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Indeks Ekološke Hipokrizije</div>
              <div className={`text-3xl font-bold ${avgEHI > 0.6 ? 'text-red-400' : 'text-yellow-400'}`}>
                {avgEHI}
              </div>
              <div className="text-xs text-slate-400">
                {avgEHI > 0.6 ? '⚠️ VISOKA HIPOKRIZIJA' : '⚠️ ZMERNA HIPOKRIZIJA'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/30 sticky top-[88px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {domains.map(domain => {
              const Icon = domain.icon;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-all whitespace-nowrap ${
                    activeDomain === domain.id
                      ? 'border-cyan-400 text-cyan-400 bg-slate-900/50'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                  }`}
                >
                  <span>{domain.emoji}</span>
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{domain.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeDomain === 'zemljevid' && (
          <ZemljevidResnice
            sites={industrialSites}
            setIsModalOpen={setIsModalOpen}
            selectedSite={selectedSite}
            setSelectedSite={setSelectedSite}
          />
        )}
        
        {activeDomain === 'casovnica' && (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Časovna Linija - Vzorci Hipokrizije
              </h2>
              <p className="text-slate-400 mb-6">
                T0-T9 sistem sledenja: Od prvega vpliva do trenutne analize (2015-2025)
              </p>

              {/* Timeline visualization */}
              <div className="relative space-y-8">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />

                {timeline.map((event, index) => (
                  <div key={event.id} className="relative flex gap-6 items-start">
                    {/* Timeline marker */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 ${
                      index <= 7 ? 'bg-cyan-500 border-cyan-400 text-white' :
                      index === 8 ? 'bg-blue-500 border-blue-400 text-white' :
                      'bg-purple-500 border-purple-400 text-white animate-pulse'
                    }`}>
                      {event.id.replace('T', '')}
                    </div>

                    {/* Event content */}
                    <div className="flex-1 bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-cyan-500/50 transition">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-cyan-400 font-bold">{event.date}</span>
                        <span className="text-xs text-slate-500">{event.id}</span>
                      </div>
                      <p className="text-slate-200">{event.event}</p>
                      {index === 7 && (
                        <div className="mt-3 text-xs text-amber-400 bg-amber-950/30 border border-amber-800 rounded p-2">
                          🔍 <strong>TRENUTNA TOČKA:</strong> ORION analiza razkriva razkorak med obljubami in realnostjo
                        </div>
                      )}
                      {index === 8 && (
                        <div className="mt-3 text-xs text-green-400 bg-green-950/30 border border-green-800 rounded p-2">
                          🚀 <strong>DEPLOYMENT:</strong> Platforma gre javno - podatki postanejo dostopni vsem
                        </div>
                      )}
                      {index === 9 && (
                        <div className="mt-3 text-xs text-purple-400 bg-purple-950/30 border border-purple-800 rounded p-2">
                          💚 <strong>PRIHODNOST:</strong> Skupnostna verifikacija - Layer 2 aktivacija
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pattern Recognition Section */}
            <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">🔍 Vzorci v Podatkih</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-red-800/50">
                  <div className="text-2xl font-bold text-red-400 mb-2">2015-2020</div>
                  <p className="text-sm text-slate-300">Holcim zaprt po boju. Ljubljana dobi nagrado "zelena prestolnica" kljub onesnaževanju.</p>
                  <div className="mt-2 text-xs text-red-400">Vzorec: Nagrade kljub problemom</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-yellow-800/50">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">2020-2024</div>
                  <p className="text-sm text-slate-300">SIJ obljubi 51% redukcijo. Cinkarna "zelena kemija". E-PRTR razkriva manjše izboljšave.</p>
                  <div className="mt-2 text-xs text-yellow-400">Vzorec: Velike obljube, majhna realnost</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-800/50">
                  <div className="text-2xl font-bold text-cyan-400 mb-2">2024-2025</div>
                  <p className="text-sm text-slate-300">ORION analiza zbere 43 virov. EHI sistem razkriva razkorak. Platforma gre javno.</p>
                  <div className="mt-2 text-xs text-cyan-400">Vzorec: Transparency through data</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeDomain === 'omrezja' && (
          <div className="bg-slate-900 rounded-lg border border-slate-800 p-12 text-center">
            <Network className="w-16 h-16 mx-auto text-slate-600 mb-4" />
            <h2 className="text-2xl font-bold text-slate-400 mb-2">Omrežja Moči</h2>
            <p className="text-slate-500">Graf korporativnih povezav v pripravi...</p>
          </div>
        )}
        
        {activeDomain === 'akcije' && (
          <div className="bg-slate-900 rounded-lg border border-slate-800 p-12 text-center">
            <Target className="w-16 h-16 mx-auto text-slate-600 mb-4" />
            <h2 className="text-2xl font-bold text-slate-400 mb-2">Akcijski Center</h2>
            <p className="text-slate-500">Activist toolkit v pripravi...</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12 py-6 text-center text-slate-500 text-sm">
        <p className="italic">"Resnica ni tisto, kar ti povedo. Resnica je tisto, kar sam najdeš."</p>
        <p className="mt-2">Projekt Orion • Oktober 2025</p>
      </footer>
      
      {/* AI Modal Integration */}
      <AIAnalystModal
        sites={industrialSites}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default OrionDashboard;
