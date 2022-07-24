module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', "next"],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  env: {
    node: true,
  },
  rules: {
    'no-console': 'error',
    'no-trailing-spaces': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }
    ]
  }
};
