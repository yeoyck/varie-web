module.exports = {
  customSyntax: 'postcss-html',
  // overrides: [
  //   {
  //     files: ['**/*.(scss|css|html|vue)'],
  //     customSyntax: 'postcss-scss'
  //   },
  //   {
  //     files: ['**/*.(html|vue)'],
  //     customSyntax: 'postcss-html'
  //   }
  // ],
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue/scss', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'no-empty-source': null
  }
}
