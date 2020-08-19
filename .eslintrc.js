module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'linebreak-style': 'off',
    'no-undef': 'off',
    'import/first': 'off',
    'no-unused-vars': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'prefer-spread': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
