import fastify from 'fastify';

import app from './app';
import config from './config';

const { port } = config;

/**
 * Main instance of fastify server.
 */
const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  }
});

/**
 * Register app to the server.
 */
server.register(app);

/**
 * Start the server.
 */
async function start() {
  try {
    server.listen(port);
    server.log.info(`beer server listening at ${port}`);
  } catch (err) {
    server.log.error(`Could not start beer server, ${err}`);

    process.exit(1);
  }
}

start();
