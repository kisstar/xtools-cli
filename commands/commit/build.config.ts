import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['./lib/index', './lib/cz-commitlint'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
});
