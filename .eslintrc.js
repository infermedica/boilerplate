const path = require('path');

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
    '@vue/eslint-config-typescript/recommended',
  ],
  plugins: [ 'import-newlines' ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': [ 'error' ],
    'vue/max-len': [
      'error',
      {
        code: 120,
        template: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreHTMLAttributeValues: true,
        ignoreHTMLTextContents: true,
      },
    ],
    'array-bracket-newline': [
      'error',
      { minItems: 2 },
    ],
    'array-bracket-spacing': [
      'error',
      'always',
    ],
    'vue/array-bracket-spacing': [
      'error',
      'always',
    ],
    'import/no-unresolved': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },

  settings: {
    'import/resolver': {
      alias: {
        map: [ [
          '@',
          path.resolve(__dirname, 'src'),
        ] ],
        extensions: [
          '.ts',
          '.js',
        ],
      },
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.vue',
        ],
      },
    },
  },
};
