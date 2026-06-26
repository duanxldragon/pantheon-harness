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

## Directory Structure

```
pantheon-harness/
├── architecture/          # Architecture & methodology
│   ├── harness/          # Harness protocols
│   └── methodology/      # Methodological docs
├── config/agents/        # Agent configurations
├── patterns/             # Core method patterns & templates
├── skills/               # Codex/Cursor skills
├── workflows/            # Dynamic workflow patterns
├── verify/               # Verification schemas & scripts
├── tools/                # Tools (openspec, etc.)
└── examples/             # Reference implementations
```

## Core Concepts

| Concept | Description |
|---------|-------------|
| **Task Packet** | Scoped work unit with clear boundaries |
| **Handoff Protocol** | Explicit交接 between agents |
| **Verification Evidence** | Proof of completion |
| **Dynamic Workflows** | Adaptive execution patterns |

## Quick Start

1. **Entry point**: [architecture/methodology/HARNESS_METHODOLOGY.zh.md](./architecture/methodology/HARNESS_METHODOLOGY.zh.md)
2. **Workflow routing**: [architecture/methodology/WORKFLOW_ROUTING.md](./architecture/methodology/WORKFLOW_ROUTING.md)
3. **Harness protocols**: [architecture/harness/](./architecture/harness/)

## Method Core Documents

| Document | Purpose |
|----------|---------|
| `HARNESS_CORE_MODEL` | Core model of agentic delivery |
| `METHOD_PLAYBOOK` | Practical execution guide |
| `CONTEXT_ENGINEERING_PROTOCOL` | Context management |
| `EXECUTION_GUARDRAILS` | Safety constraints |
| `MINIMAL_COMPLEXITY_LADDER` | Adoption path |

## Status

Current version: `1.0.0`

## Validation

```powershell
node scripts/harness/check-adoption.mjs --strict
node scripts/harness/check-method-health.mjs --strict
```

## Canonical Sources

- `patterns/` — Method source of truth
- `architecture/` — Architecture and methodology documentation
- `skills/` — Tool-specific skills and adapters
