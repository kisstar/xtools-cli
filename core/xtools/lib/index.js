const program = require('commander');
const leven = require('leven');
const chalk = require('chalk');
const logger = require('@xtools-cli/logger');

const pkg = require('../package.json');

module.exports = function main() {
  registerCommands();
};

/**
 * Register command and event listeners
 * @returns {void}
 */
function registerCommands() {
  program
    .name(Object.keys(pkg.bin)[0])
    .version(pkg.version)
    .usage('<command> [options]')
    .option('-d, --debug', 'Whether to turn on debugging mode', false);

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
function suggestCommands(program, unknownCommand) {
  const availableCommands = program.commands.map((cmd) => cmd._name);
  let suggestion;

  availableCommands.forEach((cmd) => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand);
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd;
    }
  });

  if (suggestion) {
    logger.error('xtools', `Did you mean ${chalk.yellow(suggestion)}?`);
  }
}
