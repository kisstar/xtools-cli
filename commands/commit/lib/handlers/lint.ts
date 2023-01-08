import { runCmd } from '@xtools-cli/shared';
import { commitlintCliPath, commitlintConfigPath } from '../config';
import type CommitCommand from '../';

export async function lintCommitHandler(this: CommitCommand) {
  const args = [commitlintCliPath, '-e', `--config=${commitlintConfigPath}`];

  const code = await runCmd('node', args);

  if (code) {
    process.exit(code);
  }
}
