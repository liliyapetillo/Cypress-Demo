import js from '@eslint/js';
import cypress from 'eslint-plugin-cypress';

const cypressGlobals = {
  cy: 'readonly',
  Cypress: 'readonly',
  describe: 'readonly',
  it: 'readonly',
  before: 'readonly',
  beforeEach: 'readonly',
  after: 'readonly',
  afterEach: 'readonly',
  expect: 'readonly',
};

export default [
  {
    ignores: ['allure-report', 'allure-results', 'node_modules', 'coverage'],
  },
  js.configs.recommended,
  {
    files: ['cypress.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {},
  },
  {
    files: ['cypress/**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: cypressGlobals,
    },
    plugins: {
      cypress,
    },
    rules: {
      ...cypress.configs.recommended.rules,
      'cypress/unsafe-to-chain-command': 'off',
    },
  },
];
