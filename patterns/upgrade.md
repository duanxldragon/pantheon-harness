# Upgrade Guide

Chinese version: [upgrade.zh.md](./upgrade.zh.md)

Use this guide when updating an existing repository that already contains:

- `pantheon-harness/` (standalone mode)
- `../pantheon-harness/` (workspace mode)

## Upgrade Policy

1. Update `pantheon-harness/` or pull latest changes from the harness repo
2. Then reconcile local harness files if needed
3. Then rerun harness checks

## Version Compatibility

Consumer product VERSION is independent of harness method VERSION. Existing METHOD_VERSION.json / SHELL_VERSION.json compatibility remains a separate contract; do not rewrite product versions or foundation locks for documentation adoption.

## Workspace Method Adoption

1. Link [Capability-Adaptive Delivery](./capability-adaptive-delivery.md) from active AGENTS.md and tool entrypoints while preserving consumer contracts and ownership.
2. After reviewing an intentional method change, run from the consumer root:

```powershell
node ../pantheon-harness/scripts/harness/check-method-consumption.mjs --root . --source ../pantheon-harness --update
node ../pantheon-harness/scripts/harness/check-method-consumption.mjs --root . --source ../pantheon-harness
```

The receipt records the reviewed version and normalized-text SHA256. Validation never refreshes it; unavailable or changed source fails visibly. Unreleased edits are distinguished by hashes and do not imply publication. CI/offline use must provide the same harness snapshot. Shared Base product files still reach Ops through a formal foundation release; direct method links do not replace that path.

## Standalone Method Adoption

Keep the local method copy and product version. Supply its location explicitly with --source and update entry links; record the receipt after review. Preserve a rollback copy before replacing an existing directory rather than using an unchecked recursive deletion command.

## Verification After Upgrade

### Standalone Mode

```text
node pantheon-harness/scripts/harness/check-task-packet.mjs --root .
node pantheon-harness/scripts/harness/check-evidence.mjs --root . --strict
node pantheon-harness/scripts/harness/check-review.mjs --root . --strict
node pantheon-harness/scripts/harness/check-adoption.mjs --root .
```

### Workspace Mode

```text
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-adoption.mjs --root .
```

If the upgraded repository has no recorded evidence or review artifacts yet, run evidence/review checks without `--strict` during bootstrap. Enable `--strict` only after the repository has at least one linked task packet, `commands.json`, and `review.md`.

## Method-First Ratchet Metadata

When upgrading from an older task packet format, update every non-trivial task packet with:

- `Quality Profile`
- `Portable Failure Class`
- `Owner Layer`
- `## Method Readiness`
- `Consumer-Specific Controls`
- `Required Sensors`
- `Required Evidence`
- `Ratchet Decision`
- `Deferred Code Issues`

Also update saved evidence and review artifacts:

- evidence `commands.json` should include `methodReadiness.ownerLayer`, `methodReadiness.ratchetDecision`, and `methodReadiness.deferredCodeIssues`
- review `review.md` machine-readable JSON should include `methodReview`

Use `registry-only` when a repeated failure is recorded but no guide, template, gate, sensor, or adapter change is made yet.

## Delivery Governance Metadata

When upgrading task packets, add:

- `## Delivery Governance`
- `Design Gate`
- `Development Gate`
- `QA Acceptance Gate`
- `GitHub Governance Gate`

When upgrading review artifacts, add `deliveryGovernanceReview` to the machine-readable JSON block.

When upgrading failure registries, add:

- `failureClass`
- `ownerLayer`
- `occurrenceCount`
- `promotionDecision`
- `promotionDeadline`
- `githubSignal`

Use these fields to classify red CI or PR signals before starting broad code cleanup.
