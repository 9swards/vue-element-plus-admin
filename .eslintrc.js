module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/html-indent': ['error', 2],
    'vue/html-quotes': ['error', 'double'],
    indent: ['error', 2],
    'vue/script-indent': ['error', 2],
    quotes: ['error', 'single'],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never'],
    'space-infix-ops': ['error', { int32Hint: false }],
    'no-var': 'error',
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-whitespace-before-property': 'error',
    'quote-props': ['error', 'as-needed'],
    'object-curly-spacing': ['error', 'always'],
    'no-unneeded-ternary': 'error',
    'no-restricted-syntax': ['error', 'WithStatement', 'BinaryExpression[operator="in"]'],
    'no-lonely-if': 'error',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-submodule-imports': ['off', '#', '@'],
    'no-implicit-dependencies': ['off', ['#', '@']],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'error',
  },
  overrides: [
    {
      files: ['src/views/**/index.vue'],
      rules: {
        'vue/multi-word-component-names': 0,
      },
    },
  ],
}
