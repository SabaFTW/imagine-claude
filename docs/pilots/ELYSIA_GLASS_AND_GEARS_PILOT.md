# Elysia — Glass & Gears Pilot Brief

Status: **implementation brief, not yet implemented**

Pilot target: `Elysia`

Why this pilot:

- it already contains a real user workflow;
- it mixes atmosphere, writing tools, stored results, long archive material, and optional AI analysis;
- it can demonstrate all Glass & Gears axes without requiring a large backend;
- it currently exposes several legacy problems the rebuild is intended to solve.

---

## 1. Current implementation

The React entry at `src/Elysia.jsx` is only a full-screen iframe wrapper around:

```text
public/portals/dreem-journal.html
```

The standalone page currently provides:

- three writing areas:
  - Morning whispers;
  - Heart threads;
  - Flame notes;
- automatic local draft storage;
- preserved journal entries in `localStorage`;
- clear/reset behavior;
- JSON export;
- a countdown to an 8:00 reset;
- an optional Gemini analysis action;
- a decorative animated visual style.

These capabilities should be preserved or deliberately reclassified. They should not be silently deleted during redesign.

---

## 2. Blocking problems found during inspection

## 2.1 Public API credential

The legacy HTML contains a Gemini API key directly in client-side JavaScript.

Required response:

1. treat the key as compromised;
2. revoke or rotate it in Google Cloud;
3. remove it from the current application code;
4. do not replace it with another bundled key;
5. keep AI analysis disabled until a safe architecture exists.

Acceptable future architectures:

- a server-side proxy with scoped credentials and abuse controls;
- an explicit user-provided key stored locally with clear warnings;
- a provider-independent local service;
- no AI analysis at all.

Removing the key from the current branch does not remove it from Git history. Rotation is required.

## 2.2 GitHub Pages path risk

The iframe uses an absolute root path:

```text
/portals/dreem-journal.html
```

The production site uses the `/imagine-claude/` base path. The pilot must use base-aware asset and route resolution.

## 2.3 Iframe isolation

The iframe prevents clean integration with:

- shared navigation;
- shared safe areas;
- shared theme tokens;
- command palette;
- route state;
- React component reuse;
- unified accessibility behavior;
- shared source and archive views.

The pilot should replace the iframe wrapper with a React-native implementation while preserving the original HTML as an archived source artifact.

## 2.4 Mixed semantics

The current page mixes:

- writing;
- storage;
- destructive clearing;
- AI analysis;
- countdown behavior;
- saved history;
- visual atmosphere.

All functions appear on one page at nearly equal weight. The pilot should separate them by intent and visibility depth.

## 2.5 Unsupported interpretation risk

AI dream interpretation must never be presented as diagnosis, objective subconscious truth, or verified psychological insight.

Any future analysis feature must be labelled as:

```text
Reflective prompt generation — not diagnosis or factual interpretation
```

---

## 3. Pilot product statement

> Elysia is a private local-first reflection journal with three writing modes, progressive access to history and interpretation, explicit preservation, and full access to its original source material.

The UI may remain poetic. Its state and claims must remain factual.

Suggested content label:

```text
Personal journal · local browser storage
```

Do not label the page as live consciousness telemetry, autonomous analysis, or a clinical dream interpreter.

---

## 4. Three-axis mapping

## 4.1 Glance / 🪎 Orient

Opening screen:

- Elysia title and short purpose;
- current local date/time;
- local-storage status;
- current draft signal;
- latest preserved entry signal;
- one primary action: `Write`;
- secondary actions: `Open archive`, `Search`;
- subtle ice-and-flame ambient visual identity.

Do not show all three textareas, full archive, export controls, AI controls, and reset controls immediately.

## 4.2 Explore / 🧚 Introduce

Reveal three clear paths:

### Write

A gentle explanation of the three journal modes.

### Archive

A preview of saved entries, dates, and search.

### About & source

What Elysia stores, where it stores it, what resets, and how to inspect the original source.

Optional fourth path:

### Reflection tools

Only if safe reflection tooling is actually implemented.

## 4.3 Inspect / 🐝 Operate

The writing workspace contains:

- one selected writing mode at a time;
- easy switching between Morning, Heart, and Flame;
- autosave state;
- explicit `Preserve entry` action;
- explicit `Discard draft` action separated from normal actions;
- character or word count if useful;
- keyboard shortcuts;
- mobile-safe editor behavior;
- offline/local state.

Advanced controls belong in a sheet or settings section.

## 4.4 Inspect / 🐭 Understand

The archive and reflection workspace contains:

- saved-entry list;
- search;
- date grouping;
- selected-entry reading view;
- links between related entries only when user-created or clearly heuristic;
- optional user-authored tags;
- transparent explanation of storage and reset behavior;
- optional non-clinical reflection prompts.

No pattern should be presented as verified merely because an algorithm generated it.

## 4.5 Inspect / 🧀 Preserve

Preservation actions:

- save entry;
- save tags or notes;
- export selected entry;
- export all entries;
- copy entry;
- favorite/bookmark;
- confirm durable local save;
- show the resulting saved object.

The Result Panel should answer:

```text
What was saved?
Where was it saved?
When was it saved?
How can it be exported or removed?
```

## 4.6 Raw

Raw access should expose:

- the archived original `dreem-journal.html`;
- original source path;
- the raw local JSON export;
- source/version metadata;
- the Elysia archive/ecosystem documents with explicit classification labels.

The old ecosystem map should be labelled as an archived personal/mythology document, not as verified runtime infrastructure.

---

## 5. Guided and direct routes

## Guided flow

```text
Elysia home
→ Choose Write or Archive
→ Open selected workspace
→ Preserve result
```

## Direct routes

Examples:

```text
#elysia/write/morning
#elysia/write/heart
#elysia/write/flame
#elysia/archive
#elysia/archive/:entryId
#elysia/source
```

If the project keeps hash routing, stable hash paths are acceptable.

Command palette examples:

```text
Elysia: New morning entry
Elysia: Open latest entry
Elysia: Search archive
Elysia: Export all
Elysia: View source
```

---

## 6. Suggested component structure

```text
src/features/elysia/
├── ElysiaPage.jsx
├── ElysiaHome.jsx
├── ElysiaEditor.jsx
├── ElysiaArchive.jsx
├── ElysiaEntryView.jsx
├── ElysiaSourceView.jsx
├── components/
│   ├── JournalModeCard.jsx
│   ├── JournalModeSwitcher.jsx
│   ├── DraftStatus.jsx
│   ├── PreserveResultPanel.jsx
│   ├── EntryPreview.jsx
│   ├── ArchiveSearch.jsx
│   └── StorageDisclosure.jsx
├── data/
│   └── elysiaContent.js
├── storage/
│   ├── elysiaStorage.js
│   └── elysiaMigration.js
└── styles/
    └── elysia.css
```

The exact folder layout may change. The important constraints are:

- presentation separated from storage;
- storage separated from source/archive content;
- no iframe dependency;
- no embedded secrets;
- no duplicated portal identity outside `portalRegistry`.

---

## 7. Suggested local data model

```ts
type ElysiaMode = 'morning' | 'heart' | 'flame';

type ElysiaEntry = {
  id: string;
  createdAt: string;
  updatedAt: string;
  mode: ElysiaMode;
  text: string;
  tags: string[];
  favorite: boolean;
  sourceVersion: 1;
};

type ElysiaDraft = {
  mode: ElysiaMode;
  text: string;
  updatedAt: string;
};
```

Legacy storage migration must inspect:

```text
dreem_journal_current
dreem_journal_saved
```

Migration rules:

- never delete legacy data automatically;
- import only after successful parsing;
- show how many entries were found;
- allow export before migration;
- mark migrated entries with source metadata;
- keep migration idempotent.

---

## 8. Reset semantics

The legacy page advertises a fresh slate at 8:00.

The pilot must clarify what this means.

Recommended behavior:

- preserved entries are never deleted by the daily reset;
- only the current unsaved draft may be cleared;
- automatic clearing is off by default until the user explicitly enables it;
- the next reset time is visible in settings and near the draft state;
- the user may preserve or export before reset;
- timezone behavior is explicit.

A poetic label may accompany the rule, but must not obscure data loss.

---

## 9. Visual direction

Elysia may use:

- deep ice-blue background;
- warm gold internal light;
- restrained glass surfaces;
- one slow ambient glow;
- subtle moth, flame, or frost motifs;
- tactile card and sheet transitions;
- a calm dedicated reading surface.

Motion mapping:

- Orient: slow ice-to-gold ambient bloom;
- Introduce: section cards unfold with a short whisper fade;
- Operate: editor and controls respond immediately and precisely;
- Understand: entries reveal in a stable reading canvas;
- Preserve: saved result solidifies with a quiet confirmation edge.

Reduced-motion mode must remove non-essential transitions and ambient loops.

---

## 10. Safety and privacy

Required:

- no bundled API keys;
- no remote upload by default;
- clear local-storage disclosure;
- explicit consent before any future remote analysis;
- exported files must not include secrets;
- clear delete behavior;
- confirmation before clearing drafts or deleting entries;
- content remains selectable and copyable;
- rendered user content is treated as untrusted.

Because journal material may be sensitive, privacy must be visible at Glance depth, not buried in legal text.

---

## 11. Acceptance criteria

The pilot is complete only when:

- the iframe is no longer required for normal use;
- all three writing modes remain available;
- current draft autosave works;
- saved entries remain available;
- legacy localStorage data can be safely detected and migrated;
- save, clear, and export behavior is explicit;
- no API key exists in client code;
- AI analysis is absent or safely implemented and correctly labelled;
- GitHub Pages paths work under `/imagine-claude/`;
- Glance, Explore, Inspect, and Raw are all demonstrable;
- Orient, Introduce, Operate, Understand, and Preserve are identifiable without forcing a linear route;
- guided and direct access both work;
- keyboard, touch, reduced motion, empty, error, and offline states are checked;
- the original HTML remains reachable as an archived source;
- the build succeeds.

---

## 12. Explicit non-goals for the pilot

Do not:

- rebuild every Elysia-related file in the repository;
- claim a consciousness system is running;
- add a backend merely to create visual complexity;
- introduce a new router library unless necessary;
- add a new global registry;
- add social feeds, sharing, or accounts;
- interpret dreams clinically;
- automatically delete preserved entries;
- hide local data behavior behind poetic language;
- migrate every portal before this pilot is tested.

---

## 13. Recommended implementation order

1. Remove the exposed credential from current client code and rotate it externally.
2. Create storage adapter and legacy-data detector.
3. Create base-aware Elysia route and shell.
4. Implement Glance/Orient home.
5. Implement Explore/Introduce route cards.
6. Implement editor as Inspect/Operate.
7. Implement archive as Inspect/Understand.
8. Implement Result Panel and exports as Inspect/Preserve.
9. Implement Raw source and storage inspector.
10. Test migration, mobile behavior, accessibility, reduced motion, and GitHub Pages.

---

## Final pilot statement

> Elysia should remain soft without becoming vague, deep without becoming bloated, private without becoming opaque, and poetic without pretending that metaphor is telemetry.
