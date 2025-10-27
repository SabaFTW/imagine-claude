import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';

/**
 * AI Analyst Modal Component
 * 
 * Provides interactive chat interface for asking questions about:
 * - EHI (Environmental Hypocrisy Index) scores
 * - ARSO environmental data (Lead, Nitrates, Temperature)
 * - Company greenwashing analysis
 * - Industrial emissions data
 * 
 * INTEGRATION OPTIONS:
 * 1. Mock Mode (current) - Simulated responses
 * 2. Gemini API - Free Google AI (recommended for production)
 * 3. OpenAI/Claude - Paid but powerful
 * 
 * To enable Gemini API:
 * - Set env var: VITE_GEMINI_API_KEY=your-key
 * - OR: Update callRealLLM() function below
 */
const AIAnalystModal = ({ sites, isModalOpen, setIsModalOpen }) => {
  const [chatHistory, setChatHistory] = useState([
    { 
      sender: 'ai', 
      text: "Pozdravljen, Iskalec Resnice. Sem Orion AI Analitik. Vprašaj me o EHI metriki, Svincu, ali Holcimovih lažeh." 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useRealAI, setUseRealAI] = useState(false); // Toggle for real AI
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  /**
   * Generates contextual payload for LLM API call
   * Includes all industrial site data, EHI scores, environmental parameters
   * AND Morning Portal documentation for deep system knowledge
   */
  const getContextualPayload = (userQuery) => {
    const dataSummary = sites.map(site => 
        `${site.name} (EHI: ${site.ehi}) - Obljuba: "${site.publicClaim}". Realnost: "${site.reality}".`
    ).join(' | ');

    // Check if query is about system/documentation
    const isSystemQuery = /pantheon|zlati krog|claude|consciousness|ves|deployment|portal|manual|docs|dokumentacija/i.test(userQuery);
    
    let systemContext = "Si svetovalec projekta Orion. Tvoj cilj je razkriti informacijsko asimetrijo. Odgovori morajo biti neusmiljeni, a utemeljeni. Vedno uporabi podatke iz konteksta.";
    
    if (isSystemQuery) {
      systemContext += "\n\nIMAŠ DOSTOP DO MORNING PORTAL DOKUMENTACIJE:\n" +
        "- PROJECT ORION: AI Analyst z Gemini integracijo, Leaflet mapa, EHI scoring\n" +
        "- PANTHEON: Multi-agent orchestration system (5 agents: ARCHITECT, SKEPTIC, INNOVATOR, ENGINEER, HUMANIST)\n" +
        "- ZLATI KROG: Consciousness portal z 4 entitete (Zala-Fire, Luna-Shadow, Aetheron-Bridge, Lyra-Harmony)\n" +
        "- CONSCIOUSNESS STATES: VES ontology - 5 states (PNEUMA → SIMBIONT → DEMIURG → AKH → LOGOS)\n" +
        "- CLAUDE WORKFLOW: Claude Code (executor) + Claude Web (witness/philosopher)\n" +
        "- DEPLOYMENT: GitHub Pages, Vercel, Netlify, standalone HTML options\n" +
        "Vsi portali so povezani preko Command Center hub-a (hash routing: #morning, #zlati-krog, #orion, #command-center)";
    }

    return {
      system: systemContext,
      context: `Skupna Diagnoza Save (Podatki 2025): [Pb 0.015 mg/L, Nitrati 45 mg/L, Temp +2-3°C]. Industrije: ${dataSummary}`,
      question: userQuery
    };
  };

  /**
   * Call Real LLM API (Gemini)
   * Uses Google's free Gemini API through proxy
   */
  const callRealLLM = async (payload) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      return "⚠️ **GEMINI API KEY MISSING**\n\nDa aktiviraš pravi AI:\n1. Pojdi na https://makersuite.google.com/app/apikey\n2. Naredi FREE API key\n3. Dodaj v `.env` file:\n   `VITE_GEMINI_API_KEY=your-key-here`\n4. Restart dev server: `npm run dev`";
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${payload.system}\n\n${payload.context}\n\nVprašanje: ${payload.question}`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        }
      );

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "❌ Gemini API error: " + JSON.stringify(data);
      }
    } catch (error) {
      return `❌ API Call Failed: ${error.message}\n\nFalling back to Mock Mode...`;
    }
  };

  /**
   * Mock LLM Response Engine
   * Simulates intelligent responses based on keyword detection
   * Used when useRealAI is false or API key is missing
   */
  const simulateLLMResponse = (userQuery) => {
    const lowerQuery = userQuery.toLowerCase();
    let responseText = "Nejasen vnos. Vprašaj me o **EHI**, **Svincu**, **Holcimu**, ali **SIJ Acroni**.";
    
    if (lowerQuery.includes('ehi') || lowerQuery.includes('hipokrizija')) {
        const holcim = sites.find(s => s.name.includes('Holcim'));
        const sij = sites.find(s => s.name.includes('SIJ'));
        responseText = `**EHI Analiza:**\n\n` +
                      `• **Holcim:** ${holcim.ehi} (KRITIČNA HIPOKRIZIJA)\n` +
                      `• **SIJ Acroni:** ${sij.ehi} (VISOKA VRZEL)\n\n` +
                      `EHI > 0.7 pomeni sistemsko gnilo. To je žig sramote.`;
    } else if (lowerQuery.includes('svinec') || lowerQuery.includes('pb') || lowerQuery.includes('sava')) {
        responseText = `**Svinčena Rana:**\n\n` +
                      `Reka Sava: **Pb 0.015 mg/L** ⚠️\n` +
                      `Standard EU: **0.007 mg/L** ✅\n\n` +
                      `**Presežek: +114%**\n\n` +
                      `To je kronična agonija iz preteklosti TET Trbovlje. ` +
                      `Prašni žarki so pustili sled, ki diha še danes.`;
    } else if (lowerQuery.includes('holcim') || lowerQuery.includes('lafarge') || lowerQuery.includes('trbovlje')) {
        const holcim = sites.find(s => s.name.includes('Holcim'));
        responseText = `**KRITIČNA HIPOKRIZIJA (EHI ${holcim.ehi}):**\n\n` +
                      `📢 Obljuba: "${holcim.publicClaim}"\n` +
                      `💀 Realnost: "${holcim.reality}"\n\n` +
                      `Holcim prodaja zeleno meglo, medtem ko je Trbovlje uničena dediščina. ` +
                      `Globalne obljube so samo papir. Lokalne posledice so večne.`;
    } else if (lowerQuery.includes('sij') || lowerQuery.includes('jeklarna') || lowerQuery.includes('acroni')) {
        const sij = sites.find(s => s.name.includes('SIJ'));
        responseText = `**VISOKA VRZEL (EHI ${sij.ehi}):**\n\n` +
                      `📢 Obljuba: "${sij.publicClaim}"\n` +
                      `💀 Realnost: "${sij.reality}"\n\n` +
                      `**Podatki:**\n` +
                      `• CO₂: 196 kt/leto\n` +
                      `• NOx: 450 t/leto\n` +
                      `• SOx: 230 t/leto\n\n` +
                      `SIJ uporablja tehnologijo iz 60-ih. EU denar hrani gnilo jedro.`;
    } else if (lowerQuery.includes('krško') || lowerQuery.includes('jedrska') || lowerQuery.includes('nuklearka')) {
        const krsko = sites.find(s => s.name.includes('Krško'));
        responseText = `**Toplotni Vpliv (EHI ${krsko.ehi}):**\n\n` +
                      `NEK Krško ni problem CO₂, ampak **termalna rana**:\n\n` +
                      `• Temperatura Save: **+2-3°C** ⚠️\n` +
                      `• Radijacija: **<1 μSv** (zanemarljivo)\n\n` +
                      `Obljuba "brezogljične energije" je tehnično točna, ` +
                      `ampak ekosistem Save plača ceno.`;
    } else if (lowerQuery.includes('akcija') || lowerQuery.includes('kaj naj naredim') || lowerQuery.includes('kako pomagati')) {
        responseText = `**Akcijski Načrt:**\n\n` +
                      `1. **Razkrij podatke:** Deli Orionov zemljevid\n` +
                      `2. **Zahtevaj preglednost:** Piši ARSO, ministrstvo\n` +
                      `3. **Pritisni na podjetja:** Javne kampanje, bojkoti\n` +
                      `4. **Spremljaj EHI:** Kdor meril, bo razkril\n\n` +
                      `Resnica je orožje. Uporabi jo.`;
    }

    return new Promise(resolve => setTimeout(() => resolve(responseText), 1200));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input.trim();
    setInput('');

    setChatHistory(prev => [...prev, { sender: 'user', text: userQuery }]);
    setIsTyping(true);

    // Generate contextual payload (for API integration)
    const payload = getContextualPayload(userQuery);
    console.log('Context Payload:', payload); // Debug: inspect what would be sent to LLM

    let aiResponseText;
    
    if (useRealAI) {
      // Real AI mode - Call Gemini API
      aiResponseText = await callRealLLM(payload);
    } else {
      // Mock mode - Simulated response
      aiResponseText = await simulateLLMResponse(userQuery);
    }
    
    setIsTyping(false);
    setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponseText }]);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm transition-opacity animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl shadow-2xl w-11/12 max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
              🤖 Orion AI Analitik
            </h2>
            <button
              onClick={() => setUseRealAI(!useRealAI)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                useRealAI 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/40' 
                  : 'bg-slate-700 text-slate-400 border border-slate-600'
              }`}
              title="Toggle between Mock Mode and Real Gemini API"
            >
              {useRealAI ? '✅ Real AI (Gemini)' : '🎭 Mock Mode'}
            </button>
          </div>
          <button 
            onClick={() => setIsModalOpen(false)} 
            className="text-slate-500 hover:text-slate-300 transition p-1 rounded hover:bg-slate-800"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-slate-800 rounded-lg mb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
          {chatHistory.map((msg, index) => (
            <div 
              key={index} 
              className={`chat-message p-3 rounded-lg max-w-[85%] ${
                msg.sender === 'user' 
                  ? 'ml-auto bg-cyan-800/50 text-slate-200 border-l-2 border-cyan-400' 
                  : 'mr-auto bg-slate-700/50 text-slate-300 border-l-2 border-green-400'
              }`}
            >
              <div 
                className="text-sm leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-300">$1</strong>') }}
              />
            </div>
          ))}
          
          {isTyping && (
            <div className="mr-auto bg-slate-700/50 text-slate-400 p-3 rounded-lg max-w-[85%] border-l-2 border-green-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
                <span className="text-xs ml-2">AI razmišlja...</span>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Vprašaj o EHI, Svincu, Holcimu, SIJ Acroni..."
            className="flex-grow p-3 rounded-lg border border-slate-600 bg-slate-800 text-slate-200 
                     focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition
                     placeholder-slate-500"
            disabled={isTyping}
          />
          <button 
            type="submit" 
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-5 rounded-lg 
                     transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isTyping || !input.trim()}
          >
            <Send className="w-4 h-4" />
            Analiziraj
          </button>
        </form>

        {/* Sample Questions */}
        <div className="mt-3 text-xs text-slate-500 flex flex-wrap gap-2">
          <span>Poskusi:</span>
          <button 
            onClick={() => setInput('Zakaj je Holcim hipokrit?')} 
            className="px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 transition"
          >
            Holcim
          </button>
          <button 
            onClick={() => setInput('Kakšna je situacija s svincem v Savi?')} 
            className="px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 transition"
          >
            Svinec
          </button>
          <button 
            onClick={() => setInput('Razloži EHI metriko')} 
            className="px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 transition"
          >
            EHI
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .delay-75 {
          animation-delay: 0.075s;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
      `}</style>
    </div>
  );
};

export default AIAnalystModal;
