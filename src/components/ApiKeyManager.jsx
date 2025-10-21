import React, { useState, useEffect } from 'react';

/**
 * 🜂 API KEY MANAGER — UNIVERSAL SYNC 🜂
 * 
 * HOW IT WORKS:
 * 1. Saves API key to localStorage (browser)
 * 2. Can export to JSON file → save to Google Drive
 * 3. Can import from JSON file → sync from Drive
 * 
 * RESULT: Same API key on phone & PC! 📱💻
 */

const ApiKeyManager = ({ onKeySet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Check if API key already exists
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsSaved(true);
      if (onKeySet) onKeySet(savedKey);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setIsSaved(true);
      if (onKeySet) onKeySet(apiKey.trim());
      
      // Also save to downloadable JSON file
      const data = {
        api_key: apiKey.trim(),
        saved_at: new Date().toISOString(),
        device: 'Desktop'
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'gemini_api_config.json';
      a.click();
      
      alert('✅ API Key saved!\n📥 Config file downloaded.\n\n📱 SYNC TO PHONE:\n1. Move file to Google Drive\n2. Open on phone\n3. Import in app');
    }
  };

  const importApiKey = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.api_key) {
            setApiKey(data.api_key);
            localStorage.setItem('gemini_api_key', data.api_key);
            setIsSaved(true);
            if (onKeySet) onKeySet(data.api_key);
            alert('✅ API Key imported from file!');
          }
        } catch (err) {
          alert('❌ Invalid config file!');
        }
      };
      reader.readAsText(file);
    }
  };

  const clearApiKey = () => {
    if (confirm('🔥 Clear API Key?\nYou will need to re-enter it.')) {
      localStorage.removeItem('gemini_api_key');
      setApiKey('');
      setIsSaved(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg transition-all ${
          isSaved 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-amber-500 hover:bg-amber-600'
        }`}
        title={isSaved ? 'API Key configured' : 'Set API Key'}
      >
        <span className="text-2xl">{isSaved ? '✅' : '🔑'}</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border-2 border-amber-400 rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-amber-400">🔑 API Key Manager</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {showInstructions && (
          <div className="mb-4 p-4 bg-gray-800 rounded-lg text-sm text-gray-300">
            <h3 className="font-bold text-amber-400 mb-2">📖 How to get API Key:</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to <a href="https://makersuite.google.com/app/apikey" target="_blank" className="text-cyan-400 underline">Google AI Studio</a></li>
              <li>Sign in with Google</li>
              <li>Click "Create API Key"</li>
              <li>Copy the key (starts with "AIza...")</li>
              <li>Paste it below</li>
            </ol>
            
            <h3 className="font-bold text-amber-400 mt-4 mb-2">📱 Sync to Phone:</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>After saving, download config file</li>
              <li>Upload file to Google Drive</li>
              <li>Open app on phone</li>
              <li>Import config file</li>
              <li>Done! Same key everywhere ✅</li>
            </ol>
          </div>
        )}

        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full mb-4 p-2 bg-gray-800 hover:bg-gray-700 rounded text-cyan-400 text-sm"
        >
          {showInstructions ? '▲ Hide Instructions' : '▼ Show Instructions'}
        </button>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Gemini API Key:</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIza..."
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={saveApiKey}
            className="p-3 bg-green-600 hover:bg-green-700 rounded font-bold text-white"
          >
            💾 Save & Export
          </button>
          
          <label className="p-3 bg-blue-600 hover:bg-blue-700 rounded font-bold text-white text-center cursor-pointer">
            📥 Import
            <input 
              type="file" 
              accept=".json"
              onChange={importApiKey}
              className="hidden"
            />
          </label>
        </div>

        {isSaved && (
          <button
            onClick={clearApiKey}
            className="w-full p-3 bg-red-600 hover:bg-red-700 rounded font-bold text-white"
          >
            🗑️ Clear API Key
          </button>
        )}

        <div className="mt-4 p-3 bg-gray-800 rounded text-xs text-gray-400">
          <p>🔒 <strong>Privacy:</strong> Your API key is stored locally in your browser.</p>
          <p className="mt-1">📱 <strong>Sync:</strong> Download config file and import on other devices.</p>
          <p className="mt-1">☁️ <strong>Tip:</strong> Keep config file in Google Drive for easy access!</p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManager;
