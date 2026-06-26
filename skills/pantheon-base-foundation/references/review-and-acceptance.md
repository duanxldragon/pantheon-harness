# Review And Acceptance

- Start every review by declaring the primary layer.
- Read the matching contract, design, and acceptance documents before judging changes.
- Verify menu, permission, i18n, audit, schema, and generated-registry side effects when relevant.
- Run only the commands that match the changed surface, but do not rely on `build` alone.

## Verification Posture

- Findings first, ordered by severity.
- Do not claim completion without real verification evidence.
- For UI and browser-path changes, collect screenshots and runtime evidence through gstack where possible.

## Document Sync Triggers

Update docs when changes affect:

- layer ownership
- contracts
- API interfaces
- menus or permissions
- i18n keys or fallback rules
- schema or indexes
- acceptance scope
