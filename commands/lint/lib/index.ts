import logger from '@xtools-cli/logger';
import { isClean, isGitRepo } from '@xtools-cli/shared';
import { cwd } from './config';
import { esLintHandler } from './handlers';
import ERROR_MESSAGE from './message';

class LintCommand {
  async exec() {
    try {
      if (!(await isGitRepo(cwd))) {
        logger.error('lint', ERROR_MESSAGE.IS_NOT_GIT_REPO);
        return;
      }

      if (await isClean(cwd)) {
        logger.error('lint', ERROR_MESSAGE.NO_FILES_STAGING);
        return;
      }

      esLintHandler.call(this);
    } catch (err) {
      logger.error('lint', ERROR_MESSAGE.DEFAULT);
    }
  }
}

export default LintCommand;
