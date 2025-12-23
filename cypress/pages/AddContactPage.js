class AddContactPage {
  fillContact(contact) {
    cy.get('#firstName').clear().type(contact.firstName);
    cy.get('#lastName').clear().type(contact.lastName);
    cy.get('#birthdate').clear().type(contact.dob);
    cy.get('#email').clear().type(contact.email);
    cy.get('#phone').clear().type(contact.phone);
    cy.get('#street1').clear().type(contact.address);
    cy.get('#city').clear().type(contact.city);
    cy.get('#stateProvince').clear().type(contact.state);
    cy.get('#postalCode').clear().type(contact.postalCode);
    cy.get('#country').clear().type(contact.country);
  }

  submit() {
    cy.getFirst(['button#submit', 'button[type="submit"]', 'button:contains("Submit")']).click();
  }

  returnToList() {
    cy.get('body').then(($body) => {
      const btn = $body
        .find('button')
        .filter((_, el) => Cypress.$(el).text().includes('Return to Contact List'));

      if (btn.length) {
        cy.wrap(btn.first()).click();
      } else {
        cy.log('⚠️ Return button not found, navigating directly to /contactList');
        cy.visit('/contactList');
      }
    });
  }
}

export default AddContactPage;
