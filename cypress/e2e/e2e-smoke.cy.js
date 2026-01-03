import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import ContactListPage from '../pages/ContactListPage';
import AddContactPage from '../pages/AddContactPage';
import { generateUser, generateContact } from '../support/utils';
import { step, ensureToken, apiGetContacts } from '../support/test-helpers';

describe('E2E Smoke Suite - Critical Path', () => {
  const signupPage = new SignupPage();
  const loginPage = new LoginPage();
  const contactListPage = new ContactListPage();
  const addContactPage = new AddContactPage();

  afterEach(() => {
    contactListPage.logoutIfVisible();
  });

  it('E2E-01: Complete user journey - signup, login, add contact, edit contact', () => {
    const user = generateUser();

    step('Sign up new user', () => {
      signupPage.visit();
      signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
      contactListPage.expectHeading();
    });

    step('Logout after signup', () => {
      contactListPage.logoutIfVisible();
    });

    step('Login with created user', () => {
      loginPage.visit();
      loginPage.login(user.email, user.password);
      contactListPage.expectHeading();
    });

    step('Verify API token and profile', () => {
      ensureToken(user);
    });

    const contact = generateContact();
    step('Add new contact', () => {
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

    step('Edit contact first and last name', () => {
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

  it('E2E-02: Quick signup and contact add', () => {
    const user = generateUser();
    
    step('Sign up user', () => {
      signupPage.visit();
      signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
      contactListPage.expectHeading();
    });

    const contact = generateContact();
    step('Add contact immediately after signup', () => {
      contactListPage.clickAddNewContact();
      addContactPage.fillContact(contact);
      addContactPage.submit();
      addContactPage.returnToList();
      contactListPage.waitForContact(contact.email);
    });
  });
});
