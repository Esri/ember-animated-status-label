module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    browser: true,
    jquery: true
  },
  rules: {
    // 'plugin:ember-suave/recommended' customization
    'array-bracket-spacing': [ 'error', 'always', {
      'objectsInArrays': false
    }],
    'arrow-parens': [ 'error', 'as-needed' ],
    'camelcase': 'off',
    'ember-suave/no-const-outside-module-scope': 'off',
    'ember-suave/require-access-in-comments': 'off',
    'new-cap': 'off',
    'spaced-comment': 'off',
    'no-multi-spaces': 'error',
    'func-call-spacing': 'error', // suave's no-spaced-func rule has been deprecated
    'eol-last': [ 'error', 'always' ],
    'quotes': [ 'error', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'one-var': 'off'
  }
};
