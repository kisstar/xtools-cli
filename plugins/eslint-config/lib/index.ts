import { getPackageVersion } from '@xtools-cli/shared';
import { getTsInfo } from './utils';
import { cwd } from './config';
import { type Linter } from 'eslint';

const { isTsProject, tsFile } = getTsInfo({ cwd });
const reactVersion = getPackageVersion('react', '', { cwd });
const isReactProject = !!reactVersion;
const vueVersion = getPackageVersion('vue', '', { cwd });
const isVueProject = !!vueVersion;

if (isVueProject) {
  require('@rushstack/eslint-patch/modern-module-resolution');
}

const config: Linter.Config = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    !isVueProject && isReactProject ? 'airbnb' : 'airbnb-base',
    !isVueProject &&
      isTsProject &&
      (isReactProject ? 'airbnb-typescript' : 'airbnb-typescript/base'),
    isVueProject && 'plugin:vue/vue3-essential',
    isVueProject && isTsProject
      ? '@vue/eslint-config-airbnb-with-typescript'
      : '@vue/eslint-config-airbnb',
    isTsProject && 'plugin:@typescript-eslint/recommended',
    isTsProject && 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:prettier/recommended',
  ].filter((pluginName): pluginName is string => !!pluginName),
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: [tsFile].filter(Boolean),
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'import/prefer-default-export': 0,
  },
  overrides: [
    {
      files: [
        '**/config/**/*.js',
        '**/mock/**/*.js',
        '*.config.js',
        'webpack-*.js',
        'webpack.*.js',
        '.*rc.cjs',
        '.*rc.js',
      ],
      rules: {
        'import/unambiguous': 'off',
        'import/no-commonjs': 'off',
      },
    },
  ],
};

if (isVueProject) {
  config.parser = 'vue-eslint-parser';

  if (isTsProject) {
    config.parserOptions!.parser = '@typescript-eslint/parser';
  }
}

export default config;
