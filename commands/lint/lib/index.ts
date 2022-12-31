import { join } from 'path';
import { existsSync } from 'fs';
import sgf from 'staged-git-files';
import logger from '@xtools-cli/logger';
import { isClean, isGitRepo } from '@xtools-cli/shared';
import { cwd } from './config';
import { esLintHandler, styleLintHandler } from './handlers';
import ERROR_MESSAGE from './message';

class LintCommand {
  options: CommandOptions = {};

  async getStagedFiles() {
    const list = await sgf();
    const files = list
      // Only keep exist files
      .map(({ filename }) => {
        const filePath = join(cwd, filename);

        return existsSync(filePath) ? filePath : null;
      })
      .filter<string>((filePath): filePath is string => !!filePath);
    const esFiles = files.filter((filename) => /\.(ts|js|tsx|jsx|vue)$/.test(filename));
    const styleFiles = files.filter((filename) => /\.(css|scss)$/.test(filename));

    return {
      esFiles,
      styleFiles,
    };
  }

  exec = async (options: CommandOptions) => {
    Object.assign(this.options, options);

    try {
      if (!(await isGitRepo(cwd))) {
        logger.error('lint', ERROR_MESSAGE.IS_NOT_GIT_REPO);
        return;
      }

      if (await isClean(cwd)) {
        logger.error('lint', ERROR_MESSAGE.NO_FILES_STAGING);
        return;
      }

      const { esFiles, styleFiles } = await this.getStagedFiles();

      esLintHandler.call(this, esFiles);
      styleLintHandler.call(this, styleFiles);
    } catch (err) {
      logger.error('lint', ERROR_MESSAGE.DEFAULT);
    }
  };
}

export default LintCommand;

interface CommandOptions {
  fix?: boolean;
}
