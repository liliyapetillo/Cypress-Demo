# Test Case to Spec Mapping

| ID | Spec / Test Title | Coverage | Status | Notes |
| --- | --- | --- | --- | --- |
| P0-01 | [cypress/e2e/auth.cy.js](../cypress/e2e/auth.cy.js) — "P0-01 Sign Up - creates new user and lands on list" | UI | Automated | Creates user via UI; asserts landing on list |
| P0-02 | [cypress/e2e/auth.cy.js](../cypress/e2e/auth.cy.js) — "P0-02 Login with existing user and verify token/profile" | UI + API | Automated | Verifies token via `/users/login` + `/users/me` |
| P0-03 | [cypress/e2e/auth.cy.js](../cypress/e2e/auth.cy.js) — "P0-03 Login with wrong password is rejected and shows UI error" | UI | Planned | Negative login (wrong password) |
| P0-04 | [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js) — "P0-04 Add new contact and verify via API" | UI + API | Automated | Adds required fields; asserts in UI and GET `/contacts` |
| P0-05 | [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js) — "P0-05 Edit contact names and verify via API" | UI + API | Automated | Edits first/last; confirms via API |
| P0-06 | [cypress/e2e/auth.cy.js](../cypress/e2e/auth.cy.js) — "P0-06 Logout clears session and requires re-auth for protected pages" | UI | Planned | Logout clears session |
| P1-01 | [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js) — "P1-01 Add contact with full optional fields and verify via API" | UI + API | Planned | Add contact with all optional fields |
| P1-02 | [cypress/e2e/validation.cy.js](../cypress/e2e/validation.cy.js) — "P1-02 Missing required fields show inline errors" | UI | Planned | Missing required fields validation |
| P1-03 | [cypress/e2e/validation.cy.js](../cypress/e2e/validation.cy.js) — "P1-03 Invalid email/phone formats are rejected with clear messaging" | UI | Planned | Invalid email/phone format validation |
| P1-04 | [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js) — "P1-04 Duplicate contact email handling is confirmed (allowed/rejected)" | UI + API | Planned | Duplicate email handling |
| P1-05 | [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js) — "P1-05 Delete contact and confirm removal via UI and API" | UI + API | Planned | Delete contact and confirm removal |
| P1-06 | [cypress/e2e/auth.cy.js](../cypress/e2e/auth.cy.js) — "P1-06 Session persists across refresh; token remains valid" | UI + API | Planned | Session persists across refresh |
| P1-07 | [cypress/e2e/validation.cy.js](../cypress/e2e/validation.cy.js) — "P1-07 API failure (500/timeout) shows graceful UI message" | UI + API | Planned | API failure handling (500/timeout) |
| P1-08 | [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js) — "Add multiple contacts" | UI + API | Automated | Bulk add sequence; verifies via API |
| P2-01 | [cypress/e2e/contacts.cy.js](../cypress/e2e/contacts.cy.js) — "P2-01 Sorting/filtering remains correct after add/edit/delete" | UI | Planned | Sorting/filtering correctness |
| P2-02 | [cypress/e2e/nonfunctional.cy.js](../cypress/e2e/nonfunctional.cy.js) — "P2-02 Long-list rendering and pagination performance sanity" | UI | Planned | Pagination / long-list performance |
| P2-03 | [cypress/e2e/nonfunctional.cy.js](../cypress/e2e/nonfunctional.cy.js) — "P2-03 Accessibility smoke: focus order, labels, keyboard submit" | UI | Planned | Accessibility smoke |
| P2-04 | [cypress/e2e/nonfunctional.cy.js](../cypress/e2e/nonfunctional.cy.js) — "P2-04 Cross-browser sanity (Chrome/Edge/Firefox) for main CRUD path" | UI | Planned | Cross-browser sanity |
| P2-05 | [cypress/e2e/nonfunctional.cy.js](../cypress/e2e/nonfunctional.cy.js) — "P2-05 Visual sanity: rows show key fields; empty states are clear" | UI | Planned | Visual sanity and empty states |
