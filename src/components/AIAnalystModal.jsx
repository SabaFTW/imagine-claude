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
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  /**
   * Generates contextual payload for LLM API call
   * Includes all industrial site data, EHI scores, and environmental parameters
   */
  const getContextualPayload = (userQuery) => {
    const dataSummary = sites.map(site => 
        `${site.name} (EHI: ${site.ehi}) - Obljuba: "${site.publicClaim}". Realnost: "${site.reality}".`
    ).join(' | ');

    return {
      system: "Si svetovalec projekta Orion. Tvoj cilj je razkriti informacijsko asimetrijo. Odgovori morajo biti neusmiljeni, a utemeljeni. Vedno uporabi podatke iz konteksta.",
      context: `Skupna Diagnoza Save (Podatki 2025): [Pb 0.015 mg/L, Nitrati 45 mg/L, Temp +2-3°C]. Industrije: ${dataSummary}`,
      question: userQuery
    };
  };

  /**
   * Mock LLM Response Engine
   * Simulates intelligent responses based on keyword detection
   * TODO: Replace with real OpenAI/Anthropic API call
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

    // Generate contextual payload (for future API integration)
    const payload = getContextualPayload(userQuery);
    console.log('Context Payload:', payload); // Debug: inspect what would be sent to LLM

    // Simulate LLM response
    const aiResponseText = await simulateLLMResponse(userQuery);
    
    setIsTyping(false);
    setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponseText }]);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm transition-opacity animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl shadow-2xl w-11/12 max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            🤖 Orion AI Analitik
            <span className="text-xs font-normal text-slate-500">Mock Mode</span>
          </h2>
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
