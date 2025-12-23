/**
 * Network stability helpers for intercepting and waiting on API calls.
 */

/* global setTimeout, clearTimeout */

/**
 * Wait for a specific API endpoint to complete before proceeding.
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string} url - URL pattern to intercept
 * @param {string} alias - Alias name for the intercept
 */
export function interceptAndWait(method, url, alias) {
  cy.intercept(method, url).as(alias);
  return () => cy.wait(`@${alias}`, { timeout: 15000 });
}

/**
 * Set up common API intercepts for the Contact List App.
 */
export function setupCommonIntercepts() {
  cy.intercept('POST', '**/users').as('signup');
  cy.intercept('POST', '**/users/login').as('login');
  cy.intercept('GET', '**/users/me').as('getProfile');
  cy.intercept('GET', '**/contacts').as('getContacts');
  cy.intercept('POST', '**/contacts').as('addContact');
  cy.intercept('PUT', '**/contacts/*').as('updateContact');
  cy.intercept('DELETE', '**/contacts/*').as('deleteContact');
}

/**
 * Wait for network to be idle (no pending requests).
 * @param {number} timeout - Timeout in ms (default 5000)
 */
export function waitForNetworkIdle(timeout = 5000) {
  cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      let idleTimer;
      const checkIdle = () => {
        const hasActiveRequests = win.performance
          .getEntriesByType('resource')
          .some((entry) => !entry.responseEnd);
        
        if (!hasActiveRequests) {
          clearTimeout(idleTimer);
          idleTimer = setTimeout(resolve, 500);
        } else {
          setTimeout(checkIdle, 100);
        }
      };
      
      checkIdle();
      setTimeout(resolve, timeout); // Fallback timeout
    });
  });
}

/**
 * Retry a command until it succeeds or timeout.
 * @param {Function} command - Cypress command to retry
 * @param {number} maxAttempts - Maximum retry attempts
 * @param {number} delay - Delay between retries in ms
 */
export function retryCommand(command, maxAttempts = 3, delay = 1000) {
  let attempts = 0;
  
  const attempt = () => {
    attempts++;
    return cy.wrap(null).then(() => {
      try {
        return command();
      } catch (error) {
        if (attempts < maxAttempts) {
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(delay);
          return attempt();
        }
        throw error;
      }
    });
  };
  
  return attempt();
}
