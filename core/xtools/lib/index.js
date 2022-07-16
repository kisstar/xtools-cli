import importLocal from 'import-local';
import logger from '@xtools-cli/logger';
import handler from './main';

if (importLocal(import.meta.url)) {
  logger.debug('cli', 'using local version of xtools');
} else {
  logger.debug('cli', 'using global version of xtools');
  handler();
}
