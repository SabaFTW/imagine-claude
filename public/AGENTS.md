# Public and Legacy Artifact Instructions

These instructions extend the repository-root `AGENTS.md` for files under `public/`.

Before transforming a standalone HTML portal, read:

- `docs/GLASS_AND_GEARS_INTENT_MATRIX.md`
- `docs/INTERFACE_TRANSFORMATION_BLUEPRINT.md`

Rules:

1. Treat standalone HTML files as legacy artifacts unless they are explicitly designated as the active implementation.
2. Preserve the original artifact or an archived copy when replacing it with a React portal.
3. Do not embed API keys, tokens, credentials, or private endpoints in client-side HTML or JavaScript.
4. Use base-aware paths compatible with the `/imagine-claude/` GitHub Pages prefix.
5. Do not label mock data, timers, random values, or static content as live or real-time.
6. Keep Raw source access distinct from Preserve outputs.
7. Progressive disclosure must not make content undiscoverable.
8. Long text belongs in a stable reading view, not inside a tiny card or transient tooltip.
9. Destructive controls must be separated and confirmed.
10. Any migrated portal must support keyboard, touch, reduced motion, visible focus, empty states, errors, and unavailable states.

The current Elysia migration target is documented in:

- `docs/pilots/ELYSIA_GLASS_AND_GEARS_PILOT.md`
