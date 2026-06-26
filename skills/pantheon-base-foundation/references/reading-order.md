# Reading Order

## Working In `pantheon-base`

Read in this order:

1. `pantheon-base/DESIGN.md`
2. `pantheon-base/AGENTS.md`
3. `pantheon-base/docs/README.md`
4. Matching contract documents under `pantheon-base/docs/contracts/`
5. Matching design documents under `pantheon-base/docs/designs/`
6. Matching acceptance documents under `pantheon-base/docs/acceptances/`

## Working In A Derived Repository

Read in this order:

1. `pantheon-platform/docs/WORKSPACE_INHERITANCE.md`
2. `<derived-repo>/AGENTS.md`
3. `<derived-repo>/docs/PROJECT_INHERITANCE.md`
4. `pantheon-base/DESIGN.md`
5. `pantheon-base/AGENTS.md`
6. `pantheon-base/docs/README.md`
7. Matching `pantheon-base` contracts, designs, and acceptance docs
8. Derived repository business design docs

## Reading Intent

- Use `WORKSPACE_INHERITANCE.md` to understand global repo roles.
- Use `PROJECT_INHERITANCE.md` to understand which base version the project inherits and what local business additions exist.
- Use `pantheon-base` docs as the authority for platform and system-domain constraints.
