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

export function apiAddContact(token, contact) {
  return cy
    .request({
      method: 'POST',
      url: '/contacts',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        birthdate: contact.dob,
        email: contact.email,
        phone: contact.phone,
        street1: contact.address,
        city: contact.city,
        stateProvince: contact.state,
        postalCode: contact.postalCode,
        country: contact.country,
      },
    })
    .then((resp) => {
      expect(resp.status).to.eq(201);
      return resp.body;
    });
}

export function apiUpdateContact(token, id, updates) {
  return cy
    .request({
      method: 'PUT',
      url: `/contacts/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      body: updates,
    })
    .then((resp) => {
      expect(resp.status).to.eq(200);
      return resp.body;
    });
}
