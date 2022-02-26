module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-recommended-vue/scss',
  ],
  rules: {
    indentation: [
      2,
      {
        baseIndentLevel: 1,
      },
    ],
    'declaration-block-semicolon-newline-after': 'always',
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      rules: {
        'unit-allowed-list': ['em', 'rem', 's'],
      },
    },
  ],
}
