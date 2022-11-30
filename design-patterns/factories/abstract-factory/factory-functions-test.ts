import { createLogger } from './factory-functions';

const logger = createLogger();

logger.debug('debug');
logger.warn('warn');
logger.info('info');
logger.error('error');
