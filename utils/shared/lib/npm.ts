import { join } from 'path';

/**
 * Detect the version of the specified package
 * @param {string} packageName name of the package
 * @param {string} defaultValue the fallback version if cannot find the version
 * @param {ExtraOptions} options other additional configuration items
 * @returns {string | null} version of the specified package
 */
export function getPackageVersion(
  packageName: string,
  defaultValue: string,
  { cwd = process.cwd() }: ExtraOptions
) {
  let version = null;

  try {
    const packageJsonPath = require.resolve(`${packageName}/package.json`, {
      paths: [join(cwd, 'node_modules')],
    });

    version = require(packageJsonPath).version;
  } catch (error) {
  } finally {
    if (version) {
      return version;
    }

    try {
      const { dependencies = {}, peerDependencies = {}, devDependencies = {} } = require(join(
        cwd,
        'package.json'
      ));

      version =
        dependencies[packageName] || peerDependencies[packageName] || devDependencies[packageName];
    } catch (error) {}
  }

  if (!version && defaultValue) {
    return defaultValue;
  }

  return version;
}

interface ExtraOptions {
  cwd?: string;
}
