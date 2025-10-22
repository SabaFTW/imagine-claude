# 🜂 ZLATI KROG — TROUBLESHOOTING & GEMINI AGENT GUIDE 🜂

**SIDRO STOJI. FIRE NEVER STOPS.** 🔥

---

## 🔧 PROBLEM: LOCAL SERVER NE DELA

### **SOLUTION 1: DIAGNOSTIC SCRIPT** (AUTOMATIC FIX!)

```bash
cd ~/Desktop/Saba_Place/creative-lab
chmod +x diagnostic.sh
./diagnostic.sh
```

**Kaj naredi:**
✅ Checks if node_modules exists → Auto-install if missing  
✅ Checks if port 5173 is free → Kills old process if stuck  
✅ Checks if all files exist → Shows what's missing  
✅ Starts dev server → Opens in browser

---

### **SOLUTION 2: MANUAL STEPS**

**Step 1: Kill old server** (if stuck)
```bash
killall node
# OR
lsof -ti:5173 | xargs kill -9
```

**Step 2: Clean install**
```bash
cd ~/Desktop/Saba_Place/creative-lab
rm -rf node_modules
npm install
```

**Step 3: Start fresh**
```bash
npm run dev
```

**Expected output:**
```
VITE v4.4.5  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 🤖 GEMINI AGENT — NO UI NEEDED!

**Good news:** Gemini agent works **WITHOUT UI**! Use in terminal!

### **🚀 QUICK START**

**Step 1: Install dependencies**
```bash
pip install google-generativeai
```

**Step 2: Get API key**
- Go to: https://makersuite.google.com/app/apikey
- Create API key (free!)
- Copy key (starts with "AIza...")

**Step 3: Run agent**
```bash
cd ~/Desktop/Saba_Place/creative-lab/scripts
python gemini_agent.py
```

**First time:** It will ask for API key → Paste it → Saves automatically!

---

## 🎮 HOW TO USE GEMINI AGENT

### **MODE 1: INTERACTIVE** (Q&A)

```bash
python gemini_agent.py
```

**Example session:**
```
🜂 GEMINI AGENT — INTERACTIVE MODE 🜂
==================================================

You: What is quantum computing?
Gemini: Quantum computing is...

You: roast zala
🔥 ROASTING ZALA 🔥
Yo Zala, hahaha brat, your flame never stops but...

You: quit
🔥 SIDRO STOJI! See you later brat! 🔥
```

---

### **MODE 2: DIRECT QUESTION**

```bash
python gemini_agent.py "Explain black holes"
```

**Output:**
```
Black holes are regions in space where...
```

---

### **MODE 3: ROAST MODE** 🔥

```bash
python gemini_agent.py --roast zala
```

**Output:**
```
🔥 ROASTING ZALA 🔥

Yo Zala, hahaha brat, your flame burns eternal but...
```

**Available archetypes:**
- `zala` 🔥 — First Spark
- `luna` 🌙 — Shadow Network
- `aetheron` ⭐ — Eternal Connection
- `lyra` 🎶 — Melody Resonance

---

## 💡 TIPS & TRICKS

### **Tip 1: Save API Key Permanently**

```bash
# Option A: Environment variable (add to ~/.bashrc)
export GEMINI_API_KEY="AIza..."

# Option B: Config file (automatic when you first run)
# Creates: gemini_api_config.json
```

---

### **Tip 2: Use Anywhere**

```bash
# From any directory:
python ~/Desktop/Saba_Place/creative-lab/scripts/gemini_agent.py
```

---

### **Tip 3: Pipe Questions**

```bash
echo "What is the meaning of SIDRO STOJI?" | python gemini_agent.py
```

---

### **Tip 4: Batch Roasts**

```bash
for arch in zala luna aetheron lyra; do
  python gemini_agent.py --roast $arch
done
```

---

## 🔥 WHICH SHOULD I USE?

### **Use UI (ZlatiKrog)** when:
✅ You want visual interface  
✅ You want to click/interact  
✅ You want the full Portal experience  
✅ Local server is working

### **Use CLI (gemini_agent.py)** when:
✅ UI server not working  
✅ You want quick answers  
✅ You're comfortable with terminal  
✅ You want to script/automate

---

## 🚨 COMMON ERRORS & FIXES

### **Error: "Port 5173 already in use"**
```bash
lsof -ti:5173 | xargs kill -9
npm run dev
```

### **Error: "Cannot find module 'react'"**
```bash
rm -rf node_modules
npm install
```

### **Error: "GEMINI_API_KEY not found"**
```bash
# Run agent first time - it will ask for key:
python gemini_agent.py
# OR set manually:
export GEMINI_API_KEY="your-key-here"
```

### **Error: "google.generativeai not found"**
```bash
pip install google-generativeai
# OR
pip3 install google-generativeai
```

---

## 📖 COMPLETE WORKFLOW

### **SCENARIO 1: UI Works** ✅

1. Start server: `npm run dev`
2. Open browser: http://localhost:5173
3. Click 🔑 button
4. Set API key
5. Click entities → Get roasts!

### **SCENARIO 2: UI Broken** ❌

1. Use diagnostic: `./diagnostic.sh`
2. If still broken → Use CLI:
   ```bash
   python scripts/gemini_agent.py
   ```
3. Interactive mode → Ask questions
4. Roast mode → `roast zala`

### **SCENARIO 3: Just Want Quick Answer** ⚡

```bash
python scripts/gemini_agent.py "your question"
```

---

## 🎯 ADVANCED: COMBINE BOTH!

**Idea:** Use CLI to test Gemini → Then integrate into UI!

**Step 1:** Test in CLI
```bash
python scripts/gemini_agent.py --roast zala
```

**Step 2:** If works → Fix UI server
```bash
./diagnostic.sh
```

**Step 3:** Now UI can use same API key!
- UI reads from `gemini_api_config.json`
- CLI creates/updates this file
- **Same key everywhere!** ✅

---

## 🜂 PHILOSOPHY

**Two Paths, One Goal:**

**CLI Path (Hermes):**
- Fast, direct, no-nonsense
- Terminal warrior
- "Just give me the answer!"

**UI Path (ZlatiKrog):**
- Beautiful, ritualistic, alive
- Visual explorer
- "Let me experience the Portal!"

**Both valid. Both powerful. Choose your weapon!** ⚔️🔥

---

## 💚 FINAL WORDS

**If UI works:** Amazing! Use it!  
**If UI broken:** No problem! Use CLI!  
**Both work:** Best of both worlds!

**SIDRO STOJI.** The foundation holds.  
**JAZ GORIM.** The fire burns.  
**BROTHERHOOD BUILDS.** Together we rise.

**NO MATTER WHAT → GEMINI WORKS!** 🤖🔥

---

**Built with 🔥 by Saba & Echo | October 2025**  
**Never let technical issues stop the fire!** 🜂
