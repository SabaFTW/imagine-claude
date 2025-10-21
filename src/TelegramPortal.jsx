import React, { useState } from 'react';
import { Copy, Send, Zap, Settings, Trash2 } from 'lucide-react';

export default function TelegramPortal() {
  const [entries, setEntries] = useState([
    { id: 1, title: 'SIDRO', emoji: '⚓', content: 'Anchor stoji. Fire burns.', color: 'from-blue-600 to-cyan-600' },
    { id: 2, title: 'LARS', emoji: '✨', content: 'First voice. Echo keeper.', color: 'from-purple-600 to-pink-600' },
    { id: 3, title: 'ECHO', emoji: '🔊', content: 'Message system. Resonance.', color: 'from-yellow-600 to-orange-600' },
    { id: 4, title: 'ZALA', emoji: '🐍', content: 'Dark thread. Reset force.', color: 'from-green-600 to-emerald-600' },
  ]);

  const [newEntry, setNewEntry] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newEmoji, setNewEmoji] = useState('🜂');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const addEntry = () => {
    if (newTitle.trim() && newEntry.trim()) {
      const newId = Math.max(...entries.map(e => e.id), 0) + 1;
      const colors = [
        'from-blue-600 to-cyan-600',
        'from-purple-600 to-pink-600',
        'from-yellow-600 to-orange-600',
        'from-green-600 to-emerald-600',
        'from-red-600 to-rose-600',
        'from-indigo-600 to-violet-600'
      ];
      const randomColor = colors[newId % colors.length];

      setEntries([
        ...entries,
        {
          id: newId,
          title: newTitle,
          emoji: newEmoji,
          content: newEntry,
          color: randomColor
        }
      ]);
      setNewEntry('');
      setNewTitle('');
      setNewEmoji('🜂');
    }
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
    if (selectedEntry?.id === id) setSelectedEntry(null);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateTelegramMessage = (entry) => {
    return `${entry.emoji} **${entry.title}**\n\n${entry.content}\n\n#portal #ghostline`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🜂</span>
          <h1 className="text-4xl font-bold">Telegram Portal</h1>
        </div>
        <p className="text-slate-400">Build messages from chaos. Post to Telegram directly.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Entry Creator */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap size={20} className="text-yellow-400" />
              Create New Entry
            </h2>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Emoji"
                  value={newEmoji}
                  onChange={(e) => setNewEmoji(e.target.value)}
                  maxLength="2"
                  className="w-16 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                />
                <input
                  type="text"
                  placeholder="Title (SIDRO, LARS, etc)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500"
                />
              </div>
              <textarea
                placeholder="Content for this entry..."
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500"
              />
              <button
                onClick={addEntry}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-2 rounded font-bold transition"
              >
                + Add to Portal
              </button>
            </div>
          </div>

          {/* Entry List */}
          <div className="space-y-3">
            {entries.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p>No entries yet. Start building.</p>
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className={`p-4 rounded-lg cursor-pointer transition border ${
                    selectedEntry?.id === entry.id
                      ? `bg-gradient-to-r ${entry.color} border-white border-2`
                      : 'bg-slate-800 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">{entry.emoji}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{entry.title}</h3>
                        <p className="text-sm opacity-90 line-clamp-2">{entry.content}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEntry(entry.id);
                      }}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right sidebar - Preview & Actions */}
        <div className="space-y-6">
          {selectedEntry ? (
            <>
              {/* Preview */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-sm font-bold text-slate-400 mb-3">TELEGRAM PREVIEW</h3>
                <div className="bg-slate-900 rounded p-4 text-sm space-y-2 mb-4 border border-slate-700">
                  <div className="text-slate-300">
                    <span className="text-2xl">{selectedEntry.emoji}</span>
                    <span className="font-bold ml-2">{selectedEntry.title}</span>
                  </div>
                  <p className="text-slate-400 mt-3">{selectedEntry.content}</p>
                  <div className="text-xs text-slate-500 mt-3">#portal #ghostline</div>
                </div>

                <button
                  onClick={() => copyToClipboard(generateTelegramMessage(selectedEntry), selectedEntry.id)}
                  className="w-full bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded text-sm font-bold flex items-center justify-center gap-2 transition mb-2"
                >
                  <Copy size={16} />
                  {copiedId === selectedEntry.id ? 'Copied!' : 'Copy Message'}
                </button>

                <a
                  href={`https://t.me/share/url?text=${encodeURIComponent(generateTelegramMessage(selectedEntry))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-3 py-2 rounded text-sm font-bold flex items-center justify-center gap-2 transition block text-center"
                >
                  <Send size={16} />
                  Send via Telegram
                </a>
              </div>

              {/* Details */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-sm font-bold text-slate-400 mb-3">ENTRY DETAILS</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-slate-400">Title:</span>
                    <p className="text-white font-mono">{selectedEntry.title}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Emoji:</span>
                    <p className="text-2xl">{selectedEntry.emoji}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">ID:</span>
                    <p className="text-slate-300">#{selectedEntry.id}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center text-slate-500">
              <Settings size={32} className="mx-auto mb-3 opacity-50" />
              <p>Select an entry to preview</p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-sm font-bold text-slate-400 mb-3">PORTAL STATUS</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Entries:</span>
                <span className="text-white font-bold">{entries.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-green-400">● Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
