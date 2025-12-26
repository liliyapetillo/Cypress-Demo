# Cypress Contact List App (Cypress + Allure)

[![Tests](https://github.com/liliyapetillo/Cypress-Demo/actions/workflows/cypress-tests.yml/badge.svg)](https://github.com/liliyapetillo/Cypress-Demo/actions/workflows/cypress-tests.yml)
[Allure Report (GitHub Pages)](https://liliyapetillo.github.io/Cypress-Demo/)

End-to-end tests for the Contact List App with Cypress, Page Object Model, Allure reporting, and API-backed assertions.

**Test Coverage:** 16 automated tests covering auth, contacts CRUD, validation, error handling, and cross-browser sanity.

## Prerequisites
- Node.js 18+ and npm
- Java 8+ (required to open Allure reports)

## Setup
```bash
npm install
```

## Scripts
- `npm run cypress:open` - open Cypress runner
- `npm run cypress:run` - headless run
- `npm test` - alias for `cypress:run`
- `npm run allure:generate` - build Allure report from `allure-results`
- `npm run allure:open` - open generated Allure report locally
- `npm run lint` - lint Cypress code

## Project structure
```
cypress/
├─ fixtures/           # test data
├─ pages/              # Page Object Models
├─ e2e/                # spec files
└─ support/            # custom commands and setup
  ├─ commands.js      # cy.getFirst(), cy.login()
  ├─ api.js           # API validation helpers
  ├─ utils.js         # test data generators
  ├─ network.js       # network intercepts and retry logic
  ├─ test-helpers.js  # shared steps and ensureUser/ensureToken
  └─ e2e.js           # global hooks and setup
docs/
├─ testing-matrix.md   # test strategy and priorities
└─ stability-guide.md  # stability features
.github/
└─ workflows/
   └─ cypress-tests.yml  # GitHub Actions: run tests & deploy Allure to GitHub Pages
```

## Stability Features
This framework includes comprehensive stability enhancements:
- **Selector fallbacks**: `cy.getFirst()` tries multiple selectors
- **Network resilience**: API intercepts and retry logic
- **Retries**: 2 retries in CI via Cypress `runMode` config
- **Error logging**: Allure attachments for failures
- **Test isolation**: Automatic cleanup between tests
- **Extended timeouts**: Tuned for slower networks

See [docs/stability-guide.md](docs/stability-guide.md) for complete details and usage examples.

## Resilience
Tests are designed to be resilient through selector fallbacks, CI retries, and dual UI+API validation.

### Selector Resilience
Every critical element has **multiple fallback selectors** that are tried in order:
```javascript
// Page objects use cy.getFirst() with fallback arrays
cy.getFirst(['#email', 'input[name="email"]', 'input[placeholder="Email"]'])
```
If the primary selector fails (e.g., due to UI changes), the test automatically falls back to alternative selectors. Fallback usage is logged in Allure reports for visibility.

### Retry Logic
- **Automatic retries**: 2 retries in CI, 0 in dev mode
- **Config-level**: Cypress `retries.runMode = 2`

### Network Resilience
- **API intercepts**: All API calls are intercepted and monitored
- **Timeout handling**: Extended timeouts (up to 60s for page loads, 30s for API responses)

### Dual Validation (UI + API)
Every UI operation is verified through the API:
- Add contact via UI → Verify via `GET /contacts`
- Login via UI → Verify token via `GET /users/me`

### Adaptive Fallbacks
When optional UI elements are missing (e.g., "Return to Contact List" button), tests fall back to direct navigation:
```javascript
returnToList() {
  if (buttonExists) {
    cy.wrap(btn).click();
  } else {
    cy.visit('/contactList');
  }
}
```

### Benefits
- Reduction in selector-based flakiness
- Recovery from transient network issues
- Detailed logging of fallback usage for debugging
- Stable in CI/CD with consistent viewport and test isolation

## Writing tests
- Base URL: `https://thinking-tester-contact-list.herokuapp.com`
- Put new specs under `cypress/e2e` (see `contact-list.cy.js` for a reference suite).
- Use page objects from `cypress/pages` and helpers in `cypress/support/utils.js`.
- Add shared commands in `cypress/support/commands.js`.

## API validation
- UI flows are paired with API checks using `cy.request` helpers in [cypress/support/api.js](cypress/support/api.js).
- The main suite [cypress/e2e/contact-list.cy.js](cypress/e2e/contact-list.cy.js) verifies tokens (POST `/users/login`, GET `/users/me`) and asserts contacts via GET `/contacts` after UI add/edit actions.
- Extend by adding more helpers in `cypress/support/api.js` and calling them inside specs for mixed UI+API assertions.

## Allure reporting
Trends are enabled by preserving `history` automatically when generating.
1) Run tests: `npm run cypress:run`
2) Generate report (reuses and re-seeds history): `npm run allure:generate`
3) Open report: `npm run allure:open`

Tips for trends:
- Run the sequence twice; history is copied into `allure-results/history` before and after generation to persist between runs.
- Do not delete `allure-report` or `allure-results/history` between runs if you want continuous trends.

GitHub Actions generates and uploads the Allure report artifact on each run.

## CI/CD & GitHub Pages

### GitHub Actions Workflow
The workflow [.github/workflows/cypress-tests.yml](.github/workflows/cypress-tests.yml) runs automatically on:
- Push to `main` or `master` branches
- Pull requests to `main` or `master`
- Manual trigger via workflow dispatch

**What it does:**
1. Downloads previous test history from GitHub Pages (for trends)
2. Installs dependencies and runs Cypress tests in Electron (headless)
3. Attempts cross-browser smoke tests (Chrome/Firefox) - optional, won't fail workflow
4. Generates Allure report with historical trends
5. Uploads test artifacts (videos, screenshots, Allure report)
6. Deploys Allure report to GitHub Pages with preserved history

**Browser Support:**
- **Local**: Tests run in Electron (bundled with Cypress)
- **CI**: Main suite runs in Electron; Chrome/Firefox smoke tests run if browsers available
- Cross-browser steps are optional and won't fail the workflow if browsers are missing

**History & Trends:**
- First run creates baseline report
- Each subsequent run adds to history, showing trends over time
- Trend graphs appear in Allure after 2+ runs
- History is automatically preserved between deployments

### Viewing Reports
- **Latest report**: Visit your GitHub Pages URL
- **Historical reports**: Download artifacts from Actions tab → Workflow runs
- **Local reports**: `npm run allure:open` after running tests locally
