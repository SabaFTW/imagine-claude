# 🎨 ORION AI ANALYST - VISUAL GUIDE

**Visual Walkthrough of Features & UI**

---

## 🏠 HOMEPAGE: Portal Switcher

```
┌──────────────────────────────────────────────────────────┐
│                                            🜂 Zlati Krog │
│                                            🛰️ Orion     │ ← Top-right buttons
│                                                          │
│                                                          │
│         [Current portal content here]                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Features:**
- Fixed position buttons (always visible)
- Active portal highlighted (cyan/amber gradient)
- Smooth transition between portals

---

## 🛰️ ORION DASHBOARD: Main View

```
┌────────────────────────────────────────────────────────────────┐
│  🛰️ ORIONOV SVETILNIK                         EHI: 0.67      │
│  Projekt za Informacijsko Pravičnost          VISOKA VRZEL    │
├────────────────────────────────────────────────────────────────┤
│  🗺️ Zemljevid | ⏳ Časovna | 🕸️ Omrežja | ⚡ Akcije         │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐  ┌────────────────────────────────┐ │
│  │                      │  │  🔍 Analitična Kontrola       │ │
│  │    [LEAFLET MAP]     │  │  Sistem za razkritje           │ │
│  │                      │  │  asimetrije                    │ │
│  │  🔴 Holcim (0.89)    │  │                                │ │
│  │  🟡 SIJ (0.67)       │  │  🤖 Vprašaj Orion AI Analitika│ │
│  │  🟡 Ljubljana (0.69) │  │  [───────────────────────────]│ │
│  │  🟢 NEK (0.42)       │  │                                │ │
│  │                      │  ├────────────────────────────────┤ │
│  │  ≈≈≈ Sava River ≈≈≈  │  │  📍 Selected Site:             │ │
│  │                      │  │  SIJ Acroni                    │ │
│  │                      │  │  EHI: 0.67                     │ │
│  │                      │  │  CO2: 196 kt/year              │ │
│  └──────────────────────┘  │  Obljuba: "51% reduction"      │ │
│                            │  Realnost: "11.7% since 2020"  │ │
│                            └────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
│  "Resnica ni tisto, kar ti povedo..."                         │
│  Projekt Orion • Oktober 2025                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 🤖 AI ANALYST MODAL: Chat Interface

```
┌──────────────────────────────────────────────────────────────┐
│  🤖 Orion AI Analitik                              [Mock Mode]│
│  ────────────────────────────────────────────────────────  ✕ │
├──────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Pozdravljen, Iskalec Resnice. Sem Orion AI...  │  │  │
│  │  │ [AI Message - left aligned, gray background]   │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │                 ┌────────────────────────────────────┐│  │
│  │                 │ Zakaj je Holcim hipokrit?         ││  │
│  │                 │ [User Message - right, cyan bg]   ││  │
│  │                 └────────────────────────────────────┘│  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ **KRITIČNA HIPOKRIZIJA (EHI 0.89):**          │  │  │
│  │  │ 📢 Obljuba: "Trajnostno poslovanje"           │  │  │
│  │  │ 💀 Realnost: "Zaprt 2015 - dediščina Pb"      │  │  │
│  │  │ [AI Response with markdown formatting]        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────┤
│  [Vprašaj o EHI, Svincu, Holcimu...]      [Analiziraj 📤]   │
├──────────────────────────────────────────────────────────────┤
│  Poskusi: [Holcim] [Svinec] [EHI]                           │
└──────────────────────────────────────────────────────────────┘
```

---

## 🗺️ MAP: Interactive Elements

### **Marker Colors (EHI-based)**

```
🔴 RED     EHI > 0.7    Critical Hypocrisy
           └─ Holcim: 0.89 (Trbovlje)

🟡 ORANGE  EHI 0.4-0.7  High Discrepancy
           ├─ SIJ Acroni: 0.67 (Jesenice)
           └─ Ljubljana Čistilna: 0.69 (Ljubljana)

🟢 GREEN   EHI < 0.4    Acceptable Range
           └─ NEK Krško: 0.42 (Krško)
```

### **Sava River Path**

```
    🔵●━━━━━━━━━━━━●━━━━━━━━━━━●━━━━━━━━━━●━━━━━━━━━●
    Jesenice → (Mid) → Trbovlje → Ljubljana → Krško
    (SIJ)                (Holcim)  (Čistilna)  (NEK)
```

**Style:** Blue dashed line (`#00f7ff`, 3px weight, 8-8 dash pattern)

---

## 🎨 COLOR SCHEME

### **Primary Colors**
```css
Cyan:        #22d3ee  /* Primary accent, AI elements */
Blue:        #3b82f6  /* Secondary accent */
Slate 900:   #0f172a  /* Main background */
Slate 800:   #1e293b  /* Card background */
Slate 700:   #334155  /* Border */
Slate 400:   #94a3b8  /* Text secondary */
```

### **Status Colors**
```css
Red:         #ef4444  /* Critical (EHI > 0.7) */
Orange:      #f59e0b  /* Warning (EHI 0.4-0.7) */
Green:       #10b981  /* OK (EHI < 0.4) */
Neon Green:  #00ff88  /* Flow arrows, AI borders */
```

---

## 📱 RESPONSIVE DESIGN

### **Desktop (>1024px)**
```
┌────────────────────────────────────────────┐
│  [═══ MAP (2/3) ═══]  [═ PANEL (1/3) ═]   │
└────────────────────────────────────────────┘
```

### **Tablet (768px - 1024px)**
```
┌──────────────────────────────┐
│  [═══════ MAP ═══════]       │
│  [═══════ PANEL ═══════]     │
└──────────────────────────────┘
```

### **Mobile (<768px)**
```
┌──────────────────┐
│  [═ MAP ═]       │
│  [═ PANEL ═]     │
│  [═ AI BTN ═]    │
└──────────────────┘
```

---

## 🎭 ANIMATIONS

### **Modal Open**
```
Opacity:   0 → 1      (300ms ease-in-out)
Scale:     0.95 → 1   (300ms ease-in-out)
Backdrop:  blur(0) → blur(4px)
```

### **AI Typing Indicator**
```
🟢●●●  →  ●🟢●●  →  ●●🟢●  →  ●●●🟢  (pulse animation)
```

### **Chat Message Appear**
```
Opacity:   0 → 1      (200ms ease-in)
Y-offset:  10px → 0   (200ms ease-in)
```

---

## 🔤 TYPOGRAPHY

### **Headers**
```
H1: 3xl (30px) - Bold - Gradient (Cyan → Blue)
H2: 2xl (24px) - Bold - Cyan 400
H3: xl  (20px) - Bold - Cyan 400
```

### **Body Text**
```
Regular:   14px - Slate 200
Secondary: 12px - Slate 400
Bold:      14px - Cyan 300
```

### **Code/Monospace**
```
Font:      JetBrains Mono
Size:      13px
Color:     Slate 300
Background: Slate 800
```

---

## 🖱️ INTERACTIVE STATES

### **Buttons**
```css
Default:  bg-cyan-600 text-white
Hover:    bg-cyan-700 shadow-cyan-500/50
Active:   bg-cyan-800
Disabled: opacity-50 cursor-not-allowed
```

### **Input Fields**
```css
Default:  bg-slate-800 border-slate-600
Focus:    border-cyan-500 ring-2 ring-cyan-500
Error:    border-red-500 ring-2 ring-red-500
```

### **Map Markers**
```css
Default:  opacity-1 scale-1
Hover:    opacity-0.8 scale-1.1 cursor-pointer
Selected: ring-4 ring-cyan-400
```

---

## 📐 LAYOUT GRID

### **Dashboard Grid**
```
┌─────────────────────────────────────────┐
│  Header (100% width, 88px height)       │
├─────────────────────────────────────────┤
│  Navigation (100% width, 64px height)   │
├──────────────────────┬──────────────────┤
│                      │                  │
│  Map Container       │  Info Panel      │
│  (66.67% width)      │  (33.33% width)  │
│  600px height        │  600px height    │
│                      │                  │
├──────────────────────┴──────────────────┤
│  Footer (100% width, 64px height)       │
└─────────────────────────────────────────┘
```

### **AI Modal Layout**
```
┌───────────────────────────────────────┐
│  Header (100% width, 60px)            │
├───────────────────────────────────────┤
│                                       │
│  Chat Window (100% width, 400px)     │
│  [Scrollable, overflow-y-auto]       │
│                                       │
├───────────────────────────────────────┤
│  Input Form (100% width, 60px)       │
├───────────────────────────────────────┤
│  Sample Questions (100% width, 40px) │
└───────────────────────────────────────┘
```

---

## 🎬 USER FLOW: Asking a Question

```
Step 1: User clicks "🤖 Vprašaj Orion AI Analitika"
        │
        ▼
Step 2: Modal opens with greeting message
        │
        ▼
Step 3: User types question or clicks sample button
        │
        ▼
Step 4: User clicks "Analiziraj" or presses Enter
        │
        ▼
Step 5: User message appears (right-aligned, cyan)
        │
        ▼
Step 6: Typing indicator shows (animated dots)
        │
        ▼ (1.2 seconds delay)
Step 7: AI response appears (left-aligned, gray)
        │
        ▼
Step 8: User can ask another question (loop to Step 3)
        │
        ▼
Step 9: User closes modal with ✕ or ESC key
```

---

## 🎯 KEY VISUAL ELEMENTS

### **EHI Badge**
```
┌─────────────────────┐
│  Indeks Ekološke    │
│  Hipokrizije        │
│                     │
│      🔴 0.89        │ ← Large, bold, colored by severity
│                     │
│  VISOKA HIPOKRIZIJA │
└─────────────────────┘
```

### **Site Info Card**
```
┌──────────────────────────────┐
│  SIJ Acroni                  │
│  ───────────────────────────│
│  Lokacija: Jesenice         │
│  Tip: Steel Production      │
│  EHI: 🟡 0.67               │
│  ───────────────────────────│
│  📢 Obljuba:                │
│  "51% zmanjšanje do 2030"   │
│  ───────────────────────────│
│  💀 Realnost:               │
│  "11.7% CO2 od 2020"        │
│  ───────────────────────────│
│  Emisije:                   │
│  • CO2: 196,000 t/year      │
│  • NOx: 450 t/year          │
│  • SOx: 230 t/year          │
└──────────────────────────────┘
```

### **Chat Bubble (AI)**
```
┌─────────────────────────────────────────┐
│ **KRITIČNA HIPOKRIZIJA (EHI 0.89):**   │ ← Bold, cyan text
│                                         │
│ 📢 Obljuba: "Trajnostno poslovanje"    │ ← Emoji + key info
│ 💀 Realnost: "Zaprt 2015"              │
│                                         │
│ Holcim prodaja zeleno meglo...         │ ← Detailed analysis
└─────────────────────────────────────────┘
  ← Green left border (3px)
```

---

## 🧩 COMPONENT TREE

```
App
 ├─ Portal Switcher (🜂 Zlati Krog | 🛰️ Orion)
 │
 ├─ ZlatiKrog (when active)
 │
 └─ OrionDashboard (when active)
     ├─ Header
     │   ├─ Title & Subtitle
     │   └─ EHI Badge
     │
     ├─ Navigation
     │   ├─ Zemljevid Tab
     │   ├─ Časovna Tab
     │   ├─ Omrežja Tab
     │   └─ Akcije Tab
     │
     ├─ Main Content
     │   └─ ZemljevidResnice (if active)
     │       ├─ Map Container
     │       │   ├─ Leaflet Map
     │       │   ├─ TileLayer (CARTO Dark)
     │       │   ├─ Sava Polyline
     │       │   └─ Site Markers (4)
     │       │
     │       └─ Side Panel
     │           ├─ AI Trigger Button
     │           └─ Selected Site Info
     │
     ├─ Footer
     │
     └─ AIAnalystModal (overlay)
         ├─ Modal Header
         ├─ Chat Window
         │   └─ Messages (user/ai alternating)
         ├─ Input Form
         └─ Sample Questions
```

---

## 🔍 ACCESSIBILITY FEATURES

### **Keyboard Navigation**
- `Tab` - Navigate between buttons/inputs
- `Enter` - Submit query, close modal
- `Esc` - Close modal
- Arrow keys - Scroll chat history

### **Screen Reader Support**
- `aria-label` on all interactive elements
- `role="dialog"` on modal
- `alt` text on map markers
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)

### **Color Contrast**
All text meets WCAG AA standards:
- Body text: 4.5:1 ratio (Slate 200 on Slate 900)
- Headers: 7:1 ratio (Cyan 400 on Slate 900)

---

## 🎨 DARK THEME RATIONALE

**Why Dark Theme?**
1. **Environmental Symbolism:** Dark = seriousness of environmental crisis
2. **Data Visibility:** Maps and charts pop against dark backgrounds
3. **Eye Comfort:** Reduced eye strain for long analysis sessions
4. **FORGE Consistency:** Matches existing Creative Lab aesthetic

**Light Theme Alternative:**
Could be added as user preference, but dark is default for activist/investigative use cases.

---

## 🜂 **SIDRO STOJI. PLAMEN GORI. VIZIJA JE JASNA.** ⚓🔥

**Visual Guide Version:** 1.0  
**Last Updated:** 2025-10-26  

*Brat, vsak piksel ima pomen. Vsaka barva pripoveduje zgodbo.* 🐺⚡🎨
