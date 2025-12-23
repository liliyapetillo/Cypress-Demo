import './commands';
import '@shelex/cypress-allure-plugin';
import { setupCommonIntercepts } from './network';

// Runs before each spec file; add global hooks if needed.
beforeEach(() => {
  // Ensure consistent viewport
  cy.viewport(1280, 720);
  
  // Set up network intercepts for better observability
  setupCommonIntercepts();
  
  // Clear cookies and local storage for test isolation
  cy.clearCookies();
  cy.clearLocalStorage();
  
  cy.log('Starting test');
});

// Capture uncaught exceptions and log them
Cypress.on('uncaught:exception', (err) => {
  cy.allure().attachment('Uncaught Exception', err.message + '\n\n' + err.stack, 'text/plain');
  // Return false to prevent test failure on application errors
  // Remove this if you want tests to fail on any JS error
  return false;
});

// Add custom logging for failed commands
Cypress.on('fail', (error) => {
  cy.allure().attachment('Test Failure', error.message + '\n\n' + error.stack, 'text/plain');
  throw error;
});
