# Shared Tech Stack

- Backend: Go, Gin, GORM, Casbin, JWT, MySQL, Redis
- Frontend: React, TypeScript, Vite, Arco Design, Zustand, i18next
- Engineering: Docker Compose, Playwright, GitHub Actions, gstack QA flows

## Implications

- Prefer existing Go module and vertical-slice patterns over new abstractions.
- Prefer Arco Design and existing platform wrappers over bespoke frontend styling.
- Treat gstack as the default local browser evidence path for UI and smoke work.
