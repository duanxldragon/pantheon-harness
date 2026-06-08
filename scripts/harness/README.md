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

### `check-boundaries.mjs`

Reports cross-layer import findings that are risky for the Pantheon base/business inheritance model.

Default report-only mode:

```powershell
node scripts/harness/check-boundaries.mjs
```

JSON output:

```powershell
node scripts/harness/check-boundaries.mjs --json
```

Strict mode for local experiments or CI gates:

```powershell
node scripts/harness/check-boundaries.mjs --strict
```

Exit behavior:

- exits `0` in default report-only mode even when findings exist
- exits `1` in `--strict` mode when findings exist
- warnings are used for missing optional scan roots

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

### `check-review.mjs`

Validates machine-readable review artifacts under `.harness/evidence/**/review.md`.

Default report-only mode:

```powershell
node scripts/harness/check-review.mjs
```

Strict mode:

```powershell
node scripts/harness/check-review.mjs --strict
```

Current checks include:

- `## Machine Readable` JSON block presence
- verdict enum validation
- linkage to task packet, evidence, review file, OpenSpec change, and plan refs
- task id consistency with evidence directory

### `check-graph-review.mjs`

Checks whether task packet `Structural Scope`, evidence `graphChecks`, and review `structuralReview` stay consistent for graph-reviewed tasks.

Default report-only mode:

```powershell
node scripts/harness/check-graph-review.mjs
```

JSON output:

```powershell
node scripts/harness/check-graph-review.mjs --json
```

Strict mode:

```powershell
node scripts/harness/check-graph-review.mjs --strict
```

Current checks include:

- graph-reviewed or high-risk tasks should carry `## Structural Scope`
- graph-reviewed evidence should carry `graphChecks`
- graph-reviewed review artifacts should carry `structuralReview`
- affected subgraph and structural-check lists should stay aligned across the three artifacts

### `scaffold-graph-review.mjs`

Seeds `.harness/evidence/<task-id>/commands.json` `graphChecks` and `.harness/evidence/<task-id>/review.md` `structuralReview` from a task packet's `## Structural Scope`.

Report-only mode:

```powershell
node scripts/harness/scaffold-graph-review.mjs sample
```

Write mode:

```powershell
node scripts/harness/scaffold-graph-review.mjs --write sample
```

Import reviewed graph results:

```powershell
node scripts/harness/scaffold-graph-review.mjs --write --import graph-review.json sample
```

Write reviewed graph results directly from live CodeGraph data:

```powershell
node scripts/harness/scaffold-graph-review.mjs --write --codegraph-path D:\workspace\go\pantheon-platform\pantheon-base --live-context "permission service" sample
```

Current behavior:

- resolves a task by task id or `docs/harness/tasks/<task>.task.md`
- derives `affectedSubgraph` and structural `checks` from `## Structural Scope`
- accepts an optional import JSON with `usedCodeGraph`, `affectedSubgraph`, `checks`, `findings`, and `notes`
- accepts live `codegraph` inputs via `--live-callers`, `--live-callees`, `--live-impact`, and `--live-context`
- creates missing evidence/review files or refreshes only their graph-review sections
- preserves existing command logs, known gaps, verdicts, and surrounding human review notes
- sets scaffold notes that must be replaced after the real CodeGraph/manual review

### `build-graph-review-import.mjs`

Normalizes saved CodeGraph-style JSON, or live `codegraph` CLI results, into the `graph-review.json` shape consumed by `scaffold-graph-review --import`.

Print normalized JSON:

```powershell
node scripts/harness/build-graph-review-import.mjs --source trace.json
```

Write normalized import file:

```powershell
node scripts/harness/build-graph-review-import.mjs --source trace.json --write graph-review.json
node scripts/harness/scaffold-graph-review.mjs --write --import graph-review.json sample
```

Build an import file from live CodeGraph structure:

```powershell
node scripts/harness/build-graph-review-import.mjs --codegraph-path D:\workspace\go\pantheon-platform\pantheon-base --live-callers Authenticate --live-callees Authenticate --write graph-review.json
node scripts/harness/scaffold-graph-review.mjs --write --import graph-review.json sample
```

Refresh the repository index first and use an explicit Windows CLI path when needed:

```powershell
node scripts/harness/build-graph-review-import.mjs --sync --codegraph-path D:\workspace\go\pantheon-platform\pantheon-base --codegraph-bin C:\tools\codegraph.cmd --live-impact AuthService --live-context "permission service" --write graph-review.json
```

Current behavior:

- accepts direct import JSON or trace-like JSON with `trace`, `path`, `paths`, `checks`, `findings`, and `notes`
- accepts live `codegraph` inputs via `--live-callers`, `--live-callees`, `--live-impact`, and `--live-context`
- converts trace arrays into `entry -> ... -> exit` chain strings
- converts live caller/callee/impact/context responses into affected-subgraph chains and inferred checks
- extracts finding text from `message`, `reason`, `summary`, or plain strings
- defaults `usedCodeGraph` to `true` when not provided
- supports `--codegraph-bin` or `CODEGRAPH_BIN` when `codegraph` is not resolvable on `PATH`

Common `pantheon-base` live query patterns:

```powershell
node scripts/harness/scaffold-graph-review.mjs --write --codegraph-path D:\workspace\go\pantheon-platform\pantheon-base --live-callers Authenticate --live-callees Authenticate iam-auth
node scripts/harness/scaffold-graph-review.mjs --write --codegraph-path D:\workspace\go\pantheon-platform\pantheon-base --live-impact AuthService iam-auth
node scripts/harness/scaffold-graph-review.mjs --write --codegraph-path D:\workspace\go\pantheon-platform\pantheon-base --live-context "permission service" iam-permission
```

### `check-template-health.mjs`

Checks whether the repository carries the minimum generic template-governance surface.

```powershell
node scripts/harness/check-template-health.mjs
node scripts/harness/check-template-health.mjs --strict
```

### `check-runtime-evidence.mjs`

Reports runtime-sensitive tasks whose evidence lacks runtime logs, metrics, traces, performance references, or an explicit runtime gap.

```powershell
node scripts/harness/check-runtime-evidence.mjs
node scripts/harness/check-runtime-evidence.mjs --strict
```

### `check-doc-links.mjs`

Checks internal Markdown links across generic method and harness docs.

```powershell
node scripts/harness/check-doc-links.mjs
node scripts/harness/check-doc-links.mjs --strict
```

### `check-doc-inventory.mjs`

Checks whether key documentation and script inventory READMEs list the files they claim to govern.

```powershell
node scripts/harness/check-doc-inventory.mjs
node scripts/harness/check-doc-inventory.mjs --strict
```

### `check-sync-drift.mjs`

Checks whether key root scripts and repo-shell mirrors are still synchronized.

```powershell
node scripts/harness/check-sync-drift.mjs
node scripts/harness/check-sync-drift.mjs --strict
```

### `check-backend-response-contract.mjs`

Reports direct Gin JSON responses outside the shared `backend/pkg/common/response.go` wrapper.

Default report-only mode:

```powershell
node scripts/harness/check-backend-response-contract.mjs
```

JSON output:

```powershell
node scripts/harness/check-backend-response-contract.mjs --json
```

Strict mode:

```powershell
node scripts/harness/check-backend-response-contract.mjs --strict
```

Exit behavior:

- exits `0` in default report-only mode even when findings exist
- exits `1` in `--strict` mode when findings exist

### `check-backend-dto-contract.mjs`

Reports suspicious backend handler paths where `common.Success` returns a service result whose inspected return type is not DTO-like.

Default report-only mode:

```powershell
node scripts/harness/check-backend-dto-contract.mjs
```

JSON output:

```powershell
node scripts/harness/check-backend-dto-contract.mjs --json
```

Strict mode:

```powershell
node scripts/harness/check-backend-dto-contract.mjs --strict
```

Exit behavior:

- exits `0` in default report-only mode even when warnings exist
- exits `1` in `--strict` mode only when findings exist
- conservative DTO risks are warnings so existing debt can be triaged before becoming a blocking gate

### `check-permission-contract.mjs`

Reports obvious permission contract drift, especially `*:list` permissions being used as action permissions.

Default report-only mode:

```powershell
node scripts/harness/check-permission-contract.mjs
```

JSON output:

```powershell
node scripts/harness/check-permission-contract.mjs --json
```

Strict mode:

```powershell
node scripts/harness/check-permission-contract.mjs --strict
```

Exit behavior:

- exits `0` in default report-only mode even when findings exist
- exits `1` in `--strict` mode when findings exist
- warnings are informational and do not fail strict mode

### `check-audit-coverage.mjs`

Reports backend operation audit coverage risks.

Default report-only mode:

```powershell
node scripts/harness/check-audit-coverage.mjs
```

JSON output:

```powershell
node scripts/harness/check-audit-coverage.mjs --json
```

Strict mode:

```powershell
node scripts/harness/check-audit-coverage.mjs --strict
```

Exit behavior:

- exits `0` in default report-only mode even when findings exist
- exits `1` in `--strict` mode when findings exist
- missing `OperationLogMiddleware` is a finding
- write handlers relying on default audit metadata are warnings

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

Strict-mode promotion plan: see [`docs/harness/HARNESS_OPEN_TASKS.md`](../../docs/harness/HARNESS_OPEN_TASKS.md) for the conditions and threshold under which the CI job will stop using `continue-on-error`.
See [`docs/harness/VISUAL_EVIDENCE_PROMOTION_POLICY.md`](../../docs/harness/VISUAL_EVIDENCE_PROMOTION_POLICY.md) for the quantitative promotion and rollback policy.

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
node scripts/harness/check-adoption.mjs --strict --changed-file pantheon-base/backend/modules/auth/service.go --changed-file docs/harness/tasks/2026-05-18-sample.task.md --changed-file .harness/evidence/2026-05-18-sample/commands.json
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

Exit behavior:

- exits `0` in report-only mode
- exits `1` in `--strict` mode when required version or landing files are missing or incompatible
- warnings are used for soft boundary gaps such as missing runtime directories

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

Current checks include:

- required failure registry table columns
- valid `Category`, `Recommended Harness Change`, and `Status` enum values
- required values for failure id, category, example, impact, recommended change, and status
- `FR-001` style failure ids
- rejection of unedited template placeholder rows

Exit behavior:

- exits `0` when discovered registry files have no structural errors
- exits `1` when a registry file has errors
- reports missing default registry files as warnings so new repositories can adopt the registry gradually

### `check-doc-frontmatter.mjs`

Validates governed Markdown docs against the portable frontmatter convention in `docs/harness/DOCUMENT_FRONTMATTER_SPEC.md`.

```powershell
node scripts/harness/check-doc-frontmatter.mjs
node scripts/harness/check-doc-frontmatter.mjs --report-legacy
```

### `check-inheritance-contract.mjs`

Checks that `pantheon-ops` stays a derived business repository of `pantheon-base`.

Default report-only mode:

```powershell
node scripts/harness/check-inheritance-contract.mjs
```

JSON output:

```powershell
node scripts/harness/check-inheritance-contract.mjs --json
```

Strict mode for CI:

```powershell
node scripts/harness/check-inheritance-contract.mjs --strict
```

Exit behavior:

- exits `0` when the inheritance contract markers are present
- exits `1` in `--strict` mode when required inheritance markers are missing
- warnings are informational and do not fail strict mode

### `triage-base-drift.mjs`

Classifies file-level drift between `pantheon-base` and a business repository, defaulting to `pantheon-ops`.

Default text report:

```powershell
node scripts/harness/triage-base-drift.mjs
```

JSON output:

```powershell
node scripts/harness/triage-base-drift.mjs --json
```

Custom business repository:

```powershell
node scripts/harness/triage-base-drift.mjs --business pantheon-ops
```

Classification includes:

- `pseudo-drift`
- `business mount`
- `generic drift`
- `business-specific drift`
- `noise`
- `base-only`
- `business-only`

Exit behavior:

- exits `0` after producing the report
- does not modify repository files
- excludes runtime/build directories such as `.git`, `.gocache`, `.tmp*`, `tmp`, `uploads`, `node_modules`, `dist`, `build`, `vendor`, and `test-results`

## Common Conventions

All check scripts accept `--root <path>` so they can be run from a fixture directory in tests. When omitted, the scripts default to `process.cwd()`.

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
| `check-review.mjs` | `check-review.test.mjs` |
| `check-graph-review.mjs` | `check-graph-review.test.mjs` |
| `scaffold-graph-review.mjs` | `scaffold-graph-review.test.mjs` |
| `build-graph-review-import.mjs` | `build-graph-review-import.test.mjs` |
| `check-template-health.mjs` | `check-template-health.test.mjs` |
| `check-runtime-evidence.mjs` | `check-runtime-evidence.test.mjs` |
| `check-doc-links.mjs` | `check-doc-links.test.mjs` |
| `check-doc-inventory.mjs` | `check-doc-inventory.test.mjs` |
| `check-sync-drift.mjs` | `check-sync-drift.test.mjs` |
| `check-visual-evidence.mjs` | `check-visual-evidence.test.mjs` |
| `check-adoption.mjs` | `check-adoption.test.mjs` |
| `check-method-health.mjs` | `check-method-health.test.mjs` |
| `check-failure-registry.mjs` | `check-failure-registry.test.mjs` |
| `check-inheritance-contract.mjs` | `check-inheritance-contract.test.mjs` |
| `check-backend-dto-contract.mjs` | `check-backend-dto-contract.test.mjs` |
| `check-boundaries.mjs` | `check-boundaries.test.mjs` |
| `check-backend-response-contract.mjs` | `check-backend-response-contract.test.mjs` |
| `check-permission-contract.mjs` | `check-permission-contract.test.mjs` |
| `check-audit-coverage.mjs` | `check-audit-coverage.test.mjs` |
| `triage-base-drift.mjs` | `triage-base-drift.test.mjs` |
