'use strict'

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: [ 'ember' ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    'array-bracket-spacing': [ 'error', 'always', { objectsInArrays: false }],
    'arrow-parens': [ 'error', 'as-needed' ],
    'ember/no-jquery': 'error',
    'ember/order-in-components': 'error',
    'ember/order-in-controllers': 'error',
    'ember/order-in-models': 'error',
    'ember/order-in-routes': 'error',
    'ember/use-ember-get-and-set': [ 'error', { ignoreThisExpressions: false }],
    'no-unexpected-multiline': 'error',
    'quotes': [ 'error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'semi': [ 'error', 'never' ],
    'indent': [ 'error', 2, { 'SwitchCase': 1 }],

    // inspired by eslint-pugin-ember-suave (DockYard)
    'eol-last': [ 'error', 'always' ],
    'generator-star-spacing': [ 'error', { before: false, after: true }],
    'no-useless-rename': 'error',
    'no-var': 'error',
    'object-shorthand': [ 'error', 'always' ],
    'prefer-destructuring': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
  },
  overrides: [
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './index.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './tests/dummy/config/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: [ 'node' ],
      extends: [ 'plugin:node/recommended' ],
    },
    {
      // Test files:
      files: [ 'tests/**/*-test.{js,ts}' ],
      extends: [ 'plugin:qunit/recommended' ],
    },
  ],
}
