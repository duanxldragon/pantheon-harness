# Method Playbook

This playbook turns a set of tools into a single operating method.

## Default Stack

- `OpenSpec`: change identity, proposal, design, tasks, archive
- `superpowers`: brainstorming, planning, execution, debugging, verification
- `impeccable`: UI quality gate
- `gstack`: browser evidence, QA, review
- local harness checks: task packet, evidence, adoption

## Default Workflow

### 1. Intake

- Decide whether the work is `trivial` or `non-trivial`
- If non-trivial, create or select an `OpenSpec` change

### 2. Design

- Use `superpowers:brainstorming`
- Produce design/spec output
- Keep scope explicit

### 3. Planning

- Use `superpowers:writing-plans`
- Produce a concrete implementation plan

### 4. Task Packet

- Create a task packet from the plan
- Fill linkage fields:
  - task id
  - openspec change
  - evidence directory
  - review file

### 5. Implementation

- Use `superpowers:executing-plans` or equivalent disciplined execution
- For debugging, route into `systematic-debugging`

### 6. UI Quality

- If UI is touched, run `impeccable`
- If browser paths matter, collect evidence through `gstack`

### 7. Evidence

- Save command results in `.harness/evidence/<task-id>/commands.json`
- Save human-readable summary in `summary.md`
- Save review output in `review.md`
- `review.md` must contain an embedded machine-readable JSON block

### 8. Mechanical Checks

- Run:
  - `check-task-packet`
  - `check-evidence`
  - `check-adoption`

### 9. Review

- Findings-first
- Review must point at the same task packet and evidence

### 10. Close

- Merge or ship
- Archive the OpenSpec change when complete

## Minimum Machine-Readable Closure

Every non-trivial task should have:

- one `OpenSpec` change or explicit `none`
- one task packet
- one evidence directory
- one review artifact

All four must reference each other through explicit fields, not just by filename convention.

The portable minimum is:

- task packet `## Linkage`
- evidence `linkage`
- review `## Machine Readable` JSON block
