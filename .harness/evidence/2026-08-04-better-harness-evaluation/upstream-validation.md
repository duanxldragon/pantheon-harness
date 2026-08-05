# Better Harness Upstream Validation

## Baseline

- Repository: `https://github.com/QoderAI/better-harness.git`
- Commit: `4cd2fdb340631ebc726d1f7b617f997511aca9e8`
- Commit date: `2026-08-04T10:19:17+08:00`
- Package: `@qoderai/better-harness@0.4.0`
- License: MIT
- Runtime: Node `v24.14.0`, npm `11.9.0`
- Clone: shallow temporary checkout outside Pantheon repositories

## Commands

### Dependency installation

```text
npm ci
```

Result: PASS. Two locked dependencies installed.

### Full test suite

```text
npm test
```

Result: ENVIRONMENT-LIMITED.

```text
tests: 1148
pass: 1128
fail: 5
skipped: 15
cancelled: 0
```

The five failures reproduced both inside and outside the command sandbox. Every failure occurred before the product assertion when Node attempted `fs.symlink` and Windows returned `EPERM`:

1. Grok project-skill symlink deduplication.
2. Core-change-watch real-path alias identity.
3. Report renderer target/topology alias canonicalization.
4. Workspace topology resolving a symlinked package.
5. Workspace topology rejecting a tracked structural symlink outside the Git root.

Interpretation: 1128 tests directly passed. The five symlink scenarios are unobserved in this environment, not product failures and not passes. Fifteen additional tests explicitly skipped because symlink creation was unavailable.

### Package verification

```text
npm run pack:verify
```

Result: PASS outside the sandbox after the sandboxed attempt could not write npm cache.

```text
npm package entries: 395
runtime zip entries: 417
```

## Evidence Boundary

- Source and tests establish that Better Harness implements the evaluated CLI, evidence, host, privacy, guardrail, report, and learning-loop contracts.
- They do not establish outcome improvement across independent real-world projects.
- No user-home session data or private transcripts were read during this evaluation.
