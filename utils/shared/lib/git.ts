import { execAsync } from './promisify';

/**
 * Asynchronously determine that the specified directory is in the Git repository
 */
export const isInGitRepo = async (repoPath: string): Promise<boolean> => {
  try {
    const { stdout } = await execAsync('git rev-parse --git-dir', {
      maxBuffer: Infinity,
      cwd: repoPath,
    });

    return stdout.trim().length !== 0;
  } catch (error) {
    if (/(Not a git repository|Kein Git-Repository)/i.test(String(error))) {
      return false;
    }

    throw new Error(error);
  }
};

/**
 * Asynchronously determine whether the specified directory is a Git repository
 */
export const isGitRepo = async (repoPath: string): Promise<boolean> => {
  try {
    const { stdout } = await execAsync('git rev-parse --git-dir', {
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
 * Get Git warehouse address asynchronously
 */
export const getGitRepoPath = async (repoPath: string) => {
  const { stdout } = await execAsync('git rev-parse --git-dir', {
    maxBuffer: Infinity,
    cwd: repoPath,
  });

  if (/^\.(git)?$/.test(stdout.trim())) {
    return repoPath;
  }

  return stdout.trim().replace('/.git', '');
};

/**
 * Asynchrounously determines if the staging area is clean
 */
export const isClean = async (repoPath: string): Promise<boolean> => {
  const { stdout } = await execAsync('git diff --cached --no-ext-diff --name-only', {
    maxBuffer: Infinity,
    cwd: repoPath,
  });

  return stdout.trim().length === 0;
};
