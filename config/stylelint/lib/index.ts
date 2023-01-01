export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order',
    'stylelint-config-css-modules',
    'stylelint-config-prettier-scss',
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
};
