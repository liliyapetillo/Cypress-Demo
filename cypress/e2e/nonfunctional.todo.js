import { describePlanned, itPlanned } from '../support/test-helpers';

// Planned non-functional tests moved to .todo file to keep reports clean.
// Set env includePlanned=true and rename to .cy.js if you want to include.

describePlanned('Non-functional Suite', () => {
  itPlanned('P2-02 Long-list rendering and pagination performance sanity');
  itPlanned('P2-03 Accessibility smoke: focus order, labels, keyboard submit');
  itPlanned('P2-04 Cross-browser sanity (Chrome/Edge/Firefox) for main CRUD path');
  itPlanned('P2-05 Visual sanity: rows show key fields; empty states are clear');
});