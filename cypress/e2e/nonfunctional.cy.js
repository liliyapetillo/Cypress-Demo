describe('Non-functional Suite', () => {

  it('P2-04 Cross-browser sanity (Chrome) – login page loads and inputs are visible', () => {
    // Minimal smoke to verify app loads across browsers; full CRUD covered in e2e-smoke.
    cy.visit('/login');
    cy.get('#email', { timeout: 10000 }).should('be.visible');
    cy.get('#password').should('be.visible');
    cy.contains('button', /login|submit/i).should('be.visible');

    // Log the browser for context
    cy.log(`Browser: ${Cypress.browser && (Cypress.browser.displayName || Cypress.browser.name)}`);
  });

  it('P2-03 Accessibility smoke: form elements accessible and keyboard submittable', () => {
    // Verify basic accessibility on login page
    cy.visit('/login');

    // Verify form elements are focusable and can receive keyboard input
    // (implicitly also verifies they exist and are visible/interactable)
    cy.getFirst(['input#email', 'input[placeholder="Email"]', 'input[name="email"]'])
      .focus().should('have.focus');
    cy.getFirst(['input#password', 'input[placeholder="Password"]', 'input[name="password"]'])
      .focus().should('have.focus');
    cy.getFirst(['button#submit', 'button[type="submit"]', 'button:contains("Submit")'])
      .focus().should('have.focus');

    // Verify Enter key submits the form (with invalid credentials for sanity check)
    cy.getFirst(['input#email', 'input[placeholder="Email"]', 'input[name="email"]'])
      .clear().type('test@example.com');
    cy.getFirst(['input#password', 'input[placeholder="Password"]', 'input[name="password"]'])
      .clear().type('wrongpass{enter}');

    // Should show error message on failed login
    cy.contains(/error|incorrect|invalid/i, { timeout: 10000 }).should('exist');

    cy.log('✓ P2-03 passed: form elements accessible, focusable, and keyboard-submittable');
  });
});

