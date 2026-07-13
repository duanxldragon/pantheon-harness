---
name: impeccable
description: >
  Visual excellence and product UI quality skill. Use whenever an agent or reviewer
  designs, implements, reviews, improves, or QA-tests any user-facing UI, page,
  dashboard, admin panel, form, table, chart, navigation, layout, visual design system,
  interaction state, responsive view, or frontend experience. Prefer this skill before
  other UI work to make pages aesthetically polished, coherent, accessible, and
  production-grade.
---

# Impeccable

Use this skill as the visual quality gate for all UI work.

## Core Rule

When a task touches how a product looks, feels, moves, or is interacted with, run this skill before implementation and again before completion.

This skill is tool-agnostic. It can be used by Codex, Claude Code, Cursor, Copilot, OpenHands, Aider, or a human reviewer.

## Workflow

1. Classify the UI surface:
   - operational admin/dashboard
   - marketing/landing
   - data table/workbench
   - form/wizard
   - chart/analytics
   - mobile/responsive view
2. Define the intended feel in one sentence.
3. Choose a restrained visual system:
   - typography scale
   - spacing scale
   - surface/elevation rules
   - color roles
   - icon style
   - motion rules
4. Build or review the UI against `references/visual-quality-checklist.md`.
5. Verify with real rendered output when possible:
   - desktop screenshot
   - narrow mobile screenshot
   - interaction states for primary controls
   - empty/loading/error states
6. Before completion, state evidence and remaining visual risks.

## Product UI Defaults

For SaaS, admin, CRM, internal tools, and operational systems:

- Prefer dense but calm information architecture.
- Use restrained color and strong hierarchy.
- Avoid marketing-style heroes inside work surfaces.
- Avoid decorative blobs, random gradients, nested cards, and oversized typography.
- Prioritize scanability, comparison, repeated action, and clear state.
- Keep cards at 8px radius or less unless the existing design system differs.
- Use icons for tool actions and compact controls; do not use emoji as structural UI.

For landing, brand, portfolio, or venue pages:

- Make the product, brand, place, or object visible in the first viewport.
- Use real/generated bitmap imagery or immersive media when it helps recognition.
- Do not use a split card hero as the default.
- Let the first viewport hint at the next section.

## Quality Bar

A UI is not ready if any of these are true:

- Text overlaps or clips at common viewport sizes.
- Buttons or controls change layout size on hover/loading.
- Primary action is visually unclear.
- Empty/loading/error states are missing for data-driven surfaces.
- Icon style, border radius, shadows, or spacing feel random.
- Contrast is weak or focus states are absent.
- The page reads as a one-note palette without semantic roles.
- Mobile layout has horizontal scroll or hidden fixed-footer content.

## Relationship To Other Skills

- If `ui-ux-pro-max` is available, use it for detailed design-system, color, typography, accessibility, and stack-specific guidance.
- If browser QA tools are available, inspect screenshots instead of relying on code inspection only.
- If a project has its own design system, follow it first and use Impeccable as the polish/review gate.

## Completion Evidence

For UI work, final answers or PR notes should include:

- visual surface reviewed
- viewport(s) checked
- key states checked
- known visual risks or unverified states

Do not claim a UI looks polished without rendered evidence or a clearly stated reason why rendered evidence could not be produced.
