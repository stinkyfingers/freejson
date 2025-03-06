// .eslintrc.js
module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  rules: {
    // Add custom rules here
    'react/prop-types': 'off', // Example: Disable prop-types validation
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
  env: {
    browser: true, // Enable browser environment
    node: true, // Enable Node.js environment
    es6: true, // Enable ES6 features
  },
  parserOptions: {
    sourceType: "module"
  }
};