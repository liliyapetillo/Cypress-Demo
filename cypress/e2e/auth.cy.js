import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import ContactListPage from '../pages/ContactListPage';
import { generateUser } from '../support/utils';
import { step, testState, ensureUser, ensureToken } from '../support/test-helpers';

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
      testState.user = user;
      Cypress.env('user', user);

      step('Sign up user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });
    });
  });

  describe('P0-02 Auth - Login', () => {
    it('P0-02 Login with existing user and verify token/profile', () => {
      ensureUser(signupPage, contactListPage).then((user) => {
        step('Login UI', () => {
          loginPage.visit();
          loginPage.login(user.email, user.password);
          contactListPage.expectHeading();
        });

        step('Verify API token and profile', () => ensureToken(user));
      });
    });
  });

  // Planned cases moved to docs/testing-matrix.md to avoid grey entries in Allure.
});
