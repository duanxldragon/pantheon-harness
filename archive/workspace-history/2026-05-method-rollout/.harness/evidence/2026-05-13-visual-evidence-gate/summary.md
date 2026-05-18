# Verification Evidence: visual-evidence-gate

Task: `docs/harness/tasks/2026-05-13-visual-evidence-gate.task.md`
Date: 2026-05-13
Layer: platform

## Summary

Added a report-only visual evidence check for UI task packets and matching Harness evidence directories.

The check does not run a browser and does not block CI. It reports missing viewport/state plans and missing screenshots/browser evidence unless an explicit visual evidence gap is recorded.

## Results

- `check-visual-evidence.mjs` syntax check passed.
- Strict mode remains report-only and exited successfully.
- JSON report generation passed.
- Existing task packet and evidence schema checks passed after adding this task.

## Known Gaps

- Existing historical task packets may emit visual evidence warnings until backfilled.
- This is a screenshot/evidence presence gate, not a pixel diff engine.
- GitHub Actions artifact upload still requires remote CI verification.
