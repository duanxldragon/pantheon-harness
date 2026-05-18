# Claude Best-Practice To Codex Concept Map

This kit borrows the core architectural ideas from the Claude Code best-practice repository and translates them into Codex-usable patterns.

Primary source consulted:

- GitHub repo overview: https://github.com/shanraisshan/claude-code-best-practice

## Core Ideas Carried Over

### 1. Commands Are Workflow Entry Points

Claude best-practice treats commands as stable workflow entry points.

Codex equivalent:

- stable playbook sections
- reusable prompt entry patterns
- standard task packet templates

### 2. Skills Are Method Modules

Claude best-practice emphasizes skills as reusable capability blocks.

Codex equivalent:

- `superpowers`
- `impeccable`
- `openspec-*`
- `gstack-*`

The important idea is not “use one magic system”, it is “compose specialized modules into one default method”.

### 3. Subagents Are Specialized Workers

Claude best-practice emphasizes subagents with scoped responsibilities.

Codex equivalent:

- `spawn_agent`
- worker / explorer split
- parallel bounded subtasks

### 4. Hooks Become Mechanical Gates

Claude best-practice uses hooks heavily.

Codex equivalent for portable repos:

- repo-local check scripts
- CI gates
- template-enforced linkage

This is more portable than relying on one tool's hook runtime.

### 5. Memory Becomes Repo Artifacts

Claude best-practice uses memory scopes.

Portable equivalent:

- OpenSpec change artifacts
- task packets
- evidence
- archived plans/specs

These are inspectable, copyable, and survive tool changes.

### 6. MCP And External Tools Stay Optional

Claude best-practice includes MCP servers and plugins.

Portable rule here:

- method should work without any one MCP dependency
- when tools exist, they plug into the same workflow, they do not redefine it

## The Main Translation

The biggest portable lesson is:

- do not make the tool the method
- make the method explicit, then map each tool into it

That is why this kit centers:

- playbook
- templates
- schemas
- mechanical closure scripts

instead of one tool-specific config file.
