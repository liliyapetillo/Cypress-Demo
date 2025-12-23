import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import ContactListPage from '../pages/ContactListPage';
import AddContactPage from '../pages/AddContactPage';
import { generateContact, generateUser } from '../support/utils';
import { apiGetContacts } from '../support/api';
import { step, testState, ensureToken } from '../support/test-helpers';

const signupPage = new SignupPage();
const loginPage = new LoginPage();
const contactListPage = new ContactListPage();
const addContactPage = new AddContactPage();

describe('Contacts Suite', () => {
  afterEach(() => {
    contactListPage.logoutIfVisible();
  });

  describe('P0-04 Contacts - Add (required fields)', () => {
    it('P0-04 Add new contact and verify via API', () => {
      const user = generateUser();
      testState.user = user;
      Cypress.env('user', user);

      step('Sign up new user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });

      const contact = generateContact();
      step('Add contact via UI', () => {
        contactListPage.clickAddNewContact();
        addContactPage.fillContact(contact);
        addContactPage.submit();
        addContactPage.returnToList();
        contactListPage.waitForContact(contact.email);
      });

      step('Verify contact via API', () => {
        ensureToken(user).then((token) => {
          apiGetContacts(token).then((contacts) => {
            expect(contacts.some((c) => c.email === contact.email)).to.be.true;
          });
        });
      });
    });
  });

  describe('P0-05 Contacts - Edit (first/last name)', () => {
    it('P0-05 Edit contact names and verify via API', () => {
      const user = generateUser();
      testState.user = user;
      Cypress.env('user', user);

      step('Sign up new user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });

      const contact = generateContact();
      step('Create contact via UI', () => {
        contactListPage.clickAddNewContact();
        addContactPage.fillContact(contact);
        addContactPage.submit();
        addContactPage.returnToList();
        contactListPage.waitForContact(contact.email);
      });

      step('Open and edit contact', () => {
        contactListPage.openContact(contact.email);
        cy.contains('button', 'Edit Contact').click();

        const editedFirst = `${contact.firstName}Edited`;
        const editedLast = `${contact.lastName}Edited`;

        cy.get('#firstName').clear().type(editedFirst);
        cy.get('#lastName').clear().type(editedLast);
        cy.contains('button', 'Submit').click();
        addContactPage.returnToList();

        cy.contains('#myTable', `${editedFirst} ${editedLast}`).should('be.visible');

        ensureToken(user).then((token) => {
          apiGetContacts(token).then((contacts) => {
            const match = contacts.find((c) => c.email === contact.email);
            expect(match).to.exist;
            expect(match.firstName).to.eq(editedFirst);
            expect(match.lastName).to.eq(editedLast);
          });
        });
      });
    });
  });

  describe('P1-08 Contacts - Bulk add sequence', () => {
    it('P1-08 Add multiple contacts and verify via API', () => {
      const user = generateUser();
      testState.user = user;
      Cypress.env('user', user);

      step('Sign up new user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });

      const first = generateContact();
      step('Add first contact via UI', () => {
        contactListPage.clickAddNewContact();
        addContactPage.fillContact(first);
        addContactPage.submit();
        addContactPage.returnToList();
        contactListPage.waitForContact(first.email);
      });

      const second = generateContact();
      step('Add second contact via UI', () => {
        contactListPage.clickAddNewContact();
        addContactPage.fillContact(second);
        addContactPage.submit();
        addContactPage.returnToList();
        contactListPage.waitForContact(second.email);
      });

      step('Verify contacts via API', () => {
        ensureToken(user).then((token) => {
          apiGetContacts(token).then((contacts) => {
            expect(contacts.some((c) => c.email === first.email)).to.be.true;
            expect(contacts.some((c) => c.email === second.email)).to.be.true;
          });
        });
      });
    });
  });

  // Planned cases moved to docs/testing-matrix.md to avoid grey entries in Allure.
});
