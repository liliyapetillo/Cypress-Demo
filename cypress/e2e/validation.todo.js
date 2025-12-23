import { describePlanned, itPlanned } from '../support/test-helpers';

// Planned validation tests moved to .todo file to keep reports clean.
// Set env includePlanned=true and rename to .cy.js if you want to include.

describePlanned('Validation & Errors', () => {
  itPlanned('P1-02 Missing required fields show inline errors');
  itPlanned('P1-03 Invalid email/phone formats are rejected with clear messaging');
});

describePlanned('Validation & Errors - API Failures', () => {
  itPlanned('P1-07 API failure (500/timeout) shows graceful UI message');
});