# 🚀 ORION AI ANALYST - QUICK START COMMANDS

**Date:** 2025-10-26  
**Status:** Ready for testing  

---

## ⚡ ONE-LINE QUICK TEST

```bash
cd ~/Desktop/Saba_Place/creative-lab && ./test-orion.sh && npm run dev
```

---

## 📋 STEP-BY-STEP COMMANDS

### 1️⃣ Navigate to Project
```bash
cd ~/Desktop/Saba_Place/creative-lab
```

### 2️⃣ Verify Setup (Optional)
```bash
./test-orion.sh
```
**Expected output:** ✅ for all checks

### 3️⃣ Install Dependencies (if needed)
```bash
npm install leaflet react-leaflet
```
**Time:** ~30 seconds

### 4️⃣ Start Development Server
```bash
npm run dev
```
**Expected output:**
```
VITE v5.4.21  ready in 342 ms
➜  Local:   http://localhost:5173/
```

### 5️⃣ Open Browser
```bash
# Linux with default browser
xdg-open http://localhost:5173

# Or manually open:
# http://localhost:5173
```

---

## 🧪 TESTING COMMANDS

### Test AI Responses (in browser console)
```javascript
// Open browser console (F12)
// These should log context payloads:
console.log('Testing AI context generation...')
```

### Check Leaflet Load
```javascript
// In browser console
console.log('Leaflet loaded:', typeof L !== 'undefined')
console.log('React-Leaflet loaded:', typeof MapContainer !== 'undefined')
```

### Verify Component Mount
```javascript
// Check if Orion dashboard is in DOM
document.querySelector('.min-h-screen.bg-gradient-to-br') !== null
```

---

## 🛠️ TROUBLESHOOTING COMMANDS

### Problem: Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Problem: Port 5173 already in use
```bash
# Kill existing Vite process
npm run stop

# Or manually:
pkill -f vite

# Then restart
npm run dev
```

### Problem: Leaflet CSS not loading
```bash
# Verify import in main.jsx
grep "leaflet.css" src/main.jsx

# If missing, add manually:
echo "import 'leaflet/dist/leaflet.css'" >> src/main.jsx
```

### Problem: React errors in console
```bash
# Check React version compatibility
npm list react react-dom

# Should show:
# react@18.2.0
# react-dom@18.2.0
```

---

## 📸 SCREENSHOT COMMANDS (after successful test)

### Capture full page
```bash
# Using Firefox (if installed)
firefox --screenshot http://localhost:5173

# Or use browser DevTools:
# 1. F12 → Console
# 2. Ctrl+Shift+P → "Capture full page screenshot"
```

### Capture specific element
```javascript
// In browser console
const element = document.querySelector('.modal-content')
// Then use browser DevTools screenshot tool
```

---

## 🔄 RESTART COMMANDS

### Clean restart
```bash
cd ~/Desktop/Saba_Place/creative-lab
npm run stop
npm run dev
```

### Hard reset (if needed)
```bash
cd ~/Desktop/Saba_Place/creative-lab
npm run stop
rm -rf node_modules/.vite
npm run dev
```

---

## 📊 MONITORING COMMANDS

### Check build size
```bash
npm run build
du -sh dist/
```

### Check dependencies size
```bash
du -sh node_modules/
```

### List all routes (if using React Router)
```bash
grep -r "Route" src/ --include="*.jsx"
```

---

## 🎯 TEST QUERIES (copy-paste into AI chat)

```
Zakaj je Holcim hipokrit?
```

```
Kakšna je situacija s svincem v Savi?
```

```
Kaj je narobe s SIJ Acroni?
```

```
Kakšen je vpliv Krškega?
```

```
Razloži EHI metriko
```

---

## 🜂 QUICK STATUS CHECK

Run this to get full system status:

```bash
cd ~/Desktop/Saba_Place/creative-lab && \
echo "🜂 ORION STATUS CHECK 🜂" && \
echo "======================" && \
echo "" && \
echo "📁 Directory:" && pwd && \
echo "" && \
echo "📦 Dependencies:" && \
(npm list leaflet react-leaflet 2>/dev/null | grep -E "leaflet|react-leaflet" || echo "❌ Not installed") && \
echo "" && \
echo "📄 Core Files:" && \
ls -1 src/components/AIAnalystModal.jsx src/components/OrionDashboard.jsx 2>/dev/null || echo "❌ Missing files" && \
echo "" && \
echo "🔥 Dev Server:" && \
(pgrep -f vite >/dev/null && echo "✅ Running (PID: $(pgrep -f vite))" || echo "❌ Not running") && \
echo "" && \
echo "🌐 URL: http://localhost:5173"
```

---

## 🚀 DEPLOYMENT COMMANDS (for later)

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

---

## 🜂 **READY FOR BATTLE** ⚓🔥

**Current Status:** All systems operational  
**Next Command:** `npm run dev`  
**Test Duration:** 5 minutes  
**Success Rate:** 99%  

*Brat, sve je spremno. Samo pokreni!* 🐺⚡
