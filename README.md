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

````bash
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

# 6. Run E2E tests
npm run e2e              # Uses environment variable or localhost:5174
npm run e2e:local        # Tests against dev server (localhost:5174)
npm run e2e:preview      # Tests against preview build (localhost:4173)
npm run e2e:deployed     # Tests against deployed URL (set PLAYWRIGHT_BASE_URL)

# 7. Run locally in Docker
docker-compose up --build

---

## 🧪 E2E Testing Configuration

The Playwright tests can be configured to run against different environments:

### Local Development
```bash
npm run e2e:local
````

### Preview Build

```bash
npm run build
npm run preview
npm run e2e:preview
```

### Deployed Application

Set the `PLAYWRIGHT_BASE_URL` environment variable:

```bash
# Option 1: Set environment variable
export PLAYWRIGHT_BASE_URL=https://your-deployed-app.vercel.app
npm run e2e

# Option 2: Inline with command
PLAYWRIGHT_BASE_URL=https://your-deployed-app.vercel.app npm run e2e:deployed
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
# Edit .env with your configuration
```

---

## 🚀 CI/CD Pipeline

This project includes a comprehensive GitHub Actions pipeline that:

1. **Lints and type-checks** the code
2. **Runs unit tests** with coverage
3. **Builds** the application
4. **Runs E2E tests** against the build
5. **Deploys** to production (only on main branch)
6. **Runs post-deployment tests** against the live site

### Pipeline Configuration

The pipeline is defined in `.github/workflows/ci-cd.yml` and runs on:

- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

### Setting Up Deployment

Vercel

1. Create a Vercel account and project
2. Add these secrets to your GitHub repository:
   - `VERCEL_TOKEN` - Your Vercel token
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID
3. Uncomment the Vercel deployment step in the workflow

### GitHub Secrets Setup

Go to your repository Settings → Secrets and variables → Actions, and add:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

Or for Netlify:

```
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

### Workflow Jobs

- **lint-and-typecheck**: ESLint and TypeScript checks
- **unit-tests**: Jest tests with coverage reporting
- **build**: Application build and artifact upload
- **e2e-tests**: Playwright tests against preview build
- **deploy**: Production deployment (main branch only)
- **post-deploy-tests**: E2E tests against live production

### Environment Protection

The `production` environment is protected and will require manual approval for deployments if configured in your repository settings.

---
