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
- **Enhanced Error Handling**: Granular error types, retry mechanisms, and error boundaries

### Error Handling Features

- **Typed Error Categories**: Network, API, validation, timeout, and not-found errors
- **Smart Retry Logic**: Automatic retries with exponential backoff for transient errors
- **Error Boundaries**: React error boundaries to prevent cascade failures
- **Contextual Error Display**: Appropriate UI components for different error scenarios
- **Accessibility**: Full ARIA support and keyboard navigation for error states
- **Recovery Actions**: Clear next steps and retry options for users

### Development Experience

- **Hot Module Replacement**: Fast development with Vite HMR
- **Code Quality**: ESLint, Prettier, and Husky for consistent code
- **Git Hooks**: Pre-commit linting and testing
- **CI/CD**: Automated testing and deployment pipeline

---

- ✅ Feature flags, Auth skeleton, Sentry error-boundary
- ✅ Sample “Hello World” feature module & Storybook stub

---

## 🏗️ Architecture Improvements

### Centralized Hooks Structure

All custom hooks are now consolidated in a single `src/hooks/` directory for better maintainability:

```
src/hooks/
├── index.ts                      # Centralized exports
├── useErrorBoundary.ts          # Error boundary utilities
├── useErrorHandler.ts           # Async error handling
├── useFilteredRestaurants.ts    # Restaurant filtering logic
├── usePagination.ts             # Pagination utilities
└── *.test.ts                    # Corresponding tests
```

**Benefits:**

- **Single Source**: All hooks in one location
- **Better Imports**: `import { useHook } from '@/hooks'`
- **Easier Testing**: Centralized test location
- **Improved Maintainability**: Clear separation of concerns

## 🛠 Prerequisites

- **Node.js** v18+
- **npm** (or Yarn/Pnpm)
- **Modern browser** (Chrome, Firefox, Safari, Edge)

---

## ⚡ Quick Start

```bash
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
```

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
- **CORS Handling**: No CORS issues in development due to proxy

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
```

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
