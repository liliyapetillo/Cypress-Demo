import { generateUser } from './utils';
import { apiLogin } from './api';

export const step = (title, action) => {
  cy.allure().startStep(title);
  const result = action();
  return cy.then(() => {
    cy.allure().endStep();
    return result;
  });
};

export const testState = { user: null };

export const ensureUser = (signupPage, contactListPage) => {
  return cy
    .then(() => {
      const existing = Cypress.env('user');
      if (existing) {
        testState.user = existing;
        return existing;
      }
      return null;
    })
    .then((existing) => {
      if (existing) return existing;
      const user = generateUser();
      testState.user = user;
      Cypress.env('user', user);
      step('Sign up user', () => {
        signupPage.visit();
        signupPage.signUp(user.firstName, user.lastName, user.email, user.password);
        contactListPage.expectHeading();
      });
      return user;
    });
};

export const ensureToken = (user) =>
  apiLogin(user.email, user.password).then(({ token, profile }) => {
    expect(profile.email).to.eq(user.email);
    return token;
  });

// Planned tests control: define tests only when explicitly enabled
const plannedEnabled = () => {
  const val = Cypress.env('includePlanned');
  return val === true || val === 'true';
};

export const describePlanned = (title, fn) => {
  if (plannedEnabled()) {
    describe(title, fn);
  }
};

export const itPlanned = (title, fn) => {
  if (plannedEnabled()) {
    if (fn) {
      it(title, fn);
    } else {
      it(title);
    }
  }
};
