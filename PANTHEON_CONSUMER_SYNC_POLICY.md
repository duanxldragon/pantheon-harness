# Pantheon Consumer Sync Policy

This document defines how the Pantheon workspace should consume the standalone method repository after cutover.

## Goal

After the standalone method repository becomes the source of truth:

- Pantheon no longer evolves the method in place
- Pantheon explicitly imports released or approved method changes
- local Pantheon customization stays isolated to consumer-only files

## Source Of Truth

After cutover:

- standalone method repository owns:
  - `agentic-method-kit/`
  - `agentic-repo-shell/`
  - `pantheon-overlay/`
  - method distribution root docs
- Pantheon workspace owns:
  - `pantheon-base/`
  - `pantheon-ops/`
  - Pantheon workspace operations docs
  - consumer-specific integration glue

## Recommended Sync Model

Preferred model:

1. standalone repo as upstream
2. Pantheon workspace as downstream consumer
3. sync by subtree or scripted copy

Avoid:

- editing upstream-owned method files directly in Pantheon first
- letting Pantheon drift become the real source of truth

## Ownership Boundaries

### Upstream-Owned In Pantheon

These should match the standalone repo unless an explicit local fork is documented:

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `pantheon-overlay/`
- `scripts/bootstrap-agentic-repo.ps1`
- root distribution docs copied from upstream

### Pantheon-Owned

These remain local to Pantheon:

- `pantheon-base/`
- `pantheon-ops/`
- `docs/WORKSPACE_INHERITANCE.md`
- `docs/PROJECT_INHERITANCE_TEMPLATE.md`
- `docs/BASE_UPGRADE_WORKFLOW.md`
- any Pantheon operational docs that do not belong to the generic distribution

## Allowed Local Changes

Pantheon may locally change only:

- consumer-specific references to the standalone repo
- local upgrade notes
- local sync bookkeeping
- Pantheon business/foundation repositories and related docs

If a change affects upstream-owned method assets, it must move upstream first unless there is a documented emergency fork.

## Sync Triggers

Sync from upstream when:

- a new method release is published
- Pantheon needs a method bugfix
- Pantheon needs an overlay enhancement that belongs upstream
- release smoke or adoption checks reveal downstream drift

## Sync Procedure

### Normal Upgrade

1. Choose the upstream release or commit to consume.
2. Create a Pantheon upgrade branch.
3. Sync upstream-owned paths into the workspace.
4. Run verification:
   - `node scripts/harness/check-adoption.mjs --strict`
   - `node scripts/harness/check-method-health.mjs --strict`
   - `node --test agentic-repo-shell/scripts/harness/*.test.mjs`
   - `node --test pantheon-overlay/scripts/harness/*.test.mjs`
5. Run bootstrap smoke if shell or overlay changed.
6. Review downstream conflicts or local overrides.
7. Land the upgrade with explicit upstream version notes.

### Emergency Patch

Use only when Pantheon is blocked and upstream turnaround is too slow.

1. Document the local divergence immediately.
2. Apply the minimal downstream patch.
3. Open an upstream backport task.
4. Remove or reconcile the local divergence at the next upstream sync.

## Drift Policy

Drift categories:

- acceptable: local consumer bookkeeping
- temporary: emergency fork pending upstream reconciliation
- unacceptable: upstream-owned method logic evolving only in Pantheon

Unacceptable drift must be treated as a method governance bug.

## Version Recording

Each Pantheon sync should record:

- upstream repository URL or identifier
- upstream version or commit
- synced paths
- local exceptions, if any
- verification commands run

Recommended location:

```text
docs/METHOD_UPGRADE_LOG.md
```

or a similarly explicit consumer-owned upgrade log.

## Review Requirements

Every sync review should answer:

- did Pantheon modify any upstream-owned file locally
- if yes, should that change move upstream
- did the sync leave any undocumented divergence
- did bootstrap and method checks still pass

## Default Rule

When in doubt:

- upstream first
- Pantheon second

The consumer workspace should not become the hidden source of truth for the method.
