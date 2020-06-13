module.exports = {
  extends: [
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    "node": true
  },
  rules: {
    "complexity": [2, 6],
  },
  globals: {
    document: true,
    define: true,
  },
};
