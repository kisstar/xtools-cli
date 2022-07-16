import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import pkg from './package.json';

const isProduction = true;
const format = isProduction ? 'all' : 'esm'; // esm, cjs, all
const mustESMModules = ['chalk', 'leven']; // ESM packages
const sharedOptions = {
  output: {
    dir: path.resolve(__dirname, 'dist'),
    entryFileNames: `[name].[format].js`,
    chunkFileNames: '[format]/dep-[hash].js',
    exports: 'named',
    format: 'cjs',
    externalLiveBindings: false, // not support live bindings
    freeze: false,
    sourcemap: false,
  },
  treeshake: {
    moduleSideEffects: 'no-external', // only remove external imports if possible
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      exportConditions: ['node'],
    }),
    commonjs(),
    json(),
  ],
};

function getExternals(format) {
  const allExternals = [
    ...Object.keys(pkg.dependencies),
    ...(isProduction ? [] : Object.keys(pkg.devDependencies)),
  ];

  if (format === 'esm') {
    return allExternals;
  }

  const cjsExternals = allExternals.filter((m) => !mustESMModules.includes(m));

  return cjsExternals;
}

export default [
  format !== 'esm' && {
    input: {
      cli: 'lib/index.js',
    },
    output: {
      ...sharedOptions.output,
    },
    treeshake: {
      ...sharedOptions.treeshake,
    },
    external: getExternals(),
    manualChunks(id) {
      for (let i = 0; i < mustESMModules.length; i++) {
        const m = mustESMModules[i];

        if (id.indexOf(`node_modules/${m}/`) >= 0) {
          return m;
        }
      }
    },
    plugins: [...sharedOptions.plugins],
  },
  format !== 'cjs' && {
    input: {
      cli: 'lib/index.js',
    },
    output: {
      ...sharedOptions.output,
      format: 'esm',
    },
    treeshake: {
      ...sharedOptions.treeshake,
    },
    external: getExternals('esm'),
    plugins: [...sharedOptions.plugins],
  },
].filter(Boolean);
