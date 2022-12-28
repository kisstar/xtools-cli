import { Command } from 'commander';
import { chalk, leven } from '@xtools-cli/builder';
import logger from '@xtools-cli/logger';
import { COMMANDS } from './config';
import exec from './exec';
import pkg from '../package.json';

/**
 * Register command and event listeners
 * @returns {void}
 */
function registerCommands() {
  const program = new Command();

  program
    .name(Object.keys(pkg.bin)[0])
    .version(pkg.version)
    .usage('<command> [options]')
    .option('-d, --debug', 'whether to turn on debugging mode', false);
  COMMANDS.forEach(({ command, options = [], description = '', action }) => {
    const childCommand = program.command(command).description(description);

    options.forEach(option => childCommand.option(...option));
    childCommand.action(action || exec);
  });
  program.on('command:*', ([cmd]) => {
    logger.error('xtools', `Unknown command ${chalk.yellow(cmd)}.`);
    suggestCommands(program, cmd);
    process.exitCode = 1;
  });
  program.parse(process.argv);

  if (program.opts().debug) {
    logger.setLevel('debug');
  }
  if (!program.args.length) {
    program.outputHelp();
  }
}

/**
 * Provide appropriate suggestions through string comparison
 * @param {Command} program instance of Command
 * @param {string} unknownCommand current command
 * @returns {void}
 */
function suggestCommands(program: Command, unknownCommand: string) {
  const availableCommands = program.commands.map(cmd => cmd.name());
  let suggestion = '';

  availableCommands.forEach(cmd => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand);
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd;
    }
  });

  if (suggestion) {
    logger.error('xtools', `Did you mean ${chalk.yellow(suggestion)}?`);
  }
}

export default registerCommands;
