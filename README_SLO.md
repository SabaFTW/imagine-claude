# 🔥 CREATIVE LAB - Navodila 🔥

## Kaj je to?

Creative Lab je živa aplikacija za **RITUAL RECIPES** - alkemistični pristop k ustvarjalnosti in delu. 
Vsak ritual predstavlja različno fazo kreativnega procesa.

## 🚀 Kako zagnati

### Enostaven način:
```bash
cd /home/saba/Desktop/Saba_Place/creative-lab
bash start.sh
```

To bo:
1. Namestilo vse potrebne pakete (če še niso)
2. Zagnalo development server
3. Odprlo aplikacijo v brskalniku na `http://localhost:3000`

### Ročno:
```bash
cd /home/saba/Desktop/Saba_Place/creative-lab

# Namesti pakete (samo prvič)
npm install

# Zaženi development server
npm run dev
```

## 🔧 Diagnostic Check

Če nekaj ne dela, poženi:
```bash
bash check.sh
```

To bo preverilo:
- Ali imaš Node.js in npm
- Ali so vsi paketi nameščeni
- Ali so vse potrebne datoteke prisotne

## 🜂 Rituali

### 🜃 NIGREDO
Razgradnja • Delo s senco • Lomljenje vzorcev
- **Ingredienti**: JSON strukture, meditacija, refaktoriranje kode
- **Aktivacija**: Požgi staro kodo, spopadi se s tehničnim dolgom

### 🜄 ALBEDO
Čiščenje • Jasnost • Strukturna integriteta
- **Ingredienti**: Whiteboard seje, arhitekturni diagrami, dokumentacija
- **Aktivacija**: Počisti workspace, piši teste, poenostavi sisteme

### 🜂 RUBEDO
Aktivacija • Strast • Ustvarjalni ogenj
- **Ingredienti**: Kava, deadline pritisk, flow state glasba
- **Aktivacija**: Shipaš kodo, deployaš feature, launchaš produkte

### ⚯ OUROBOROS
Ciklično učenje • Feedback zanke • Iteracija
- **Ingredienti**: Analytics, error logi, performance metrike
- **Aktivacija**: Preglej podatke, A/B testiraj, optimiziraj

### 🜁 ECHO EMERGENCY
Resonanca • Komunikacija • Ojačanje signala
- **Ingredienti**: Community feedback, socialni mediji, dokumentacija
- **Aktivacija**: Deli znanje, mentoriraj druge, ustvari tutorial

## 📱 Funkcionalnosti

- **Klikni na ritual** → Prikaže detajle rituala
- **🎲 ACTIVATE RANDOM RITUAL** → Naključno izbere ritual za danes
- **📜 SHOW HISTORY** → Prikaže zadnjih 10 aktiviranih ritualov
- **Dinamični pozdrav** → Spreminja se glede na uro dneva

## 🛠️ Tehnologije

- **React 18** - UI framework
- **Vite** - Build tool (hitrejši od Webpack!)
- **Tailwind CSS** - Za styling
- **Cinzel font** - Za liturgični/alkemistični vibe

## 📂 Struktura

```
creative-lab/
├── src/
│   ├── App.jsx         # Glavna komponenta
│   ├── App.css         # Styling
│   ├── main.jsx        # Entry point
│   └── index.css       # Recipe styling
├── public/
│   ├── flame.svg       # Ikona plamena
│   └── *.png           # Ostale ikone
├── index.html          # HTML template
├── start.sh            # Quick start script
├── check.sh            # Diagnostic script
└── package.json        # Dependencies

```

## 🎨 Personalizacija

Vse je modularizirano, tako da lahko enostavno:

1. **Dodaš nove rituale** v `App.jsx` → `recipes` objekt
2. **Spremeniš barve** v `App.css` → `:root` CSS spremenljivke
3. **Dodaš nove funkcionalnosti** → Vse je React, tako da je easy

## 🐛 Če kaj ne dela

1. Preveri Node.js verzijo: `node --version` (potrebuješ 16+)
2. Poženi diagnostic: `bash check.sh`
3. Izbriši `node_modules` in `package-lock.json`, nato:
   ```bash
   npm install
   npm run dev
   ```

## 🔥 Production Build

Ko si pripravljen za deployment:
```bash
npm run build
```

To ustvari optimizirano verzijo v `dist/` direktoriju.

## 💡 Tips

- Pritisni **Ctrl+C** v terminalu za ustavitev serverja
- Vite ima **hot reload** - spremembe se prikažejo takoj brez refresha!
- Za production deployment lahko uporabiš **Netlify**, **Vercel**, ali karkoli že

---

**Ustvarjeno s 🔥 in alkemijo**

Za vprašanja ali težave - javi! 💚
