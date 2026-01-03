export function uniqueEmail(prefix = 'test', domain = 'example.com') {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}@${domain}`;
}

export function generateContact(details = {}) {
  const stamp = Date.now().toString().slice(-5);
  return {
    firstName: `Test${stamp}`,
    lastName: `User${stamp}`,
    dob: '1990-01-01',
    email: uniqueEmail('contact'),
    phone: '5555551234',
    country: 'USA',
    postalCode: '12345',
    city: 'TestCity',
    state: 'CA',
    address: '123 Test St',
    ...details,
  };
}

export function generateUser() {
  const stamp = Date.now().toString().slice(-6);
  return {
    firstName: `Test${stamp}`,
    lastName: `McTest${stamp}`,
    email: uniqueEmail('user'),
    password: 'password',
  };
}
