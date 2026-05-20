# Harness Scripts

Chinese version: [README.zh.md](./README.zh.md)

This directory contains repo-local Harness Engineering checks.

The portable method source of truth now lives in `agentic-method-kit/`.
This directory is the current workspace's execution layer for that method.

These scripts are shared by Codex, Claude Code, Cursor, GitHub Copilot, OpenHands, Aider, and human engineers. Tool-specific adapters may call these scripts, but the scripts are not tied to any one agent.

## Current Scripts

### `check-task-packet.mjs`

Validates task packet Markdown files against the required structure in `docs/harness/TASK_PACKET_SPEC.md`.

Run all task packets:

```powershell
node scripts/harness/check-task-packet.mjs
```

Run one task packet:

```powershell
node scripts/harness/check-task-packet.mjs docs/harness/tasks/2026-05-13-check-task-packet-script.task.md
```

Output JSON:

```powershell
node scripts/harness/check-task-packet.mjs --json
```

Exit behavior:

- exits `0` when all task packets are structurally valid
- exits `1` when one or more task packets have errors
- warnings are reported but do not fail the command

### `check-evidence.mjs`

Validates Harness verification evidence command files under `.harness/evidence/**/commands.json`.

Default report-only mode:

```powershell
node scripts/harness/check-evidence.mjs
```

JSON output:

```powershell
node scripts/harness/check-evidence.mjs --json
```

Strict mode for CI structural validation:

```powershell
node scripts/harness/check-evidence.mjs --strict
```

Exit behavior:

- exits `0` in default report-only mode even when errors exist
- exits `1` in `--strict` mode when evidence schema errors exist
- warnings are informational

### `check-visual-evidence.mjs`

Reports UI task packet and evidence gaps for the visual quality protocol.

Default report-only mode:

```powershell
node scripts/harness/check-visual-evidence.mjs
```

JSON output:

```powershell
node scripts/harness/check-visual-evidence.mjs --json
```

Strict mode (observation period enabled):

```powershell
node scripts/harness/check-visual-evidence.mjs --strict
```

Exit behavior:

- exits `0` in report-only mode
- exits `1` in `--strict` mode when warnings exist (CI observed with `continue-on-error: true`)
- warnings identify UI task packets missing viewport/state plans
- warnings identify UI evidence missing screenshots/browser evidence or an explicit visual evidence gap

### `check-adoption.mjs`

Checks Phase 7 Harness adoption entrypoints: shared contracts, adapters, PR template markers, implementation prompt evidence rules, whether implementation-file changes are paired with task packet/evidence updates, and whether active OpenSpec changes are referenced by changed task/evidence artifacts.

Default report-only mode:

```powershell
node scripts/harness/check-adoption.mjs
```

JSON output:

```powershell
node scripts/harness/check-adoption.mjs --json
```

Strict mode:

```powershell
node scripts/harness/check-adoption.mjs --strict
```

Explicit changed-file mode for tests or CI experiments:

```powershell
node scripts/harness/check-adoption.mjs --strict --changed-file backend/modules/auth/service.go --changed-file docs/harness/tasks/2026-05-18-sample.task.md --changed-file .harness/evidence/2026-05-18-sample/commands.json
```

Exit behavior:

- exits `1` in `--strict` mode when required adoption files or PR markers are missing
- exits `1` in `--strict` mode when implementation-file changes are detected without matching task packet/evidence linkage
- exits `1` in `--strict` mode when active OpenSpec changes exist but changed task/evidence files still use `changeRef: none`
- warnings are informational and do not fail strict mode

### `check-method-health.mjs`

Checks whether a repository's copied method layer is structurally healthy:

- method kit version metadata
- repo shell version metadata
- version compatibility
- required landing files
- method/runtime boundary directories

Default report-only mode:

```powershell
node scripts/harness/check-method-health.mjs
```

JSON output:

```powershell
node scripts/harness/check-method-health.mjs --json
```

Strict mode:

```powershell
node scripts/harness/check-method-health.mjs --strict
```

Pantheon-specific inheritance, drift, architecture, and backend contract checks live in `pantheon-overlay/`.

### `check-failure-registry.mjs`

Validates Harness failure registry Markdown tables against the portable failure taxonomy.

Default scan:

```powershell
node scripts/harness/check-failure-registry.mjs
```

JSON output:

```powershell
node scripts/harness/check-failure-registry.mjs --json
```

Explicit registry file:

```powershell
node scripts/harness/check-failure-registry.mjs docs/harness/failure-registry.md
```

Exit behavior:

- exits `0` when discovered registry files have no structural errors
- exits `1` when a registry file has errors
- reports missing default registry files as warnings so new repositories can adopt the registry gradually

### `check-doc-frontmatter.mjs`

Validates governed Markdown docs against the portable frontmatter convention in `docs/harness/DOCUMENT_FRONTMATTER_SPEC.md`.

Default report-only mode:

```powershell
node scripts/harness/check-doc-frontmatter.mjs
```

Legacy metadata scan:

```powershell
node scripts/harness/check-doc-frontmatter.mjs --report-legacy
```

Current checks include:

- YAML frontmatter presence
- required base fields
- retained doc rules for `docs/superpowers/specs/*` and `docs/archive/*`
- `linked_contracts` existence
- `Superseded -> superseded_by`
- contract body related sections vs frontmatter relation fields
- `docs/README.md` link existence
- `docs/README.md` main-entry links target only `Active` docs

## Common Conventions

All check scripts accept `--root <path>` so they can be run from a fixture directory in tests. When omitted, they default to the repository root inferred from the script location.

## Tests

Unit tests live next to the scripts as `*.test.mjs` and use Node's built-in `node:test` runner with tmpdir fixtures.

Run all harness tests:

```powershell
node --test scripts/harness/*.test.mjs
```

Test coverage by script:

| Script | Tests |
| :--- | :--- |
| `check-task-packet.mjs` | `check-task-packet.test.mjs` |
| `check-evidence.mjs` | `check-evidence.test.mjs` |
| `check-visual-evidence.mjs` | `check-visual-evidence.test.mjs` |
| `check-adoption.mjs` | `check-adoption.test.mjs` |
| `check-method-health.mjs` | `check-method-health.test.mjs` |
| `check-failure-registry.mjs` | `check-failure-registry.test.mjs` |
| `check-doc-frontmatter.mjs` | `check-doc-frontmatter.test.mjs` |
