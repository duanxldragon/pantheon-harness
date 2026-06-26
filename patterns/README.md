# Method Patterns

Core method patterns and templates for agentic delivery.

Chinese version: [README.zh.md](./README.zh.md)

Portable method kit for repositories that want a repeatable Harness Engineering workflow.

Copy this directory into another repository when you want explicit delivery controls for non-trivial agent or human-assisted work.

## What This Directory Contains

- Core method models (`HARNESS_CORE_MODEL.*`)
- Method playbooks (`METHOD_PLAYBOOK.*`)
- Context engineering protocol
- Execution guardrails
- Template taxonomy
- Tool adapter matrix
- Templates (`templates/`)
- Configuration (`config/`)

## Directory Location

This `patterns/` directory is the canonical method source in `pantheon-harness`.

Repository-local `architecture/harness/*` files may project or summarize the method for local execution, but if drift appears, the method definition here wins and downstream projections should be synchronized.

## Quick Start

1. Read [README.zh.md](./README.zh.md) if your team is Chinese-first
2. Read [HARNESS_CORE_MODEL.zh.md](./HARNESS_CORE_MODEL.zh.md)
3. Read [EXECUTION_GUARDRAILS.md](./EXECUTION_GUARDRAILS.md)
4. Read [METHOD_PLAYBOOK.zh.md](./METHOD_PLAYBOOK.zh.md)
5. Copy the templates you need from [templates/](./templates/)
6. Adjust [config/method.config.json](../config/method.config.json) if your repo uses different paths
7. Run the portable checks under [scripts/](../verify/scripts/)

## Versioning

Current version: `1.0.0`

Version metadata:

- [VERSION](../VERSION)
- [METHOD_VERSION.json](./METHOD_VERSION.json)
- [CHANGELOG.md](./CHANGELOG.md)
- [UPGRADE.md](./UPGRADE.md)
