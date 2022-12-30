import { join } from 'path';
import { existsSync } from 'fs';

/**
 * Determine whether it is a TS project and the corresponding configuration file
 */
export function getTsInfo({ cwd = process.cwd() }: Options): TsInfo {
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

interface Options {
  cwd?: string;
}

interface TsInfo {
  isTsProject: boolean;
  tsFile: string;
}
