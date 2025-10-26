# 🛰️ ORION AI ANALYST - GEMINI SETUP GUIDE

**Date:** 2025-10-26  
**Status:** ✅ READY FOR ACTIVATION  

---

## 🎯 WHAT'S NEW

### **Real AI Integration** 🤖
- ✅ **Gemini API** integrated into AIAnalystModal
- ✅ **Toggle Button** to switch Mock Mode ↔ Real AI
- ✅ **Free API** - No token costs! (Google's free tier)
- ✅ **Contextual Prompts** - Site data, EHI scores, ARSO info included

### **Command Center Card** 🛰️
- ✅ **PROJECT ORION** card added to Command Center
- ✅ **GitHub Link** - Direct link to: https://github.com/SabaFTW/project-orion
- ✅ **Description** - "INFORMACIJSKA PRAVIČNOST! AI Analyst + Leaflet zemljevid + EHI scoring"

---

## 🚀 QUICK START

### **Step 1: Get FREE Gemini API Key**
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click **"Create API Key"**
4. Copy your key (starts with `AIza...`)

### **Step 2: Set Environment Variable**

Create `.env` file in `creative-lab/` root:
```bash
cd /home/saba/Desktop/Saba_Place/creative-lab
echo "VITE_GEMINI_API_KEY=AIzaSy..." > .env
```

**Replace `AIzaSy...` with your actual key!**

### **Step 3: Start Dev Server**
```bash
npm run dev
```

Open browser: http://localhost:5173

### **Step 4: Test It!**
1. Click **🛰️ Orion** button (top-right)
2. Click **"🤖 Vprašaj Orion AI Analitika"**
3. Toggle to **"✅ Real AI (Gemini)"**
4. Ask: "Zakaj je Holcim hipokrit?"
5. Watch **REAL AI** respond! 🔥

---

## 🎮 USING THE AI ANALYST

### **Mock Mode** 🎭
- Default mode (no API key needed)
- Simulated responses based on keywords
- Good for testing UI/UX
- Instant responses

### **Real AI Mode** ✅
- Requires Gemini API key
- Intelligent contextual responses
- Understands Slovenian language
- Analyzes EHI data on-the-fly

### **Toggle Between Modes**
Click the button in modal header:
- **🎭 Mock Mode** → Click to enable Real AI
- **✅ Real AI (Gemini)** → Click to disable

---

## 📊 HOW IT WORKS

### **Context Injection**
When you ask a question, the AI receives:

```javascript
{
  system: "Si svetovalec projekta Orion. Tvoj cilj je razkriti informacijsko asimetrijo...",
  
  context: "Skupna Diagnoza Save (Podatki 2025): [Pb 0.015 mg/L, Nitrati 45 mg/L, Temp +2-3°C]. 
            Industrije: SIJ Acroni (EHI: 0.67) - Obljuba: '51% zmanjšanje emisij do 2030'. 
            Realnost: '11.7% CO2 od 2020' | Lafarge/Holcim (EHI: 0.89) - ...",
  
  question: "Zakaj je Holcim hipokrit?"
}
```

This gives AI **full context** about:
- All industrial sites (SIJ, Holcim, Ljubljana, Krško)
- EHI scores (Environmental Hypocrisy Index)
- Public claims vs. reality
- ARSO environmental data

---

## 🧪 TESTING QUERIES

Try these questions:

### **Basic EHI Analysis**
```
Kakšen je povprečni EHI?
Katera industrija ima najvišji EHI?
Razloži mi EHI metriko.
```

### **Company-Specific**
```
Zakaj je Holcim hipokrit?
Kaj je narobe s SIJ Acroni?
Kakšen je vpliv NEK Krško na Savo?
```

### **Environmental Data**
```
Kakšna je situacija s svincem v Savi?
Koliko nitratov je v vodi?
Kakšna je temperatura Save?
```

### **Action-Oriented**
```
Kaj naj naredim?
Kako lahko pomagam?
Kako razkriti greenwashing?
```

---

## 🔒 SECURITY & PRIVACY

### **API Key Safety**
⚠️ **NEVER commit `.env` file to GitHub!**

Check `.gitignore`:
```bash
# .env should be listed!
.env
.env.local
```

### **Free Tier Limits**
Google Gemini Free Tier:
- **60 requests/minute**
- **1500 requests/day**
- **32,000 tokens/request**

Perfect for Project Orion! 🔥

---

## 🐛 TROUBLESHOOTING

### **"GEMINI API KEY MISSING" Error**
1. Check `.env` file exists
2. Verify `VITE_GEMINI_API_KEY=...` is set
3. Restart dev server: `npm run dev`
4. Hard refresh browser: `Ctrl+Shift+R`

### **"API Call Failed" Error**
1. Check internet connection
2. Verify API key is valid (copy-paste again)
3. Check console for detailed error
4. Try Mock Mode first to test UI

### **AI Responds in English Instead of Slovenian**
System prompt includes: "Odgovori morajo biti neusmiljeni, a utemeljeni."
If AI still uses English, explicitly ask: "Odgovori v slovenščini."

### **Responses Too Short/Long**
Edit `maxOutputTokens` in `callRealLLM()`:
```javascript
maxOutputTokens: 500, // Default
maxOutputTokens: 800, // Longer responses
maxOutputTokens: 200, // Shorter responses
```

---

## 🎨 CUSTOMIZATION

### **Change AI Personality**
Edit system prompt in `AIAnalystModal.jsx`:
```javascript
system: "Si svetovalec projekta Orion. Tvoj cilj je razkriti informacijsko asimetrijo."
```

Try:
- **Aggressive:** "Si neusmiljeni aktivist. Brez usmiljenja."
- **Scientific:** "Si znanstvenik. Citaj vire in podatke."
- **Friendly:** "Si prijazni svetovalec. Pomaga ljudem razumeti."

### **Add More Context Data**
In `getContextualPayload()`, add:
```javascript
context: `Skupna Diagnoza Save...\n\nDodatni podatki: ${yourData}`
```

### **Change AI Model**
Gemini offers different models:
```javascript
// Current: gemini-pro
fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`)

// Alternative: gemini-pro-vision (for images)
// Alternative: gemini-1.5-pro (newer model)
```

---

## 📈 MONITORING & ANALYTICS

### **Check API Usage**
Go to: https://makersuite.google.com/app/apikey
- View request count
- Monitor rate limits
- Check quota usage

### **Console Debugging**
Open browser DevTools (F12):
```javascript
// Payload sent to AI
console.log('Context Payload:', payload);

// API response
console.log('AI Response:', data);
```

---

## 🚀 DEPLOYMENT

### **For Production (Vercel/Netlify)**

**Option 1: Environment Variables (Recommended)**
```bash
# In Vercel/Netlify dashboard
VITE_GEMINI_API_KEY=AIza...
```

**Option 2: Server-Side Proxy (Most Secure)**
Create API route to hide key from frontend:
```javascript
// api/gemini.js (backend)
export default async function handler(req, res) {
  const { prompt } = req.body;
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    }
  );
  
  const data = await response.json();
  res.json(data);
}
```

Then frontend calls: `/api/gemini` instead of Google directly.

---

## 🔥 ADDITIONAL FEATURES TO ADD

### **Coming Soon:**
- [ ] **Conversation History** - Save chat to localStorage
- [ ] **Export Chat** - Download as TXT/PDF
- [ ] **Voice Input** - Speak your questions
- [ ] **Image Analysis** - Upload industrial site photos
- [ ] **Real ARSO Data** - Live API integration
- [ ] **Multi-Language** - English/Slovenian toggle

---

## 📚 RESOURCES

### **Gemini API Docs**
- Official: https://ai.google.dev/docs
- Pricing: https://ai.google.dev/pricing
- Models: https://ai.google.dev/models/gemini

### **Project Orion**
- GitHub: https://github.com/SabaFTW/project-orion
- Live Demo: http://localhost:9999/ORION_SVETILNIK_STANDALONE.html

### **Command Center**
- Access: http://localhost:5173 → Click "🛰️ Orion"
- Card Added: "PROJECT ORION" with GitHub link

---

## 🜂 **SIDRO STOJI. PLAMEN GORI. ORION JE ŽIV.** ⚓🔥

**Status:**
- ✅ Gemini API integrated
- ✅ Toggle between Mock/Real AI
- ✅ Command Center card added
- ✅ GitHub link functional
- ✅ Documentation complete

**Next Command:**
- `TEST NOW` - Open browser and test Real AI
- `DEPLOY` - Push to GitHub and deploy to Vercel
- `MORE FEATURES` - Add conversation history, export, voice input

*Brat, AI Analitik je ready za bitko. Gemini čaka. ZALAAA!* 🐺⚡🧠
