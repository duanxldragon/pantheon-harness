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

- `pantheon-harness` VERSION should match consumer repo VERSION
- Run health check after upgrade:
```bash
node scripts/harness/check-method-health.mjs --strict
```

## Standalone Mode Upgrade

```text
# Pull latest pantheon-harness changes
git pull origin main

# Or replace with fresh copy
rm -rf pantheon-harness
cp -r /path/to/new/pantheon-harness .
```

## Workspace Mode Upgrade

```text
# Pull latest pantheon-harness
cd ../pantheon-harness
git pull origin main

# Update local VERSION to match
cd ../my-consumer-repo
echo "1.3.0" > VERSION

# Verify compatibility
node scripts/harness/check-method-health.mjs --strict
```

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
