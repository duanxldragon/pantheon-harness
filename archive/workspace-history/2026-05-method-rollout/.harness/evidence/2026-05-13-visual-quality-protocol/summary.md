# Verification Evidence: visual-quality-protocol

Task: `docs/harness/tasks/2026-05-13-visual-quality-protocol.task.md`
Date: 2026-05-13
Layer: platform

## Summary

Created a global Codex `impeccable` skill and wired it into the Pantheon Harness process as the default visual quality gate for UI work.

Also added a Claude Code global instruction that points to the same skill path, so Claude Code can apply the same visual gate even though it does not load Codex skills directly.

## Results

- OpenAI curated skill list checked: no `impeccable` skill available.
- OpenAI experimental skill path checked: unavailable.
- Global Codex skill created at `C:\Users\xiaolong\.codex\skills\impeccable\SKILL.md`.
- Global Claude Code instruction created at `C:\Users\xiaolong\.claude\CLAUDE.md`.
- Visual protocol added at `docs/harness/VISUAL_QUALITY_PROTOCOL.md`.
- Task packet check: passed for 9 task packets.
- Evidence strict check: passed for 8 existing evidence files before this task evidence was added.

## Known Gaps

- Codex must be restarted to auto-discover the new global skill in future sessions.
- The official quick validator could not run because the current Python environment is missing `yaml`.
- Claude Code does not share Codex skills natively; it uses the global `CLAUDE.md` pointer to the same skill.
- Visual quality is protocol-enforced and review-enforced; it is not yet a CI visual diff gate.
