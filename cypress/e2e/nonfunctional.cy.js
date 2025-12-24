describe('Non-functional Suite', () => {

  it('P2-04 Cross-browser sanity (Chrome/Firefox) – login page loads and inputs are visible', () => {
    // Minimal smoke to verify app loads across browsers; full CRUD covered in e2e-smoke.
    cy.visit('/login');
    cy.get('#email', { timeout: 10000 }).should('be.visible');
    cy.get('#password').should('be.visible');
    cy.contains('button', /login|submit/i).should('be.visible');

    // Log the browser for context
    cy.log(`Browser: ${Cypress.browser && (Cypress.browser.displayName || Cypress.browser.name)}`);
  });
});
