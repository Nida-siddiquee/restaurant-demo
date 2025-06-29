# 🍽️ Restaurant Demo App

A production-ready React + TypeScript restaurant discovery application featuring:

- ✅ **React 18** & **TypeScript 5** with strict settings
- ✅ **Redux + Redux-Saga** for state management & side-effects
- ✅ **Modular Architecture** with custom hooks and reusable components
- ✅ **ESLint**, **Prettier**, **Husky** & **CommitLint** for code quality
- ✅ **Jest** (unit) + **Playwright** (E2E) with comprehensive test coverage
- ✅ **Vite** build with HMR, environment configs, and optimizations
- ✅ **GitHub Actions** CI/CD pipeline with quality gates
- ✅ **Vercel** deployment with preview environments
- ✅ **Just Eat API** integration for real restaurant data
- ✅ **Responsive Design** with mobile-first approach

---

## 🏗️ Project Features

### Core Functionality
- **Restaurant Discovery**: Browse restaurants by postcode/location
- **Advanced Filtering**: Filter by cuisine type, rating, delivery options
- **Search**: Real-time search with debouncing
- **Pagination**: Efficient handling of large restaurant lists
- **Restaurant Details**: Comprehensive restaurant information pages
- **Responsive Design**: Mobile-first responsive layout

### Technical Features
- **State Management**: Redux Toolkit with Redux-Saga for async operations
- **Custom Hooks**: Reusable logic for filtering, pagination, and data fetching
- **Component Architecture**: Modular, well-organized component structure
- **Type Safety**: Full TypeScript coverage with strict type checking
- **Testing**: Comprehensive unit and E2E test coverage
- **Performance**: Optimized builds with code splitting and lazy loading

### Development Experience
- **Hot Module Replacement**: Fast development with Vite HMR
- **Code Quality**: ESLint, Prettier, and Husky for consistent code
- **Git Hooks**: Pre-commit linting and testing
- **CI/CD**: Automated testing and deployment pipeline

---
- ✅ Feature flags, Auth skeleton, Sentry error-boundary
- ✅ Sample “Hello World” feature module & Storybook stub

---

## 🛠 Prerequisites

- **Node.js** v18+
- **npm** (or Yarn/Pnpm)
- **Modern browser** (Chrome, Firefox, Safari, Edge)

---

## ⚡ Quick Start

````bash
# 1. Install dependencies
npm ci

# 2. Start development server with HMR
npm run dev

# 3. Run tests with coverage
npm run test:coverage

# 4. Run E2E tests locally
npm run e2e:local

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
````

### Available Scripts

```bash
npm run dev              # Start development server (localhost:5174)
npm run build            # Build for production
npm run preview          # Preview production build (localhost:4173)
npm run test             # Run unit tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run e2e              # Run E2E tests (uses PLAYWRIGHT_BASE_URL or localhost:5174)
npm run e2e:local        # E2E tests against dev server (localhost:5174)
npm run e2e:preview      # E2E tests against preview build (localhost:4173)
npm run e2e:deployed     # E2E tests against deployed URL (set PLAYWRIGHT_BASE_URL)
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues automatically
npm run type-check       # Run TypeScript type checking
npm run format           # Format code with Prettier
```

---

## 🔌 API Configuration

This application uses the Just Eat API to fetch restaurant data. Currently configured for development with plans for production API proxy implementation:

### Current Implementation
- **Development Mode**: Uses Vite proxy configuration in `vite.config.ts`
- **API Service**: `src/services/api.ts` handles environment detection and API calls
- **Proxy Setup**: Proxies requests from `/api/*` to `https://uk.api.just-eat.io/*`
- **CORS Handling**: No CORS issues in development due to proxy

### Development Flow
```
localhost:5174/api/... → Vite proxy → https://uk.api.just-eat.io/...
```

### Production Setup (Planned)
The `api/restaurants.js` file is prepared for serverless function implementation:
- Will act as a proxy to the Just Eat API
- Handle CORS headers properly
- Deploy automatically with Vercel

### Files involved:
- `src/services/api.ts` - Main API service with environment detection
- `api/restaurants.js` - Placeholder for serverless API route (empty)
- `vite.config.ts` - Development proxy configuration
- `vercel.json` - Deployment configuration (to be configured)

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

## 📚 Documentation

- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Comprehensive deployment instructions
- **API Configuration** - See above section for current setup
- **Testing Strategy** - Unit tests (Jest) + E2E tests (Playwright)
- **CI/CD Pipeline** - Automated quality gates and deployment

---

## 🚀 Deployment

For detailed deployment instructions, see **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)**.

### Quick Setup for Vercel

1. **Prerequisites**: Vercel account and GitHub repository
2. **Secrets**: Configure `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
3. **Deploy**: Push to `main` branch triggers automatic deployment
4. **Preview**: Pull requests create preview deployments with E2E testing

### Deployment Flow

- **Production**: `main/master` branch → Vercel production → E2E tests
- **Preview**: Pull requests → Vercel preview → E2E tests → PR comments
- **Quality Gates**: Lint → Type check → Unit tests → Build → Deploy → E2E tests

---
