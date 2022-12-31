import { spawn, type SpawnOptions } from 'child_process';

/**
 * Execute the command with spawn and return the error code
 * @param {string} cmd Commands to be executed
 * @param {string[]} args Command parameters
 * @param {SpawnOptions} options Parameters passed to spawn
 * @returns {Promise<number>} Error code
 */
export function runCmd(cmd: string, args: string[], options: SpawnOptions = {}): Promise<number> {
  return new Promise((resolve) => {
    args = args || [];

    const runner = spawn(cmd, args, {
      stdio: 'inherit',
      ...options,
    });

    runner.on('close', (code) => resolve(code || 0));
  });
}
