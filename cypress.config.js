const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://thinking-tester-contact-list.herokuapp.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    
    // Retry configuration for stability
    retries: {
      runMode: 2,
      openMode: 0,
    },
    
    // Timeout configurations
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    
    // Test isolation and stability
    testIsolation: true,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 5,
    
    // Network stability
    experimentalNetworkStubbing: true,
    
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
  env: {
    allure: true,
  },
});
