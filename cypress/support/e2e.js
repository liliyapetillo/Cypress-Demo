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
  // Just log to console; Allure will capture via screenshots/videos
  console.error('Uncaught exception:', err.message);
  // Return false to prevent test failure on application errors
  return false;
});

// Failed commands will be captured by Allure automatically via screenshots/videos
Cypress.on('fail', (error) => {
  console.error('Test failure:', error.message);
  throw error;
});
