module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'],
  },
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 0,
  },
};
