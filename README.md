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

## 🔌 API Configuration

This application uses the Just Eat API to fetch restaurant data. To handle CORS restrictions in production, we use different strategies for different environments:

### Development Mode
- Uses Vite proxy configuration in `vite.config.ts`
- Proxies requests from `/api/*` to `https://uk.api.just-eat.io/*`
- No CORS issues since requests appear to come from the same origin

### Production Mode (Vercel)
- Uses serverless API routes in the `/api` directory
- `api/restaurants.ts` acts as a proxy to the Just Eat API
- Handles CORS headers properly
- Deployed automatically with Vercel

### How it works
1. **Development**: `localhost:5174/api/...` → Vite proxy → `https://uk.api.just-eat.io/...`
2. **Production**: `your-domain.com/api/...` → Vercel serverless function → `https://uk.api.just-eat.io/...`

### Files involved:
- `src/services/api.ts` - API service that detects environment
- `api/restaurants.ts` - Vercel serverless API route  
- `vite.config.ts` - Development proxy configuration
- `vercel.json` - Vercel deployment configuration

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

This project includes a comprehensive GitHub Actions pipeline that ensures quality and deployment safety:

### Pipeline Flow

**For Pull Requests:**
1. **Lint & Type Check** - Ensures code quality standards
2. **Unit Tests** - Runs Jest tests with coverage
3. **Build** - Compiles the application 
4. **E2E Tests (Preview)** - Tests against a local preview server

**For Main/Master Branch:**
1. **Lint & Type Check** - Ensures code quality standards
2. **Unit Tests** - Runs Jest tests with coverage
3. **Build** - Compiles the application
4. **Deploy** - Deploys to production environment
5. **E2E Tests (Production)** - Tests against the live deployed URL

### Key Features

- **Smart E2E Testing**: 
  - PRs test against preview servers (localhost)
  - Main/master tests against the actual deployed application
  - No localhost testing for production deployments
- **Build Artifacts**: Shared between jobs for efficiency
- **Environment-based URLs**: Uses `PLAYWRIGHT_BASE_URL` for flexible testing
- **Comprehensive Coverage**: All tests must pass before deployment

### E2E Test Configuration

The tests are configured to run against different environments:

- **Local Development**: `npm run e2e:local` (port 5174)
- **Preview Build**: `npm run e2e:preview` (port 4173) 
- **Deployed Application**: `npm run e2e:deployed` (uses PLAYWRIGHT_BASE_URL)

### Pipeline Configuration

The pipeline is defined in `.github/workflows/ci-cd.yml` and includes:

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

## 🚀 Deployment Instructions

### Deploying to Vercel

1. **Connect your repository** to Vercel
2. **Deploy** - Vercel will automatically detect the React app and serverless functions
3. **Environment Variables** - No additional environment variables needed for the API proxy
4. **Custom domains** - Works with custom domains automatically

The `vercel.json` configuration ensures that:
- The `/api/restaurants` endpoint is properly routed
- Serverless functions are deployed with the correct runtime
- CORS headers are handled properly

### Deploying to Other Platforms

For other platforms (Netlify, Railway, etc.), you'll need to:

1. **Netlify**: Create Netlify Functions in `/netlify/functions/`
2. **Railway**: Deploy as a Node.js app with API routes
3. **Custom server**: Implement the proxy in your backend

---
