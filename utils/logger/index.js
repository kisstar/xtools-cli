const log = require('npmlog');

const logger = {};
const levels = [
  {
    name: 'debug',
    level: 1500,
    style: { fg: 'black', bg: 'cyan' },
    disp: 'DEBUG',
  },
  {
    name: 'info',
    level: 2000,
    style: { fg: 'black', bg: 'green' },
    disp: 'INFO',
  },
  {
    name: 'warn',
    level: 4000,
    style: { fg: 'black', bg: 'yellow' },
    disp: 'WARN',
  },
  {
    name: 'error',
    level: 5000,
    style: { fg: 'black', bg: 'red' },
    disp: 'ERROR',
  },
];

levels.forEach(({ name, level, style, disp }) => {
  // Set up new level
  log.addLevel(name, level, style, ` ${disp} `);

  const originMethod = log[name];
  // Wrap prefix
  logger[name] = function (prefix, ...args) {
    originMethod.call(log, `[${prefix}]`, ...args);
  };
});

/**
 * Print blank lines
 * @returns {void}
 */
logger.blankLine = function () {
  console.log();
};

/**
 * Set level
 * @returns {void}
 */
logger.setLevel = function (level) {
  const allLevels = ['silly', ...levels, 'silent'];
  const isValidLevel = allLevels.some(
    (levelOrLevelInfo) => level === levelOrLevelInfo || level === levelOrLevelInfo.name
  );

  if (isValidLevel) {
    log.level = level;
  }
};

module.exports = logger;
