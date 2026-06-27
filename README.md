# Pantheon Harness

> Agentic Development Methodology and Tools

[English](./README.md) | [中文](./README.zh.md)

Portable, tool-agnostic Harness Engineering for non-trivial software delivery with coding agents and human review.

## Overview

Pantheon Harness provides the methodology layer for repeatable agentic delivery:

- **Explicit contracts** — Task packets, handoff protocols, verification evidence
- **Scoped boundaries** — Tool-agnostic patterns that work across Codex, Claude Code, Cursor
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
├── skills/                # Internal: tool-specific skills
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
| `VERSION` | Root | Current version (e.g., `1.3.0`) |
| `CHANGELOG.md` | Root | Full version history |
| `patterns/upgrade.md` | patterns/ | Upgrade guide |

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

Current version: `1.3.0`

## Validation

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
```

## Canonical Sources

- `architecture/` — Architecture and methodology documentation (consumer needs)
- `patterns/` — Method source of truth (consumer needs)
- `skills/` — Tool-specific skills and adapters (internal only)
