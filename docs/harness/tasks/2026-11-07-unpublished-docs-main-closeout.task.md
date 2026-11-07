# Task Packet: unpublished-docs-main-closeout

## Goal

Reconcile two unpublished local documentation commits on current GitHub main, preserve prior CodeGraph cache and historical refs, verify/review, merge and retain only main locally/remotely.

## Primary Layer

method

## Dependency Layers

- platform

## Harness Profile

- Template: docs-governance
- Overlay: none
- Coverage Dimensions:
  - maintainability
  - method-health

## Contract Anchors

- `architecture/harness/document-frontmatter-spec.md`
- `architecture/harness/harness-engineering-contract.md`
- `architecture/harness/task-packet-spec.md`
- `architecture/harness/verification-evidence-spec.md`
- `architecture/harness/review-loop-spec.md`

## Scope

### In

- Four architecture/methodology documents receive equivalent YAML frontmatter from archived local f97ac5a; bodies and language links preserved.
- Preserve aeb4614 research/better-harness-analysis.md and the CodeGraph cache .gitignore convention.
- Proper task/evidence/independent review/CI, PR merge and main-only cleanup.

### Out

- Checker or workflow behavior changes.
- Changes in Base/Ops or production systems.
- Repeating the checker patch already merged via PR8.
- Deleting original cache or historical work without recoverable backup.

## Expected Files

### Create

- docs/harness/tasks/2026-11-07-unpublished-docs-main-closeout.task.md
- .harness/evidence/2026-11-07-unpublished-docs-main-closeout/commands.json
- .harness/evidence/2026-11-07-unpublished-docs-main-closeout/review.md
- .harness/evidence/2026-11-07-unpublished-docs-main-closeout/summary.md
- .codegraph/.gitignore
- research/better-harness-analysis.md

### Modify

- architecture/methodology/branch-pr-workflow.md
- architecture/methodology/ci-cd-integration.md
- architecture/methodology/proto-driven-development.md
- architecture/methodology/workflow-templates.md

### Do Not Touch

- scripts/ and .github/workflows/
- ../pantheon-base/**
- ../pantheon-ops/**

## Implementation Notes

- Git-master independently confirmed48a0dfb checker patch alreadymerged; f97ac5a/aeb4614 are unique local docs.
- Their content is cherry-picked onto origin/main; old localmain/refs and cache stash exist in a verified complete bundle.
- Primary Dispatcher performs authorized refs mutations because separate CLI Git-master sandbox could not write .git; no policy bypass or main forcepush.
- Independent CODE reviewer via separate installed configured-default ephemeral read-only CLI judges candidate.
- Initial cache stash75596f6 and all-refs bundle retained; original data remains recoverable.

## Structural Scope

- Affected Subgraph: portable method documentation -> metadata discovery -> ordinary evidence/review gates
- Boundary Crossings: none
- Risk Nodes: document metadata and preserving unique unpublished files
- Graph Focus: none

## Verification Plan

- `node scripts/harness/check-doc-frontmatter.mjs --root . --strict`
- `node scripts/harness/check-doc-links.mjs --root . --strict`
- `node scripts/harness/check-doc-inventory.mjs --root . --strict`
- `node scripts/harness/check-task-packet.mjs --root .`
- `node scripts/harness/check-evidence.mjs --root . --strict`
- `node scripts/harness/check-review.mjs --root . --strict`
- `node --test scripts/harness/*.test.mjs`

## Linkage

- Task ID: 2026-11-07-unpublished-docs-main-closeout
- OpenSpec Change: none
- Plan References: none
- Evidence Directory: .harness/evidence/2026-11-07-unpublished-docs-main-closeout/
- Review File: .harness/evidence/2026-11-07-unpublished-docs-main-closeout/review.md

## Evidence Required

- command result summary
- review summary
- known gaps if any strict gate cannot be run

## Human Gates

- User explicitly authorizes pushing/merging task changes and keeping only main; no additional scope, gate-policy change or production authority.

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed
