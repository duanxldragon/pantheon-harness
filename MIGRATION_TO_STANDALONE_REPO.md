# Migration Plan: Standalone Method Repository

This document defines how to migrate the reusable method stack out of the current workspace into a dedicated standalone repository.

## Goal

Move the publishable method assets into an independent repository without breaking:

- method versioning
- repo-shell compatibility
- Pantheon overlay compatibility
- bootstrap and smoke verification
- historical traceability

## Target Repository Shape

Recommended new repository contents:

```text
.github/
agentic-method-kit/
agentic-repo-shell/
pantheon-overlay/
scripts/
archive/
README.md
DISTRIBUTION.md
RELEASE.md
WORKSPACE_MANIFEST.json
```

Optional in the standalone repository:

- `.agents/` only if the distribution workspace itself still uses shared adapter docs
- `.codex/` only if the distribution workspace itself keeps Codex-only helper assets

Do not move these into the standalone method repo unless there is a deliberate reason:

- `pantheon-base/`
- `pantheon-ops/`
- current workspace-level root `docs/` that only exist for Pantheon operations
- current runtime `.harness/evidence/` history outside explicit archive scope

## What Must Move

Required:

- `agentic-method-kit/`
- `agentic-repo-shell/`
- `pantheon-overlay/`
- `scripts/bootstrap-agentic-repo.ps1`
- `README.md`
- `DISTRIBUTION.md`
- `RELEASE.md`
- `WORKSPACE_MANIFEST.json`
- `archive/`

Recommended helper:

- `scripts/scaffold-standalone-method-repo.ps1`

Move only if still needed by the standalone repo's own maintenance workflow:

- root `.github/`
- root `.agents/`
- root `openspec/`
- root `docs/harness/`
- root `scripts/harness/`
- root `SHELL_VERSION.json`

## What Should Stay Behind

Keep in the current Pantheon workspace:

- `pantheon-base/`
- `pantheon-ops/`
- `docs/WORKSPACE_INHERITANCE.md`
- `docs/PROJECT_INHERITANCE_TEMPLATE.md`
- `docs/BASE_UPGRADE_WORKFLOW.md`
- any future Pantheon workspace operations documents

Reason:

those files describe Pantheon as a consumer ecosystem, not the generic method distribution itself.

## Recommended End State

After migration:

- the standalone repository becomes the source of truth for method packaging and release
- the Pantheon workspace becomes a consumer workspace plus reference implementation host
- Pantheon-specific upgrades pull from the standalone repository instead of evolving the method in place

## Migration Strategy

### Option A: Clean History Split

Use when:

- preserving file history on the package directories matters
- you want a traceable standalone git history from day one

Approach:

1. Create the new repository.
2. Copy only the target publishable surfaces.
3. Make one clean import commit.
4. Optionally replay or transplant selected historical commits later if needed.

This is the recommended option unless there is a strong need to preserve per-file ancestry immediately.

### Option B: History-Preserving Extraction

Use when:

- commit ancestry on `agentic-method-kit/`, `agentic-repo-shell/`, and `pantheon-overlay/` matters more than speed

Approach:

1. Create a temporary branch dedicated to extraction.
2. Filter or subtree-split the desired paths.
3. Reassemble the standalone repo from the filtered history.
4. Reintroduce shared root files as a final normalization commit.

This is heavier and only worth it if long-term archaeology matters.

## Recommended Practical Sequence

### Phase 1: Freeze The Publishable Surface

Before migration:

1. Stop structural churn in:
   - `agentic-method-kit/`
   - `agentic-repo-shell/`
   - `pantheon-overlay/`
2. Ensure version metadata is consistent.
3. Ensure archive boundaries are already cleaned.

Exit criteria:

- root method checks pass
- shell tests pass
- overlay tests pass
- bootstrap smoke passes

### Phase 2: Create The Standalone Repository

1. Create a new repository name such as:
   - `agentic-method-workspace`
   - `harness-method-workspace`
   - `agentic-method-kit-workspace`
2. Copy the publishable surfaces into it.
3. Keep Pantheon references only where they describe the overlay.

Practical shortcut:

- run `pwsh ./scripts/scaffold-standalone-method-repo.ps1 -TargetPath <path> -Force`

Exit criteria:

- new repository structure matches the target shape
- no accidental `pantheon-base/` or `pantheon-ops/` copy exists

### Phase 3: Normalize Root Semantics

In the new repository:

1. Rewrite any remaining root copy that still assumes a Pantheon workspace.
2. Keep Pantheon only as:
   - an overlay
   - a reference consumer
3. Rename any leftover root metadata that still implies project-family ownership instead of distribution ownership.

Exit criteria:

- root README describes a distribution workspace first
- Pantheon appears as an optional overlay or reference consumer, not the main identity

### Phase 4: Rewire Verification

In the new repository:

1. Verify:
   - `node scripts/harness/check-adoption.mjs --strict`
   - `node scripts/harness/check-method-health.mjs --strict`
   - `node --test agentic-repo-shell/scripts/harness/*.test.mjs`
   - `node --test pantheon-overlay/scripts/harness/*.test.mjs`
2. Run bootstrap smoke:
   - `pwsh ./scripts/bootstrap-agentic-repo.ps1 -TargetPath .tmp/release-smoke -ApplyPantheonOverlay -Force`
   - `node .tmp/release-smoke/scripts/harness/check-method-health.mjs --strict --root .tmp/release-smoke`
   - `node --test .tmp/release-smoke/scripts/harness/*.test.mjs`

Exit criteria:

- all checks pass in the standalone repo without depending on `pantheon-base/` or `pantheon-ops/`

### Phase 5: Convert Pantheon Workspace Into Consumer Mode

Back in the current workspace:

1. Stop treating root method assets here as the primary source of truth.
2. Replace local maintenance flow with one of:
   - subtree copy from the standalone repo
   - scripted sync from the standalone repo
   - git submodule reference to the standalone repo
3. Keep only Pantheon consumer-specific documents and integration glue here.

Exit criteria:

- method evolution happens in the standalone repo
- Pantheon workspace only consumes released or synced method assets

## Consumer Sync Models

### Model 1: Manual Vendor Copy

Simple and explicit.

Pros:

- easiest to understand
- no special git model

Cons:

- drift can accumulate
- upgrades are manual

### Model 2: Git Subtree

Pros:

- keeps files directly in the tree
- easier than submodules for many teams

Cons:

- history operations are more complex

### Model 3: Git Submodule

Pros:

- clean ownership boundary
- explicit version pinning

Cons:

- more operational overhead
- many teams dislike submodule ergonomics

### Recommendation

For Pantheon, prefer:

1. standalone method repo as source of truth
2. Pantheon workspace consuming it via subtree or scripted sync

Avoid submodules unless strict pinning is more important than ergonomics.

## Cutover Checklist

Cut over only when all are true:

- standalone repo contains the full publishable surface
- standalone repo passes release checks
- bootstrap smoke passes there
- Pantheon workspace has a documented consumer-sync plan
- ownership is explicit: method repo vs Pantheon consumer workspace

## Post-Cutover Rules

After cutover:

- new method work starts in the standalone repo
- Pantheon-specific governance changes that belong to the overlay also start there
- Pantheon workspace only keeps consumer configuration, local adoption, and reference usage docs

## Minimal Follow-Up Tasks

After the standalone repo exists, do these next:

1. add a sync policy document for Pantheon consumption
2. add a standalone repo CI workflow for release smoke
3. add a changelog/release cadence rule
4. add an upgrade procedure from standalone repo into Pantheon workspace
