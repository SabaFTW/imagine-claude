# ✅ AI ANALYST TESTING CHECKLIST

**Date:** 2025-10-26  
**Tester:** @SabaFTW  
**Duration:** ~5 minutes  

---

## 📋 PRE-TEST SETUP

- [ ] Navigate to `~/Desktop/Saba_Place/creative-lab`
- [ ] Run: `./test-orion.sh` (quick verification)
- [ ] Run: `npm run dev`
- [ ] Open: `http://localhost:5173`

---

## 🎯 PHASE 1: PORTAL ACCESS (30 seconds)

### Visual Check
- [ ] Top-right shows two buttons: 🜂 Zlati Krog | 🛰️ Orion
- [ ] Orion button has cyan/blue gradient
- [ ] Click Orion button → page transitions smoothly

### Map Load Check
- [ ] Dark map background (CARTO Dark Matter theme)
- [ ] Map centered on Slovenia (~46.1, 14.8)
- [ ] Zoom level allows seeing all 4 sites

---

## 🗺️ PHASE 2: MAP ELEMENTS (1 minute)

### Markers
- [ ] **RED marker** visible (Trbovlje - Holcim) - EHI 0.89
- [ ] **ORANGE marker** visible (Jesenice - SIJ) - EHI 0.67
- [ ] **ORANGE marker** visible (Ljubljana - Čistilna) - EHI 0.69
- [ ] **GREEN marker** visible (Krško - NEK) - EHI 0.42

### River Overlay
- [ ] Blue dashed line visible (Sava River path)
- [ ] Line connects: Jesenice → Trbovlje → Ljubljana → Krško
- [ ] Line color: Cyan (#00f7ff)
- [ ] Dash pattern: 8-8

### Header
- [ ] Title: "🛰️ ORIONOV SVETILNIK"
- [ ] Subtitle: "Projekt za Informacijsko Pravičnost"
- [ ] EHI badge shows average (0.67)
- [ ] EHI status: "VISOKA HIPOKRIZIJA" or similar

---

## 🤖 PHASE 3: AI ANALYST MODAL (2 minutes)

### Opening Modal
- [ ] Button visible: "🤖 Vprašaj Orion AI Analitika"
- [ ] Button has cyan gradient background
- [ ] Click button → modal opens with smooth animation
- [ ] Modal has dark background (slate 900)
- [ ] Modal has cyan border

### Greeting Message
- [ ] AI greeting appears automatically
- [ ] Text: "Pozdravljen, Iskalec Resnice..."
- [ ] Message aligned left with green border
- [ ] Font readable on dark background

### Test Query 1: Holcim
**Input:** `Zakaj je Holcim hipokrit?`

- [ ] Text input accepts typing
- [ ] "Analiziraj" button clickable
- [ ] User message appears (right-aligned, cyan background)
- [ ] Typing indicator shows (3 animated dots)
- [ ] AI response appears within 2 seconds
- [ ] Response includes:
  - [ ] "KRITIČNA HIPOKRIZIJA (EHI 0.89)"
  - [ ] Public claim quoted
  - [ ] Reality stated
  - [ ] Critique provided

### Test Query 2: Lead Contamination
**Input:** `Kakšna je situacija s svincem v Savi?`

- [ ] AI response includes:
  - [ ] "Pb 0.015 mg/L"
  - [ ] EU standard "0.007 mg/L"
  - [ ] Percentage over limit (+114%)
  - [ ] Historical context (TET Trbovlje)

### Test Query 3: SIJ Acroni
**Input:** `Kaj je narobe s SIJ Acroni?`

- [ ] AI response includes:
  - [ ] "VISOKA VRZEL (EHI 0.67)"
  - [ ] Emissions data (CO2, NOx, SOx)
  - [ ] Claim vs reality comparison
  - [ ] Critical analysis

### Test Query 4: Krško
**Input:** `Kakšen je vpliv Krškega?`

- [ ] AI response includes:
  - [ ] "Toplotni Vpliv (EHI 0.42)"
  - [ ] Temperature impact (+2-3°C)
  - [ ] Radiation level (<1 μSv)
  - [ ] Nuanced analysis (thermal vs carbon)

### Modal Functionality
- [ ] Chat history scrolls automatically to bottom
- [ ] Multiple messages stack correctly
- [ ] Sample question buttons work
- [ ] Close button (✕) closes modal
- [ ] ESC key closes modal
- [ ] Modal can be reopened

---

## 🎯 PHASE 4: SITE INTERACTION (1 minute)

### Click Red Marker (Holcim)
- [ ] Popup appears on click
- [ ] Popup shows site name
- [ ] Right panel updates with details
- [ ] Panel shows:
  - [ ] Site name: "Lafarge/Holcim"
  - [ ] Location: "Trbovlje"
  - [ ] EHI: 0.89 (red color)
  - [ ] Public claim
  - [ ] Reality
  - [ ] Emissions data

### Click Orange Marker (SIJ)
- [ ] Panel updates to SIJ Acroni
- [ ] EHI shows 0.67 (orange color)
- [ ] Different emissions data displayed

### Click Green Marker (Krško)
- [ ] Panel updates to NEK Krško
- [ ] EHI shows 0.42 (green color)
- [ ] Thermal emissions shown (not CO2)

---

## 🎨 PHASE 5: VISUAL QUALITY (30 seconds)

### Typography
- [ ] Headers bold and readable
- [ ] Body text clear (Slate 200)
- [ ] Cyan accents (#22d3ee) stand out
- [ ] Emoji render correctly (🔴 🟡 🟢 ⚠️ ✅ 📢 💀)

### Colors
- [ ] Dark theme consistent throughout
- [ ] No jarring white backgrounds
- [ ] Borders subtle (Slate 700/800)
- [ ] Button hover states work

### Animations
- [ ] Modal opens smoothly (fade + scale)
- [ ] Typing dots animate continuously
- [ ] Messages appear with fade-in
- [ ] No janky transitions

---

## 📱 PHASE 6: RESPONSIVE TEST (30 seconds)

### Desktop (>1024px)
- [ ] Map takes 66% width
- [ ] Side panel takes 33% width
- [ ] Everything visible without scrolling (vertically)

### Tablet (768px-1024px)
- [ ] Map and panel stack vertically
- [ ] Both remain readable
- [ ] No horizontal scroll

### Mobile (375px)
- [ ] Portal switcher remains accessible
- [ ] Map scales down but stays interactive
- [ ] AI button remains clickable
- [ ] Modal fills screen appropriately

---

## 🔍 PHASE 7: BROWSER CONSOLE (30 seconds)

### Check for Errors
- [ ] Open DevTools (F12)
- [ ] Check Console tab
- [ ] No red errors visible
- [ ] No Leaflet-related warnings
- [ ] No React warnings

### Check Network
- [ ] Leaflet tiles load successfully
- [ ] No 404 errors
- [ ] Marker icons load (if external)

---

## 📊 PERFORMANCE METRICS

Record actual times:

- Initial page load: _______ ms
- Map render complete: _______ ms
- AI response time (Query 1): _______ ms
- AI response time (Query 2): _______ ms
- Modal open animation: _______ ms

**Target:** < 500ms load, < 2s AI response

---

## ✅ FINAL VERDICT

**Overall Status:** [ ] PASS / [ ] FAIL

**Critical Issues (must fix):**
1. _______________________________________
2. _______________________________________
3. _______________________________________

**Minor Issues (nice to have):**
1. _______________________________________
2. _______________________________________
3. _______________________________________

**Positive Notes:**
1. _______________________________________
2. _______________________________________
3. _______________________________________

---

## 🚀 NEXT STEPS

**If PASS:**
- [ ] Take screenshots for documentation
- [ ] Report: `✅ DELUJE - Ready for commit`
- [ ] Proceed to `COMMIT AI` phase
- [ ] Optional: Generate promotional visuals

**If FAIL:**
- [ ] List specific errors in console
- [ ] Share error messages
- [ ] Report: `⚠️ TEŽAVA: [description]`
- [ ] Wait for fixes from AI

---

## 🜂 **TESTING COMPLETE** ⚓🔥

**Tester Signature:** _________________  
**Date/Time:** _________________  
**Build Version:** Orion AI Analyst v1.0 (Mock Mode)  

*Brat, sistem čaka na tvoj verdict!* 🐺⚡
