# Distribution Guide

This workspace publishes a reusable method stack in three layers.

## Primary Copy Set

For a normal new repository, copy:

1. `agentic-method-kit/`
2. `agentic-repo-shell/`

Add this only when needed:

3. `pantheon-overlay/`

Use this helper when bootstrapping directly from this workspace:

4. `scripts/bootstrap-agentic-repo.ps1`

## What Each Layer Means

- `agentic-method-kit/`: method source of truth, schemas, templates, playbook, version metadata
- `agentic-repo-shell/`: repo-local shell, adapters, CI entrypoints, runtime skeleton
- `pantheon-overlay/`: Pantheon-specific inheritance, drift, architecture, and backend governance

## Do Not Copy By Default

Do not copy the root workspace wholesale into a new business repository.

Do not treat these as part of the default copy set:

- `archive/`
- root `docs/`
- root `.harness/`
- root `openspec/`
- `pantheon-base/`
- `pantheon-ops/`

Those paths exist for maintenance, reference, historical traceability, or Pantheon-specific workspace operation.

## Target Outcomes

### Generic Repository

Use:

- `agentic-method-kit/`
- `agentic-repo-shell/`

### Pantheon-Derived Repository

Use:

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `pantheon-overlay/`
- optionally `pantheon-base/` when the repository depends on that foundation

## Verification After Copy

After bootstrap or copy, run:

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
```

If `pantheon-overlay/` is applied, also run the overlay-owned tests and checks required by that repo's CI.

If you plan to fully separate the method from the current workspace, continue with:

- [MIGRATION_TO_STANDALONE_REPO.md](./MIGRATION_TO_STANDALONE_REPO.md)
