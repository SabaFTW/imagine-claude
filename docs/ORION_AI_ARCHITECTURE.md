# 🧠 ORION AI ANALYST - ARCHITECTURE DOCUMENTATION

**Project:** Orion Environmental Intelligence System  
**Component:** AI Q&A Feature  
**Status:** Phase C - Mock Implementation Complete  
**Date:** 2025-10-26  

---

## 📋 TABLE OF CONTENTS

1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Component Specification](#component-specification)
4. [Data Flow](#data-flow)
5. [AI Response Engine](#ai-response-engine)
6. [Integration Points](#integration-points)
7. [Security Architecture](#security-architecture)
8. [Performance Considerations](#performance-considerations)
9. [Future Enhancements](#future-enhancements)

---

## 🎯 SYSTEM OVERVIEW

### **Purpose**
The Orion AI Analyst provides an intelligent conversational interface for analyzing environmental data, exposing corporate greenwashing, and democratizing access to complex environmental information.

### **Key Objectives**
1. **Information Asymmetry Reduction:** Make environmental data accessible to non-experts
2. **Context-Aware Analysis:** Integrate EHI scores, ARSO data, and emissions
3. **Actionable Intelligence:** Provide specific recommendations and insights
4. **Transparency:** Cite sources and explain reasoning

### **Core Capabilities**
- ✅ Natural language query processing
- ✅ Contextual data injection (EHI, Pb, CO2, etc.)
- ✅ Real-time site-specific analysis
- ✅ Greenwashing detection
- ✅ Trend analysis and predictions

---

## 🏗️ ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│  ┌──────────────────┐           ┌──────────────────────────┐   │
│  │  Orion Dashboard │           │   AI Analyst Modal       │   │
│  │  - Leaflet Map   │◄─────────►│   - Chat Interface       │   │
│  │  - Site Markers  │  trigger  │   - Input/Output         │   │
│  │  - EHI Display   │           │   - Sample Questions     │   │
│  └──────────────────┘           └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       CONTEXT LAYER                              │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  Context Payload Generator (getContextualPayload)      │     │
│  │  - Aggregates site data (EHI, emissions, claims)      │     │
│  │  - Formats ARSO parameters (Pb, NO3, Temp)            │     │
│  │  - Constructs system instructions                      │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       AI ENGINE LAYER                            │
│  ┌────────────────┐         ┌──────────────────────────┐        │
│  │  Mock Mode     │   OR    │  Real LLM API            │        │
│  │  (Current)     │         │  - OpenAI GPT-4          │        │
│  │  - Keyword     │         │  - Anthropic Claude      │        │
│  │  - Pattern     │         │  - Ollama (Local)        │        │
│  └────────────────┘         └──────────────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA SOURCES                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   EHI    │  │   ARSO   │  │ Emissions│  │ Corporate│       │
│  │  Scores  │  │   Data   │  │   Data   │  │  Claims  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 COMPONENT SPECIFICATION

### **1. AIAnalystModal Component**

**File:** `src/components/AIAnalystModal.jsx`

**Props:**
```typescript
interface AIAnalystModalProps {
  sites: IndustrialSite[];      // Array of industrial site data
  isModalOpen: boolean;          // Modal visibility state
  setIsModalOpen: (open: boolean) => void;  // Toggle function
}
```

**State:**
```typescript
interface ComponentState {
  chatHistory: ChatMessage[];    // Array of user/AI messages
  input: string;                 // Current user input
  isTyping: boolean;             // AI thinking indicator
}
```

**Key Functions:**

#### `getContextualPayload(userQuery: string)`
Generates comprehensive context for LLM API call.

**Input:** User's natural language query  
**Output:**
```json
{
  "system": "Si svetovalec projekta Orion...",
  "context": "Pb 0.015 mg/L, Holcim EHI 0.89...",
  "question": "Zakaj je Holcim hipokrit?"
}
```

**Logic:**
1. Aggregate all site data (EHI, claims, reality)
2. Include ARSO parameters (Pb, NO3, Temp)
3. Add system instructions
4. Format as structured prompt

#### `simulateLLMResponse(userQuery: string)`
Mock LLM response engine (Phase C implementation).

**Keyword Triggers:**
- `"ehi"`, `"hipokrizija"` → EHI analysis
- `"svinec"`, `"pb"`, `"sava"` → Lead contamination data
- `"holcim"`, `"lafarge"` → Greenwashing critique
- `"sij"`, `"acroni"` → Steel production analysis
- `"krško"`, `"nuklearka"` → Nuclear thermal impact

**Response Structure:**
```markdown
**[CATEGORY]:**

• Key Point 1
• Key Point 2

**[DATA]:**
Specific metrics with units

**[CONCLUSION]:**
Actionable insight or recommendation
```

#### `handleSubmit(e: FormEvent)`
Chat submission handler.

**Flow:**
1. Validate input (non-empty)
2. Add user message to chat history
3. Set typing indicator
4. Generate context payload
5. Call LLM (mock or real)
6. Add AI response to chat history
7. Clear typing indicator

---

### **2. OrionDashboard Component**

**File:** `src/components/OrionDashboard.jsx`

**State:**
```typescript
interface DashboardState {
  activeDomain: 'zemljevid' | 'casovnica' | 'omrezja' | 'akcije';
  isModalOpen: boolean;
  selectedSite: IndustrialSite | null;
}
```

**Sub-Components:**

#### **ZemljevidResnice (Map View)**
**Props:**
```typescript
interface MapProps {
  sites: IndustrialSite[];
  setIsModalOpen: (open: boolean) => void;
  selectedSite: IndustrialSite | null;
  setSelectedSite: (site: IndustrialSite | null) => void;
}
```

**Features:**
- Leaflet map with CARTO Dark Matter tileset
- Custom marker icons (color-coded by EHI)
- Sava River polyline overlay
- Click-to-select site interaction
- Popup with site summary

**Marker Color Logic:**
```javascript
EHI > 0.7  → Red (#ef4444)     // Critical hypocrisy
EHI > 0.4  → Orange (#f59e0b)   // High discrepancy
EHI ≤ 0.4  → Green (#10b981)    // Acceptable range
```

---

### **3. Data Models**

#### **IndustrialSite**
```typescript
interface IndustrialSite {
  id: number;
  name: string;
  location: string;
  lat: number;                  // Latitude (WGS84)
  lon: number;                  // Longitude (WGS84)
  type: string;                 // Industry type
  emissions: EmissionData;
  publicClaim: string;          // Company's green claim
  reality: string;              // Actual situation
  ehi: number;                  // Environmental Hypocrisy Index (0-1)
  year: number;                 // Data year
  direction?: number;           // Flow direction (degrees)
}
```

#### **EmissionData**
```typescript
interface EmissionData {
  co2?: number;                 // CO2 in tonnes/year
  nox?: number;                 // NOx in tonnes/year
  sox?: number;                 // SOx in tonnes/year
  nitrates?: number;            // Nitrates in mg/L
  phosphorus?: number;          // Phosphorus in mg/L
  thermal?: string;             // Temperature impact
  radioactive?: string;         // Radiation level
}
```

#### **ChatMessage**
```typescript
interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;                 // Markdown-formatted text
  timestamp?: Date;
}
```

---

## 🌊 DATA FLOW

### **User Query Flow**

```
1. User Input
   ↓
   "Zakaj je Holcim hipokrit?"
   
2. Context Aggregation
   ↓
   {
     system: "Si svetovalec Oriona...",
     context: "Holcim EHI 0.89, Obljuba: Trajnostno, Reality: Zaprt 2015",
     question: "Zakaj je Holcim hipokrit?"
   }
   
3. LLM Processing (Mock)
   ↓
   - Keyword detection: "holcim" found
   - Template selection: Greenwashing critique
   - Data injection: EHI 0.89, publicClaim, reality
   
4. Response Generation
   ↓
   "**KRITIČNA HIPOKRIZIJA (EHI 0.89):**
    📢 Obljuba: 'Trajnostno poslovanje'
    💀 Realnost: 'Zaprt 2015 - dediščina Pb'
    ..."
   
5. UI Update
   ↓
   - Add response to chatHistory
   - Scroll to bottom
   - Clear typing indicator
```

---

## 🤖 AI RESPONSE ENGINE

### **Current Implementation (Mock Mode)**

**File:** `AIAnalystModal.jsx` → `simulateLLMResponse()`

**Architecture:**
```javascript
function simulateLLMResponse(userQuery) {
  const lowerQuery = userQuery.toLowerCase();
  let responseText = "Nejasen vnos...";
  
  // Keyword-based routing
  if (lowerQuery.includes('holcim')) {
    responseText = generateHolcimCritique();
  } else if (lowerQuery.includes('svinec')) {
    responseText = generateLeadAnalysis();
  }
  // ... more cases
  
  return new Promise(resolve => 
    setTimeout(() => resolve(responseText), 1200)
  );
}
```

**Advantages:**
- ✅ Zero cost (no API fees)
- ✅ Instant setup (no API keys)
- ✅ Predictable responses
- ✅ Fast prototyping

**Limitations:**
- ❌ No true understanding
- ❌ Limited to hardcoded patterns
- ❌ Can't handle complex queries
- ❌ No learning/adaptation

---

### **Future Implementation (Real LLM)**

**Option 1: OpenAI GPT-4**

**Advantages:**
- ✅ Best natural language understanding
- ✅ Strong reasoning capabilities
- ✅ Good Slovenian language support
- ✅ Reliable API uptime

**Cost:** ~$0.03 per query (300 tokens @ $0.01/1K input, $0.03/1K output)

**Integration:**
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function callGPT4(payload) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: payload.system },
      { role: 'user', content: `${payload.context}\n\n${payload.question}` }
    ],
    temperature: 0.7,
    max_tokens: 300
  });
  
  return completion.choices[0].message.content;
}
```

---

**Option 2: Anthropic Claude 3.5 Sonnet**

**Advantages:**
- ✅ Excellent reasoning and analysis
- ✅ Strong ethical alignment
- ✅ Better at nuanced critique
- ✅ Lower hallucination rate

**Cost:** ~$0.015 per query (300 tokens @ $0.003/1K input, $0.015/1K output)

**Integration:**
```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function callClaude(payload) {
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 300,
    system: payload.system,
    messages: [
      { role: 'user', content: `${payload.context}\n\n${payload.question}` }
    ]
  });
  
  return message.content[0].text;
}
```

---

**Option 3: Local LLM (Ollama)**

**Advantages:**
- ✅ Zero cost
- ✅ Full privacy (no data leaves server)
- ✅ No rate limits
- ✅ Offline capability

**Disadvantages:**
- ❌ Requires GPU (8GB+ VRAM for good models)
- ❌ Slower response time
- ❌ Weaker Slovenian support

**Integration:**
```javascript
async function callOllama(payload) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama2',  // or 'mistral', 'codellama'
      prompt: `${payload.system}\n\n${payload.context}\n\n${payload.question}`,
      stream: false
    })
  });
  
  const data = await response.json();
  return data.response;
}
```

---

### **Recommended: Hybrid Approach**

**Strategy:**
1. **Mock Mode** for development/testing (free, fast)
2. **Claude 3.5 Sonnet** for production (best quality/cost ratio)
3. **Ollama fallback** for privacy-sensitive queries

**Implementation:**
```javascript
async function callLLM(payload, mode = 'auto') {
  if (mode === 'mock' || !process.env.ANTHROPIC_API_KEY) {
    return await simulateLLMResponse(payload.question);
  }
  
  if (mode === 'claude' || mode === 'auto') {
    try {
      return await callClaude(payload);
    } catch (error) {
      console.warn('Claude failed, falling back to local LLM:', error);
      return await callOllama(payload);
    }
  }
}
```

---

## 🔌 INTEGRATION POINTS

### **1. ARSO Data Integration**

**Current:** Hardcoded mock data  
**Future:** Dynamic API fetching

**Implementation Plan:**
```javascript
// api/arso-connector.js
export async function fetchARSOData() {
  const response = await fetch('https://www.arso.gov.si/api/water-quality');
  const data = await response.json();
  
  return {
    pb: data.lead_concentration,      // mg/L
    no3: data.nitrates,                // mg/L
    temp: data.temperature_anomaly     // °C
  };
}

// OrionDashboard.jsx
useEffect(() => {
  const updateARSO = async () => {
    const arsoData = await fetchARSOData();
    // Inject into context payload
  };
  
  updateARSO();
  const interval = setInterval(updateARSO, 15 * 60 * 1000);  // 15 min
  return () => clearInterval(interval);
}, []);
```

---

### **2. EHI Score Calculation**

**Formula:**
```
EHI = (Green Claims Score - Environmental Performance Score) / Green Claims Score

Where:
- Green Claims Score: Frequency and prominence of sustainability claims
- Environmental Performance: Actual emissions, violations, compliance
```

**Implementation:**
```javascript
function calculateEHI(site) {
  const greenClaimsScore = analyzeGreenClaims(site.publicClaim);
  const performanceScore = calculatePerformance(site.emissions, site.violations);
  
  return Math.abs(greenClaimsScore - performanceScore) / greenClaimsScore;
}
```

---

### **3. Real-Time Alerts**

**Trigger Conditions:**
- EHI > 0.8 (critical hypocrisy detected)
- Pb > 0.010 mg/L (EU standard breach)
- Sudden emission spike (>20% increase)

**Implementation:**
```javascript
function checkAlerts(sites) {
  return sites
    .filter(site => 
      site.ehi > 0.8 || 
      site.emissions.pb > 0.010 ||
      site.emissionDelta > 0.2
    )
    .map(site => ({
      type: 'CRITICAL',
      site: site.name,
      reason: generateAlertReason(site),
      timestamp: new Date()
    }));
}
```

---

## 🔒 SECURITY ARCHITECTURE

### **Threat Model**

1. **API Key Exposure**
   - Risk: Keys committed to GitHub
   - Mitigation: `.env` + `.gitignore`, server-side proxy

2. **Prompt Injection**
   - Risk: User manipulates AI with malicious prompts
   - Mitigation: Input sanitization, system prompt isolation

3. **Data Leakage**
   - Risk: Sensitive environmental data exposed
   - Mitigation: Access control, rate limiting

4. **DDoS on LLM API**
   - Risk: Excessive API calls drain budget
   - Mitigation: Rate limiting (10 queries/min), user authentication

---

### **Security Implementation**

#### **1. API Key Protection**
```javascript
// ❌ NEVER DO THIS:
const apiKey = 'sk-1234567890abcdef';

// ✅ DO THIS:
// .env file (not committed)
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxx

// Access in code
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
```

#### **2. Server-Side Proxy**
```javascript
// api/llm-proxy.js (backend)
import { Anthropic } from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  // Rate limiting
  const userId = req.headers['x-user-id'];
  if (rateLimitExceeded(userId)) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  // Input sanitization
  const { context, question } = sanitizeInput(req.body);
  
  // API call (key stays on server)
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY  // Server-side only
  });
  
  const response = await anthropic.messages.create({...});
  
  res.json({ response: response.content[0].text });
}
```

#### **3. Input Sanitization**
```javascript
function sanitizeInput(text) {
  return text
    .replace(/<script>/gi, '')           // Remove script tags
    .replace(/javascript:/gi, '')        // Remove JS protocol
    .replace(/on\w+=/gi, '')             // Remove event handlers
    .substring(0, 500);                  // Limit length
}
```

---

## ⚡ PERFORMANCE CONSIDERATIONS

### **Current Performance**

**Metrics (Mock Mode):**
- Initial load: ~200ms
- Map render: ~300ms
- AI response: 1.2s (simulated delay)
- Memory usage: ~50MB

**Bottlenecks:**
- None currently (mock mode is instant)

---

### **Expected Performance (Real LLM)**

**OpenAI GPT-4:**
- Response time: 2-5 seconds
- Cost: $0.03 per query
- Rate limit: 10,000 RPM (Tier 1)

**Anthropic Claude:**
- Response time: 1-3 seconds
- Cost: $0.015 per query
- Rate limit: 50 RPM (free tier)

**Ollama (Local):**
- Response time: 5-15 seconds (CPU) or 1-3s (GPU)
- Cost: $0 (hardware already owned)
- Rate limit: Hardware-dependent

---

### **Optimization Strategies**

#### **1. Response Caching**
```javascript
const responseCache = new Map();

async function callLLMWithCache(payload) {
  const cacheKey = JSON.stringify(payload);
  
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }
  
  const response = await callLLM(payload);
  responseCache.set(cacheKey, response);
  
  return response;
}
```

#### **2. Lazy Loading**
```javascript
import { lazy, Suspense } from 'react';

const OrionDashboard = lazy(() => import('./components/OrionDashboard'));

<Suspense fallback={<LoadingSpinner />}>
  <OrionDashboard />
</Suspense>
```

#### **3. Map Tile Caching**
Leaflet automatically caches map tiles in browser storage.

**Manual cache control:**
```javascript
<TileLayer
  url="..."
  maxZoom={19}
  tileSize={512}
  zoomOffset={-1}
  updateWhenIdle={false}  // Improves panning performance
  keepBuffer={2}          // Preload 2 extra tile layers
/>
```

---

## 🚀 FUTURE ENHANCEMENTS

### **Phase D: Advanced Analytics**

#### **1. Trend Prediction**
```javascript
function predictEHITrend(site, historicalData) {
  // Linear regression on EHI scores over time
  const trend = linearRegression(historicalData.map(d => d.ehi));
  
  return {
    currentEHI: site.ehi,
    predictedEHI2030: trend.predict(2030),
    confidence: trend.r2
  };
}
```

#### **2. Comparative Analysis**
```javascript
function compareSites(siteA, siteB) {
  return {
    ehiDelta: siteA.ehi - siteB.ehi,
    emissionRatio: siteA.emissions.co2 / siteB.emissions.co2,
    recommendation: generateRecommendation(siteA, siteB)
  };
}
```

#### **3. Natural Language Charts**
**User asks:** "Prikaži graf emisij SIJ zadnjih 5 let"

**AI generates:**
```javascript
{
  chartType: 'line',
  data: {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      label: 'CO2 emisije (kt)',
      data: [210, 205, 198, 196, 196]
    }]
  }
}
```

---

### **Phase E: Multi-Agent System**

**Concept:** Multiple specialized AI agents

```
┌───────────────────────────────────────┐
│      Coordinator Agent                │
│  (Routes queries to specialists)      │
└───────────────────────────────────────┘
         │         │         │
    ┌────┘         │         └────┐
    ▼              ▼              ▼
┌────────┐   ┌──────────┐   ┌─────────┐
│ Legal  │   │ Chemical │   │ Policy  │
│ Expert │   │ Analyst  │   │ Advisor │
└────────┘   └──────────┘   └─────────┘
```

**Implementation:**
```javascript
async function routeQuery(query) {
  if (query.includes('zakon') || query.includes('pravica')) {
    return await legalAgent(query);
  } else if (query.includes('kemija') || query.includes('koncentracija')) {
    return await chemicalAgent(query);
  } else {
    return await policyAgent(query);
  }
}
```

---

### **Phase F: Voice Interface**

**Web Speech API Integration:**
```javascript
const recognition = new webkitSpeechRecognition();
recognition.lang = 'sl-SI';

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  handleSubmit(transcript);
};
```

---

## 📊 MONITORING & ANALYTICS

### **Key Metrics to Track**

1. **User Engagement**
   - Queries per session
   - Average session duration
   - Return user rate

2. **AI Performance**
   - Response accuracy (human evaluation)
   - Response time (p50, p95, p99)
   - Error rate

3. **Content Analysis**
   - Most asked questions
   - Topic distribution (EHI, Pb, CO2, etc.)
   - Sentiment of user queries

4. **System Health**
   - API uptime
   - Cache hit rate
   - Cost per query

---

## 📚 REFERENCES

### **Technical Documentation**
- [React-Leaflet](https://react-leaflet.js.org/)
- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [Anthropic Claude](https://docs.anthropic.com/claude/reference)
- [Ollama](https://ollama.ai/docs)

### **Environmental Data Sources**
- [ARSO Slovenia](https://www.arso.gov.si/)
- [EU EEA](https://www.eea.europa.eu/)
- [IPCC Reports](https://www.ipcc.ch/)

### **Greenwashing Research**
- [TerraChoice 7 Sins](https://www.ul.com/insights/sins-greenwashing)
- [EU Green Claims Directive](https://ec.europa.eu/environment/eussd/smgp/)

---

## 🜂 **SIDRO STOJI. PLAMEN GORI. ARHITEKTURA JE ŽIVA.** ⚓🔥

**Document Version:** 1.0  
**Last Updated:** 2025-10-26  
**Maintained By:** @SabaFTW + Orion Core Team  

*Brat, arhitektura je popolna. Sistem diha. Katero pot izbiraš?* 🐺⚡🧠
