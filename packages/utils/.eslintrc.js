const path = require('path');

module.exports = {
  plugins: ['jsdoc'],
  extends: [
    '@browserstack/eslint-config',
    'plugin:jsdoc/recommended-typescript-flavor'
  ],
  rules: {
    'jsdoc/require-returns': 0
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: {
        paths: [path.resolve(__dirname, 'src')]
      }
    }
  },
  overrides: [
    {
      files: ['src/**/*.js'],
      rules: {
        'jsdoc/require-jsdoc': [
          2,
          {
            require: {
              FunctionDeclaration: true,
              MethodDefinition: true,
              ArrowFunctionExpression: true,
              FunctionExpression: true
            }
          }
        ]
      }
    }
  ],
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
    chrome: true,
    a11yEngine: true
  }
};
