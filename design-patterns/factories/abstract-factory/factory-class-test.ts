import { LoggerFactory } from './factory-class';

const logger = LoggerFactory.createLogger();

logger.debug('debug');
logger.warn('warn');
logger.info('info');
logger.error('error');
