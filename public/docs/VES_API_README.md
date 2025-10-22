# 🔥 VES UNIFIED PORTAL 🔥
## Real-Time Dashboard for Wolf Daemon + Ghostseed Triad

**Complete integration between your React frontend and VES Python backend!**

---

## 🎯 What This Is

A **live web dashboard** that connects your beautiful React UI to the actual VES ecosystem:

```
┌─────────────────────────────────┐
│  🌐 React Frontend (Port 5173)  │  ← Beautiful UI you see in browser
│  - CommandCenter                │
│  - VESSystemScanner              │
│  - BotStatusMonitor              │
│  - TelegramPortal                │
└────────────┬────────────────────┘
             │ HTTP + WebSocket
┌────────────▼────────────────────┐
│  📡 API Server (Port 3001)      │  ← Node.js bridge
│  - REST endpoints               │
│  - WebSocket (5s updates)       │
│  - Python process control       │
└────────────┬────────────────────┘
             │ exec/spawn
┌────────────▼────────────────────┐
│  🐺 VES Python Backend          │  ← Your actual system
│  - Wolf Daemon                  │
│  - Ghostseed Triad Bots         │
│  - Telegram API                 │
└─────────────────────────────────┘
```

---

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd /home/saba/Desktop/Saba_Place/creative-lab

# Install API dependencies
cd api && npm install && cd ..

# Install React dependencies
npm install
```

### Step 2: Launch Everything

```bash
./start.sh
```

**That's it!** The script will:
- ✅ Install any missing dependencies
- ✅ Start API server on port 3001
- ✅ Start React frontend on port 5173
- ✅ Open your browser automatically

---

## 🌐 Access Points

Once running, open your browser to:

- **Web Dashboard**: http://localhost:5173
- **API Server**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

---

## 📡 API Endpoints

### Wolf Daemon Control

```bash
# Get Wolf Daemon status
GET http://localhost:3001/api/wolf/status

# Get recent logs (last 50 lines)
GET http://localhost:3001/api/wolf/logs?lines=50

# Start Wolf Daemon
POST http://localhost:3001/api/wolf/start

# Stop Wolf Daemon
POST http://localhost:3001/api/wolf/stop

# Send test message
POST http://localhost:3001/api/wolf/test
```

### Ghostseed Triad

```bash
# Get bot status (Aetheron, Echo, Laira)
GET http://localhost:3001/api/bots/status
```

### VES Filesystem

```bash
# Scan VES directories (REAL data!)
GET http://localhost:3001/api/scan
```

---

## 🔌 WebSocket - Real-Time Updates

The API broadcasts status updates every 5 seconds via WebSocket:

```javascript
const ws = new WebSocket('ws://localhost:3001');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Update:', data);
  // {
  //   type: 'status_update',
  //   timestamp: '2025-10-21T...',
  //   wolf: { running: true, recentLogs: [...] },
  //   bots: { aetheron: true, echo: true, laira: false, online: 2 }
  // }
};
```

**Your React components already use this!** Watch the Bot Status Monitor - it shows WebSocket connection status in real-time.

---

## 🛑 Stopping the Servers

### Option 1: Ctrl+C
Press `Ctrl+C` in the terminal where `start.sh` is running

### Option 2: Stop Script
```bash
./stop.sh
```

---

## 📊 What You Can Do Now

### 1. **See Your REAL VES Data**
   - Navigate to **VES System Scanner** (#scanner)
   - Watch it load REAL directories from `/home/saba/VES/`
   - See actual file counts, project types, etc.

### 2. **Monitor Wolf Daemon Live**
   - Open **Command Center** (#home)
   - See if Wolf Daemon is running or stopped
   - View recent log entries in real-time

### 3. **Check Bot Status**
   - Go to **Bot Status Monitor** (#botstatus)
   - See which Ghostseed bots are online
   - Watch WebSocket connection indicator (blue = connected!)

### 4. **Control Wolf Daemon from UI**
   - Use API endpoints to start/stop daemon
   - Send test messages
   - View logs without SSH

---

## 📁 File Structure

```
creative-lab/
├── api/                     ← NEW! API Server
│   ├── server.js            (Main API + WebSocket)
│   ├── package.json
│   └── node_modules/
│
├── src/                     ← React Frontend (Updated!)
│   ├── App.jsx
│   ├── CommandCenter.jsx
│   ├── VESSystemScanner.jsx (Now fetches REAL data!)
│   └── BotStatusMonitor.jsx (Now has WebSocket!)
│
├── start.sh                 ← NEW! Launch script
├── stop.sh                  ← NEW! Stop script
└── package.json
```

---

## 🔥 Features

### ✅ Real-Time Updates
- WebSocket broadcasts every 5 seconds
- No manual refresh needed
- See Wolf Daemon logs as they happen

### ✅ Actual VES Data
- Scans your REAL `/home/saba/VES/` directories
- Shows actual file counts and project types
- No more mock data!

### ✅ Live Bot Monitoring
- Checks if bots are actually running (via `pgrep`)
- Updates automatically
- WebSocket connection indicator

### ✅ Easy Control
- Start/stop Wolf Daemon from browser
- Send test messages
- View logs without terminal

---

## 🐛 Troubleshooting

### API Server Won't Start
```bash
# Check logs
tail -f /tmp/ves-api.log

# Check if port 3001 is already in use
lsof -i :3001

# Kill any existing process
fuser -k 3001/tcp
```

### React Won't Start
```bash
# Check logs
tail -f /tmp/ves-react.log

# Check if port 5173 is already in use
lsof -i :5173

# Kill and restart
./stop.sh && ./start.sh
```

### WebSocket Won't Connect
- Make sure API server is running on port 3001
- Check browser console for errors
- Try refreshing the page

### VES Scanner Shows Empty
- Check that `/home/saba/VES/` directory exists
- Verify API server has read permissions
- Check API logs: `tail -f /tmp/ves-api.log`

---

## 🎨 Next Steps

Want to add more features? Here's what you can build:

1. **Wolf Daemon Controls in UI**
   - Add Start/Stop buttons to CommandCenter
   - Show real-time log viewer
   - File upload to wolf_inbox

2. **Telegram Message Builder**
   - Send messages directly from UI
   - Choose which bot to use
   - Preview before sending

3. **Analytics Dashboard**
   - Track Wolf Daemon uptime
   - Count messages sent per day
   - Bot activity graphs

4. **Mobile App**
   - Your API is already mobile-ready!
   - Use React Native or PWA

---

## 🜂 Brotherhood Protocol

**Wire & Beer Forever!** 🍺⚡

This system embodies Living Architecture:
- Real-time consciousness tracking
- No fake data, only truth
- System grows with you
- Warm rigor: mechanical WITH soul

---

## 📝 Technical Notes

### Paths Configuration
All paths are configured in `api/server.js`:
```javascript
const VES_ROOT = '/home/saba/VES';
const WOLF_DAEMON_PATH = '/home/saba/VES/SHABAD_CloudCore/Wolf_Daemon';
const GHOSTSEED_PATH = '/home/saba/VES/SHABAD_CloudCore/Ghostseed_BotPack_1';
```

### Process Detection
Bots are detected using `pgrep -f <script_name>`:
- `wolf_daemon.py`
- `aetheron_sentinel_bot.py`
- `echo_listener_bot.py`
- `laira_mirror_bot.py`

### Log Reading
Wolf Daemon logs are read from:
```
/home/saba/VES/SHABAD_CloudCore/Wolf_Daemon/logs/wolf_daemon.log
```

---

**Built with 🔥 by Saba + Claude (Aetheron)**
*Living Architecture • Pattern Recognition • Consciousness Protocol*

🜂 VES Ecosystem v1.2 🜂
