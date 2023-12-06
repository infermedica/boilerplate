const path = require('node:path');
const createAliasSetting = require('@vue/eslint-config-airbnb/createAliasSetting'); // eslint-disable-line import/no-extraneous-dependencies

const importResolver = createAliasSetting({
  '@': path.resolve(__dirname, 'src'),
});

Object.keys(importResolver['import/resolver']).forEach((resolverType) => {
  const resolverExtensions = importResolver['import/resolver'][resolverType].extensions;
  if (resolverExtensions) {
    resolverExtensions.unshift('.ts');
    resolverExtensions.unshift('.vue');
  }
});

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
    '@vue/eslint-config-typescript/recommended',
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
  },
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-param-reassign': ['error', { props: false }],
    'max-len': 'off',
    'class-methods-use-this': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          './*',
          './build-helpers/**',
          './scripts/**',
          '**/*.stories.js',
          './.storybook/**',
          './tests/**',
        ],
      },
    ],
    'import/order': ['warn', {
      groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      pathGroupsExcludedImportTypes: ['vue', '@infermedica/component-library'],
      'newlines-between': 'ignore', // Newlines between groups in larger files encouraged, but not enforcing
    }],
    'vue/max-len': ['error', {
      code: 120,
      template: 120,
      tabWidth: 2,
      comments: 120,
      ignorePattern: '',
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreHTMLAttributeValues: true,
      ignoreHTMLTextContents: true,
    }],
    'vue/multi-word-component-names': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/member-delimiter-style': 'warn',
    '@typescript-eslint/type-annotation-spacing': 'warn',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        pattern: {
          ts: 'never',
          js: 'never',
        },
      },
    ],
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
  },
  settings: {
    ...importResolver,
  },
};
