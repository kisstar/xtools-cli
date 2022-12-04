import { bootstrap } from 'commitizen/dist/cli/git-cz';
import logger from '@xtools-cli/logger';
import { isGitRepo, isClean } from '@xtools-cli/shared';
import { cwd, commitizenCliPath, commitizenConfigPath } from './config';
import ERROR_MESSAGE from './message';

class CommitCommand {
  async exec() {
    try {
      if (!(await isGitRepo(cwd))) {
        logger.error('commit', ERROR_MESSAGE.IS_NOT_GIT_REPO);
        return;
      }
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
    } catch (error) {}
  }
}

export default CommitCommand;
