# Agentic Best Practices Reference

> Reference guide comparing best practices from Claude Code, OpenAI Codex, and Pantheon Harness.

## 0. 概述

This document synthesizes best practices from major agentic coding tools and maps them to Pantheon Harness methodology.

## 1. Core Patterns Comparison

| Pattern | Claude Code | OpenAI Codex | Pantheon Harness |
|---------|------------|--------------|-----------------|
| Plan First | `/plan` mode | `/plan` command | Plan Mode required |
| Context Management | CLAUDE.md + rules | AGENTS.md | CLAUDE.md + skills |
| Isolation | Subagents | Subagents | Task Packet scope |
| Evidence | Required | Required | Verification Evidence |
| Version | 2026+ | v0.142+ | v1.2+ |

## 2. Context Engineering

### 2.1 Claude Code: Context Best Practices

**Source**: [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)

```markdown
Key principles:
1. CLAUDE.md < 200 lines
2. Use .claude/rules/*.md for lazy loading
3. Compact at 40-50% context capacity
4. Subagents for investigation
5. Always demand evidence
```

### 2.2 Codex: Context Best Practices

**Source**: [Codex Best Practices](https://developers.openai.com/codex/learn/best-practices)

```markdown
Key principles:
1. AGENTS.md for durable project rules
2. Skills for repeatable workflows
3. Context attached explicitly
4. Smaller, verifiable steps
5. Goal mode for persistent objectives
```

### 2.3 Pantheon Harness Mapping

| Claude/Codex Practice | Pantheon Harness Equivalent |
|----------------------|----------------------------|
| CLAUDE.md < 200 lines | CLAUDE.md size guideline |
| Lazy-loading rules | Skills with progressive disclosure |
| /compact | Context compaction guidance |
| Subagent isolation | Task Packet scope + Subagents |
| Evidence required | Verification Evidence Spec |

## 3. Workflow Patterns

### 3.1 Research → Plan → Execute → Review → Ship

This pattern appears across all three systems:

```
Claude Code:  Plan Mode → Implement → Review → Ship
Codex:       /plan → Execute → /review → Ship
Pantheon:    Planner → Generator → Reviewer → Human
```

### 3.2 Plan Mode Usage

| Tool | Trigger | Behavior |
|------|---------|----------|
| Claude Code | `/plan` | Cannot edit files |
| Codex | `/plan` or Shift+Tab | Proposes path |
| Pantheon | Non-trivial task | Required for L1+ |

### 3.3 Pantheon Harness Mapping

**Source**: [Workflow Routing](./workflow-routing.md)

```markdown
Routing rules:
- L0: Direct change → Native Codex
- L1: Lean delivery → Plan first, then implement
- L2: Full governance → Plan + Review + Evidence
```

## 4. Multi-Agent Patterns

### 4.1 Claude Code: Agent Teams

**Source**: [Claude Code Agent Teams](https://code.claude.com/docs/en/teams)

```markdown
Patterns:
1. Team Lead orchestrates
2. Subagents for parallel work
3. Shared task list
4. Result integration
```

### 4.2 Codex: Multi-Agent Modes

**Source**: [Codex Multi-Agent](https://developers.openai.com/codex/multi-agent)

```markdown
Patterns:
1. Hub-and-spoke architecture
2. Project Manager agent
3. Specialized sub-agents
4. OpenAI Traces for monitoring
```

### 4.3 Pantheon Harness Mapping

**Source**: [Handoff Protocol](../harness/handoff-protocol.md)

```markdown
Multi-agent patterns:
1. Task Packet defines scope
2. Handoff Protocol defines transitions
3. Reviewer is independent
4. Human gates for key decisions
```

## 5. Skills and Automation

### 5.1 Claude Code: Skills

```markdown
Skills structure:
- .claude/skills/<name>/SKILL.md
- name, description, arguments
- agent type (explore/plan/general)
- context: fork for isolation
```

### 5.2 Codex: Skills

```markdown
Skills structure:
- .codex/skills/<name>/SKILL.md
- Progressive disclosure
- Cross-tool compatible
```

### 5.3 Pantheon Harness Skills

**Source**: [Skills directory](../../skills/)

```markdown
Skill categories:
- impeccable - UI quality gate
- grill-me - plan/design/PR grilling
```

（2026-07-15 退役审查后，skills/ 只保留被合同或消费仓实际引用的技能。）

## 6. Evidence and Verification

### 6.1 Claude Code: Evidence

```markdown
Best practices:
1. Tests written by agent
2. Checks run by agent
3. Self-review against criteria
4. Evidence attached to output
```

### 6.2 Codex: Verification

```markdown
Best practices:
1. Command output required
2. Tests must pass
3. Review of own output
4. "Done" criteria explicit
```

### 6.3 Pantheon Harness Verification

**Source**: [Verification Evidence Spec](../harness/verification-evidence-spec.md)

```markdown
Evidence requirements:
1. summary.md required
2. commands.json with results
3. Screenshots for UI
4. runtime signals when sensitive
```

## 7. Common Anti-Patterns

### 7.1 Avoid These

| Anti-Pattern | Claude/Codex Warning | Pantheon Harness Rule |
|--------------|---------------------|----------------------|
| Vibe coding | No plan, no review | L1+ requires plan |
| Context overflow | Compact recommended | Response budget |
| Unverified claims | Demand evidence | Evidence required |
| Scope creep | Generator boundaries | Task Packet scope |
| Self-review for risky tasks | Use independent reviewer | Reviewer separation |

### 7.2 Recommended Practices

```markdown
1. Plan before coding
2. Verify with evidence
3. Keep contexts small
4. Use isolation for complex tasks
5. Demand independent review for risky changes
```

## 8. Version Mapping

| Pantheon Harness Version | Claude Code Era | Codex Version |
|-------------------------|----------------|--------------|
| v1.0 | 2024-10 to 2025 | v0.100-0.130 |
| v1.1 | 2026-01 (Agent Teams) | v0.135+ |
| v1.2 | 2026+ (Dynamic Workflows) | v0.142+ |

## 9. Integration Points

### 9.1 CLAUDE.md Integration

```markdown
CLAUDE.md should include:
1. Reference to this guide
2. Plan Mode requirement
3. Evidence standard
4. Skills location
5. Context budget guidance
```

### 9.2 Task Packet Integration

```markdown
Task packets should reference:
1. Context Engineering Guide
2. Best Practices Reference
3. Verification Evidence Spec
```

## 10. Further Reading

- [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)
- [Claude Code Handbook](https://www.freecodecamp.org/news/claude-code-handbook/)
- [Codex Best Practices](https://developers.openai.com/codex/learn/best-practices)
- [Codex Workflows](https://developers.openai.com/codex/workflows)
- [2026 Agentic Coding Trends Report](https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf)

## 11. Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-06-26 | Initial version |
