# Harness Engineering 1.0

Chinese version: [METHOD_RELEASE_1_0.zh.md](./METHOD_RELEASE_1_0.zh.md)

Harness Engineering 1.0 packages a portable method for non-trivial software delivery with coding agents and human review.

This release is not a Claude Code preset, a Codex preset, or a Pantheon-only workflow. It is a repository-level method built from contracts, templates, checks, and upgradeable control loops.

## What Is In 1.0

- a tool-agnostic harness core model
- a coverage model for failure capture and control quality
- a template taxonomy for common repository shapes
- a tool adapter matrix so concrete tools stay usable without becoming mandatory
- portable task packet, evidence, review, and failure registry assets
- repo-shell bootstrap material for new repositories
- method-health, adoption, and registry validation checks

## Who It Is For

- teams using coding agents for non-trivial delivery
- repositories that need explicit verification and review closure
- teams that want the workflow to survive tool changes

## What 1.0 Does Not Claim

- it does not replace engineering judgment
- it does not guarantee good prompts by itself
- it does not require a single model, editor, or agent runtime

## Adoption Shape

1. Copy `agentic-method-kit/`
2. Copy `agentic-repo-shell/`
3. Optionally apply `pantheon-overlay/`
4. Run the harness checks
5. Start using task packets, evidence, review closure, and failure registry updates

## Current Open Evolution Items

- visual evidence strict-mode promotion remains staged, not forced
- failure registry presence is implemented, but promotion from warning to mandatory landing file is deferred until downstream adoption is broader
- repeated failures should now be reviewed through an explicit ratchet loop instead of remaining chat-only lessons
- major model or tool upgrades should trigger a harness retirement review so temporary workarounds do not become permanent shackles
