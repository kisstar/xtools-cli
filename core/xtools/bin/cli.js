#!/usr/bin/env node

const importLocal = require('import-local');
const logger = require('@xtools-cli/logger');

if (importLocal(__filename)) {
  logger.debug('cli', 'using local version of xtools');
} else {
  logger.debug('cli', 'using global version of xtools');
  require('../lib')();
}
