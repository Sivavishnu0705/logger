module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: ['error', 'never',],
    'linebreak-style': 0,
    'space-infix-ops': ['error', { int32Hint: false, },],
    quotes: ['error', 'single',],
    'comma-dangle': ['error', {
      arrays: 'always',
      objects: 'always',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    },],
  },
}
