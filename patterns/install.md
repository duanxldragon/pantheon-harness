# Install Pantheon Harness

Chinese version: [INSTALL.zh.md](./INSTALL.zh.md)

This kit is designed to be used in two modes:
1. **Standalone**: Copy into any repository root
2. **Workspace**: Use as a sibling directory at workspace root level

## 0. Prerequisites

Required:

- `git`
- `node` 20+

Recommended:

- an OpenSpec workflow or CLI if you want explicit change lifecycle management
- a browser testing path for UI evidence

Not required:

- preinstalled local repo skills
- Codex-only or Claude-only plugins
- any specific MCP server

## Versioning Files

This kit publishes its own version information in:

- `VERSION` — Current version (e.g., `1.3.0`)
- `CHANGELOG.md` — Full version history
- `patterns/upgrade.md` — Upgrade guide

## Two Usage Modes

### Mode 1: Standalone (Copy into any repo)

```text
Copy:
  pantheon-harness/

into the target repository root.
```

Example:
```
my-project/
├── pantheon-harness/     # Copied method
├── docs/harness/tasks/   # Task Packets
├── .harness/evidence/     # Verification evidence
├── .github/               # PR template
└── openspec/changes/     # OpenSpec changes
```

### Mode 2: Workspace (Recommended for multi-repo)

Place `pantheon-harness/` as a sibling at workspace root:

```
workspace-root/
├── pantheon-harness/     # Method source (read-only canonical)
└── my-consumer-repo/     # Consumer repo
    ├── VERSION           # Must match pantheon-harness
    ├── docs/harness/    # Local harness contracts
    └── scripts/harness/ # Local validation scripts
```

In workspace mode, local validation scripts should reference `../pantheon-harness/` for method source.

## Standard Paths

The default config expects these locations:

- `docs/harness/tasks/` — Task Packets
- `.harness/evidence/` — Verification evidence
- `.github/pull_request_template.md` — PR template
- `openspec/changes/` — OpenSpec changes

## Adopt The Templates

Use these templates as your repo-level source material:

- `patterns/templates/task-packet.template.md`
- `patterns/templates/review.template.md`
- `patterns/templates/pr-template.md`

Task packets must declare method-first ratchet metadata:

- `Quality Profile`
- `Portable Failure Class`
- `Owner Layer`
- `Method Readiness`
- `Ratchet Decision`
- `Deferred Code Issues`

Use `none` explicitly when a field does not apply. Do not omit the field.

## Wire The Checks

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
node scripts/harness/check-adoption.mjs --root . --strict
```

Strict evidence and review checks require at least one real `commands.json` and `review.md` artifact. Use report-only mode while bootstrapping a new repository; switch to `--strict` after the first non-trivial task is recorded.

## Day To Day Workflow

### Non-trivial workflow:

1. create an OpenSpec change
2. create `docs/harness/tasks/<task-id>.task.md`
3. declare the method readiness block before implementation starts
4. if the task has `## Structural Scope`, scaffold graph review closure:
   `node scripts/harness/scaffold-graph-review.mjs --write <task-id>`
5. if you saved CodeGraph-style review output, normalize it and import it:
   `node scripts/harness/build-graph-review-import.mjs --source trace.json --write .harness/evidence/<task-id>/graph-review.json`
   `node scripts/harness/scaffold-graph-review.mjs --write --import .harness/evidence/<task-id>/graph-review.json <task-id>`
6. implement
7. save `.harness/evidence/<task-id>/commands.json`
8. save `.harness/evidence/<task-id>/review.md`
9. run the checks

### Trivial workflow:

1. implement
2. run minimum verification
3. record evidence or known gaps according to repo policy

## Recommended Repo-Level Wrappers

If the target repo already has local harness scripts, keep them as thin wrappers around this kit.

Recommended wrapper names:

- `check-task-packet`
- `check-evidence`
- `check-review`
- `check-adoption`
- `check-method-health`

## CI Recommendation

Run all four checks on pull requests for non-trivial changes.

If UI is touched, also require browser or screenshot evidence through your normal QA flow.

### Standalone Mode PR Gate:

```text
node pantheon-harness/scripts/harness/check-task-packet.mjs --root .
node pantheon-harness/scripts/harness/check-evidence.mjs --root .
node pantheon-harness/scripts/harness/check-review.mjs --root . --strict
node pantheon-harness/scripts/harness/check-adoption.mjs --root .
```

### Workspace Mode PR Gate:

```text
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-adoption.mjs --root .
```

Keep product-specific quality gates in the consumer repository. Promote only repeated, portable failure patterns back into this kit.

## Skill Installation Guidance

You do not need to install a special skill pack for the method to work.

If your agent platform supports skills, the recommended split is:

- use skills for workflow assistance
- use repository contracts and scripts as the enforceable source of truth

Recommended but optional capabilities:

- planning / brainstorming
- disciplined execution
- UI quality review
- browser QA
