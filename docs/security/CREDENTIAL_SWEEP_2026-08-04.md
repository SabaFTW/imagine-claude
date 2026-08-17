# Credential Sweep — 2026-08-04

Status: **current-tree remediation in progress**

Scope: `SabaFTW/imagine-claude`

Branch: `security/seal-elysia-ai-key`

This record intentionally does not reproduce any credential value.

---

## 1. Trigger

Inspection of the legacy Elysia journal found a project-owned Gemini credential embedded directly in public client-side JavaScript.

The initial finding expanded into a repository sweep because the same credential had been copied into several public portals and a second distinct credential had been committed in the repository root `.env` file.

---

## 2. Method and limits

The sweep used:

- current `master` code search for credential-shaped prefixes and assignments;
- direct inspection of returned files;
- targeted review of public HTML provider calls;
- a repeatable sanitation script using a concrete Google-key pattern;
- branch verification of the rewritten provider blocks.

This is not a complete forensic search of:

- every historical commit;
- deleted branches;
- GitHub releases or Actions artifacts;
- external deployment logs;
- forks and clones;
- browser caches;
- provider-side request logs;
- unrelated repositories.

A clean current tree must not be interpreted as proof that no historical copy exists.

---

## 3. Verified credential sets

### Credential set A

A shared Gemini credential was copied across multiple public or legacy artifacts.

Verified current-tree locations:

- `public/portals/dreem-journal.html`;
- `public/portals/forge.html`;
- `public/ghostcore-v3-unified.html`;
- `public/portals/MANDALA_PANTEONA.html`;
- `public/portals/forge_backup_OLD_INDUSTRY_5.html`;
- `DUAL_PORTAL_DEPLOYMENT_SESSION.md`.

**Required external action:** revoke or rotate this credential at the provider.

### Credential set B

A different Gemini credential was committed in the repository root `.env` file.

**Required external action:** revoke or rotate this credential at the provider.

The `.gitignore` already listed `.env`, but ignore rules do not untrack a file that was committed earlier.

---

## 4. Changes on the security branch

### Elysia journal

`public/portals/dreem-journal.html`

- removed the embedded credential;
- removed the direct provider request;
- disabled the reflection action with an explicit explanation;
- states that no journal text is sent to an AI provider;
- preserved writing, autosave, archive, export, clearing, and the 08:00 reset;
- changed saved-entry rendering to text nodes instead of inserting journal text as HTML;
- added reduced-motion handling.

### Root environment file

- removed the tracked `.env` file from the current tree;
- added `.env.example` with an empty placeholder only.

### Mandala Panteona

`public/portals/MANDALA_PANTEONA.html`

- removed the embedded credential and provider fetch;
- disabled AI generation and oracle actions;
- retained the static paradox navigator, entity data, mandala chart, and non-AI interaction;
- added a visible statement that no input is sent.

### FORGE portals

- `public/portals/forge.html`;
- `public/portals/forge_backup_OLD_INDUSTRY_5.html`.

For both:

- removed the shared credential and provider request;
- retained the page, tabs, charts, inputs, navigation, and non-AI content;
- replaced AI responses with a clear unavailable state;
- no entered project idea, specification, or question is transmitted.

### Ghostcore unified portal

`public/ghostcore-v3-unified.html`

- removed the shared credential and common provider function;
- disabled workshop and assistant provider actions;
- replaced the rune-oracle provider request with a local unavailable message;
- retained non-AI visualization, practice, ledger, project, and interaction systems.

### Deployment record

- added a dated remediation notice to `DUAL_PORTAL_DEPLOYMENT_SESSION.md`;
- redacted the concrete credential value;
- corrected the claim that a public hardcoded credential was acceptable for demonstration or personal use.

---

## 5. What this branch does not do

This branch does not:

- revoke either provider credential;
- inspect provider usage or billing;
- erase values from Git history;
- rewrite commit hashes;
- purge forks, clones, releases, caches, or external deployments;
- build a new proxy or BYOK system;
- re-enable any AI action;
- complete a full security audit of every repository feature.

---

## 6. Rotation checklist for the repository owner

For both distinct exposed Gemini credentials:

- [ ] identify the corresponding Google project/key;
- [ ] revoke or rotate the key;
- [ ] inspect recent usage and quotas;
- [ ] inspect billing and unexpected request patterns;
- [ ] add API and application restrictions to any replacement;
- [ ] confirm that deployed GitHub Pages no longer serves the old current-tree value after merge/deploy;
- [ ] record the rotation date without storing the replacement value in the repository.

Do not paste replacement credentials into a GitHub issue, pull request, commit, screenshot, or chat transcript.

---

## 7. Follow-up candidates

These are not concrete credential exposures confirmed by this branch, but they require separate design review:

### `src/components/ApiKeyManager.jsx`

The component stores a user-provided key in `localStorage` and exports it into a downloadable JSON file intended for cloud-drive synchronization.

Risks to review:

- accidental sharing of the configuration file;
- scripts on the same origin reading browser storage;
- unclear provider-data disclosure;
- key export occurring as part of the normal save action.

This should be redesigned under `docs/AI_ACTION_SECURITY_PROTOCOL.md`, not silently retained as a universal sync mechanism.

### `ORION_AI_SETUP.md`

The guide recommends client-visible `VITE_GEMINI_API_KEY` configuration for real AI mode and previously described production environment variables as a way to hide the key.

A Vite-prefixed variable included in client code is public after build. The guide should be corrected in a dedicated documentation or Orion integration change.

### Git history

The exposed values remain in earlier commits. After rotation and impact review, the repository owner may decide whether history rewriting is proportionate.

That decision must account for:

- open branches and pull requests;
- existing clones;
- published commit links;
- deployment references;
- coordination with collaborators.

---

## 8. Current verdict

The security branch removes the verified credentials from the current tree and prevents the inspected public portals from transmitting user input through the exposed provider path.

The repository is **not fully remediated until both distinct credentials are revoked or rotated externally**.

> Current-tree sanitation closes the visible door. Provider rotation changes the lock.
