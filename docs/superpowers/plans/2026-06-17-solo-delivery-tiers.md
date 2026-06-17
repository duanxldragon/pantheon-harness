# Solo Delivery Tiers Implementation Plan

**Goal:** Add a solo-maintainer-friendly `L0 / L1 / L2` delivery overlay that keeps `pantheon-base` stable and low-maintenance while preserving faster delivery in `pantheon-ops`.

**Architecture:** Keep the portable Harness method unchanged at its core. Add one repo-local methodology document, then wire active workspace and repo entry points to it so future agent runs classify tasks by tier before selecting heavier workflow machinery.

**Tech Stack:** Markdown contracts, AGENTS entry points, Pantheon methodology docs

---

### Task 1: Add the solo delivery tier policy

**Files:**
- Create: `harness-engineering/docs/methodology/SOLO_DELIVERY_TIERS.md`

- [x] **Step 1: Define the problem and constraints**

Document that the current user is a solo maintainer, `pantheon-base` should become a long-lived base, `pantheon-ops` is the main delivery target, and method growth must stay low-maintenance.

- [x] **Step 2: Define the three tiers**

Add explicit `L0`, `L1`, and `L2` sections with:
- when each tier applies
- what artifacts are required
- when to upgrade to a heavier tier

- [x] **Step 3: Add repo-specific defaults**

State that:
- `pantheon-base` defaults conservative and upgrades easily to `L2`
- `pantheon-ops` defaults to `L1` for ordinary business delivery

### Task 2: Wire the policy into active routing

**Files:**
- Modify: `harness-engineering/docs/methodology/WORKFLOW_ROUTING.md`

- [x] **Step 1: Reference the new tier policy near the top**

Make the routing doc say tier classification happens before lane selection.

- [x] **Step 2: Add L1 language to the routing matrix**

Make the current routing contract acknowledge lean solo delivery instead of forcing every non-trivial task into the heaviest path.

### Task 3: Wire the policy into repo entry points

**Files:**
- Modify: `pantheon-base/AGENTS.md`
- Modify: `pantheon-ops/AGENTS.md`
- Modify: `pantheon-base/docs/acceptances/AGENT_EXECUTION_CHECKLIST.md`
- Modify: `pantheon-base/docs/harness/PANTHEON_BASE_DELIVERY_WORKFLOW.md`

- [x] **Step 1: Update `pantheon-base/AGENTS.md`**

Require tier classification first and state the base-specific upgrade triggers for `L2`.

- [x] **Step 2: Update `pantheon-ops/AGENTS.md`**

Set the default stance to `L1` for ordinary business delivery and `L2` for shared-boundary work.

- [x] **Step 3: Update base execution checklist**

Add a short note that this checklist mainly serves `L1 / L2`, with high-risk base work defaulting to `L2`.

- [x] **Step 4: Update base delivery workflow**

Clarify that the full multi-agent workflow mainly applies to `L2` and only selected `L1` tasks.

### Task 4: Validate and close out

**Files:**
- Verify only

- [ ] **Step 1: Run focused text search validation**

Run searches to confirm the new file is referenced from active entry points.

- [ ] **Step 2: Run the minimum relevant documentation checks**

Run any focused doc or harness checks that are cheap and applicable.

- [ ] **Step 3: Summarize the new default workflow**

Explain how future work should choose `L0 / L1 / L2` in plain language.
