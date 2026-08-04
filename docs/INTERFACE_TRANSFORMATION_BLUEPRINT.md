# Interface Transformation Blueprint

## Working name

**Glass & Gears**

> iPhone beauty on the surface. Android freedom underneath.

This document defines how large text documents, archives, research notes, settings, logs, and system tools in `imagine-claude` should become rich interfaces without losing their depth.

The project is allowed to contain enormous amounts of text. The interface is not allowed to display all of it at once.

---

## 1. The problem being solved

A technically usable interface can still feel bloated when it presents:

- a permanent sidebar containing the entire product;
- several equal-weight status cards;
- a row of unrelated actions;
- credentials or technical fields immediately visible;
- many text labels that must be read before the page can be understood;
- advanced settings beside everyday actions;
- destructive controls in the same visual field as normal navigation.

The issue is not the number of capabilities. The issue is that every capability is demanding attention simultaneously.

The redesign principle is:

```text
FULL DEPTH
    ↓
CLEAR GROUPS
    ↓
CALM OVERVIEW
    ↓
DETAIL ONLY WHEN REQUESTED
```

---

## 2. The desired product feeling

### At first glance

The page should feel calm, obvious, visual, and inviting.

The user should be able to recognize:

- where they are;
- whether anything needs attention;
- what the main thing on this page does;
- what the next useful action is.

### After interaction

The page should become as detailed as necessary:

- every section;
- every source;
- every setting;
- every log line;
- every archive paragraph;
- every advanced action.

Nothing is removed. It is staged.

---

## 3. Core product equation

```text
Visual calm + progressive depth + direct escape routes
```

### Visual calm

- strong spacing;
- limited initial choices;
- meaningful color;
- clear status shapes;
- polished motion;
- readable typography.

### Progressive depth

- summaries;
- cards;
- expandable sections;
- sheets;
- tabs;
- dedicated reading views;
- raw-source mode.

### Direct escape routes

- search;
- command palette;
- deep links;
- filters;
- copy/export;
- full source;
- keyboard shortcuts;
- visible advanced mode.

---

## 4. Four-layer content architecture

Every large source becomes four layers.

## Layer A — Glance

Visible immediately.

Contains:

- title;
- short purpose;
- state;
- visual signature;
- primary action;
- one useful summary.

This layer answers: **What is this?**

## Layer B — Explore

Visible after a small scroll or one intentional interaction.

Contains:

- 3 to 6 groups;
- chapter previews;
- category cards;
- strongest evidence;
- timeline milestones;
- important settings groups.

This layer answers: **Where should I look?**

## Layer C — Inspect

Opened from a selected group.

Contains:

- full prose;
- logs;
- evidence tables;
- advanced controls;
- citations;
- detailed metadata;
- long timelines;
- configuration.

This layer answers: **What exactly is inside?**

## Layer D — Raw

Always available, never the default.

Contains:

- original `.txt`, `.md`, `.seja`, JSON, or log source;
- unchanged content where possible;
- source path and version metadata;
- copy/download/export controls where appropriate.

This layer answers: **Show me everything exactly as stored.**

---

## 5. Canonical page anatomy

A transformed page should generally use this order.

### 5.1 Ambient context

A small top element such as `DynamicIsland` may show:

- domain;
- mode;
- local/offline state;
- selected collection;
- compact status.

It must not duplicate the full page header.

### 5.2 Hero

The hero contains:

- icon, illustration, or subtle visual motif;
- eyebrow metadata;
- title;
- one- or two-sentence summary;
- state badge;
- up to three actions.

Example:

```text
ARCHIVE · OCTOBER 2025
The Elysia Journal
Dream notes, morning fragments, and linked artifacts.

[Open latest] [Search] [About]
```

### 5.3 Overview object

Choose one:

- chapter constellation;
- simple timeline;
- status ring;
- evidence ladder;
- grouped metric strip;
- activity preview;
- visual index.

This must reduce reading, not merely decorate it.

### 5.4 Section shelf

Show 3 to 6 cards. Each card contains:

- icon;
- short title;
- one-sentence description;
- a small state/count/date;
- clear open affordance.

No paragraphs.

### 5.5 Selected detail

Open in:

- bottom sheet on small screens;
- side sheet or split pane on wide screens;
- dedicated page for long reading.

### 5.6 Source footer

Show:

- source path;
- last known date/version;
- raw view;
- copy link;
- archive status.

---

## 6. Converting text structures into interface structures

| Source pattern | Interface pattern |
|---|---|
| H1 title + intro | Hero |
| H2 sections | Group cards or tabs |
| H3 subsections | Accordion sections |
| Bullet list | Checklist, compact list, or metadata chips |
| Repeated dated entries | Timeline |
| Claims + sources | Evidence cards / ledger |
| Entity descriptions | Entity cards |
| Commands | Action menu with copy buttons |
| Logs | Filterable monospace log viewer |
| Configuration blocks | Grouped settings form |
| Warnings | Contextual alert, not permanent red wallpaper |
| Long quote | Reading block revealed inside detail |
| Related files | Artifact gallery |
| Raw metadata | Collapsible technical inspector |

---

## 7. The “same options, smaller surface” rule

A large tool may contain twenty or more actions. They should not be twenty visible buttons.

Group them by intention.

Example:

```text
Observe
- Status
- Activity
- Logs

Connect
- Pair device
- Open terminal
- Open linked UI

Configure
- General
- Network
- Credentials

Repair
- Restart
- Reconfigure

Danger zone
- Stop
- Reset
- Wipe
```

The first screen might show only:

```text
System healthy
[Open workspace]

Observe    Connect    Configure

More ▾
```

All capabilities remain reachable. Only their attention cost changes.

---

## 8. Visual system: polished but not rigid

## 8.1 Shape

Suggested hierarchy:

- page radius: 28–36 px for major hero surfaces;
- card radius: 18–24 px;
- compact controls: 10–14 px;
- pills only for short statuses and filters.

Do not make every object a pill.

## 8.2 Depth

Use depth sparingly:

- base plane;
- elevated interactive plane;
- selected plane;
- sheet/modal plane.

A selected object should feel physically closer through scale, border, shadow, or light—not through louder text.

## 8.3 Texture

Allowed:

- faint grain;
- subtle mesh gradients;
- low-opacity illustrated patterns;
- glass blur where text contrast remains strong;
- one ambient glow per domain.

Avoid generic neon cyberpunk saturation across every screen.

## 8.4 Domain identity

Suggested domains:

- Daily/personal — green, warm mist, quiet pulse;
- Creative — amber/fire, tactile cards, flowing transitions;
- Systems — cyan/blue, precise lines, clear state signals;
- Research — violet/slate, evidence badges, structured depth;
- Archives — gold/ink, page texture, slow reveal;
- Legacy/local — neutral steel, explicit availability markers.

---

## 9. Motion choreography

The interface should feel responsive before it feels animated.

### Tap/click

1. immediate scale or light response;
2. selected state appears;
3. detail emerges from the selected object;
4. focus moves into the new layer.

### Expand section

- header remains stable;
- content fades and slides a short distance;
- surrounding layout moves smoothly;
- scroll position is preserved.

### Switch domain

- ambient accent cross-fades;
- content transitions once;
- no full-screen loading theatre for local content.

### Open long reading

- use a calm dedicated reading canvas;
- preserve a clear route back;
- show reading progress or section position;
- disable distracting background motion.

### Ambient animation budget

At most two ambient loops per screen:

1. one background/lighting loop;
2. one meaningful status/central-object loop.

Interactive animations do not count toward this budget because they stop when interaction ends.

---

## 10. Mobile behavior

On phones:

- primary navigation should be reachable by thumb;
- detail opens as a bottom sheet or full reading page;
- dense tables become cards, horizontal inspectors, or dedicated views;
- permanent sidebars should disappear;
- advanced navigation may live in search/command palette;
- headers respect safe-area insets;
- text inputs remain at least 16 px to avoid iOS zoom;
- controls must not hide behind the browser chrome.

The design may look iPhone-polished, but it must remain fully useful on Android browsers and wider desktop screens.

---

## 11. Desktop behavior

Desktop should not simply stretch mobile cards.

Use width for:

- split view;
- persistent selected-detail pane;
- wider reading canvas with navigation rail;
- comparison views;
- denser metadata;
- keyboard-first actions.

Do not use width as an excuse to expose the entire sitemap permanently.

---

## 12. Text reading mode

Long prose deserves its own design.

Required features for long documents:

- comfortable line length;
- visible section hierarchy;
- table of contents;
- current-section indicator;
- search within document;
- copy section;
- citations and links remain active;
- raw source view;
- optional focus mode;
- reduced or paused ambient animation.

A research paper is not a modal. A session archive is not a tooltip. A 500-line source is not a dashboard card.

---

## 13. System and admin screens

System pages must prioritize current state and safe action.

### Opening view

Show:

- one health statement;
- one compact uptime/last-check signal;
- active warning only when relevant;
- main action;
- grouped routes to Observe, Connect, and Configure.

### Credentials

- masked by default;
- explicitly revealed;
- copied with confirmation;
- never exposed in screenshots, logs, or source control;
- separated from everyday status.

### Logs

- hidden until requested;
- searchable/filterable;
- pause/resume;
- copy selected region;
- clear timestamp hierarchy;
- no fake live stream.

### Destructive actions

- separate danger zone;
- consequence explained;
- confirmation proportional to risk;
- never the strongest visual button on the main screen.

---

## 14. Archive and mythology screens

Personal or mythic material should be preserved without being mislabelled as technical telemetry.

Use explicit type labels such as:

- Personal archive;
- Story;
- Mythology;
- Session record;
- Visual artifact;
- Interpretation;
- Technical prototype;
- Research;
- Unverified note.

A beautiful presentation is welcome. Unsupported claims are not.

The design may be poetic while metadata remains factual.

---

## 15. Reusable component targets

The rebuild should converge toward a small kit.

### Core shell

- `AmbientHeader`
- `PageHero`
- `ShelfGrid`
- `DetailSheet`
- `ReadingView`
- `CommandPalette`
- `StatusBadge`

### Content primitives

- `SectionCard`
- `EvidenceCard`
- `TimelineEntry`
- `MetadataRow`
- `SourceLink`
- `ExpandableSection`
- `ArtifactPreview`
- `LogViewer`
- `SettingGroup`
- `DangerZone`

### Existing pieces to adapt

- `DynamicIsland`
- `EntityCard`
- `SafeComponents`
- Command Center card motion
- iOS/PWA CSS hardening
- `portalRegistry`

---

## 16. Suggested structured content schema

A future parser or manually prepared adapter can emit:

```ts
type ContentPage = {
  id: string;
  title: string;
  summary: string;
  type:
    | 'research'
    | 'archive'
    | 'story'
    | 'system'
    | 'settings'
    | 'log'
    | 'tool'
    | 'legacy';
  status?: 'active' | 'draft' | 'archive' | 'local' | 'unverified';
  date?: string;
  accent?: string;
  source: {
    path: string;
    format: 'txt' | 'md' | 'seja' | 'json' | 'log';
  };
  actions?: Array<{
    id: string;
    label: string;
    kind: 'primary' | 'secondary' | 'danger';
  }>;
  sections: Array<{
    id: string;
    title: string;
    summary?: string;
    content: string;
    mode?: 'reading' | 'list' | 'timeline' | 'evidence' | 'settings';
    importance?: 'primary' | 'secondary' | 'reference';
  }>;
};
```

This is a direction, not permission to automatically reinterpret every source. Parsing must remain inspectable.

---

## 17. Build sequence

### Phase 1 — Foundation

- establish agent instructions;
- establish visual tokens;
- define the content page schema;
- create reusable shell primitives;
- validate GitHub Pages paths.

### Phase 2 — One representative page

Choose one text-heavy page and build the full four-layer pattern:

- glance;
- explore;
- inspect;
- raw.

Do not convert the whole repository before this pattern is tested.

### Phase 3 — Systematic adapters

Create adapters for:

- markdown/archive documents;
- research/evidence pages;
- system/status pages;
- tool/settings pages.

### Phase 4 — Migrate by domain

Migrate one shelf at a time:

1. Daily/personal;
2. Creative;
3. Systems;
4. Research;
5. Archives;
6. Legacy/local.

### Phase 5 — Remove duplicate shells

Only after all content is reachable through the new system:

- archive duplicate page shells;
- remove duplicate registries;
- document redirects;
- preserve source material.

---

## 18. Acceptance scenario

A user opens a very large archive containing 80 sections and thousands of lines.

The initial page shows:

- its title and date;
- a beautiful visual identity;
- a three-line summary;
- five chapter groups;
- latest/important artifact previews;
- search and full-source actions.

The user selects one chapter. A sheet or dedicated page opens with section summaries. The user selects a section and reads the complete text. Citations, raw source, copy controls, and metadata remain available.

At no point does the interface pretend the archive is small. It simply refuses to make the user carry all of it at once.

---

## Final statement

The target is not Apple restriction and not Android visual neglect.

It is:

> **Apple-level care in presentation, Android-level respect for user control, and Imagine Claude-level permission to remain deep, strange, personal, and enormous.**
