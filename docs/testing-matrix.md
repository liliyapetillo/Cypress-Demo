# Testing Matrix and Test Cases (Table View)

## Scope
Contact List App with Cypress UI + API-backed validation and Allure reporting.

## Priority Guide
- **P0**: Blocker / must-cover, high impact to core workflows or data/security
- **P1**: High importance, strong value/risk coverage
- **P2**: Medium importance, UX/consistency/perf sanity

## Functional Areas
- **Auth**: Sign-up, login, logout, token validity, session continuity
- **Contacts CRUD**: Add, edit, delete, list rendering, detail view, bulk/sequence operations
- **Validation & Errors**: Required fields, formats (email, phone, date), auth failures, server error handling
- **API Parity**: UI actions verified via API; direct API CRUD with schema/asserts
- **Data Integrity**: Uniqueness (email), persistence across sessions, sorting/filtering (if available)
- **Non-functional**: Performance sanity, security basics (no auth leakage), accessibility smoke

# Contact List App – Testing Matrix and Case List (Cypress)

## Scope Overview
- Core features: sign up, login, logout, view contact list, add contact, edit contact.
- Platform: Cypress (headed/headless Chrome via Electron/Chrome), Allure reporting enabled.
- Tech: UI + REST API (`/users`, `/contacts`) with API-backed assertions after UI actions.

## Automation Mapping (latest)
- P0-01/P0-02 • Signup + UI login + profile check • Automated in [cypress/e2e/auth.cy.js](../cypress/e2e/auth.cy.js)
- P0-04 • Add contact in list • Automated in [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js)
- P0-05 • Edit contact shows changes • Automated in [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js)
- P1-08 • Bulk add sequence • Automated in [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js)
- P0-01/P0-02 token checks • Automated via API helpers in [cypress/e2e/auth.cy.js](../cypress/e2e/auth.cy.js)

## Status Tracking
- Status codes: Done = automated and passing; Planned = defined but not yet automated; Gap = needs test design.

| TC ID | Title | Status | Automation |
| --- | --- | --- | --- |
| P0-01 | Signup redirects to Contact List | Done | [cypress/e2e/auth.cy.js](../cypress/e2e/auth.cy.js) |
| P0-02 | UI login happy path + token/profile check | Done | [cypress/e2e/auth.cy.js](../cypress/e2e/auth.cy.js) |
| P0-03 | Wrong password rejected | Planned | — |
| P0-04 | Add contact appears in list | Done | [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js) |
| P0-05 | Edit contact shows changes | Done | [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js) |
| P0-06 | Logout clears session | Planned | [cypress/e2e/auth.cy.js](../cypress/e2e/auth.cy.js) |
| P1-01 | Optional fields accepted and persisted | Planned | — |
| P1-02 | Required fields validated | Planned | [cypress/e2e/validation.cy.js](../cypress/e2e/validation.cy.js) |
| P1-03 | Invalid email/phone formats rejected | Planned | [cypress/e2e/validation.cy.js](../cypress/e2e/validation.cy.js) |
| P1-04 | Duplicate email prevented | Planned | — |
| P1-05 | Delete contact removes from list/API | Planned | — |
| P1-06 | Session persists across refresh | Planned | — |
| P1-07 | API failure (500/timeout) shows graceful UI message | Planned | [cypress/e2e/validation.cy.js](../cypress/e2e/validation.cy.js) |
| P1-08 | Bulk add contacts stays consistent via API | Done | [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js) |
| P2-01 | Sorting/filtering stays correct after add/edit/delete | Planned | — |
| P2-02 | Pagination/long-list performance sanity | Planned | [cypress/e2e/nonfunctional.cy.js](../cypress/e2e/nonfunctional.cy.js) |
| P2-03 | Accessibility smoke (focus/labels/keyboard) | Planned | [cypress/e2e/nonfunctional.cy.js](../cypress/e2e/nonfunctional.cy.js) |
| P2-04 | Cross-browser sanity (Chrome/Firefox/WebKit) | Planned | [cypress/e2e/nonfunctional.cy.js](../cypress/e2e/nonfunctional.cy.js) |
| P2-05 | Visual sanity: key fields, empty states | Planned | [cypress/e2e/nonfunctional.cy.js](../cypress/e2e/nonfunctional.cy.js) |

## Priority & Impact Definitions
- Priority P0: Critical path; blocks primary user workflows.
- Priority P1: Important; common scenarios and validations.
- Priority P2: Nice-to-have; edge cases and resilience.
- Impact High: Break affects many users or core data.
- Impact Medium: Limited scope or workaround exists.
- Impact Low: Cosmetic or low-frequency edge.

## Regression Core (P0 / High)
- P0-01: New user can sign up, redirected to Contact List.
- P0-02: Existing user can log in and receives valid token via API.
- P0-04: Add a new valid contact appears in list.
- P0-05: Edit an existing contact, changes visible in list.
- P0-06: Logout clears session and returns to login.

## Authentication & Sessions
- P0-03: Login rejects wrong password with error message (P1, High).
- P1-06: Session persists across refresh; token remains valid (P1, High).
- Token expiry (future P2): API denies after expiry.

## Contacts – Create/Read/Update
- P1-01: Optional fields persisted and displayed (P1, High).
- P1-04: Email must be unique per user; duplicate prevented (P1, Medium).
- P1-05: Delete contact removes from UI and API (P1, High).
- P2-01: Sorting/filtering remains correct after add/edit/delete (P2, Medium).

## Validation & Errors
- P1-02: Missing required fields show inline errors (P1, High).
- P1-03: Invalid email/phone formats rejected with clear messaging (P1, High).
- P1-07: API failure (500/timeout) shows graceful UI message (P1, High).

## Non-functional
- P2-02: Pagination/long-list performance sanity (P2, Medium).
- P2-03: Accessibility smoke (focus order, labels, keyboard submit) (P2, Medium).
- P2-04: Cross-browser sanity (Chrome/Firefox/WebKit) (P2, High).
- P2-05: Visual sanity: rows show key fields; empty states are clear (P2, Medium).

## Observability & Reporting
- Allure enabled; failures attach screenshots/video; history for trends.
- Helpers in cypress/support/api.js and cypress/support/test-helpers.js for API parity and Allure steps.

## Mapping to Current Automation
- Auth flows: [cypress/e2e/auth.cy.js](../cypress/e2e/auth.cy.js)
- Contacts flows (add/edit/bulk): [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js)
- Validation/API failure placeholders: [cypress/e2e/validation.cy.js](../cypress/e2e/validation.cy.js)
- Non-functional placeholders: [cypress/e2e/nonfunctional.cy.js](../cypress/e2e/nonfunctional.cy.js)
- Pages: [cypress/pages/SignupPage.js](../cypress/pages/SignupPage.js), [cypress/pages/LoginPage.js](../cypress/pages/LoginPage.js), [cypress/pages/AddContactPage.js](../cypress/pages/AddContactPage.js), [cypress/pages/ContactListPage.js](../cypress/pages/ContactListPage.js)

## Automation Backlog Suggestions
- Add negative auth (P0-03), optional fields, duplicate, delete, session persistence, and API failure cases.
- Add direct API contract checks for create/edit/list/delete contacts.
- Expand non-functional: performance timing assertions, basic a11y, visual sanity snapshots.

## Exit Criteria
- Core P0s green on primary browser and key P1s stable.
- Allure artifacts present (results + screenshots for failures).
- No critical accessibility violations on core pages.
| P2-03 | Non-functional | Accessibility smoke: focus order, labels, keyboard submit | UI | Planned | [cypress/e2e/nonfunctional.cy.js](../cypress/e2e/nonfunctional.cy.js) |
