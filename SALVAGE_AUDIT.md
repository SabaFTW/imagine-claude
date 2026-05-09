# SALVAGE AUDIT — imagine-claude
**Repo:** `sabaftw/imagine-claude`  
**Auditor role:** Salvage engineer  
**Date:** 2026-05-09  
**Branch:** `claude/salvage-component-audit-7k5V4`

---

## SYSTEM SNAPSHOT

| Item | Value |
|------|-------|
| Framework | React 18.2 + Vite 7.3 |
| Styling | Tailwind CSS (CDN) + inline styles + component CSS |
| Routing | Hash-based (`window.location.hash`) — no library |
| PWA | Service Worker + manifest.json + iOS safe-area |
| Icons | Lucide React + emoji glyph system |
| Charts | Chart.js, Recharts |
| Maps | Leaflet + react-leaflet |
| Audio | Tone.js / Web Audio API |
| Security | DOMPurify + custom escapeHtml |
| Deploy | GitHub Pages via `gh-pages` |
| Language | Mixed Slovenian / English |

**Base color:** `#0a0515` (near-black deep purple)  
**Accent palette:** cosmic purple `#7b3fa8` · fire orange `#ff8a50` · amber `#f4c261` · cyan `#22d3ee` · green `#4caf50`

---

## COMPONENT REGISTRY

---

### 1. DynamicIsland
**Source:** `src/components/DynamicIsland.jsx` (100 lines)  
**Purpose:** Fixed top bar that simulates the iPhone 15 Pro Dynamic Island — breathing glow pill that adapts color to the current view.

**Visual style:** Dark pill on `#0a0515`, layered `box-shadow` glow in three radii; 4-second breathing keyframe.  
**Interaction style:** Purely decorative. `pointerEvents: none`. No click target.  
**Mobile friendly:** Yes — uses `env(safe-area-inset-top)` with a fallback of 59px. Content scrolls under it.  
**Cognitive load:** Low  
**Reuse value:** High  
**Extraction difficulty:** Easy  
**Risk flags:** None  
**Best reuse target:** Ghostline / shared visual library  
**Verdict:** Best piece in the repo. Drop-in ambient status indicator. The theming interface (4 named color sets) is clean; add more variants and ship it.

---

### 2. EntityCard
**Source:** `src/components/EntityCard.jsx` (25 lines)  
**Purpose:** Selectable card for a named entity — emoji icon, title, description; three visual states (default / active / special).

**Visual style:** Dark card, border-2, rounded-xl; amber highlight on active, white highlight for special "RESNICA" state. Lift on hover with `translate-y`.  
**Interaction style:** Single click toggles active. No keyboard handling.  
**Mobile friendly:** Yes — full-width on small screens, grid-cols-5 on large.  
**Cognitive load:** Low  
**Reuse value:** High  
**Extraction difficulty:** Easy  
**Risk flags:** None  
**Best reuse target:** Ghostline / shared visual library  
**Verdict:** The cleanest component in the repo. 25 lines, zero deps beyond React. Perfect card primitive.

---

### 3. SafeComponents
**Source:** `src/components/SafeComponents.jsx` (137 lines)  
**Purpose:** XSS defense kit — `escapeHtml`, `SafeLink` (blocks `javascript:` / `data:` / `vbscript:` / `file:` protocols), `SafeHtml` (DOMPurify wrapper), `SafeUserContent` (author + votes + verified badge).

**Visual style:** Minimal; `SafeLink` shows strikethrough + ⚠️ on blocked URLs.  
**Interaction style:** Passive safety wrappers. No user interaction beyond the link fallback.  
**Mobile friendly:** N/A — utility  
**Cognitive load:** Low  
**Reuse value:** High  
**Extraction difficulty:** Easy  
**Risk flags:** Dependency-heavy (DOMPurify) — but DOMPurify is worth keeping  
**Best reuse target:** Shared visual library / both ConsMAP and Ghostline  
**Verdict:** Production-grade. Ship this as a standalone security utility. The protocol blocklist is solid.

---

### 4. CommandCenter
**Source:** `src/CommandCenter.jsx` (833 lines)  
**Purpose:** Primary navigation hub. Displays 40 portal cards in an auto-fit grid. Includes breathing cosmos background, floating DOM particles, Konami code easter egg, Ghost Mode overlay.

**Visual style:** Deep `#0a0515` base. Radial gradient "breathing cosmos" animation. Cards: `linear-gradient(145deg, rgba(26,11,46,0.85), rgba(10,5,21,0.95))` with `backdropFilter: blur(12px)`. Hover lifts card 8px + fire-orange border glow.  
**Interaction style:** Card click triggers 300ms loading delay then hash navigation. Touch events (onTouchStart/End) scale card to 0.97 for haptic feel. Konami code: 10-second Ghost Mode overlay.  
**Mobile friendly:** Mostly — auto-fit grid collapses well. Inline media query forces h1 to `2rem`. Touch handling is explicit.  
**Cognitive load:** High — 40 cards dumped at once with no grouping or progressive reveal  
**Reuse value:** Medium — the card grid pattern is excellent; the 40-card dump is not  
**Extraction difficulty:** Medium  
**Risk flags:** Visual clutter · entropy risk · duplicate (two "orion" sphere IDs) · localhost external links (oltar, serpent-gate) · DOM particle injection bypasses React lifecycle  
**Best reuse target:** Inspiration only (card hover pattern) / ConsMAP (grouped portal grid)  
**Verdict:** The card-hover-lift-glow pattern is the best visual interaction in the file. The 40-portal flat dump is the worst UX decision. Never ship 40 equals-weight items on one screen.

---

### 5. ZlatiKrog
**Source:** `src/components/ZlatiKrog.jsx` (162 lines)  
**Purpose:** Golden Circle portal — 5 entity cards in a grid, concentric rotating ring animation at center, clickable heartbeat toggle, RESNICA modal reveal.

**Visual style:** Three concentric `border` circles with `animate-spin-slow/medium/fast` (requires Tailwind plugin or custom CSS). Amber `#f59e0b` palette throughout.  
**Interaction style:** Heartbeat click toggles pulse speed (2s ↔ 800ms). Entity click sets active card. RESNICA click opens a full-screen modal with confidence-graded evidence sections.  
**Mobile friendly:** Partially — the 320px fixed circle will overflow on very narrow screens (iPhone SE). Entity grid collapses to 1 col on mobile.  
**Cognitive load:** Medium — circle is visually clear; RESNICA modal is a long scrollable text wall  
**Reuse value:** Medium — rotating ring animation + heartbeat toggle are extractable; content is deeply personal  
**Extraction difficulty:** Medium  
**Risk flags:** Tightly coupled (entity content is hardcoded) · RESNICA modal is a text wall · rotating animations require custom Tailwind config (`animate-spin-slow` not in Tailwind core) · unclear purpose to outside reader  
**Best reuse target:** Ghostline (orbit ring animation) / inspiration only (heartbeat toggle pattern)  
**Verdict:** The orbit ring + pulsing center idiom is a genuine UI jewel. The RESNICA content is dense and personal. Extract the animation concept, not the component.

---

### 6. AstralSonicPortal
**Source:** `src/components/portals/AstralSonicPortal/AstralSonicPortal.jsx` (192 lines) + `AstralSonicPortal.css` (210 lines)  
**Purpose:** 6-agent frequency portal using Web Audio API. Agents arranged in a circular sigil layout via CSS `rotate() translate() rotate()` trick. Central flame triggers full harmony playback.

**Visual style:** Radial gradient dark background. Gradient clip text header. Agent sigils as colored circles with `box-shadow` glow matching `--agent-color`. Consciousness stream log with left-border accent.  
**Interaction style:** Click agent sigil → play sine oscillator at that agent's Hz. Click central flame → staggered playback of all 6 agents (500ms delay each). Toggle sound on/off stops all oscillators.  
**Mobile friendly:** Partially — media query at 768px shrinks wheel from 400px to 300px and adjusts translate radius. Still fixed-size, may clip on iPhone SE.  
**Cognitive load:** Medium — circular layout is intuitive; the controls + stream + status bar + footer is crowded  
**Reuse value:** Medium — circular agent layout pattern is excellent; Web Audio integration is rare and valuable  
**Extraction difficulty:** Medium  
**Risk flags:** Dependency-heavy (Web Audio API, AudioContext cleanup) · stale oscillator refs risk memory leaks if cleanup fails · stream log grows unbounded  
**Best reuse target:** Ghostline (orbital UI pattern + audio trigger concept)  
**Verdict:** The CSS-only circular orbit via `rotate(angle) translate(r) counter-rotate(angle)` is a clever pattern worth preserving. The audio synthesis is a genuine interaction novelty. Extract both.

---

### 7. OrionDashboard
**Source:** `src/components/OrionDashboard.jsx` (~946 lines)  
**Purpose:** 6-tab environmental analysis dashboard — Leaflet map of Slovenian industrial sites, EHI scoring, timeline, network graph, legal actions, EU finance flows, portal links. Embeds AIAnalystModal and FinanceFlowsModule.

**Visual style:** Dark slate palette. Lucide icons. Color-coded EHI markers (red/amber/green). Tab strip with active border-bottom highlight.  
**Interaction style:** Tab switching. Map marker click → site detail panel. AI chat modal open/close. Site card hover.  
**Mobile friendly:** Partially — Leaflet maps require explicit height and can be awkward on mobile. Tabs may overflow on narrow screens.  
**Cognitive load:** High — 6 tabs × complex content each  
**Reuse value:** Low (as whole) / High (patterns inside: EHI badge, tab strip, map marker color logic)  
**Extraction difficulty:** Hard  
**Risk flags:** Tightly coupled · dependency-heavy (Leaflet, Recharts, Chart.js, Lucide) · routing-bound (opened via hash) · 946 lines is a monolith · hardcoded Slovenian environmental data  
**Best reuse target:** Archive only (data is Slovenia-specific) / ConsMAP (EHI scoring pattern, tab strip)  
**Verdict:** Too married to its domain data to generalize. The tab strip and EHI colored dot patterns are clean and worth lifting. The monolith should never be used as-is.

---

### 8. AIAnalystModal
**Source:** `src/components/AIAnalystModal.jsx` (~332 lines)  
**Purpose:** Slide-over chat modal for querying an LLM (Gemini API with mock fallback) about environmental data. Includes context payload builder, typing indicator, auto-scroll.

**Visual style:** Full-screen overlay (`fixed inset-0`) with dark panel. Chat bubbles: AI left-aligned purple, user right-aligned slate. Typing indicator with animated dots.  
**Interaction style:** Enter key or Send button submits. useRef auto-scrolls to latest message. Close via X button or outside-click (not implemented — X only).  
**Mobile friendly:** Mostly — fixed inset fills screen. Input stays at bottom. 16px font size prevents iOS zoom.  
**Cognitive load:** Low — standard chat UI  
**Reuse value:** High — the pattern is clean and the Gemini API wiring is a useful template  
**Extraction difficulty:** Medium (needs Gemini API key env var and context payload abstraction)  
**Risk flags:** Routing-bound · Gemini API key must be in `.env` (missing = mock mode) · no outside-click close  
**Best reuse target:** ConsMAP / Ghostline (as a general contextual AI chat widget)  
**Verdict:** The cleanest chat modal in the codebase. Solid auto-scroll pattern, good typing indicator, graceful mock fallback. Extract and generalize the context payload builder.

---

### 9. FinanceFlowsModule
**Source:** `src/components/FinanceFlowsModule.jsx` (~427 lines)  
**Purpose:** EU climate finance visualization vs Sava river contamination. Bar charts (Recharts), data tables, expandable sections.

**Visual style:** Dark card containers. Recharts with custom colors. Expandable accordion sections.  
**Interaction style:** Accordion toggle (expand/collapse sections). Chart hover tooltips via Recharts default.  
**Mobile friendly:** Partially — Recharts ResponsiveContainer handles width but tall content stacks.  
**Cognitive load:** High — dense data presentation  
**Reuse value:** Low — data is domain-specific; Recharts accordion pattern is generic  
**Extraction difficulty:** Hard  
**Risk flags:** Tightly coupled · dependency-heavy · stale (data is static 2024-2025)  
**Best reuse target:** Archive only / inspiration only (accordion + chart pattern)  
**Verdict:** The expandable chart-section pattern is worth noting. The component itself is too domain-specific to reuse.

---

### 10. MorningPortal
**Source:** `src/MorningPortal.jsx` (~150+ lines)  
**Purpose:** Daily greeting portal with tab navigation. 10 "Decad" AI members each offer 4 rotating greetings. Live clock. Search bar.

**Visual style:** Green-accented (unique among views). Warm greeting cards per entity.  
**Interaction style:** Tab to switch between Greetings / Docs / Updates. Live 1-second clock tick. Search filters visible content.  
**Mobile friendly:** Yes — single column layout, standard tab strip.  
**Cognitive load:** Low  
**Reuse value:** Medium — the live-clock tab layout is a clean daily-check-in pattern  
**Extraction difficulty:** Easy  
**Risk flags:** Tightly coupled (content is deeply personal/Slovenian) · stale (greetings are hardcoded)  
**Best reuse target:** Inspiration only (daily greeting + clock pattern)  
**Verdict:** Clean daily-orientation UX. The concept (morning context + live clock + quick-tab access to docs) is worth stealing for any productivity tool.

---

### 11. App.jsx (Router)
**Source:** `src/App.jsx` (131 lines)  
**Purpose:** Root component — hash-based view router, global DynamicIsland, global back button.

**Visual style:** The back button is a fixed element with Tailwind slate styling: `bg-slate-800 text-slate-400 hover:bg-slate-700`.  
**Interaction style:** hashchange event listener drives view state. Theme color is derived from current view string. All 24+ components mounted conditionally (no lazy loading).  
**Mobile friendly:** Yes — back button positioned using `env(safe-area-inset-top)`.  
**Cognitive load:** Low  
**Reuse value:** High — the hash-router-without-library pattern is portable and dependency-free  
**Extraction difficulty:** Easy  
**Risk flags:** No lazy loading (all 24 components imported at once at startup) · entropy risk (view list will grow without discipline)  
**Best reuse target:** Ghostline / ConsMAP (hash router pattern)  
**Verdict:** Elegant zero-dependency SPA router. The `getThemeColor()` per-view pattern feeds cleanly into DynamicIsland. Add `React.lazy()` and this becomes production-worthy.

---

### 12. index.css (Global Styles)
**Source:** `src/index.css` (100 lines)  
**Purpose:** PWA safe-area insets, iOS height fix, input font-size zoom prevention, orphaned `.ritual-recipes` styles.

**Visual style:** Functional only.  
**Mobile friendly:** Yes — the entire file is mobile/iOS hardening.  
**Cognitive load:** Low  
**Reuse value:** High — the iOS PWA block (`-webkit-fill-available`, `overscroll-behavior`, `safe-area-inset`) is copy-paste ready  
**Extraction difficulty:** Easy  
**Risk flags:** Contains orphaned `.ritual-recipes`, `.recipe-card`, `.random-button` styles that appear to belong to a removed component  
**Best reuse target:** Shared visual library (iOS PWA reset block)  
**Verdict:** The iOS PWA reset block is production-ready and should be extracted verbatim into any mobile-first project.

---

## TOP 10: BEST REUSABLE COMPONENTS

| Rank | Item | Why |
|------|------|-----|
| 1 | `DynamicIsland` | Zero-dep ambient status bar with breathing animation + theme variants |
| 2 | `EntityCard` | 25-line selectable card primitive — clean states, no deps |
| 3 | `SafeComponents` | Production XSS kit — escapeHtml + SafeLink + SafeHtml |
| 4 | Hash Router (App.jsx) | Dependency-free SPA routing with per-view theming |
| 5 | iOS PWA Reset (index.css) | Complete mobile/iOS hardening block |
| 6 | `AIAnalystModal` | Clean chat modal with graceful mock fallback |
| 7 | Orbital sigil layout (AstralSonicPortal.css) | CSS-only circular node placement |
| 8 | Card hover pattern (CommandCenter) | translateY + border-color + box-shadow lift |
| 9 | Consciousness stream log | Left-border accent feed with prepend-and-slice state |
| 10 | Status indicator pill | Dot + text badge with pulse animation |

---

## TOP 10: BEST VISUAL PATTERNS

| Rank | Pattern | Location | Note |
|------|---------|----------|------|
| 1 | Breathing glow island | DynamicIsland | Box-shadow animate at 4s, 3-layer glow |
| 2 | Cosmos breathe background | CommandCenter | Radial gradient position shift, 10s cycle |
| 3 | Gradient-clip text | CommandCenter header, AstralSonicPortal h1 | `background-clip: text` with moving gradient |
| 4 | Card lift + border glow | CommandCenter portal cards | translateY(-8px) + border-color + shadow transition |
| 5 | Orbit ring triple | ZlatiKrog | 3 `border` rings at inset-0, inset-4, inset-8 with different spin speeds |
| 6 | Orbital sigil placement | AstralSonicPortal | `rotate(angle) translate(r) counter-rotate(angle)` — CSS only |
| 7 | Sigil pulse center | CommandCenter, ZlatiKrog | Scale + drop-shadow keyframe on emoji |
| 8 | EHI color dot | OrionDashboard | 3-tier color (red/amber/green) on a 6px dot |
| 9 | Ghost Mode overlay | CommandCenter | `hue-rotate(180deg) blur(8px)` full-screen filter |
| 10 | Inset frosted card | CommandCenter cards | `backdropFilter: blur(12px)` + `inset 0 1px 0 rgba(white,0.08)` |

---

## TOP 10: BEST NAVIGATION IDEAS

| Rank | Pattern | Location | Note |
|------|---------|----------|------|
| 1 | Global fixed back button | App.jsx | Always one tap back to hub; safe-area aware |
| 2 | Hash routing without library | App.jsx | `hashchange` listener, zero overhead |
| 3 | Per-view theme color | App.jsx → DynamicIsland | The active screen changes the ambient glow |
| 4 | Portal grid hub | CommandCenter | Icon + title + desc + status for each destination |
| 5 | Status pill (ACTIVE/COMING SOON) | CommandCenter | One-glance readiness indicator per portal |
| 6 | Tab strip with active state | OrionDashboard, MorningPortal | Border-bottom highlight, no library needed |
| 7 | Loading portal indicator | CommandCenter | 300ms delay + pulsing icon before navigation |
| 8 | External vs internal routing | CommandCenter `navigate()` | `window.location.href` vs `hash` cleanly separated |
| 9 | Scroll-under fixed header | DynamicIsland | `pointerEvents: none` island, content flows freely |
| 10 | Anchor-to-section pattern | Docs.jsx (uncertain) | Docs hub links to documentation sections |

---

## TOP 10: BEST DOCS UX PATTERNS

| Rank | Pattern | Location | Note |
|------|---------|----------|------|
| 1 | Confidence-graded evidence | ZlatiKrog RESNICA modal | Visoko/Srednje/Nizko badge per section — progressive trust |
| 2 | Context-aware AI prompting | AIAnalystModal `getContextualPayload()` | System context adjusts based on query topic |
| 3 | Live clock in docs tab | MorningPortal | Time-of-day anchoring inside a docs view |
| 4 | Search filter over content | MorningPortal | Simple string search, no library |
| 5 | Expandable accordion sections | FinanceFlowsModule | Reveal complexity on demand |
| 6 | Status code = readiness | CommandCenter spheres | `operational` vs `wip` directly in data |
| 7 | Citation footnotes inline | RESNICA modal | DOI links + confidence below each claim |
| 8 | Tabbed content structure | OrionDashboard, MorningPortal | One topic per tab, not one page |
| 9 | Consciousness stream log | AstralSonicPortal | Prepend-and-truncate activity feed |
| 10 | Morning orientation portal | MorningPortal | Greetings + docs + updates in one daily entry point |

---

## TOP 10: BEST LOW-ENTROPY INTERACTIONS

| Rank | Interaction | Location | Note |
|------|------------|----------|------|
| 1 | Click heartbeat to change speed | ZlatiKrog | One-button state toggle, immediate tactile feedback |
| 2 | Click agent sigil → hear its tone | AstralSonicPortal | Direct mapping: tap circle → play frequency |
| 3 | Click central flame → play harmony | AstralSonicPortal | One action → staggered cascade of all agents |
| 4 | Card touch scale (0.97) | CommandCenter | Haptic-analog press feedback, no library |
| 5 | Hover card lifts + glows | CommandCenter | Clear affordance; destination preview on hover |
| 6 | Entity click → active highlight | EntityCard | Single selection, clear visual feedback |
| 7 | Hash nav → immediate view swap | App.jsx | No loader, no spinner for internal routes |
| 8 | Toggle sound off → stop all oscillators | AstralSonicPortal | Single toggle cleans up all active audio |
| 9 | RESNICA unlock on specific entity | ZlatiKrog | Progressive disclosure: click the right card |
| 10 | Ghost Mode (Konami) | CommandCenter | Hidden layer revealed by gesture sequence |

---

## TOP 10 THINGS TO AVOID

| Rank | Anti-pattern | Where It Appears | Why It Hurts |
|------|-------------|-----------------|--------------|
| 1 | 40 equal-weight portals on one screen | CommandCenter | Destroys hierarchy. User cannot prioritize. Pure entropy. |
| 2 | DOM particle injection via `document.createElement` | CommandCenter | Bypasses React lifecycle, leaks on remount, fights the framework |
| 3 | Localhost external links in a deployed app | CommandCenter (oltar: 6969, serpent: 7778) | Breaks for everyone who isn't the author |
| 4 | Text-wall modal | ZlatiKrog RESNICA | 7 dense sections dumped into a modal with no ToC or pagination |
| 5 | All 24 components imported at top of App.jsx (no lazy loading) | App.jsx | Full bundle on first load regardless of which view user lands on |
| 6 | Duplicate keys in data array | CommandCenter (`id: 'orion'` appears twice) | Silent React reconciliation bugs |
| 7 | Mixed styling systems with no clear rule | Whole codebase | Tailwind classes + inline styles + `.css` files all mixed — maintenance nightmare |
| 8 | Hardcoded `localhost` endpoints in navigation | CommandCenter | Makes portability impossible without config |
| 9 | Fixed-size circular layout on mobile | AstralSonicPortal, ZlatiKrog | 400px and 320px circles overflow iPhone SE (375px) |
| 10 | Emoji as the primary icon system alongside Lucide React | Whole codebase | Two icon systems simultaneously — no consistency contract |

---

## EXECUTIVE VERDICT

### What Actually Feels Alive

- **DynamicIsland** — genuinely elegant ambient UI. The breathing glow that shifts color with context is the most original interaction in the repo. It respects the device notch and disappears into the background. This is what good ambient design looks like.

- **EntityCard** — 25 lines of pure component design. Nothing wasted. The three-state visual language (default / active / special) is clear and immediately readable.

- **AstralSonicPortal's orbit layout** — the CSS `rotate → translate → counter-rotate` trick to place nodes on a circle is a solved, elegant pattern. Combined with Web Audio API frequency triggers, this is a real interaction novelty — the rare case where the tech (audio synthesis) and the UI metaphor (sigil activation) genuinely match.

- **The hash router** — zero dependencies, 50 lines, full SPA routing. This is the right call for a project of this size. Resist the urge to add react-router.

- **SafeComponents** — production-caliber security layer. DOMPurify + protocol blocklist is the correct approach.

- **The card hover pattern in CommandCenter** — `translateY(-8px) + border fire-orange + box-shadow` in 0.35s cubic-bezier spring. This is warm and physical. Extract it.

- **iOS PWA handling** — thorough. Safe-area-insets everywhere, `-webkit-fill-available` fallback, `overscroll-behavior: none`, 16px input font-size. Whoever built this used an iPhone 15 Pro and fixed every edge case. This CSS block should be in every mobile project.

---

### What Is Fake Complexity

- **40 portals on one screen.** This is not a rich ecosystem — it is anxiety made visible. Grouping 5–6 portals would do the same job with a third of the cognitive load.

- **The RESNICA modal.** A full-screen modal with 7 academic evidence sections, DOI citations, and confidence ratings is not a modal — it is a research paper. Give it its own page.

- **The particle system.** 25 DOM particles injected via `document.createElement` in a React component. This is not ambient depth; it is a workaround that fights the framework. CSS-only particles via `@keyframes` or a single `<canvas>` would be simpler and more reliable.

- **The consciousness stream in AstralSonicPortal.** 5 messages visible, prepend-and-slice state. This works, but growing it to show "system activity" instead of just interaction-triggered messages would collapse it into noise.

- **Multiple overlapping animation layers in CommandCenter.** `cosmos-breathe` background + `sigil-pulse` center glyph + `float-gentle` card icons + `particle-dance` particles + `portal-glow` header + `gradient-shift` title. Six simultaneous animation loops. No single one is wrong. All six together are exhausting.

---

### What Should Never Be Reused

- **`FinanceFlowsModule` as-is.** The data is static Slovenian environmental research from 2024–2025. The accordion-chart pattern is fine; the component is not portable.

- **`OrionDashboard` as a whole.** 946 lines, 6 tabs, 4 external data dependencies, hardcoded coordinates, Slovenian language. Archive it as a reference for the tab + map + EHI-badge pattern only.

- **Localhost external links.** Never. Any link to `localhost:6969` or `localhost:7778` is not a feature in a deployed app — it is a bug.

- **The DOM particle injection.** Avoid `document.createElement` inside React components for aesthetic effects. The pattern is fragile and will leak.

- **The duplicate-sphere-ID pattern.** The `orion` sphere ID appears twice in CommandCenter's `spheres` array. Using array indices or IDs without uniqueness checking will cause silent React key collisions.

---

### Safest Next Adoption Steps

1. **Extract `DynamicIsland` immediately.** Rename the theme interface to accept a hex color or CSS variable. Add a `label` prop for screen-reader support. Ship to Ghostline.

2. **Extract `EntityCard` immediately.** Generalize the "special" variant to accept a prop (`variant: 'default' | 'active' | 'special'`) rather than hardcoding `id === 'resnica'`. Perfect card primitive.

3. **Extract `SafeComponents` as a standalone utility.** No UI, just functions and wrappers. Drop `@types/dompurify` + `dompurify` into the target project and copy the three exports.

4. **Copy the iOS PWA reset block from `index.css`** into every mobile-first project. No modification needed.

5. **Adopt the hash router pattern** for any small React SPA that doesn't need deep linking. 50 lines, zero deps. Add `React.lazy()` for each view import.

6. **Steal the card hover pattern** from `CommandCenter`. The cubic-bezier spring + fire-orange border + three-layer box-shadow is a complete hover vocabulary in three CSS properties.

7. **Study the `getContextualPayload` approach in `AIAnalystModal`**. Topic-detection regex → system context injection is the right abstraction for a domain-specific AI chat widget.

---

*Audit complete. No files modified. No dependencies installed. No implementations invented.*
