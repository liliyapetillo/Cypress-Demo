import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import ContactListPage from '../pages/ContactListPage';
import { generateUser } from '../support/utils';
import { step, ensureToken } from '../support/test-helpers';

const signupPage = new SignupPage();
const loginPage = new LoginPage();
const contactListPage = new ContactListPage();

describe('Auth Suite', () => {
  afterEach(() => {
    contactListPage.logoutIfVisible();
  });

  describe('P0-01 Auth - Sign Up', () => {
    it('P0-01 Sign Up - creates new user and lands on list', () => {
      const user = generateUser();

      step('Sign up user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });
    });
  });

  describe('P0-02 Auth - Login', () => {
    it('P0-02 Login with existing user and verify token/profile', () => {
      const user = generateUser();

      step('Sign up user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });

      step('Logout after signup', () => {
        contactListPage.logoutIfVisible();
      });

      step('Login UI', () => {
        loginPage.visit();
        loginPage.login(user.email, user.password);
        contactListPage.expectHeading();
      });

      step('Verify API token and profile', () => ensureToken(user));
    });
  });

  describe('P0-03 Auth - Wrong Password', () => {
    it('P0-03 Login rejects wrong password with error message', () => {
      const user = generateUser();

      step('Sign up user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });

      step('Logout to reset session', () => {
        contactListPage.logoutIfVisible();
      });

      step('Try login with wrong password', () => {
        loginPage.visit();
        loginPage.login(user.email, 'WrongPassword123!');
        cy.contains('Incorrect username or password', { timeout: 10000 }).should('be.visible');
        cy.url().should('match', /\/(login)?$/); // Accepts both /login and / (root)
      });
    });
  });

  describe('P0-06 Auth - Logout', () => {
    it('P0-06 Logout clears session and returns to login', () => {
      const user = generateUser();

      step('Sign up user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });

      step('Logout after signup', () => {
        contactListPage.logoutIfVisible();
      });

      step('Login to establish session', () => {
        loginPage.visit();
        loginPage.login(user.email, user.password);
        contactListPage.expectHeading();
      });

      step('Logout clears session', () => {
        cy.contains('button', 'Logout', { timeout: 10000 }).should('be.visible').click();
        cy.url().should('match', /\/(login)?$/); // Accepts both /login and / (root)
      });

      step('Verify session is cleared by checking localStorage/cookies', () => {
        // Verify token is cleared from localStorage or cookies
        cy.window().then((win) => {
          const token = win.localStorage.getItem('token');
          expect(token).to.be.null;
        });
      });
    });
  });

  // Note: The app currently clears session on reload; keeping P1-06 as Planned.

  // Planned cases moved to docs/testing-matrix.md to avoid grey entries in Allure.
});
