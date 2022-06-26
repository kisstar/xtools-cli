#!/usr/bin/env node

const importLocal = require('import-local');
const logger = require('@xtools-cli/logger');

if (importLocal(__filename)) {
  logger.info('cli', 'using local version of xtools');
} else {
  logger.info('cli', 'using global version of xtools');
}
