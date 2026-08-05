# Provider Rotation Required

Date identified: **2026-08-04**

Two distinct Gemini credentials were found in repository material:

1. one shared credential copied across public and legacy portal files;
2. one different credential committed in the former root `.env` file.

The security branch removes or redacts the values from the current tree and disables the inspected unsafe public-client provider paths.

## Repository owner action

Both credentials must be revoked or rotated in the corresponding Google project or key-management interface.

For each credential:

- inspect usage and quota history;
- inspect billing and unexpected requests;
- revoke or rotate the key;
- restrict any replacement by API, application, origin, and quota as appropriate;
- never place the replacement in browser code, documentation, commits, issues, screenshots, or chat;
- record completion without recording the new value.

Removing a credential from the current branch does not remove it from previous Git commits, forks, clones, caches, or deployments.

See:

- `docs/AI_ACTION_SECURITY_PROTOCOL.md`
- `docs/security/CREDENTIAL_SWEEP_2026-08-04.md`
- `docs/security/VALIDATION_2026-08-04.md`
