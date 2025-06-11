# 🚀 Restaurant Demo App

A production-ready React + TypeScript boilerplate featuring:

- ✅ **React 18** & **TypeScript 5** with strict settings
- ✅ **Redux + Redux-Saga** for state & side-effects
- ✅ **ESLint**, **Prettier**, **Husky** & **CommitLint** for code quality
- ✅ **Jest** (unit) + **Playwright** (E2E) with 90% coverage gates
- ✅ **Vite** build, environment-based configs, hashed filenames
- ✅ **Docker** multi-stage image + `docker-compose.yml`
- ✅ **GitHub Actions** CI (`ci.yml`) & CD (`deploy.yml`)
- ✅ 🛡️ HTTP security headers (nginx/`helmet`)
- ✅ Feature flags, Auth skeleton, Sentry error-boundary
- ✅ Sample “Hello World” feature module & Storybook stub

---

## 🛠 Prerequisites

- **Node.js** v16+
- **npm** (or Yarn/Pnpm)
- **Docker** & **docker-compose** (for local container testing)

---

## ⚡ Quick start

```bash
# 1. Install deps
npm ci

# 2. Start in dev w/ HMR
npm start

# 3. Run tests
npm test

# 4. Lint & format
npm run lint
npm run format

# 5. Build for prod
npm run build

# 6. Run locally in Docker
docker-compose up --build

---

## 📦 Available Scripts

| Command                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `npm start`            | Start development server with HMR (Vite)     |
| `npm run build`        | Build production bundle                      |
| `npm test`             | Run unit tests via Jest                      |
| `npm run e2e`          | Run end-to-end tests with Playwright         |
| `npm run lint`         | Lint code with ESLint                        |
| `npm run format`       | Format code with Prettier                    |
| `npm run type-check`   | Run TypeScript strict type checks            |
| `npm run storybook`    | Launch Storybook for UI development (if any) |





```
