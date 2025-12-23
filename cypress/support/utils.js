export function uniqueEmail(prefix = 'test', domain = 'example.com') {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}@${domain}`;
}

export function generateContact(overrides = {}) {
  const stamp = Date.now().toString().slice(-5);
  return {
    firstName: overrides.firstName || `Test${stamp}`,
    lastName: overrides.lastName || `User${stamp}`,
    dob: overrides.dob || '1990-01-01',
    email: overrides.email || uniqueEmail('contact'),
    phone: overrides.phone || '5555551234',
    country: overrides.country || 'USA',
    postalCode: overrides.postalCode || '12345',
    city: overrides.city || 'TestCity',
    state: overrides.state || 'CA',
    address: overrides.address || '123 Test St',
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
