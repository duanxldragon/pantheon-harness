# Harness Ratchet And Retirement Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Strengthen `harness-engineering` with explicit evaluator separation, repeat-failure ratcheting, resumable task state, runtime-sensitive evidence rules, and a disposable-harness review loop.

**Architecture:** Keep the existing task-packet, evidence, review, and checker stack as the stable core. Add the missing best-practice controls as small contract, schema, and checker upgrades instead of introducing a new framework. Land the method changes in `harness-engineering` first, then seed the downstream defaults in `pantheon-base`.

**Tech Stack:** Markdown contracts, JSON schemas, Node.js harness checks, GitHub Actions, Pantheon repo-level docs

---

### Task 1: Make Evaluator Separation Explicit

**Files:**
- Modify: `harness-engineering/docs/harness/HARNESS_ENGINEERING_CONTRACT.md`
- Modify: `harness-engineering/docs/harness/HARNESS_ENGINEERING_CONTRACT.en.md`
- Modify: `harness-engineering/docs/harness/REVIEW_LOOP_SPEC.md`
- Modify: `harness-engineering/docs/harness/REVIEW_LOOP_SPEC.en.md`
- Modify: `harness-engineering/agentic-method-kit/METHOD_PLAYBOOK.md`
- Modify: `harness-engineering/agentic-method-kit/METHOD_PLAYBOOK.zh.md`

- [x] **Step 1: Add a default rule that non-trivial work names both an implementer and reviewer posture**
- [x] **Step 2: Define when author-self-review is acceptable and when an independent review gate is required**
- [x] **Step 3: Require the task packet or handoff to state the reviewer angles: architecture, security, UX/QA, mechanical**
- [x] **Step 4: Update the playbook so review is treated as a first-class external evaluator, not an optional summary**
- [x] **Step 5: Re-read the updated contract and review spec to remove duplicated or conflicting wording**

### Task 2: Add Failure Ratchet And Harness Retirement Policies

**Files:**
- Create: `harness-engineering/docs/harness/FAILURE_RATCHET_POLICY.md`
- Create: `harness-engineering/docs/harness/FAILURE_RATCHET_POLICY.en.md`
- Create: `harness-engineering/docs/harness/HARNESS_RETIREMENT_REVIEW.md`
- Create: `harness-engineering/docs/harness/HARNESS_RETIREMENT_REVIEW.en.md`
- Modify: `harness-engineering/docs/harness/FAILURE_REGISTRY_PROMOTION_POLICY.md`
- Modify: `harness-engineering/docs/harness/FAILURE_REGISTRY_PROMOTION_POLICY.en.md`
- Modify: `harness-engineering/docs/harness/HARNESS_OPEN_TASKS.md`
- Modify: `harness-engineering/docs/METHOD_RELEASE_1_0.md`
- Modify: `harness-engineering/docs/METHOD_RELEASE_1_0.zh.md`

- [x] **Step 1: Define the repeat-failure ladder from closeout note to guide update to checker or smoke promotion**
- [x] **Step 2: Define a retirement review for temporary harness rules that only compensate for old model or tool limits**
- [x] **Step 3: Link the new policies to the existing failure registry and open-task governance**
- [x] **Step 4: Record when a rule is additive, when it becomes blocking, and when it should be removed**
- [x] **Step 5: Update release docs so method maintainers review both ratchet additions and retirement candidates**

### Task 3: Extend State And Evidence For Resumability And Runtime Classification

**Files:**
- Modify: `harness-engineering/docs/harness/TASK_PACKET_SPEC.md`
- Modify: `harness-engineering/docs/harness/TASK_PACKET_SPEC.en.md`
- Modify: `harness-engineering/docs/harness/VERIFICATION_EVIDENCE_SPEC.md`
- Modify: `harness-engineering/docs/harness/VERIFICATION_EVIDENCE_SPEC.en.md`
- Modify: `harness-engineering/agentic-method-kit/schemas/task-packet.schema.json`
- Modify: `harness-engineering/agentic-method-kit/schemas/verification-evidence.schema.json`
- Modify: `harness-engineering/agentic-method-kit/examples/minimal-repo/docs/harness/tasks/example.task.md`

- [x] **Step 1: Add task-packet fields for evaluator plan, stop points, and resumable state or checkpoint expectations**
- [x] **Step 2: Add evidence guidance for runtime-sensitive tasks so logs, metrics, traces, smoke, or explicit gaps are named intentionally**
- [x] **Step 3: Keep the new fields optional for bootstrap repos and required only where the contract says they apply**
- [x] **Step 4: Update the portable schemas and example artifacts to match the new minimum closure**
- [x] **Step 5: Verify that linkage rules and task IDs still remain the stable join key across task, evidence, and review**

### Task 4: Harden The Mechanical Gates

**Files:**
- Modify: `harness-engineering/scripts/harness/check-task-packet.mjs`
- Modify: `harness-engineering/scripts/harness/check-task-packet.test.mjs`
- Modify: `harness-engineering/scripts/harness/check-evidence.mjs`
- Modify: `harness-engineering/scripts/harness/check-evidence.test.mjs`
- Modify: `harness-engineering/scripts/harness/check-runtime-evidence.mjs`
- Modify: `harness-engineering/scripts/harness/check-runtime-evidence.test.mjs`
- Modify: `harness-engineering/agentic-repo-shell/scripts/harness/check-task-packet.mjs`
- Modify: `harness-engineering/agentic-repo-shell/scripts/harness/check-evidence.mjs`
- Modify: `harness-engineering/agentic-repo-shell/scripts/harness/check-runtime-evidence.mjs`

- [x] **Step 1: Add task-packet validation for evaluator-plan and stop-point shape where declared**
- [x] **Step 2: Add evidence validation for runtime-sensitive classification and explicit runtime-gap wording**
- [x] **Step 3: Keep the first cut lightweight so consumer repos can adopt it without binding to one observability stack**
- [x] **Step 4: Sync the updated scripts into `agentic-repo-shell/`**
- [x] **Step 5: Run the focused checker tests and confirm the new fields fail closed only where the policy says they should**

### Task 5: Seed Pantheon Base As The First Downstream Consumer

**Files:**
- Create: `pantheon-base/docs/acceptances/AGENT_EXECUTION_CHECKLIST.md`
- Create: `pantheon-base/docs/acceptances/AGENT_EXECUTION_CHECKLIST.en.md`
- Modify: `pantheon-base/docs/acceptances/TASK_PACKET_BASE_TEMPLATE.md`
- Modify: `pantheon-base/docs/acceptances/TASK_PACKET_BASE_TEMPLATE.en.md`
- Modify: `pantheon-base/docs/README.md`
- Modify: `pantheon-base/docs/README.en.md`
- Modify: `pantheon-base/AGENTS.md`
- Modify: `pantheon-base/AGENTS.en.md`

- [x] **Step 1: Add a downstream checklist that turns the method principles into daily Pantheon Base defaults**
- [x] **Step 2: Extend the base task-packet template with reviewer posture, runtime-sensitive evidence, and ratchet-loop prompts**
- [x] **Step 3: Update the docs entry points so the checklist is read with the existing acceptance and workflow docs**
- [x] **Step 4: Update the repo-local agent rules to point at the new checklist and runtime-evidence expectations**
- [x] **Step 5: Re-run a docs pass to ensure the new checklist does not conflict with existing contracts or the acceptance checklist**
