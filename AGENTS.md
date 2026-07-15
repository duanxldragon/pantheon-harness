# pantheon-harness

Pantheon Harness — Agentic Development Methodology and Tools

This AGENTS.md scopes guidance to `pantheon-harness`. Parent AGENTS.md guidance still applies unless this file narrows it for this subtree.

## Guardrails

- Keep only directory-specific guidance here; do not duplicate the root orchestration guidance.
- This repo is the portable method source. Method rules live in `architecture/` and `patterns/`, not in tool-only configuration.
- Non-trivial changes follow the repo's own governance: task packet under `docs/harness/tasks/`, evidence under `.harness/evidence/<task-id>/`.

## Current Layout

```
pantheon-harness/
├── AGENTS.md              # This file
├── README.md              # Main documentation entry
├── README.zh.md           # 中文文档入口
├── CHANGELOG.md           # Method changelog
├── VERSION                # Current method version
├── SHELL_VERSION.json     # Repo shell version metadata
├── MIGRATION.md           # Migration guide from harness-engineering to pantheon-harness
├── architecture/          # Architecture & method documentation
│   ├── harness/           # Harness protocols & contracts (incl. retirement-reviews/)
│   └── methodology/       # Methodology docs
├── .agents/               # Agent adapters
│   └── adapters/          # Agent adapters
├── .github/               # GitHub templates & CI workflow
├── .harness/              # Verification evidence
├── config/agents/         # Agent configurations (adapters, prompts, schemas, skill templates)
├── docs/harness/          # Repo shell landing files & task packets
├── patterns/              # Core method patterns & templates
│   ├── templates/         # Document templates
│   └── METHOD_VERSION.json # Method kit version metadata
├── scripts/harness/       # Validation gates (check-*.mjs) & tests
├── skills/                # Shared agent skills: grill-me, impeccable
├── workflows/             # Dynamic workflow patterns
├── verify/                # Verification schemas & scripts
├── evaluations/           # Evaluation materials
├── memory/                # Project memory
├── research/              # Research findings
├── examples/              # Example implementations
│   └── pantheon-base/     # Pantheon Base project examples
└── tools/                 # Tools (openspec, etc.)
```

## Directory Purposes

| Directory | Purpose |
|-----------|---------|
| `architecture/` | Architecture decisions and methodology docs |
| `config/agents/` | Agent adapter configurations |
| `patterns/` | Core method patterns, playbooks, templates |
| `scripts/harness/` | Validation gates and their tests |
| `.harness/` | Verification evidence per task |
| `skills/` | Shared agent skills (`grill-me`, `impeccable`) |
| `workflows/` | Dynamic workflow patterns (Fan-out, Adversarial, etc.) |
| `verify/` | Verification schemas and scripts |
| `evaluations/` | Evaluation materials and benchmarks |
| `memory/` | Project memory and context |
| `research/` | Research findings and external references |
| `examples/` | Example implementations for different projects |
| `tools/` | Tools (openspec change management, etc.) |

## Quick Start

1. Read [README.md](./README.md) for overview
2. Read [architecture/methodology/harness-methodology.zh.md](./architecture/methodology/harness-methodology.zh.md) for entry point
3. Reference [architecture/harness/](./architecture/harness/) for protocols

## Validation Commands

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
node scripts/harness/check-review.mjs --root . --strict
```

## Local Notes

- `openspec/` is a tool, not part of the method - maintained in `tools/`
- `examples/pantheon-base/` contains the reference implementation for pantheon-base projects
- `skills/` holds only actively referenced shared skills (`grill-me`, `impeccable`); retired assets are recorded in `architecture/harness/retirement-reviews/`
