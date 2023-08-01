module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:valtio/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
      typescript: {
        project: 'tsconfig.json',
      },
    },
    react: {
      version: '18',
    },
  },
  plugins: ['react', '@typescript-eslint', 'import', '@tanstack/query'],
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
  },
}
