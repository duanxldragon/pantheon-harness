# Capability-Adaptive Delivery — Local Closeout

Implemented the user's confirmed priority: reduce process overhead and improve autonomous delivery. Base and Ops now consume the same reviewed Harness policy through active entry links and normalized-text SHA256 receipts.

## Changed Behavior

- The primary agent may gather context, plan, implement, verify, and fix in one session. Roles express responsibility rather than vendor/process identity; explicitly read-only assignments remain read-only.
- Ordinary L1 uses a short scope/plan/checks/findings record. Full L2 artifacts and independent high-risk review or an explicit gap/acceptance gate remain.
- Delegation needs an authorized self-contained branch or independent review, ownership, budget, evidence, stop condition, and an integration owner. File count alone does not trigger delegation.
- Context retrieval is topic-based. Recovery checkpoints preserve scope, decisions, current edits, verification, gaps, remaining work, and next action; no universal compaction percentage remains in touched current guidance.
- The new stdlib-only sensor checks reviewed policy hashes/version and active entry links; validation never refreshes receipts. Product versions and foundation locks remain independent.

## Sources and Capability Record

- [Official retrieval records](./sources.json): five official OpenAI/Claude documents retrieved 2026-11-23, with excerpts, decoded-text hashes, response status and date context.
- Current surface: Codex primary session with shell/file tools and authorized native researcher/review lanes. Exact model/effort are not independently exposed to the task evidence; no model or global setting was changed. CodeGraph/LSP/AST tools were unavailable. Browser/application runtime evidence is outside this method/docs/plain-MJS scope.
- No performance benchmark was performed. Vendor capability statements support a candidate policy, not a measured productivity claim.

## Validation

- 101 Harness tests passed, zero failures/skips; nine target the consumption sensor's real failure cases.
- 16 additional Verify script tests passed during the GitHub submission preflight.
- Both consumer checks passed after intentional receipt refresh following independent repair review.
- Harness health/adoption/docs/inventory/encoding/task checks and Base health/adoption/docs/inventory passed. Ops overlay passed. All changed Ops documents have zero scoped diagnostics.
- Preservation evidence checks 71 original dirty consumer files by SHA256 and retains the two Base workflows' pre-existing authorization/archive-protection passages.
- [Command results and raw logs](./commands.json); [independent review](./review.md): code/spec/security COMMENT with zero unresolved findings, architecture CLEAR.

Gate Outcomes: method-consumption caught stale policy hashes and active English-entry drift | independent review caught heavy L1 artifact rules and Chinese guidance drift | the submission visual gate initially matched the packet's out-of-scope UI wording; the packet now explicitly records visual evidence as not applicable for this method-only task, using the gate's existing supported classification.

## Explicit Gaps and Stop Condition

- Ops full document frontmatter still reports 18 pre-existing remediation packets lacking linked_contracts. This task preserved them and did not waive the gate.
- LSP/AST/CodeGraph diagnostics were unavailable; review does not certify unconditional merge-readiness.
- Local method adoption is complete. Published VERSION remains 1.4.0 and these are Unreleased revisions distinguished by receipt hashes. At the original local closeout, no commit, publication, CI rollout, or foundation snapshot replacement had been performed.
- No shared product-code/config/checker sync is required by these changes. Future Base product changes still reach Ops through an official foundation release/rebuild; current method links and .harness receipts are already declared Ops repository overlay assets.
- Final maintainer method/functional acceptance is the remaining human touchpoint.

## Follow-up GitHub Submission

The user subsequently authorized submitting the Harness changes to GitHub. The delivery uses `feat/method/adaptive-delivery` and a draft PR against `main`, after completing the remaining CI-equivalent local gates. Base/Ops changes remain local. Merge, formal release, and foundation replacement are outside this follow-up. The independent review's qualifications remain unchanged; remote commit/PR and CI results are reported separately after submission.

## Linkage

- [Task packet](../../../docs/harness/tasks/2026-11-23-capability-adaptive-delivery.task.md)
- [Canonical policy](../../../patterns/capability-adaptive-delivery.md)
- Base: .harness/method-consumption.json; AGENTS.md, AGENTS.en.md, CLAUDE.md and local delivery workflow.
- Ops: .harness/method-consumption.json; AGENTS.md, CLAUDE.md and PROJECT_INHERITANCE.
