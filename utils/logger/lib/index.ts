import log from 'npmlog';
import { NOOP } from '@xtools-cli/shared';
import type { LevelInfo, Level, Logger } from '../types';

const levels: LevelInfo[] = [
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
const allLevels = ['silly', ...levels.map((levelInfo) => levelInfo.name), 'silent'];
const logger: Logger = {
  /**
   * Print blank lines
   * @returns {void}
   */
  blankLine: function () {
    console.log();
  },

  /**
   * Set level
   * @returns {void}
   */
  setLevel: function (level: Level) {
    const isValidLevel = allLevels.some((levelOrLevelInfo) => level === levelOrLevelInfo);

    if (isValidLevel) {
      log.level = level;
    }
  },
  debug: NOOP,
  info: NOOP,
  warn: NOOP,
  error: NOOP,
};

levels.forEach(({ name, level, style, disp }) => {
  // Set up new level
  log.addLevel(name, level, style, ` ${disp} `);

  const originMethod = log[name];
  // Wrap prefix
  logger[name] = function (prefix, ...args) {
    originMethod.call(log, `[${prefix}]`, ...args);
  };
});

export default logger;
