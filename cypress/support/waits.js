/**
 * Explicit wait utilities for stable element interactions.
 */

/**
 * Wait for an element to be visible and enabled before interacting.
 * @param {string|string[]} selectors - Selector(s) to wait for
 * @param {object} options - Wait options
 */
export function waitForReady(selectors, options = {}) {
  const { timeout = 10000 } = options;
  const selectorArray = Array.isArray(selectors) ? selectors : [selectors];
  
  cy.getFirst(selectorArray, { timeout })
    .should('be.visible')
    .and('not.be.disabled');
}

/**
 * Wait for an element to exist in the DOM.
 * @param {string} selector - Selector to wait for
 * @param {number} timeout - Timeout in ms
 */
export function waitForExist(selector, timeout = 10000) {
  cy.get(selector, { timeout }).should('exist');
}

/**
 * Wait for text to appear in an element.
 * @param {string} selector - Element selector
 * @param {string} text - Text to wait for
 * @param {number} timeout - Timeout in ms
 */
export function waitForText(selector, text, timeout = 10000) {
  cy.get(selector, { timeout }).should('contain.text', text);
}

/**
 * Wait for an element to disappear.
 * @param {string} selector - Element selector
 * @param {number} timeout - Timeout in ms
 */
export function waitForNotExist(selector, timeout = 10000) {
  cy.get(selector, { timeout }).should('not.exist');
}

/**
 * Wait for page to be fully loaded.
 */
export function waitForPageLoad() {
  cy.window().should('have.property', 'document');
  cy.document().should('have.property', 'readyState', 'complete');
}

/**
 * Wait with exponential backoff.
 * @param {number} attempt - Current attempt number
 * @param {number} baseDelay - Base delay in ms
 */
export function exponentialBackoff(attempt, baseDelay = 100) {
  const delay = Math.min(baseDelay * Math.pow(2, attempt), 5000);
  cy.wait(delay);
}
