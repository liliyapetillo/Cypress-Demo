class ContactListPage {
  expectHeading(text = 'Contact List') {
    cy.get('h1, h2, h3').contains(text);
  }

  clickAddNewContact() {
    cy.get('#add-contact', { timeout: 15000 }).should('be.visible').click();
  }

  waitForContact(email) {
    cy.get('#myTable', { timeout: 10000 })
      .contains('tr', email)
      .should('be.visible');
  }

  openContact(email) {
    cy.get('#myTable').contains('tr', email).click();
  }

  logoutIfVisible() {
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Logout")').length > 0) {
        cy.contains('button', 'Logout').click();
      }
    });
  }
}

export default ContactListPage;
