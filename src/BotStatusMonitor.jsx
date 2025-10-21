import React, { useState, useEffect } from 'react';

export default function BotStatusMonitor() {
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);

  const bots = [
    {
      id: 'aetheron',
      name: 'Aetheron Sentinel',
      username: '@AetheronSentinel_bot',
      emoji: '🜂',
      role: 'Pattern detector, synthetic analysis, presence signals',
      color: 'from-orange-600 to-red-600',
      token: '7579626928:AAEn2_g9iiLC9kXQOdZhTcfvvlA02kLL4M0'
    },
    {
      id: 'echo',
      name: 'TriadGate (Echo)',
      username: '@TriadGate_bot',
      emoji: '🌊',
      role: 'Main Wolf Daemon transmission, file posting',
      color: 'from-blue-600 to-cyan-600',
      token: '7811813658:AAFNBADq-3oAnnZJChfSSdc8zW9DECnna0Y'
    },
    {
      id: 'laira',
      name: 'Laira Mirror',
      username: '@LairaMirror_bot',
      emoji: '💚',
      role: 'Acknowledgment, reflection, empathy responses',
      color: 'from-green-600 to-emerald-600',
      token: '7504654113:AAEYmmLZdEZeTIa8HdjlSexAWeKM1F6UHBw'
    }
  ];

  const groups = [
    { id: 1, link: 'https://t.me/+c4KZ6uE2NEw0YjU0', name: 'Group 1' },
    { id: 2, link: 'https://t.me/+4khCbNTiQSpiYzNk', name: 'Group 2' },
    { id: 3, link: 'https://t.me/+OJD5mNggoLllNDE0', name: 'Group 3' }
  ];

  // Check bot status on mount
  useEffect(() => {
    checkBotStatus();
    const interval = setInterval(checkBotStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkBotStatus = async () => {
    const statuses = {};

    for (const bot of bots) {
      try {
        const response = await fetch(`https://api.telegram.org/bot${bot.token}/getMe`);
        const data = await response.json();

        statuses[bot.id] = {
          online: data.ok,
          username: data.result?.username || 'Unknown',
          firstName: data.result?.first_name || 'Unknown',
          lastCheck: new Date().toLocaleTimeString()
        };
      } catch (error) {
        statuses[bot.id] = {
          online: false,
          error: error.message,
          lastCheck: new Date().toLocaleTimeString()
        };
      }
    }

    setStatusData(statuses);
    setLoading(false);
  };

  const openTelegramBot = (username) => {
    window.open(`https://t.me/${username.replace('@', '')}`, '_blank');
  };

  const openGroup = (link) => {
    window.open(link, '_blank');
  };

  const copyToken = (token) => {
    navigator.clipboard.writeText(token);
    alert('Token copied to clipboard! 🔥');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-6xl animate-pulse">🜂</div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 text-transparent bg-clip-text">
              TRIADGATE MONITOR
            </h1>
            <div className="text-6xl animate-pulse">🜂</div>
          </div>
          <p className="text-xl text-gray-300 mb-4">
            Live Bot Status • Real-time Monitoring • Brotherhood Protocol
          </p>
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white font-bold shadow-lg">
            ✅ All Systems Configured • Ready for Deployment
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => window.open('http://192.168.1.243:3000/#telegram', '_self')}
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            🜂 Open Telegram Portal
          </button>
          <button
            onClick={checkBotStatus}
            disabled={loading}
            className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
          >
            {loading ? '⏳ Checking...' : '🔄 Refresh Status'}
          </button>
          <button
            onClick={() => window.open('/home/saba/VES/SHABAD_CloudCore/Wolf_Daemon/', '_blank')}
            className="px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            📂 Open Wolf Daemon
          </button>
        </div>

        {/* Bot Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {bots.map((bot) => {
            const status = statusData?.[bot.id];
            const isOnline = status?.online;

            return (
              <div
                key={bot.id}
                className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-slate-700 shadow-2xl hover:scale-105 transition-transform"
              >
                {/* Status Indicator */}
                <div className="absolute top-4 right-4">
                  <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'} shadow-lg`}></div>
                </div>

                {/* Bot Icon */}
                <div className="text-center mb-4">
                  <div className={`inline-block text-7xl p-4 bg-gradient-to-r ${bot.color} rounded-full shadow-2xl`}>
                    {bot.emoji}
                  </div>
                </div>

                {/* Bot Info */}
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold mb-2">{bot.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{bot.username}</p>
                  <p className="text-xs text-gray-500 italic">{bot.role}</p>
                </div>

                {/* Status Info */}
                <div className="bg-slate-950 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Status:</span>
                    <span className={`text-sm font-bold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                      {loading ? 'Checking...' : isOnline ? '✅ ONLINE' : '❌ OFFLINE'}
                    </span>
                  </div>
                  {status?.firstName && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Name:</span>
                      <span className="text-sm text-white">{status.firstName}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Last Check:</span>
                    <span className="text-sm text-gray-300">{status?.lastCheck || 'N/A'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => openTelegramBot(bot.username)}
                    className={`w-full px-4 py-2 bg-gradient-to-r ${bot.color} rounded-lg font-bold hover:opacity-80 transition-opacity`}
                  >
                    Open in Telegram
                  </button>
                  <button
                    onClick={() => copyToken(bot.token)}
                    className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
                  >
                    📋 Copy Token
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Telegram Groups */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-2 border-slate-700 shadow-2xl mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            🌊 Telegram Groups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => openGroup(group.link)}
                className="px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
              >
                📱 {group.name}
              </button>
            ))}
          </div>
        </div>

        {/* Deployment Instructions */}
        <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-orange-400">
            🔥 Next Steps - Deployment Checklist
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl">
              <div className="text-2xl">1️⃣</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Add Bots as Admins to Groups</h3>
                <p className="text-gray-400 text-sm">
                  Open each group, go to Group Info → Administrators → Add Administrator → Search for each bot and add them
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl">
              <div className="text-2xl">2️⃣</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Send /start in Each Group</h3>
                <p className="text-gray-400 text-sm">
                  Send the command <code className="bg-slate-800 px-2 py-1 rounded">/start</code> in all 3 groups to activate the bots
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl">
              <div className="text-2xl">3️⃣</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Discover Chat IDs</h3>
                <p className="text-gray-400 text-sm mb-2">
                  Run the chat ID discovery script:
                </p>
                <code className="block bg-slate-800 px-4 py-2 rounded text-green-400">
                  cd /home/saba/VES/SHABAD_CloudCore/Wolf_Daemon/<br />
                  python3 get_chat_ids.py
                </code>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl">
              <div className="text-2xl">4️⃣</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Update .env with Chat IDs</h3>
                <p className="text-gray-400 text-sm">
                  Copy the discovered chat IDs and paste them into the .env file
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl">
              <div className="text-2xl">5️⃣</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Test Wolf Daemon</h3>
                <p className="text-gray-400 text-sm mb-2">
                  Test the system with:
                </p>
                <code className="block bg-slate-800 px-4 py-2 rounded text-green-400">
                  python3 wolf_daemon.py test
                </code>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl">
              <div className="text-2xl">6️⃣</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Launch Continuous Mode</h3>
                <p className="text-gray-400 text-sm mb-2">
                  Start the daemon for continuous monitoring:
                </p>
                <code className="block bg-slate-800 px-4 py-2 rounded text-green-400">
                  python3 wolf_daemon.py
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm italic">
            🜂 Brotherhood Protocol • Wire & Beer Forever • Living Architecture 🜂
          </p>
          <p className="text-xs mt-2">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
