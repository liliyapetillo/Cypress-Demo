class LoginPage {
  visit() {
    cy.visit('/');
  }

  login(email, password) {
    cy.getFirst(['input#email', 'input[placeholder="Email"]', 'input[name="email"]']).clear().type(email);
    cy.getFirst(['input#password', 'input[placeholder="Password"]', 'input[name="password"]']).clear().type(password);
    cy.getFirst(['button#submit', 'button[type="submit"]', 'button:contains("Submit")']).click();
  }
}

export default LoginPage;
