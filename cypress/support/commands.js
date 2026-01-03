/**
 * Tries multiple selectors until one is found, enhancing test resilience.
 * @param {string[]} selectors - Array of selectors to try in order
 * @param {object} options - Cypress get() options
 * @returns {Cypress.Chainable} The first matching element
 */
Cypress.Commands.add('getFirst', (selectors, options = {}) => {
  const attempts = Array.isArray(selectors) ? selectors : [selectors];
  
  return cy.wrap(null).then(() => {
    for (let i = 0; i < attempts.length; i++) {
      const selector = attempts[i];
      const element = Cypress.$(selector);
      
      if (element.length > 0) {
        if (i > 0) {
          cy.log(`⚠️ Fallback used: ${selector} (primary selector failed)`);
          cy.allure().attachment('Selector Fallback', `Primary selector failed. Used: ${selector}`, 'text/plain');
        }
        return cy.get(selector, options);
      }
    }
    
    const errorMsg = `None of the selectors matched: ${attempts.join(', ')}`;
    cy.allure().attachment('Selector Error', errorMsg, 'text/plain');
    throw new Error(errorMsg);
  });
});


