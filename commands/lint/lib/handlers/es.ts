import { runCmd } from '@xtools-cli/shared';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import sgf from 'staged-git-files';
import type LintCommand from '..';
import { cwd, eslintConfig } from '../config';

export async function esLintHandler(this: LintCommand) {
  const { fix } = this.options;
  const list = await sgf();
  const files = list
    .filter(({ filename }) => /\.(ts|js)$/.test(filename))
    // Only keep exist files
    .map(({ filename }) => {
      const filePath = join(cwd, filename);

      return existsSync(filePath) ? filePath : null;
    })
    .filter<string>((filePath): filePath is string => !!filePath);
  const eslintBin = join(dirname(require.resolve('eslint/package.json')), 'bin/eslint');
  const args = [eslintBin, '-c', eslintConfig];

  if (fix) {
    args.push('--fix');
  }

  args.push(...files);

  try {
    await runCmd('node', args);
  } catch (error) {
    // Do nothing
  }
}
