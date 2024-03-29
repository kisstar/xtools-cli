import { dirname, join } from 'path';
import { runCmd } from '@xtools-cli/shared';
import { eslintConfig } from '../config';
import type LintCommand from '..';

export async function esLintHandler(this: LintCommand, files: string[]) {
  if (!files.length) {
    return;
  }

  const { fix } = this.options;
  const eslintBin = join(dirname(require.resolve('eslint/package.json')), 'bin/eslint');
  const args = [eslintBin, '--no-eslintrc', '-c', eslintConfig];

  if (fix) {
    args.push('--fix');
  }

  args.push(...files);

  const code = await runCmd('node', args);

  if (code) {
    process.exit(code);
  }
}
