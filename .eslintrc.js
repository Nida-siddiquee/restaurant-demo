module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // enables eslint-plugin-prettier + displays Prettier errors as ESLint errors
  ],
  plugins: ['react', '@typescript-eslint', 'jsx-a11y', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off', 
    'react/prop-types': 'off', 
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
