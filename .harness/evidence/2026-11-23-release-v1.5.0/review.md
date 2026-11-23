# Release Review: v1.5.0

## Machine Readable

```json
{
  "taskId": "2026-11-23-release-v1.5.0",
  "verdict": "approved",
  "approvalScope": "release-preparation-after-required-gates",
  "recommendation": "APPROVE",
  "reviewers": {
    "releaseReview": "Claude Code 2.1.293, independent read-only pass over the staged release diff: APPROVE with three P2 pre-merge gates",
    "postReviewDelta": "Mechanical stale-version/reference repairs after the review; re-verified by strict local gates; second external pass timed out"
  },
  "structuralReview": {
    "affectedSubgraph": [
      "release metadata -> consumption receipt version/hash check -> tagged release"
    ],
    "checks": ["sensitive-flow"],
    "findings": [],
    "notes": "Metadata/documentation-only release. Seven consumed policy files are unchanged; consumer receipts validate the same hashes at 1.5.0. No product code, foundation lock, or runtime dependency change."
  },
  "methodReview": {
    "ownerLayer": "portable-method",
    "ratchetDecision": "no-new-sensor",
    "deferredCodeIssues": [],
    "consumerSpecificLeakage": "none"
  },
  "deliveryGovernanceReview": {
    "designGate": "satisfied",
    "developmentGate": "satisfied",
    "qaAcceptanceGate": "satisfied-by-local-gates",
    "githubGovernanceGate": "post-merge-ci-pending"
  },
  "linkage": {
    "taskPacket": "docs/harness/tasks/2026-11-23-release-v1.5.0.task.md",
    "evidence": ".harness/evidence/2026-11-23-release-v1.5.0/commands.json",
    "reviewFile": ".harness/evidence/2026-11-23-release-v1.5.0/review.md",
    "changeRef": "none",
    "planRefs": []
  }
}
```

## Verdict

APPROVE for the release step. The independent reviewer found the staged diff internally consistent, correctly scoped, and honest about pending gates. It attached three P2 pre-merge conditions; all are handled below. No P0/P1 finding was raised.

## Findings and Resolution

- **P2 — review/evidence placeholders must close before merge.** The reviewer required real command evidence, a closed task checklist, and a non-placeholder verdict. Resolution: `commands.json` exists with command results; the task checklist is closed; this file replaces the blocked placeholder.
- **P2 — bilingual historical highlights diverged.** English kept a v1.4.0 section while Chinese jumped from v1.5.0 to v1.3.0. Resolution: added the Chinese v1.4.0 highlights parity section.
- **P2 — confirm the capability policy does not still self-label as Unreleased.** Resolution: `patterns/capability-adaptive-delivery.md` contains only a general rule that unreleased method edits retain the current release version and are hash-distinguished; it does not label this release as Unreleased.
- **Additional stale release references found during repair.** `patterns/README.md`, `patterns/README.zh.md`, `patterns/install.md`, `patterns/install.zh.md` still cited `1.3.0`; `architecture/methodology/harness-methodology.zh.md` still pointed readers to the Unreleased section. Resolution: aligned them to `1.5.0`/v1.5.0 (2026-11-23).

## Post-Review Delta

After the independent pass, only version strings and release-reference prose changed. No policy file, checker, schema, task scope, or consumer receipt changed. The strict local gate set was rerun after those edits and is recorded in `final-gates.log`; the graph-review strict gate initially exposed the missing `## Structural Scope` section, which was added to the task packet before the final run.

## Verification Checked

- 101 Harness script tests and 16 Verify script tests passed.
- Strict method health, adoption, failure registry, sync drift, doc frontmatter, encoding, doc links, doc inventory, template health, task packet, evidence, review, graph review, visual evidence, and runtime evidence all passed.
- Base and Ops consumption preflights passed at methodVersion 1.5.0 with the same seven policy hashes.

## Residual Risk and Limitations

- The reviewer had no filesystem or CodeGraph access; it reviewed the supplied diff, task packet, and evidence text. Byte-identity of the seven policy files was confirmed separately by the consumption preflight, not by the reviewer.
- The second external reviewer pass over the final diff timed out at the model service. The post-review delta is mechanical version-reference repair verified by strict gates, not an independent re-approval of new behavior.
- Remote CI, merge, tag, GitHub Release, and branch cleanup are verified after delivery and reported separately; this review does not assert they have happened.
- Historical `patterns/changelog.md` remains a legacy 1.0.0-era file; the canonical release history is the root `CHANGELOG.md`. This pre-existing drift is recorded, not rewritten in this release.
