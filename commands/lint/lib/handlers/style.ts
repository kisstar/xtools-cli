import { dirname, join } from 'path';
import { runCmd } from '@xtools-cli/shared';
import { styleConfig } from '../config';
import type LintCommand from '..';

export async function styleLintHandler(this: LintCommand, files: string[]) {
  if (!files.length) {
    return;
  }

  const { fix } = this.options;
  const stylelintBin = join(dirname(require.resolve('stylelint/package.json')), 'bin/stylelint');
  const args = [stylelintBin, '--config', styleConfig];

  if (fix) {
    args.push('--fix');
  }

  args.push(...files);

  const code = await runCmd('node', args);

  if (code) {
    process.exit(code);
  }
}
