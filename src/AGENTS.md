# Source Implementation Instructions

These instructions extend the repository-root `AGENTS.md` for all files under `src/`.

Before creating or refactoring a portal, read:

- `docs/GLASS_AND_GEARS_INTENT_MATRIX.md`
- `docs/INTERFACE_TRANSFORMATION_BLUEPRINT.md`

Required implementation model:

- **Visibility depth:** Glance, Explore, Inspect, Raw
- **Interaction intent:** Orient, Introduce, Operate, Understand, Preserve
- **Access mode:** Guided and Direct

Do not collapse these into one mandatory linear wizard.

Technical rules:

1. Keep portal identity and routing metadata in `src/data/portalRegistry.js`; do not create another registry.
2. Use explicit labels with icons. Do not build icon-only mystery navigation.
3. Guided actions reveal the next useful layer; direct actions may jump to a stable target immediately.
4. Raw reveals original stored material. Preserve records a result created by the interaction. Never treat them as the same state.
5. Prefer reusable shell, reading, operation, evidence, result, and source-view components over portal-specific monoliths.
6. Preserve stable URLs for content users may bookmark, share, or reopen.
7. Do not bundle secrets, claim unsupported live behavior, or present mythology as runtime telemetry.
8. Every transformed portal must support keyboard, touch, reduced motion, loading, empty, unavailable, error, and GitHub Pages base-path states.

The first implementation pilot is specified in:

- `docs/pilots/ELYSIA_GLASS_AND_GEARS_PILOT.md`
