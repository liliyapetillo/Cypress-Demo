class SignupPage {
  visit() {
    cy.visit('/addUser');
  }

  signUp(firstName, lastName, email, password) {
    cy.getFirst(['input#firstName', 'input[placeholder="First Name"]', 'input[name="firstName"]']).clear().type(firstName);
    cy.getFirst(['input#lastName', 'input[placeholder="Last Name"]', 'input[name="lastName"]']).clear().type(lastName);
    cy.getFirst(['input#email', 'input[placeholder="Email"]', 'input[name="email"]']).clear().type(email);
    cy.getFirst(['input#password', 'input[placeholder="Password"]', 'input[name="password"]']).clear().type(password);
    cy.getFirst(['button#submit', 'button[type="submit"]', 'button:contains("Submit")']).click();
  }
}

export default SignupPage;
