---
name: grill-me
description: >
  Run a relentless interview to sharpen a plan, design, or proposed change.
  Use when the user asks for plan grilling, design challenge, boundary clarification,
  PR scrutiny, hard questions, or mentions grill, grilling, challenge, challenge my plan,
  design review, or plan review.
disable-model-invocation: true
---

# Grill Me

## Goal

Turn vague optimism into tested assumptions through sharp, short questioning.

## Trigger Scenarios

- Plan or design is missing scope, boundaries, risks, acceptance, or rollback.
- User says "grill me", "challenge this", "review my plan", or similar.
- PR needs scrutiny before merge.

## Required Output

```text
## Questions
1. <highest-impact question>
   - Why it matters: ...
   - Bad outcome if ignored: ...

2. <next question>
   - Why it matters: ...
   - Bad outcome if ignored: ...

## Next Step
<one concrete action>
```

## Rules

- Ask 3-5 questions max.
- Each question must change a decision or prevent a failure mode.
- Prefer scope, boundary, risk, verification, and rollback angles.
- If information is missing, ask for it instead of guessing.
- Do not provide a full redesign unless asked.
