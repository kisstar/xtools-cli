import logger from '@xtools-cli/logger';
import { isGitRepo } from '@xtools-cli/shared';
import { cwd } from './config';
import { interactiveCommitHandler, lintCommitHandler } from './handlers';
import ERROR_MESSAGE from './message';

class CommitCommand {
  options: CommandOptions = {};

  async exec(options: CommandOptions) {
    Object.assign(this.options, options);

    try {
      if (!(await isGitRepo(cwd))) {
        logger.error('commit', ERROR_MESSAGE.IS_NOT_GIT_REPO);
        return;
      }

      const { lint } = this.options;

      if (lint) {
        lintCommitHandler.call(this);
      } else {
        interactiveCommitHandler.call(this);
      }
    } catch (error) {}
  }
}

export default CommitCommand;

interface CommandOptions {
  lint?: boolean;
}
