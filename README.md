# Cypress Contact List App – Test Automation Suite

[![Tests](https://github.com/liliyapetillo/Cypress-Demo/actions/workflows/cypress-tests.yml/badge.svg)](https://github.com/liliyapetillo/Cypress-Demo/actions/workflows/cypress-tests.yml)
[Allure Report](https://liliyapetillo.github.io/Cypress-Demo/)

E2E test automation for a contact management web app. Cypress + Page Objects + Allure + CI/CD.

**App:** [thinking-tester-contact-list.herokuapp.com](https://thinking-tester-contact-list.herokuapp.com)

## Quick Start

```bash
npm install
npm run cypress:run    # Run tests
npm run lint           # Check code quality
npm run allure:generate && npm run allure:open  # View report
```

**Prerequisites:** Node 18+, Java 8+ (Allure only)

## Test Coverage

**16 tests** | **100% pass rate** | **~40s execution**

| Category | Count | Coverage |
|----------|-------|----------|
| Auth | 4 | Signup, login, logout, errors |
| CRUD | 6 | Add, edit, delete contacts |
| Validation | 3 | Required fields, formats, error handling |
| E2E | 1 | Full user journey (signup → login → add → edit) |
| A11y | 1 | Keyboard navigation |
| Cross-browser | 1 | Chrome smoke test only |

## Architecture

**Stack:** Cypress 15.8, JavaScript ES6, Allure, GitHub Actions

**Patterns:**
- Page Object Model
- Dual validation (UI + API)
- Dynamic test data (timestamp-based)
- Selector fallbacks (`cy.getFirst()`)
- 2x retries in CI

**Structure:**
```
cypress/e2e/          # Test specs
cypress/pages/        # Page objects
cypress/support/      # Commands, API helpers, utils
```

## What's NOT Tested

| Gap | Why |
|-----|-----|
| Full cross-browser | Smoke test only (cost/time trade-off) |
| Mobile/responsive | Not designed for mobile |
| Performance | Use real user monitoring |
| All contact fields | Only name updates tested |
| Edge cases | Long strings, special chars |

## CI/CD

**Runs on:** Every push/PR  
**Checks:** 2 parallel jobs
- Smoke tests (e2e-smoke.cy.js + linting) – fast feedback ~1min ✅ **required for merge**
- Full suite (auth, contacts, validation, nonfunctional) – complete coverage ~3min (optional)

**Merge Policy:** Only smoke tests must pass. Full suite runs in parallel for visibility but doesn't block merges.  
**Deploy:** Allure report to GitHub Pages (master only)  
**Artifacts:** Videos, screenshots, reports (30-day retention)

**Setup:** Configure `smoke-tests` as required status check in GitHub branch protection settings.

## Key Features

- **Dual validation**: Every UI action verified via API
- **Test isolation**: Dynamic data, no cleanup needed
- **Resilient selectors**: Auto-fallback on UI changes
- **Code quality**: ESLint enforced in CI

## Links

- [Live Allure Report](https://liliyapetillo.github.io/Cypress-Demo/)
- [CI Runs](../../actions)
- [Test Strategy](docs/testing-matrix.md)
