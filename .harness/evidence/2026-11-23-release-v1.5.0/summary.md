# v1.5.0 Release Preparation

This evidence covers the v1.5.0 release metadata, release-facing documentation, and the two local consumer receipt checks. The user explicitly requested release publication, PR/branch merge, and retaining only main. PR #11 is already merged at 7bbba8a.

## Release Scope

- Publish the backward-compatible additions since v1.4.0 as v1.5.0, with synchronized Method Kit/Repo Shell compatibility metadata and release date 2026-11-23.
- Preserve all seven policy hashes previously reviewed for capability-adaptive delivery; local Base/Ops receipts record the new method version and validate against the same policy bytes.
- Fix stale current-release references in the bilingual README entries, `patterns/` entry/install docs, the methodology entry, and the active PR template. Historical v1.4.0 evidence remains unchanged.
- Add the missing Chinese v1.4.0 highlights section for parity with the English README.
- No application behavior changes, product foundation upgrade, consumer commit/push, empirical productivity benchmark, or new quality-gate policy is included.

## Independent Review

An independent read-only Claude Code pass reviewed the staged diff and returned APPROVE with three P2 pre-merge conditions:

1. Close the review/evidence placeholders — done.
2. Align bilingual historical highlights — done.
3. Confirm the capability policy does not self-label as Unreleased — confirmed; the remaining sentence is a general hash-distinction rule.

The repair pass also found and fixed stale `1.3.0` references in `patterns/README*` and `patterns/install*`, plus the Unreleased pointer in the methodology entry. The second external reviewer pass over the final diff timed out at the model service; that limitation and the mechanical nature of the delta are recorded in [review.md](./review.md).

## Validation

- 101 Harness script tests and 16 Verify script tests passed.
- Strict method health, adoption, failure registry, sync drift, doc frontmatter, encoding, doc links, doc inventory, template health, task packet, evidence, review, graph review, visual evidence, and runtime evidence all passed.
- Graph-review strict initially exposed a missing `## Structural Scope` section in the task packet; the section was added and the final gate run is green.
- Both consumer preflights passed at methodVersion 1.5.0 with the same seven policy hashes.
- Raw command results are recorded in [commands.json](./commands.json); the final post-repair run is in [final-gates.log](./final-gates.log).

## Explicit Gaps

- CodeGraph/LSP/AST diagnostics were unavailable; no structural-index or type-diagnostic certification is claimed.
- No empirical productivity benchmark; consumer repository submissions and product foundation replacement are outside scope.
- `patterns/changelog.md` remains a legacy 1.0.0-era file; the root `CHANGELOG.md` is canonical. This pre-existing drift is recorded, not rewritten.
- Remote merge/release and branch cleanup are verified after preparation and reported separately.

## Remote Acceptance

After delivery, verify release PR/main CI, the tag's exact merged commit, a published GitHub Release, no open Harness PRs, and main as the sole local/remote branch. Report those outcomes after delivery; do not infer them from this local preparation.
