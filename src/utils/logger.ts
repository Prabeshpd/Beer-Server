import pino, { Logger, LoggerOptions, DestinationStream } from 'pino';

const logger = pino();

/**
 * Returns the child logger instance that has the properties passed in as args.
 *
 * @param {Mapping<any>} [bindings = {}]
 * @param {LoggerOptions} [options = {}]
 * @returns {Logger<LoggerOptions | DestinationStream>} logger
 */
function childLogger(bindings: any = {}, options: LoggerOptions = {}): Logger<LoggerOptions | DestinationStream> {
  const logBindings = { ...bindings };

  return logger.child(logBindings, options);
}

export { logger as default, childLogger };
