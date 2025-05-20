export default {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier', // Make ESLint work with Prettier
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Not needed in newer React versions
    'react/prop-types': 'off', // Disable prop-types validation
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};