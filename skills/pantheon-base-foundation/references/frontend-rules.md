# Frontend Rules

- Prefer Arco Design and existing platform wrappers.
- All display text must go through `t()` or equivalent i18n helpers.
- Menus carry navigation metadata only; business behavior does not live inside menu config.
- New pages must consider `loading`, `empty`, `error`, `forbidden`, and `submitting` states.
- Follow the documented Pantheon token system and avoid freehand gradients, heavy shadows, or marketing-style backoffice layouts.

## Shared UI Governance

- Treat `pantheon-base/docs/designs/FRONTEND_UI_SPEC.md` and `pantheon-base/docs/designs/BACKOFFICE_STYLE_CONSTRAINTS.md` as the visual source of truth.
- Use platform modal/drawer/message wrappers instead of direct raw usage when the project already defines them.
