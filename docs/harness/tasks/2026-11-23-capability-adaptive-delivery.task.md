# Task Packet: capability-adaptive-delivery

## Goal

Improve Pantheon Harness using dated official model/client evidence, remove unnecessary fixed role handoffs, and let Base/Ops consume the canonical method with verifiable receipts.

## Primary Layer

cross-repository

## Workspace Context

- Target Repository: `pantheon-harness`
- Repository Role: `method-source`
- Upstream Dependencies: `none`
- Downstream Consumers: `pantheon-base, pantheon-ops`
- Sync Expectation: `completed`
- Release Requirement: `none`

## Dependency Layers

- method
- inheritance-sync

## Harness Profile

- Template: docs-governance
- Overlay: none
- Quality Profile: portable-method
- Portable Failure Class: instruction-gap
- Owner Layer: portable-method
- Coverage Dimensions:
  - maintainability
  - architecture-fitness
  - method-health

## Contract Anchors

- `AGENTS.md`
- `architecture/harness/task-packet-spec.md`
- `architecture/harness/review-loop-spec.md`
- `patterns/method-first-delivery-policy.md`
- `../pantheon-base/AGENTS.md`
- `../pantheon-ops/docs/PROJECT_INHERITANCE.md`

## Scope

### In

- Canonical capability-adaptive policy, tier/role/context/review alignment, source citations.
- Base/Ops active agent entrypoints and local adoption receipts; Base delivery workflow consumption.
- Portable read-only consumption sensor with intentional update mode, regression tests, inventories and upgrade guidance.
- Independent review and verification evidence of these changes.
- Follow-up user-authorized GitHub submission of Harness changes on a topic branch with a draft PR against main.

### Out

- Product code, UI, application behavior, existing unrelated changes, global model/settings changes.
- Release publication, PR merge, Base/Ops commits or pushes, changing foundation locks, rebuilding/replacing Ops, or claiming benchmark gains.
- Making a new CI required gate or modifying human exemption policy.

## Assumptions and Open Questions

- Confirmed Facts: Harness is 1.4.0 with an Unreleased section; Base/Ops have existing uncommitted work; Ops owns AGENTS.md, CLAUDE.md, PROJECT_INHERITANCE and .harness through repositoryOverlayPaths.
- Working Assumptions: none; the user confirmed reducing process overhead and improving autonomous delivery as the priority. Preserve portable tool independence.
- Open Questions: none blocking authorized local work or the follow-up Harness GitHub submission.

## Expected Files

### Create

- `patterns/capability-adaptive-delivery.md`
- `scripts/harness/check-method-consumption.mjs`
- `scripts/harness/check-method-consumption.test.mjs`
- `../pantheon-base/.harness/method-consumption.json`
- `../pantheon-ops/.harness/method-consumption.json`
- `.harness/evidence/2026-11-23-capability-adaptive-delivery/`

### Modify

- Method routing, tiers, methodology entry, playbooks, context/guardrails, review contract, task template, install/upgrade/index/changelog documentation.
- `../pantheon-base/AGENTS.md`, `AGENTS.en.md`, `CLAUDE.md`, and bilingual delivery workflow.
- `../pantheon-ops/AGENTS.md`, `CLAUDE.md`, and bilingual PROJECT_INHERITANCE.

### Do Not Touch

- Existing consumer product/evidence/archive edits, `.codex/model-tiers.json`, foundation locks and shared Ops product files.
- Global Codex/Claude configuration or authentication.

## Implementation Notes

- Implementer: primary agent acts as planner/generator, uses direct repository retrieval (CodeGraph tools unavailable in this session), and verifies scoped changes.
- Reviewer: independent native code-reviewer checks scope, authorization, retained risk gates, consumption correctness, and evidence.
- Keep published method/shell version 1.4.0; Unreleased bytes are distinguished by policy SHA256. Direct method consumption does not modify the product release contract.

## Minimum Viable Approach

- Selected Rung: small local code
- Why This Is Enough: reuse existing contracts and evidence formats; one stdlib-only sensor serves two consumers without copying method or shared scripts.
- Upgrade Trigger: reproducible consumer drift or measured workflow failures justify further automation.

## Success Criteria

- Behaviour Outcome: no vendor-fixed planner/executor split in touched active entrypoints; L1 can complete in one session, L2 safeguards remain.
- Verification Signal: consumption checks pass for both consumers, intentional drift fails regression tests, method docs and governance validate.
- Regression Watch: current product VERSION/locks and unrelated dirty files retain original bytes; no fabricated benchmark or independent approval.
- Economics Watch: no new orchestration dependency or global model change; exact tokens/cost unavailable.

## Context Strategy

- Entry Sources: repository AGENTS.md, required harness/base/ops canonical entries, this packet.
- Retrieval Order: entry -> bounded docs -> specific script/evidence.
- Retrieval Helpers: CodeGraph unavailable; direct file reads and literal rg queries.
- Promotion Target: capability policy and consumption receipts.
- Response Budget: terse
- Sensitive Context: no credentials or full environment dumps.

## Structural Scope

- Affected Subgraph: harness policy/routing -> consumer agent entries -> pinned consumption receipt -> read-only preflight
- Boundary Crossings: method-source -> foundation-source and business-consumer; no product source inheritance change
- Risk Nodes: consumption snapshot writer; review and authorization rules
- Graph Focus: sensitive-input-flow

## Verification Plan

- `node --test scripts/harness/check-method-consumption.test.mjs`
- Relevant portable checker tests and strict method/docs/task/evidence/review checks.
- `node ../pantheon-harness/scripts/harness/check-method-consumption.mjs --root . --source ../pantheon-harness` in each consumer.
- Consumer docs/governance checks; scoped independent review; original dirty-file hash comparison.
- Before GitHub submission, complete remaining Harness CI-equivalent gates and verify the staged Harness-only scope.
- Visual evidence: not applicable; this task changes portable method documentation and Node checks, with no user-facing UI changes.

## Linkage

- Task ID: 2026-11-23-capability-adaptive-delivery
- OpenSpec Change: none
- Plan References: none
- Evidence Directory: .harness/evidence/2026-11-23-capability-adaptive-delivery/
- Review File: .harness/evidence/2026-11-23-capability-adaptive-delivery/review.md

## Evidence Required

- Dated official research and source claims in canonical policy.
- Commands/results/logs and independent review summary.
- Consumer receipts and preservation evidence.
- Explicit lack of empirical model benchmarks, formal release, and product foundation replacement; separate local verification from remote CI status.

## Human Gates

- Final functional/method acceptance; user has authorized these reversible method improvements.
- The user's follow-up request authorizes committing and pushing Harness changes to GitHub. A draft PR preserves the remaining acceptance gate.
- PR merge, release publication, consumer repository submission, and product foundation replacement remain outside this task.

## GitHub Submission

- Authorization: user requested submitting the pantheon-harness changes to GitHub after the local closeout.
- Repository: duanxldragon/pantheon-harness.
- Branch: feat/method/adaptive-delivery; base: main.
- Delivery: Conventional Commit, topic-branch push, draft PR; remote CI status is reported after submission.
- Local review qualifications remain in force; submission does not assert merge approval.

## Completion Checklist

- [x] Layer and boundary declared
- [x] Contract anchors read
- [x] Canonical method and consumer entrypoints aligned
- [x] Consumer receipt checks pass
- [x] Verification run or exception recorded
- [x] Evidence saved or summarized
- [x] Review completed
- [x] Residual gaps explicit
