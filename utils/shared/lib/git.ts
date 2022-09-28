import { exec } from './promisify';

/**
 * Asynchronously determine whether the specified directory is a Git repository
 */
export const isGitRepo = async (repoPath: string) => {
  try {
    const { stdout } = await exec('git rev-parse --git-dir', {
      maxBuffer: Infinity,
      cwd: repoPath,
    });

    return /^\.(git)?$/.test(stdout.trim());
  } catch (error) {
    if (/(Not a git repository|Kein Git-Repository)/i.test(String(error))) {
      return false;
    }

    throw new Error(error);
  }
};

/**
 * Asynchrounously determines if the staging area is clean
 */
export const isClean = async (repoPath: string) => {
  try {
    const { stdout } = await exec('git diff --cached --no-ext-diff --name-only', {
      maxBuffer: Infinity,
      cwd: repoPath,
    });

    return stdout.trim().length === 0;
  } catch (error) {
    throw new Error(error);
  }
};
