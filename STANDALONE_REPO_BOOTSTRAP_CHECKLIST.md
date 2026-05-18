# Standalone Repo Bootstrap Checklist

This checklist is for the day you create the standalone method repository.

## Objective

Create a clean standalone repository that can release and validate:

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `pantheon-overlay/`

without depending on `pantheon-base/` or `pantheon-ops/`.

## Phase 1: Prepare In Current Workspace

- [ ] `agentic-method-kit/` is in a releasable state
- [ ] `agentic-repo-shell/` is in a releasable state
- [ ] `pantheon-overlay/` is in a releasable state
- [ ] archive boundaries are already cleaned
- [ ] root `README.md`, `DISTRIBUTION.md`, `RELEASE.md`, and `WORKSPACE_MANIFEST.json` reflect distribution semantics
- [ ] migration preplan exists in `MIGRATION_TO_STANDALONE_REPO.md`

Verification:

- [ ] `node scripts/harness/check-adoption.mjs --strict`
- [ ] `node scripts/harness/check-method-health.mjs --strict`
- [ ] `node --test agentic-repo-shell/scripts/harness/*.test.mjs`
- [ ] `node --test pantheon-overlay/scripts/harness/*.test.mjs`

## Phase 2: Create New Repository

- [ ] create the new git repository
- [ ] choose the final repository name
- [ ] copy only the intended publishable surfaces
- [ ] confirm `pantheon-base/` is absent
- [ ] confirm `pantheon-ops/` is absent
- [ ] confirm root `docs/` contains only distribution-owned material, if retained at all

Recommended initial contents:

- [ ] `agentic-method-kit/`
- [ ] `agentic-repo-shell/`
- [ ] `pantheon-overlay/`
- [ ] `scripts/bootstrap-agentic-repo.ps1`
- [ ] `README.md`
- [ ] `DISTRIBUTION.md`
- [ ] `RELEASE.md`
- [ ] `WORKSPACE_MANIFEST.json`
- [ ] `archive/`

## Phase 3: Normalize Root

- [ ] root README describes a distribution workspace, not a Pantheon workspace
- [ ] Pantheon is described only as an overlay or reference consumer
- [ ] no root doc claims `pantheon-base` or `pantheon-ops` are required for normal use
- [ ] any remaining root metadata is renamed away from project-family semantics

## Phase 4: Rewire Verification

- [ ] verify root method checks work in the standalone repo
- [ ] verify shell tests work in the standalone repo
- [ ] verify overlay tests work in the standalone repo
- [ ] verify bootstrap smoke works in the standalone repo

Commands:

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
node --test agentic-repo-shell/scripts/harness/*.test.mjs
node --test pantheon-overlay/scripts/harness/*.test.mjs
pwsh ./scripts/bootstrap-agentic-repo.ps1 -TargetPath .tmp/release-smoke -ApplyPantheonOverlay -Force
node .tmp/release-smoke/scripts/harness/check-method-health.mjs --strict --root .tmp/release-smoke
node --test .tmp/release-smoke/scripts/harness/*.test.mjs
```

## Phase 5: First Commit And Release Baseline

- [ ] create the initial import commit
- [ ] record the initial release baseline version
- [ ] confirm compatibility metadata between method kit and repo shell
- [ ] create or update changelog entries
- [ ] create the first standalone release tag or release note

## Phase 6: Pantheon Consumer Cutover

- [ ] document how Pantheon will consume upstream
- [ ] stop treating Pantheon workspace as the source of truth for method assets
- [ ] adopt `PANTHEON_CONSUMER_SYNC_POLICY.md`
- [ ] create the first downstream sync plan

## Exit Criteria

Bootstrap day is complete only when:

- [ ] standalone repo passes all method checks
- [ ] standalone repo passes all shell and overlay tests
- [ ] bootstrap smoke passes there
- [ ] Pantheon has a documented consumer sync policy
- [ ] ownership boundaries are explicit
