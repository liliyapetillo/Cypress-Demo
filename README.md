# Cypress Contact List App (Cypress + Allure)

[![Tests](https://github.com/liliyapetillo/Cypress-Demo/actions/workflows/cypress-tests.yml/badge.svg)](https://github.com/liliyapetillo/Cypress-Demo/actions/workflows/cypress-tests.yml)
[Allure Report (GitHub Pages)](https://liliyapetillo.github.io/Cypress-Demo/)

> **Professional test automation framework** demonstrating modern QA practices with Cypress, Page Object Model architecture, Allure reporting, and CI/CD integration.

## 🎯 Project Overview

Production-ready end-to-end test suite for the [Contact List Application](https://thinking-tester-contact-list.herokuapp.com) featuring:

- **17 automated tests** covering authentication, CRUD operations, validation, error handling, accessibility, and cross-browser compatibility
- **Test-gated CI/CD pipeline** - deployments only proceed after passing tests
- **Pull request validation** - automated testing on every PR before merge
- **Page Object Model** architecture for maintainability
- **Dual validation** (UI + API) for robust assertions
- **Allure reporting** with historical trends and test analytics
- **Resilient selectors** with automatic fallbacks
- **Network stability** features including retries and timeouts

## 📊 Test Coverage

| Category | Tests | Description |
|----------|-------|-------------|
| **Authentication** | 4 | Sign up, login, logout, error handling |
| **Contact Management** | 6 | CRUD operations, optional fields, duplicate prevention, bulk operations |
| **Validation** | 3 | Required fields, format validation, API error handling |
| **End-to-End** | 2 | Complete user journeys from signup to contact management |
| **Non-Functional** | 2 | Cross-browser compatibility, accessibility smoke tests |

**Total: 17 tests** | **Pass Rate: 100%** | **[View Live Report →](https://liliyapetillo.github.io/Cypress-Demo/)**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Java 8+ (required for Allure reports)

### Installation
```bash
npm install
```

### Running Tests
```bash
# Interactive mode with Cypress UI
npm run cypress:open

# Headless mode (CI-style)
npm run cypress:run

# Run specific spec
npm run cypress:run -- --spec "cypress/e2e/auth.cy.js"
```

### Viewing Reports
```bash
# Generate Allure report from test results
npm run allure:generate

# Open report in browser
npm run allure:open
```

📈 **[View Live Report](https://liliyapetillo.github.io/Cypress-Demo/)** - Updated automatically on every merge to master

## 🏗️ Architecture

### Project Structure
```
cypress/
├── e2e/                    # Test specifications
│   ├── auth.cy.js         # Authentication tests (P0-01, P0-02, P0-03, P0-06)
│   ├── contacts.cy.js     # Contact CRUD tests (P0-04, P0-05, P1-01, P1-04, P1-05, P1-08)
│   ├── validation.cy.js   # Input validation tests (P1-02, P1-03, P1-07)
│   ├── e2e-smoke.cy.js    # End-to-end user journeys (E2E-01, E2E-02)
│   └── nonfunctional.cy.js # Cross-browser & accessibility (P2-03, P2-04)
├── pages/                  # Page Object Models
│   ├── LoginPage.js
│   ├── SignupPage.js
│   ├── ContactListPage.js
│   └── ContactDetailsPage.js
├── support/
│   ├── commands.js        # Custom Cypress commands (cy.getFirst, cy.login)
│   ├── api.js             # API validation helpers
│   ├── utils.js           # Test data generators
│   ├── network.js         # Network intercepts & retry logic
│   └── test-helpers.js    # Shared test utilities
├── fixtures/              # Test data
└── videos/                # Test execution recordings

docs/
├── testing-matrix.md      # Test strategy & coverage matrix
└── stability-guide.md     # Framework stability features

.github/workflows/
└── cypress-tests.yml      # CI/CD pipeline configuration
```

### Design Patterns
- **Page Object Model**: Encapsulates UI interactions for maintainability
- **Dual Validation**: UI actions verified via API for data accuracy
- **Selector Resilience**: Multiple fallback selectors per element
- **Test Isolation**: Independent test execution with automatic cleanup
- **Data Generation**: Dynamic test data to avoid conflicts

## 🛡️ Stability & Resilience Features

### Selector Resilience
Every critical element uses **multiple fallback selectors** for robustness:

```javascript
// Automatic fallback to alternative selectors
cy.getFirst(['#email', 'input[name="email"]', 'input[placeholder="Email"]'])
```

If the primary selector fails (e.g., UI changes), tests automatically try alternatives. Fallback usage is logged in Allure for debugging.

### Network Stability
- **API intercepts**: Monitor and log all API calls
- **Retry logic**: 2 automatic retries in CI for transient failures
- **Extended timeouts**: 60s for page loads, 30s for API responses
- **Network resilience**: Handles slow responses and timeouts gracefully

### Dual Validation (UI + API)
Every UI operation is verified through the backend API for data accuracy:

```javascript
// Add contact via UI
contactListPage.clickAddContact();
contactDetailsPage.fillContactForm(contact);

// Verify via API
cy.getContactsAPI(token).then(contacts => {
  expect(contacts).to.have.length(1);
  expect(contacts[0].email).to.equal(contact.email);
});
```

**Benefits:**
- Catches UI bugs that don't persist to backend
- Validates data integrity beyond visual checks
- Provides detailed failure context

### Test Isolation
- **Independent execution**: Each test can run standalone
- **Automatic cleanup**: Logout between tests
- **Fresh data**: Dynamic data generation prevents conflicts
- **No shared state**: Tests don't depend on execution order

### CI/CD Stability
- **Consistent viewport**: 1280x720 for reproducible screenshots
- **Retry configuration**: `retries.runMode = 2` for CI environment
- **Video recording**: Full execution capture for debugging
- **Screenshot on failure**: Automatic visual debugging

See [docs/stability-guide.md](docs/stability-guide.md) for implementation details.

## 📝 Development Guide

### Adding New Tests

1. **Create feature branch:**
   ```bash
   git checkout -b feature/add-new-test
   ```

2. **Write test** in appropriate spec file:
   ```javascript
   it('P1-09 New test case', () => {
     // Use page objects
     loginPage.visit();
     loginPage.login(user.email, user.password);
     
     // Verify via API
     cy.request({
       method: 'GET',
       url: '/users/me',
       headers: { Authorization: `Bearer ${token}` }
     }).then(response => {
       expect(response.status).to.equal(200);
     });
   });
   ```

3. **Run locally:**
   ```bash
   npm run cypress:run -- --spec "cypress/e2e/your-spec.cy.js"
   ```

4. **Commit and push:**
   ```bash
   git add -A
   git commit -m "Add P1-09 test case"
   git push origin feature/add-new-test
   ```

5. **Create pull request** - tests run automatically on PR

6. **Merge after tests pass** - deploys to production

### Custom Commands

Framework includes custom commands for common operations:

```javascript
// Multi-selector fallback
cy.getFirst(['#email', 'input[name="email"]'])

// Login helper
cy.login(email, password)

// API helpers
cy.getUserAPI(token)
cy.getContactsAPI(token)
cy.createContactAPI(token, contactData)
```

See [cypress/support/commands.js](cypress/support/commands.js) for all available commands.

### Page Objects

All UI interactions are encapsulated in page objects:

```javascript
import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();
loginPage.visit();
loginPage.login(email, password);
```

Available page objects:
- `LoginPage` - Authentication (login form)
- `SignupPage` - User registration
- `ContactListPage` - Contact list view
- `ContactDetailsPage` - Add/edit contact forms

## 📊 Allure Reporting

### Features
- **Detailed execution logs** with step-by-step breakdowns
- **Historical trends** tracking test duration and stability over time
- **Screenshots and videos** attached to failures for debugging
- **Retry analytics** showing which tests required retries
- **API request/response** logging for network debugging
- **Categorization** by test type (P0, P1, P2, E2E)

### Local Report Generation

```bash
# Run tests
npm run cypress:run

# Generate Allure report (preserves history for trends)
npm run allure:generate

# Open report in browser
npm run allure:open
```

### Trend History

Trends require 2+ test runs to appear:
1. First run creates baseline
2. Subsequent runs build trend graphs
3. History automatically preserved in `allure-results/history/`
4. GitHub Pages deployment maintains history via `history.zip`

**Trend metrics:**
- Test execution duration over time
- Pass/fail patterns
- Retry frequency
- Browser compatibility

### CI Integration

GitHub Actions automatically:
1. Downloads previous history from GitHub Pages
2. Runs tests and generates fresh results
3. Merges with historical data
4. Publishes updated report to GitHub Pages
5. Preserves history for next run

📈 **[View Live Report →](https://liliyapetillo.github.io/Cypress-Demo/)**

## 🔗 Links & Resources

- **Live Allure Report**: [https://liliyapetillo.github.io/Cypress-Demo/](https://liliyapetillo.github.io/Cypress-Demo/)
- **GitHub Actions**: [Workflow runs](../../actions)
- **Application Under Test**: [Contact List App](https://thinking-tester-contact-list.herokuapp.com)
- **Test Strategy**: [docs/testing-matrix.md](docs/testing-matrix.md)
- **Stability Guide**: [docs/stability-guide.md](docs/stability-guide.md)

## 🎓 Key Takeaways

This framework demonstrates:

✅ **Modern test automation practices** with Cypress and JavaScript  
✅ **CI/CD integration** with automated PR validation and deployment gates  
✅ **Quality gates** ensuring only tested code reaches production  
✅ **Comprehensive reporting** with historical trends and analytics  
✅ **Resilient test design** with selector fallbacks and retry logic  
✅ **API-backed validation** for robust assertions beyond UI checks  
✅ **Page Object Model** for maintainable, scalable test architecture  
✅ **Professional documentation** for team collaboration and onboarding

---

**Built with:** Cypress 15.8.1 | Allure 2.32.1 | GitHub Actions | JavaScript ES6+

## 🔄 CI/CD Pipeline & Pull Request Workflow

### Automated Testing on Every PR

**Pull request workflow ensures quality gates before merging:**

1. **Developer creates feature branch:**
   ```bash
   git checkout -b feature/new-test
   # Make changes, commit
   git push origin feature/new-test
   ```

2. **Create pull request** to `master` branch
   - GitHub Actions automatically triggers test suite
   - All 17 tests run in Electron (headless)
   - Cross-browser smoke tests run (Chrome)
   - Test results posted as PR status check

3. **PR validation completes:**
   - ✅ **Pass**: PR is ready for review and merge
   - ❌ **Fail**: PR blocked until tests pass

4. **Merge to master** (only after tests pass):
   - Triggers full test suite again
   - Generates Allure report with historical trends
   - Deploys report to GitHub Pages
   - Updates live test results

### Deployment Gate

**Production deploys only when:**
- ✅ All tests pass
- ✅ Push to `master` branch (not on PRs)

This ensures the live Allure report always reflects passing test state.

### GitHub Actions Workflow

**Triggered on:**
- Every push to `main` or `master`
- Every pull request to `main` or `master`
- Manual workflow dispatch

**Pipeline steps:**
1. **Setup** - Install Node.js, dependencies, Cypress binaries
2. **Download history** - Fetch previous test results from GitHub Pages for trends
3. **Run tests** - Execute full test suite with video recording
4. **Cross-browser** - Run smoke tests in Chrome (optional, non-blocking)
5. **Generate report** - Build Allure report with historical trends
6. **Upload artifacts** - Save videos, screenshots, and reports
7. **Deploy** - Publish Allure report to GitHub Pages (only on master with passing tests)

**Test execution details:**
- **Browser**: Electron (headless) for main suite
- **Retries**: 2 automatic retries in CI for flaky test resilience
- **Timeout**: Extended timeouts for network stability
- **Parallel**: Tests run sequentially for data isolation

### Viewing Test Results

| Location | Description | URL |
|----------|-------------|-----|
| **Live Report** | Latest master branch results | [GitHub Pages](https://liliyapetillo.github.io/Cypress-Demo/) |
| **PR Checks** | Test status on pull requests | GitHub PR status checks |
| **Actions Tab** | Detailed logs and artifacts | [Workflow runs](../../actions) |
| **Local** | Run tests locally | `npm run cypress:run && npm run allure:open` |

### History & Trends

Allure tracks test execution history across runs:
- **Duration trends** - Monitor test execution time
- **Pass/fail patterns** - Identify flaky tests
- **Retry analytics** - Track stability improvements
- **Historical comparison** - Compare runs over time

History persists automatically between deployments via `history.zip` artifact.
