import './commands';
import '@shelex/cypress-allure-plugin';

// Runs before each spec file; add global hooks if needed.
beforeEach(() => {
  // Ensure consistent viewport
  cy.viewport(1280, 720);
  
  // Clear cookies and local storage for test isolation
  cy.clearCookies();
  cy.clearLocalStorage();
  
  cy.log('Starting test');
});
