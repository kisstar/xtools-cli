import { bootstrap } from 'commitizen/dist/cli/git-cz';
import logger from '@xtools-cli/logger';
import { isClean } from '@xtools-cli/shared';
import { commitizenCliPath, commitizenConfigPath, cwd } from '../config';
import ERROR_MESSAGE from '../message';
import type CommitCommand from '../';

export async function interactiveCommitHandler(this: CommitCommand) {
  if (await isClean(cwd)) {
    logger.error('commit', ERROR_MESSAGE.NO_FILES_STAGING);
    return;
  }

  bootstrap({
    cliPath: commitizenCliPath,
    config: {
      path: commitizenConfigPath,
    },
  });
}
