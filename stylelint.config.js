module.exports = {
  configBasedir: '.',
  plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-prettier',
  ],
  rules: {
    indentation: [
      2,
      {
        baseIndentLevel: 0,
      },
    ],
    'declaration-block-semicolon-newline-after': 'always',
    'color-no-invalid-hex': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
}
