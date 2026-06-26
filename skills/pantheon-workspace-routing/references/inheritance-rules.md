# Inheritance Rules

- Base rules are referenced, not duplicated.
- Every business repository must declare:
  - base repository path or remote
  - base version or commit/tag
  - inherited rule categories
  - local business modules
  - local additions only
  - override policy
- Local overrides may add business detail but must not replace base contracts or red lines.
