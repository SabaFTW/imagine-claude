# Imagine Claude — Coding Agent Instructions

These instructions apply repository-wide unless a deeper `AGENTS.md` overrides them.

## Product direction

Build **iPhone beauty with Android freedom**:

- iPhone beauty: polished spacing, typography, motion, tactile surfaces, visual hierarchy, calm first impression.
- Android freedom: direct access, search, filters, deep links, copy/export, visible state, configurable behavior, no artificial lock-in.

The repository may contain very large `.txt`, `.md`, `.seja`, JSON, research, archive, and portal content. **Do not solve density by deleting information. Solve it by revealing information progressively.**

The goal is not fewer capabilities. The goal is:

> **The same depth, with less visible weight at any one moment.**

## Non-negotiable rules

1. Preserve source content and meaning.
2. Never dump a full long document onto the first screen.
3. Never place dozens of equal-weight destinations in one undifferentiated grid.
4. Every screen must have one obvious primary purpose.
5. Users must be able to reach full detail without losing anything.
6. Destructive actions must be explicit, separated, and confirmed.
7. Mobile-first does not mean mobile-only. Desktop must gain density without becoming cluttered.
8. Animation must explain state or create gentle atmosphere; it must not compete with reading.
9. Respect `prefers-reduced-motion`.
10. Do not invent backend behavior, live data, operational status, or AI capability that is not implemented.

## Source-content contract

When converting a text source into an interface:

- keep the original source available through **View source**, **Raw text**, or an equivalent detail view;
- preserve headings, quotations, citations, uncertainty labels, dates, and metadata;
- distinguish documented facts, interpretation, personal material, mythology, archive material, and placeholders;
- do not silently modernize, correct, merge, or reconcile conflicting source material;
- do not mark a prototype as `live`, `operational`, or `real-time` unless code and data support that claim.

## Required transformation pipeline

For every long source page, perform these steps before writing UI code.

### 1. Parse

Identify:

- title;
- one-sentence purpose;
- source type;
- date and status;
- major sections;
- actions;
- warnings;
- links and citations;
- raw source location.

### 2. Classify

Place content into four visibility layers:

- **Glance** — what the page is and why it matters;
- **Explore** — 3 to 6 meaningful groups or chapters;
- **Inspect** — full section detail, evidence, settings, logs, or long prose;
- **Raw** — complete untouched source text or data.

### 3. Model

Create a structured page model instead of scattering hardcoded text throughout JSX. Prefer data such as:

```js
{
  id: 'stable-unique-id',
  title: 'Page title',
  eyebrow: 'Archive · 2025',
  summary: 'One useful sentence.',
  status: 'archive',
  theme: 'ice',
  sections: [
    {
      id: 'section-id',
      title: 'Section title',
      summary: 'What is inside.',
      icon: '…',
      content: '…',
      importance: 'primary'
    }
  ],
  source: {
    path: '…',
    format: 'markdown'
  }
}
```

### 4. Compose

The default page anatomy is:

1. compact ambient header;
2. title, purpose, and state;
3. 1 to 3 primary actions;
4. a visual overview;
5. grouped section cards;
6. detail sheet, accordion, tab, or dedicated subpage;
7. raw source access.

### 5. Validate

Confirm that:

- every original section is reachable;
- no important action disappeared;
- the first screen is understandable in five seconds;
- keyboard and touch interaction both work;
- GitHub Pages base paths work;
- the page remains usable with animation disabled.

## Progressive disclosure rules

### First screen

Show at most:

- one title;
- one short explanation;
- one status signal;
- three primary actions;
- five to seven primary groups.

Anything beyond this belongs below the fold, behind a filter, or inside a detail layer.

### Detail layers

Use the pattern that best matches the content:

- **Accordion** for independent sections;
- **Bottom sheet / side sheet** for contextual detail without losing place;
- **Tabs** for a small number of peer views;
- **Timeline** for chronological material;
- **Map / graph** only when relationships are spatial or relational;
- **Dedicated page** for long research papers or text walls;
- **Command palette** for fast direct navigation;
- **Searchable library** for large archives.

Do not hide everything behind tiny unlabeled icons. Progressive disclosure must remain discoverable.

## Visual language

### Mood

The interface should feel:

- calm before detailed;
- tactile rather than flat;
- warm rather than corporate;
- polished rather than ornamental;
- alive rather than constantly moving.

### Surfaces

Use a small surface hierarchy:

- base background;
- elevated card;
- active or selected card;
- modal/sheet;
- danger surface.

Prefer subtle gradients, glass, restrained glow, texture, and depth. Do not put a glow around every element.

### Color

Color must carry structure:

- each major shelf or domain may have one accent;
- status colors must remain consistent;
- danger red is reserved for actual danger;
- do not rely on color alone—pair it with labels, icons, or shape.

Existing repository accents may be reused:

- cosmic purple `#7b3fa8`;
- fire orange `#ff8a50`;
- amber `#f4c261`;
- cyan `#22d3ee`;
- green `#4caf50`;
- deep background `#0a0515`.

### Typography

- Use large expressive headings sparingly.
- Body text must remain highly readable.
- Long prose needs comfortable line length, section spacing, and a visible reading position.
- Metadata should be compact and quiet, not shouted in all caps.
- Avoid placing paragraphs inside tiny dashboard cards.

### Icons and imagery

Icons should allow recognition before reading. Use one consistent icon vocabulary per screen. Decorative imagery may introduce a section, but must not replace navigation labels or accessibility text.

## Motion language

Motion is allowed and encouraged when it serves a purpose.

### Good motion

- card press and release;
- sheet opening from the selected object;
- section expansion;
- progress or state transition;
- gentle ambient background movement;
- selected-item emphasis;
- cross-fade between related views.

### Bad motion

- six unrelated infinite animations on one screen;
- text moving while the user reads;
- constant pulsing on every card;
- fake loading delays;
- animation that blocks access to controls;
- motion used to disguise missing functionality.

### Timing guidance

- touch feedback: roughly 80–140 ms;
- small transitions: roughly 160–240 ms;
- sheets and page transitions: roughly 220–360 ms;
- ambient loops: slow, subtle, and limited to one or two layers.

Use spring-like easing for tactile elements. Never require an animation to finish before a user can act.

## Navigation architecture

Use `src/data/portalRegistry.js` as the source of truth for portal identity, category, route, kind, and state.

Do not create another independent portal list.

Navigation should support two modes simultaneously:

### Guided mode

A calm visual route through featured workbenches and grouped shelves.

### Direct mode

Search, filters, deep links, keyboard access, command palette, and stable URLs for users who already know where they are going.

This is the central product balance:

> **Beautiful guidance without removing expert control.**

## Reuse before invention

Prefer extracting and improving existing strong pieces:

- `DynamicIsland` for ambient status and context;
- `EntityCard` as a selectable card primitive;
- `SafeComponents` for untrusted HTML and links;
- the iOS safe-area and PWA rules in `index.css`;
- the existing hash-routing approach for small views;
- the Command Center card press/lift vocabulary;
- orbit and ring motifs only where they clarify relationships;
- `portalRegistry` for navigation metadata.

Do not copy entire monolithic components merely because one visual pattern is useful. Extract the pattern.

## Information-rich page patterns

### Research page

First view:

- thesis;
- confidence/status;
- strongest evidence cards;
- timeline preview;
- next useful action.

Detail:

- full evidence ledger;
- sources;
- counterevidence;
- raw notes.

### Archive page

First view:

- date;
- participants/entities;
- emotional or thematic core;
- 3 to 5 chapter cards;
- media preview.

Detail:

- complete chronology;
- quotations;
- artifacts;
- raw archive.

### System/status page

First view:

- current state;
- health summary;
- active warnings;
- 1 to 3 safe actions.

Detail:

- logs;
- tokens/credentials only when explicitly revealed;
- pairing/configuration;
- destructive controls in a separate danger zone.

### Settings page

Group settings by user goal, not by internal implementation. Show current values at a glance, reveal advanced controls on demand, and provide reset/undo where possible.

## Anti-bloat rules

Do not:

- put the full application sitemap in a permanent sidebar;
- show every action at all times;
- repeat the same status in the header, card, sidebar, and footer;
- render a wall of labels where color, icon, state, or grouping would communicate faster;
- create a new page for every paragraph;
- create one giant page for the entire repository;
- use cards as containers for arbitrarily long prose;
- make local-only links look universally available;
- use `localhost` destinations without a visible `Local only` state;
- add a second registry, router map, or navigation catalogue.

## Accessibility and resilience

Every interface must support:

- semantic headings;
- keyboard focus and activation;
- visible focus styles;
- accessible names for icon buttons;
- sufficient contrast;
- reduced motion;
- no content available only on hover;
- touch targets appropriate for phones;
- loading, empty, offline, unavailable, and error states;
- long text selection and copying.

## Coding constraints

- Prefer small reusable React components over page monoliths.
- Keep domain data separate from presentation components.
- Use lazy loading for large portal views.
- Avoid direct DOM injection inside React for decorative effects.
- Avoid adding a large dependency for a small interaction.
- Do not expose API keys, gateway tokens, secrets, or private source content.
- Treat rendered archive/user content as untrusted and use the existing safe-content utilities.
- Preserve GitHub Pages compatibility with the `/imagine-claude/` base path.

## Definition of done for a transformed text page

A page is complete only when:

- all source content remains reachable;
- the source file remains traceable;
- the overview is understandable without scrolling through the source;
- no more than seven primary groups compete on the opening view;
- details open progressively;
- search or a table of contents exists for long material;
- actions are contextual and clearly labeled;
- mobile, desktop, keyboard, reduced-motion, empty, and error states are checked;
- no unsupported live/AI/system claims were added;
- the build succeeds.

## Final design test

Before submitting a PR, ask:

1. Can a new user understand this screen in five seconds?
2. Can an expert reach any detail quickly?
3. Is every capability still present?
4. Is the text available without dominating the screen?
5. Does motion help explain the interface?
6. Does this feel polished without becoming rigid?
7. Did we create one source of truth rather than another parallel map?

The intended result is not a minimal app and not a maximal dashboard.

It is a **deep, beautiful, progressively revealed personal workbench**.