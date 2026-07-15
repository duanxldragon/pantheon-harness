# Task Packet: grill-me enablement, base inheritance, and superpowers alignment

## Goal

Make `grill-me` an actual usable planning/design review skill in `pantheon-harness`, document shared-skill inheritance in `pantheon-base`, and audit Superpowers legacy linkage for alignment with current Pantheon Harness plan-reference conventions.

## Primary Layer

method

## Dependency Layers

- pantheon-harness/architecture/harness/task-packet-spec.md
- pantheon-harness/architecture/harness/verification-evidence-spec.md
- pantheon-harness/patterns/tool-adapter-matrix.zh.md
- pantheon-base/AGENTS.md
- docs/WORKSPACE_INHERITANCE.md

## Harness Profile

- Template: docs-governance
- Overlay: none
- Quality Profile: portable-method
- Owner Layer: portable-method
- Coverage Dimensions:
  - behaviour
  - maintainability
  - method-health

## Contract Anchors

- `pantheon-harness/architecture/methodology/harness-methodology.zh.md`
- `pantheon-harness/architecture/methodology/superpowers-migration.md`
- `pantheon-harness/skills/skills-lock.json`

## Scope

### In

- Rewrite `pantheon-harness/skills/grill-me/SKILL.md` into a minimal but usable tool-agnostic skill.
- Correct `pantheon-harness/skills/skills-lock.json` path metadata for `grill-me`.
- Register `grill-me` in `pantheon-harness/patterns/tool-adapter-matrix.zh.md`.
- Add shared-skill inheritance note in `pantheon-base/docs/README.md`.
- Audit `pantheon-base` for Superpowers legacy linkage and produce an alignment plan/artifacts.

### Out

- Do not copy `pantheon-harness/skills/grill-me` files into `pantheon-base`.
- Do not remove historical `docs/superpowers/...` files or references in this packet.
- Do not change runtime application code.

## Assumptions and Open Questions

- Confirmed Facts:
  - `pantheon-harness` already contains `grill-me` skill stubs.
  - `pantheon-harness/README.md` marks `skills/` as internal-only.
  - `pantheon-base` has no `grill-me` or `skills-lock` references today.
- Working Assumptions:
  - `grill-me` should be shared by reference, not by copy.
  - Superpowers references can remain as historical plan references if aligned to new metadata conventions.
- Open Questions:
  - none

## Expected Files

### Create

- `pantheon-harness/docs/harness/tasks/2026-07-13-grill-me-enablement-and-superpowers-alignment.task.md`
- `pantheon-harness/.harness/evidence/2026-07-13-grill-me-enablement-and-superpowers-alignment/commands.json`
- `pantheon-harness/.harness/evidence/2026-07-13-grill-me-enablement-and-superpowers-alignment/review.md`
- `pantheon-base/docs/harness/tasks/2026-07-13-grill-me-inheritance-reference.task.md`
- `pantheon-base/.harness/evidence/2026-07-13-grill-me-inheritance-reference/commands.json`
- `pantheon-base/.harness/evidence/2026-07-13-grill-me-inheritance-reference/review.md`

### Modify

- `pantheon-harness/skills/grill-me/SKILL.md`
- `pantheon-harness/skills/skills-lock.json`
- `pantheon-harness/patterns/tool-adapter-matrix.zh.md`
- `pantheon-base/docs/README.md`
- `pantheon-base/docs/harness/tasks/2026-07-10-p1-1-permission-anti-privilege-escalation.task.md`
- `pantheon-base/docs/harness/tasks/2026-07-10-p1-2-multi-instance-consistency.task.md`
- `pantheon-base/docs/harness/tasks/2026-07-10-p1-3-schema-single-source.task.md`
- `pantheon-base/scripts/harness/check-task-packet.mjs`

### Do Not Touch

- `pantheon-base/backend/**`
- `pantheon-base/frontend/src/**`
- `pantheon-harness/architecture/methodology/superpowers-migration.md` content
- existing `pantheon-base/docs/superpowers/**` files in this task

## Implementation Notes

- Keep `grill-me` minimal: trigger, rules, output, handoff.
- Keep base changes to docs/governance only.
- For Superpowers audit, prefer metadata normalization over mass deletion.

## Minimum Viable Approach

- Selected Rung: small local code / doc governance
- Why This Is Enough: shared methodology and docs changes are configuration/process, not new application behavior
- Upgrade Trigger: none

## Success Criteria

- Behaviour Outcome:
  - `grill-me` is usable from `pantheon-harness/skills/` for plan/design/PR-gate grilling.
  - `pantheon-base` documents shared-skill inheritance from `pantheon-harness` without duplicating skill files.
  - Superpowers legacy linkage is reviewed; base docs/task metadata use a consistent linkage model.
- Verification Signal:
  - `git diff --stat` shows expected docs/skills changes only.
  - `node scripts/harness/check-adoption.mjs --root .` passes in `pantheon-base`.
  - `node scripts/harness/check-task-packet.mjs --root .` passes in `pantheon-base`.
- Regression Watch:
  - No runtime code paths changed.
  - No destructive deletion of `docs/superpowers` history in this packet.
- Economics Watch: none

## Context Strategy

- Entry Sources: workspace AGENTS.md, pantheon-harness README, superpowers-migration.md, base docs README
- Retrieval Order: entry -> summary -> raw
- Retrieval Helpers: none
- Promotion Target: docs/harness task packets and evidence directories
- Response Budget: standard
- Sensitive Context: none

## Method Readiness

- Consumer-Specific Controls: checker | smoke path | none
- Required Sensors: command | review | none
- Required Evidence: command summary | review summary
- Ratchet Decision: guide-updated | template-updated | registry-only
- Deferred Code Issues: none

## Delivery Governance

- Design Gate: short boundary note
- Development Gate: expected files declared
- QA Acceptance Gate: command | human review
- GitHub Governance Gate: method-gate

## Structural Scope

- Affected Subgraph: docs/README -> task-packet metadata -> skill registry -> inheritance docs
- Boundary Crossings: docs-governance -> portable-method -> consumer-repository
- Risk Nodes: none
- Graph Focus: none

## Visual Evidence

Visual evidence: not applicable — docs governance and skill registration only, no user-facing UI.

## Verification Plan

- `git status --short`
- `git diff -- pantheon-harness/skills pantheon-harness/patterns/tool-adapter-matrix.zh.md pantheon-base/docs/README.md pantheon-base/scripts/harness/check-task-packet.mjs`
- `node "d:\workspace\go\pantheon-platform\pantheon-harness\scripts\harness\check-task-packet.mjs" --root "d:\workspace\go\pantheon-platform\pantheon-harness"`
- `node "d:\workspace\go\pantheon-platform\pantheon-base\scripts\harness\check-task-packet.mjs" --root "d:\workspace\go\pantheon-platform\pantheon-base"`
- `node "d:\workspace\go\pantheon-platform\pantheon-base\scripts\harness\check-adoption.mjs" --root "d:\workspace\go\pantheon-platform\pantheon-base"`

## Linkage

- Task ID: 2026-07-13-grill-me-enablement-and-superpowers-alignment
- OpenSpec Change: none
- Plan References: none
- Evidence Directory: .harness/evidence/2026-07-13-grill-me-enablement-and-superpowers-alignment/
- Review File: .harness/evidence/2026-07-13-grill-me-enablement-and-superpowers-alignment/review.md

## Evidence Required

- command result summary
- review summary
- explicit gap if any verification cannot be run

## Human Gates

- approve metadata normalization approach in base task docs
- approve minimal grill-me skill content before method release note

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] grill-me SKILL.md rewritten in harness
- [x] skills-lock path metadata corrected
- [x] tool-adapter matrix updated
- [x] base inheritance reference added
- [x] Superpowers linkage audit completed
- [x] base checker/docs updated for consistent linkage wording
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed
