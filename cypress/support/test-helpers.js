export function apiLogin(email, password) {
  return cy
    .request('POST', '/users/login', { email, password })
    .then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;
      expect(token).to.exist;
      return cy
        .request({
          method: 'GET',
          url: '/users/me',
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((profileResp) => {
          expect(profileResp.status).to.eq(200);
          return { token, profile: profileResp.body };
        });
    });
}

export function apiGetContacts(token) {
  return cy
    .request({ method: 'GET', url: '/contacts', headers: { Authorization: `Bearer ${token}` } })
    .then((resp) => {
      expect(resp.status).to.eq(200);
      return resp.body;
    });
}

export const step = (title, action) => {
  cy.allure().startStep(title);
  const result = action();
  return cy.then(() => {
    cy.allure().endStep();
    return result;
  });
};

export const ensureToken = (user) =>
  apiLogin(user.email, user.password).then(({ token, profile }) => {
    expect(profile.email).to.eq(user.email);
    return token;
  });


