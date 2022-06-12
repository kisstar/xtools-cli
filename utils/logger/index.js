const logger = require('npmlog');

// Set up new level
[
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
].forEach(({ name, level, style, disp }) => {
  logger.addLevel(name, level, style, ` ${disp} `);
});

// Wrap prefix
[('debug', 'info', 'warn', 'error')].forEach((method) => {
  const originMethod = logger[method];

  logger[method] = function (prefix, ...args) {
    originMethod.call(logger, `[${prefix}]`, ...args);
  };
});

logger.setLevel = function (level) {
  logger.level = level;
};

module.exports = logger;
