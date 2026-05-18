# Pantheon Overlay

This directory is an optional overlay for repositories that use:

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `pantheon-base/`

Use this overlay only when the repository follows the Pantheon base/business inheritance model.

## What This Overlay Adds

- base/business inheritance contract
- Pantheon-specific PR template extensions
- Pantheon-specific CI workflow extensions
- Pantheon-specific architecture and backend contract checks
- inheritance contract checks
- base drift triage checks

## Apply Order

1. bootstrap `agentic-method-kit/`
2. bootstrap `agentic-repo-shell/`
3. apply `pantheon-overlay/`
4. include `pantheon-base/` when the repository uses the Pantheon foundation

## When To Use

Use this overlay only if your repository:

- has a `pantheon-base` foundation
- distinguishes base-owned vs business-owned changes
- needs base drift governance

If your project does not use that inheritance model, do not apply this overlay.

## Files Owned By This Overlay

This overlay owns the Pantheon-specific governance layer that should not live in the generic shell:

- inheritance and drift governance
- boundary checks
- backend response / DTO contract checks
- permission contract checks
- audit coverage checks

It also owns the Pantheon workspace-consumer reference docs:

- `docs/WORKSPACE_INHERITANCE.md`
- `docs/PROJECT_INHERITANCE_TEMPLATE.md`
- `docs/BASE_UPGRADE_WORKFLOW.md`
