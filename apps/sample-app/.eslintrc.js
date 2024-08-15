const path = require('path');

module.exports = {
  extends: ['@browserstack/eslint-config'],
  rules: {},
  settings: {
    'import/resolver': {
      typescript: true,
      node: {
        paths: [path.resolve(__dirname, 'src')]
      }
    }
  },
  globals: {
    chrome: true,
    a11yEngine: true
  }
};
