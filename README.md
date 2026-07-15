# Pantheon Harness

> Agentic Development Methodology and Tools

[English](./README.md) | [中文](./README.zh.md)

Portable, tool-agnostic Harness Engineering for non-trivial software delivery with coding agents and human review.

## Overview

Pantheon Harness provides the methodology layer for repeatable agentic delivery:

- **Explicit contracts** — Task packets, handoff protocols, verification evidence
- **Scoped boundaries** — Tool-agnostic patterns that work across agent tools
- **Durable closure** — Artifacts that outlive the chat session
- **Portable adoption** — Copy the method into any repository

## Usage Modes

### Mode 1: Standalone (Copy into any repo)

Copy `pantheon-harness/` into your repository root. The method works independently of the workspace.

```
my-project/
├── pantheon-harness/     # Copied method directory
├── docs/
│   └── harness/
│       └── tasks/         # Task Packets location
├── .harness/
│   └── evidence/          # Verification evidence location
├── .github/
│   └── pull_request_template.md
└── openspec/
    └── changes/
```

Quick validation:
```bash
node pantheon-harness/scripts/harness/check-task-packet.mjs --root .
node pantheon-harness/scripts/harness/check-evidence.mjs --root . --strict
```

### Mode 2: Workspace (Recommended for multi-repo)

Place `pantheon-harness/` as a sibling at workspace root level. Consumer repos reference it from `../pantheon-harness/`.

```
workspace-root/
├── pantheon-harness/     # Method source (read-only canonical)
└── my-consumer-repo/     # Consumer repo
    ├── VERSION           # Must match pantheon-harness VERSION
    ├── docs/harness/    # Local harness contracts
    └── scripts/harness/  # Local validation scripts
```

Validation:
```bash
cd my-consumer-repo
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-adoption.mjs --strict
```

## Directory Structure

```
pantheon-harness/
├── architecture/              # Method source (consumer needs)
│   ├── harness/            # Core contracts & specs
│   └── methodology/       # Workflow guidance
├── patterns/               # Templates & installation
├── verify/                 # Schema validation (optional)
│
├── skills/                # Internal: shared skills
├── workflows/             # Internal: workflow patterns
├── tools/                 # Internal: openspec tooling
├── .agents/              # Internal: agent adapters
├── config/               # Internal: agent configurations
├── examples/             # Internal: reference implementations
├── evaluations/          # Internal: evaluation materials
├── research/             # Internal: research findings
└── memory/              # Internal: project memory

Consumer Essential:
- architecture/harness/*.md    # Protocols, contracts, specs
- architecture/methodology/*.md # Workflow routing, delivery tiers
- patterns/*.md              # Core patterns & templates
- patterns/install.md         # Bootstrap guide

Internal Only (not needed by consumers):
- skills/, workflows/, tools/, .agents/, config/, examples/
```

## Quick Start

1. **Method entry**: [architecture/methodology/harness-methodology.zh.md](./architecture/methodology/harness-methodology.zh.md)
2. **Workflow routing**: [architecture/methodology/workflow-routing.md](./architecture/methodology/workflow-routing.md)
3. **Harness protocols**: [architecture/harness/](./architecture/harness/)
4. **Bootstrap guide**: [patterns/install.md](./patterns/install.md)

## Core Documents

| Document | Purpose |
|----------|---------|
| `patterns/harness-core-model.md` | Core model of agentic delivery |
| `patterns/method-playbook.md` | Practical execution guide |
| `architecture/harness/task-packet-spec.md` | Task Packet specification |
| `architecture/harness/verification-evidence-spec.md` | Evidence format specification |
| `architecture/methodology/workflow-routing.md` | Tool routing decision tree |
| `architecture/methodology/solo-delivery-tiers.md` | L0/L1/L2 delivery levels |

## Prerequisites

| Required | Optional |
|----------|----------|
| `git` | OpenSpec workflow/CLI |
| `node` 20+ | Browser testing for UI evidence |

**Not required:**
- Pre-installed repo skills
- Codex-only or Claude-only plugins
- Specific MCP servers

## Version Management

| File | Location | Purpose |
|------|----------|---------|
| `VERSION` | Root | Current version (e.g., `1.4.0`) |
| `CHANGELOG.md` | Root | Full version history |
| `patterns/upgrade.md` | patterns/ | Upgrade guide |
| `patterns/templates/release-notes.template.md` | patterns/templates/ | GitHub Release body template |

Release naming convention:

- GitHub tag: `vX.Y.Z`
- GitHub Release title: `vX.Y.Z`
- Keep the title fixed and put the release summary in the body.

## CI Integration

Run on pull requests for non-trivial changes:

```bash
node pantheon-harness/scripts/harness/check-task-packet.mjs --root .
node pantheon-harness/scripts/harness/check-evidence.mjs --root .
node pantheon-harness/scripts/harness/check-review.mjs --root . --strict
node pantheon-harness/scripts/harness/check-adoption.mjs --root .
```

If UI is touched, also require browser or screenshot evidence.

## Current Status

- Current version: `1.4.0`
- Latest release: `v1.4.0`
- Method shell: `pantheon-harness`

### v1.4.0 Highlights

- Model-era retirement review: removed OMX/codex-flow active routing; routing is now capability-based (plan-first, subagent/workflow fan-out).
- Deleted 46 zero-reference skill directories; `skills/` now holds only `grill-me` and `impeccable`.
- Downgraded old-model-oriented mandatory subagent routing tables to principles.
- Legacy plan references (Superpowers/OMX/codex-flow artifacts) remain valid for historical tasks; validators unchanged.

### v1.3.0 Highlights

- Renamed and hardened the standalone method shell from `harness-engineering` to `pantheon-harness`.
- Normalized `architecture/harness` governance docs to YAML frontmatter.
- Added stricter document, task packet, evidence, review, graph-review, visual-evidence, and sync-drift gates.
- Recorded task packets, evidence, and reviews under `docs/harness/tasks/` and `.harness/evidence/`.

## Validation

```powershell
node --test scripts/harness/*.test.mjs
node --test verify/scripts/*.test.mjs
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-doc-frontmatter.mjs --root . --strict
node scripts/harness/check-doc-links.mjs --root . --strict
node scripts/harness/check-doc-inventory.mjs --root . --strict
node scripts/harness/check-task-packet.mjs --root .
node scripts/harness/check-evidence.mjs --root . --strict
node scripts/harness/check-review.mjs --root . --strict
node scripts/harness/check-graph-review.mjs --root . --strict
node scripts/harness/check-visual-evidence.mjs --root . --strict
```

## Canonical Sources

- `architecture/` — Architecture and methodology documentation (consumer needs)
- `patterns/` — Method source of truth (consumer needs)
- `skills/` — Shared agent skills (internal only)
