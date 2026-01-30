import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import ContactListPage from '../pages/ContactListPage';
import { generateUser } from '../support/utils';
import { step } from '../support/test-helpers';

const signupPage = new SignupPage();
const loginPage = new LoginPage();
const contactListPage = new ContactListPage();

describe('Profile Suite', () => {
  afterEach(() => {
    contactListPage.logoutIfVisible();
  });

  describe('P0-05 Profile - Contact List Access', () => {
    it('P0-05 User has access to contact list after signup', () => {
      const user = generateUser();

      step('Sign up new user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });

      step('Verify user can access contact management features', () => {
        cy.get('#add-contact', { timeout: 15000 }).should('be.visible');
        cy.url().should('include', '/contactList');
      });
    });
  });

  describe('P0-06 Profile - Logout', () => {
    it('P0-06 User can logout successfully', () => {
      const user = generateUser();

      step('Sign up new user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });

      step('Logout user and verify redirect', () => {
        cy.contains('button', 'Logout', { timeout: 10000 }).should('be.visible').click();
        cy.url().should('match', /\/(login)?$/);
      });
    });
  });

  describe('P0-07 Profile - Re-login After Logout', () => {
    it('P0-07 User can login again after logout', () => {
      const user = generateUser();

      step('Sign up and then logout', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
        contactListPage.logoutIfVisible();
      });

      step('Login with same credentials and verify access', () => {
        loginPage.visit();
        loginPage.login(user.email, user.password);
        contactListPage.expectHeading();
        cy.get('#add-contact', { timeout: 15000 }).should('be.visible');
      });
    });
  });
});
