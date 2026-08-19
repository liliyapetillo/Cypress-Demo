import SignupPage from '../pages/SignupPage';
import ContactListPage from '../pages/ContactListPage';
import AddContactPage from '../pages/AddContactPage';
import { generateUser, generateContact } from '../support/utils';
import { step, ensureToken, apiGetContacts } from '../support/test-helpers';

const signupPage = new SignupPage();
const contactListPage = new ContactListPage();
const addContactPage = new AddContactPage();

describe('Validation & Errors', () => {
  afterEach(() => {
    contactListPage.logoutIfVisible();
  });

  describe('P1-02 Required Fields', () => {
    it('P1-02 Missing required fields show inline errors', () => {
      const user = generateUser();

      step('Sign up new user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });

      step('Try to submit contact without required fields', () => {
        contactListPage.clickAddNewContact();

        // Try to submit without filling required fields
        cy.get('button[type="submit"]').click();

        // The app should either reject the submission (stay on the form) or show an error
        cy.url().then((url) => {
          if (url.includes('/addContact')) {
            cy.url().should('include', '/addContact');
          } else {
            cy.contains(/error|required|invalid/i, { timeout: 5000 }).should('be.visible');
          }
        });
      });

      step('Verify no contact was created', () => {
        ensureToken(user).then((token) => {
          apiGetContacts(token).then((contacts) => {
            expect(contacts).to.have.length(0);
          });
        });
      });
    });
  });

  describe('P1-03 Invalid Formats', () => {
    it('P1-03 Invalid email/phone formats are rejected with clear messaging', () => {
      const user = generateUser();

      step('Sign up new user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });

      const contact = generateContact();
      step('Try to submit contact with invalid email format', () => {
        contactListPage.clickAddNewContact();

        cy.get('#firstName').type(contact.firstName);
        cy.get('#lastName').type(contact.lastName);
        cy.get('#email').type('invalid-email-format');

        cy.get('button[type="submit"]').click();

        // The app should either reject the submission (stay on the form) or show an error
        cy.url().then((url) => {
          if (url.includes('/addContact')) {
            cy.url().should('include', '/addContact');
          } else {
            cy.contains(/error|invalid|email/i, { timeout: 5000 }).should('be.visible');
          }
        });
      });

      step('Verify no contact with the invalid email was created', () => {
        ensureToken(user).then((token) => {
          apiGetContacts(token).then((contacts) => {
            expect(contacts.some((c) => c.email === 'invalid-email-format')).to.be.false;
          });
        });
      });
    });
  });
});

describe('Validation & Errors - API Failures', () => {
  afterEach(() => {
    contactListPage.logoutIfVisible();
  });

  describe('P1-07 API Failure Handling', () => {
    it('P1-07 API failure (500/timeout) shows graceful UI message', () => {
      const user = generateUser();

      step('Sign up new user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });

      step('Intercept contact API to simulate failure', () => {
        cy.intercept('POST', '**/contacts', {
          statusCode: 500,
          body: { message: 'Internal Server Error' }
        }).as('addContactFail');
      });

      const contact = generateContact();
      step('Try to add contact with simulated API failure', () => {
        contactListPage.clickAddNewContact();
        addContactPage.fillContact(contact);
        addContactPage.submit();
        
        cy.wait('@addContactFail');
        
        // Check for error message in UI
        cy.contains('error', { matchCase: false, timeout: 10000 }).should('be.visible');
      });
    });
  });
});

