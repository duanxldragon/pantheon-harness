# Upgrade Guide

Chinese version: [UPGRADE.zh.md](./UPGRADE.zh.md)

Use this guide when updating an existing repository that already contains:

- `agentic-method-kit/`
- `agentic-repo-shell/`-derived repo-local files

## Upgrade Policy

- upgrade `agentic-method-kit/` first
- then reconcile repo-local shell files
- then rerun harness checks

## 1.0.0

Baseline release.

Recommended verification after upgrade:

```text
node agentic-method-kit/scripts/check-task-packet.mjs --root .
node agentic-method-kit/scripts/check-evidence.mjs --root . --strict
node agentic-method-kit/scripts/check-review.mjs --root . --strict
node agentic-method-kit/scripts/check-adoption.mjs --root .
```

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
