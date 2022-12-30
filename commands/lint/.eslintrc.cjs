const { join } = require('path');
const { existsSync } = require('fs');
const logger = require('@xtools-cli/logger');

/**
 * Detect the version of the specified package
 * @param {string} packageName name of the package
 * @param {string} defaultValue the fallback version if cannot find the version
 * @param {ExtraOptions} options other additional configuration items
 * @returns {string | null} version of the specified package
 */
function getPackageVersion(packageName, defaultValue, { cwd = process.cwd() }) {
  let version = null;

  try {
    const packageJsonPath = require.resolve(`${packageName}/package.json`, {
      paths: [join(cwd, 'node_modules')],
    });

    version = require(packageJsonPath).version;
  } catch (error) {
  } finally {
    if (version) {
      return version;
    }

    try {
      const { dependencies = {}, peerDependencies = {}, devDependencies = {} } = require(join(
        cwd,
        'package.json'
      ));

      version =
        dependencies[packageName] || peerDependencies[packageName] || devDependencies[packageName];
    } catch (error) {}
  }

  if (!version && defaultValue) {
    logger.warn(
      'lint',
      `No valid ${packageName} version is detected. Assuming ${packageName} ${defaultValue} is used.`
    );

    return defaultValue;
  }

  return version;
}

/**
 * Determine whether it is a TS project and the corresponding configuration file
 */
function getTsInfo({ cwd = process.cwd() }) {
  const tsLintConfigFile = join(cwd, './tsconfig.eslint.json');
  const tsConfigFile = join(cwd, './tsconfig.json');
  let isTsProject = false; // whether it is a typescript project
  let tsFile = '';

  if (existsSync(tsLintConfigFile)) {
    isTsProject = true;
    tsFile = tsLintConfigFile;
  } else if (existsSync(tsConfigFile)) {
    isTsProject = true;
    tsFile = tsConfigFile;
  }

  return {
    isTsProject,
    tsFile,
  };
}

const cwd = process.cwd();
const { isTsProject, tsFile } = getTsInfo({ cwd });
const reactVersion = getPackageVersion('react', '', { cwd });
const isReactProject = !!reactVersion;
const vueVersion = getPackageVersion('vue', '', { cwd });
const isVueProject = !!vueVersion;

if (isVueProject) {
  require('@rushstack/eslint-patch/modern-module-resolution');
}

const config = {
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
  ].filter(Boolean),
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
    config.parserOptions.parser = '@typescript-eslint/parser';
  }
}

module.exports = config;
