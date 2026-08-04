# AI Action Security Protocol

Status: **canonical security contract**

This protocol applies to every button, form, command, background task, or portal action that sends user content to an AI model or external inference provider.

It complements the repository-wide interface rules in `AGENTS.md`. It does not define a provider, product, or visual style.

---

## 1. Core rule

> **No project-owned shared provider secret may be bundled into public client code.**

Anything shipped to a browser must be treated as public, including:

- HTML and inline scripts;
- JavaScript bundles;
- source maps;
- static JSON;
- client-side environment variables;
- service workers;
- downloadable configuration files;
- public build artifacts.

A `VITE_`, `NEXT_PUBLIC_`, or similarly exposed build variable is not a secret after it is included in a browser bundle.

---

## 2. Required disclosure for every AI action

Before an AI action is enabled, the interface and implementation must define six fields.

### INPUT

What user content will be sent?

Examples:

- selected text only;
- complete journal entry;
- uploaded file;
- current page metadata;
- conversation history;
- location or device information.

Do not silently add unrelated context.

### DESTINATION

Where will the content go?

State:

- provider or local service;
- model when known;
- server or proxy boundary;
- whether another processor is involved.

### STORAGE

What may be retained, and where?

Distinguish:

- browser-local storage;
- project backend storage;
- provider retention;
- logs and analytics;
- temporary processing only.

Do not claim that content is not stored unless the complete path supports that claim.

### CREDENTIAL

Who supplies authorization?

Allowed examples:

- server-side project credential;
- explicit user-provided key;
- OAuth or another provider-supported public-client flow;
- local service requiring no cloud credential.

The credential owner and scope must be clear.

### CLAIM

What does the result mean, and what does it not mean?

An AI response is not automatically:

- verified fact;
- diagnosis;
- recovered memory;
- legal, medical, or financial determination;
- proof of intent or consciousness;
- authoritative source material.

Claims must match the actual implementation and evidence.

### CONTROL

What can the user do?

Depending on the action, controls should include:

- cancel before sending;
- inspect the payload;
- copy or export the result;
- delete stored content;
- clear credentials;
- disable the integration;
- retry without losing the source text.

---

## 3. Acceptable provider architectures

### Server-side proxy

A project backend stores a scoped credential and enforces:

- authentication where needed;
- rate and cost limits;
- request size limits;
- provider allow-listing;
- structured error handling;
- abuse controls;
- minimal logging;
- secret rotation.

The browser calls the project endpoint, not the provider with a shared secret.

### Explicit BYOK

The user consciously supplies their own key.

Required safeguards:

- explain where it is stored;
- do not export it to a file or cloud drive by default;
- mask it after entry;
- provide clear removal;
- never print it in logs or error messages;
- warn that browser storage is accessible to scripts running on the same origin;
- send data only after a separate intentional action.

BYOK is not permission to hide the destination or transmitted content.

### Provider-supported public-client authorization

OAuth, short-lived tokens, device flows, or other mechanisms explicitly designed for public clients may be used according to provider documentation.

Long-lived project secrets must not be simulated through these flows.

### Local or offline inference

A local service or model may be used when the interface clearly communicates:

- where processing occurs;
- what local service must be running;
- what files or text it receives;
- whether local logs are created.

### No AI action

A portal remains valid without AI. A clearly unavailable action is safer than a fake response or hidden credential.

---

## 4. Prohibited patterns

Do not:

- hardcode a provider key in HTML, JavaScript, JSX, JSON, documentation, or examples;
- treat a client-visible environment variable as confidential;
- include a hidden fallback or demo credential;
- call a provider directly with a project-owned shared key;
- commit `.env` files containing real values;
- log keys, authorization headers, full prompts, or private journal text by default;
- expose credentials in URLs, screenshots, generated reports, or copied error messages;
- export a key to JSON or synchronize it to cloud storage by default;
- claim that an AI feature is local when it sends data to a provider;
- silently enable a different provider when the selected provider fails;
- return fabricated output when a provider is unavailable.

---

## 5. Unavailable-state contract

When no safe provider path exists, the action must not send anything.

Recommended wording:

```text
AI tools unavailable
Secure provider connection has not been configured.
No input was sent.
```

The UI may use a disabled control, but it must also explain:

- why the action is unavailable;
- that no content was transmitted;
- what safe configuration would be required.

Do not use an endless loader, fake analysis, or generic network error to disguise a deliberately disabled integration.

---

## 6. Sensitive-domain claim boundaries

AI output in personal, psychological, health, legal, financial, safety, or identity-related contexts requires explicit limits.

For Elysia, the permitted future label is:

> **Reflective prompt generation — not diagnosis, memory recovery, dream truth, or verified psychological interpretation.**

A poetic interface does not change the epistemic status of generated text.

---

## 7. Incident response for an exposed credential

### Immediate

1. Revoke or rotate the credential at the provider.
2. Review usage, quotas, billing, restrictions, and audit logs.
3. Remove the value from the current repository tree and deployed artifacts.
4. Disable the affected client action until a safe architecture exists.
5. Search for copied values in code, docs, logs, releases, artifacts, forks, and deployment records.

### Next

6. Record affected paths and remediation status without repeating the secret.
7. Add restrictions and least-privilege scopes to replacement credentials.
8. Confirm that unavailable states do not transmit user input.
9. Decide separately whether Git history should be rewritten.

### History boundary

Deleting a value from the current branch does not remove it from earlier commits, tags, releases, forks, caches, or clones.

History rewriting can disrupt commit identities, links, open branches, and local clones. Rotation is the first protection; history rewriting is a separate repository-maintenance decision.

---

## 8. Pull-request checklist

An AI action is not ready to merge until the reviewer can answer:

- [ ] What exact input is transmitted?
- [ ] Which destination receives it?
- [ ] What storage and logging occur?
- [ ] Who owns and supplies the credential?
- [ ] Is any project secret visible to the browser?
- [ ] Can the user cancel or disable the action?
- [ ] Is the result labelled according to its actual reliability?
- [ ] Does the unavailable state send nothing?
- [ ] Are error messages free of credentials and private payloads?
- [ ] Have current-tree credential patterns been scanned?
- [ ] Has the build or standalone page been tested without a credential?

---

## 9. Canonical implementation principle

> **A beautiful AI button is still a data-transfer boundary. Treat it like one.**
