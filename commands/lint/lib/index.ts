import sgf from 'staged-git-files';
import logger from '@xtools-cli/logger';
import { isGitRepo } from '@xtools-cli/shared';
import { cwd } from './config';
import ERROR_MESSAGE from './message';

class LintCommand {
  async exec() {
    try {
      if (!(await isGitRepo(cwd))) {
        logger.error('lint', ERROR_MESSAGE.IS_NOT_GIT_REPO);
        return;
      }

      const list = await sgf();

      if (!list.length) {
        logger.error('lint', ERROR_MESSAGE.NO_FILES_STAGING);
        return;
      }

      console.log(list);
    } catch (err) {}
  }
}

export default LintCommand;
