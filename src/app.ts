import { join } from 'path';
import Sentry from '@sentry/node';
import compress from '@fastify/compress';
import fastifySwagger from '@fastify/swagger';
import fastifyAutoload from '@fastify/autoload';
import httpStatusCodes from 'http-status-codes';
import cors from '@fastify/cors';
import { FastifyError, FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import config from './config';
import { ERR } from './constants/errors';
import sentryPlugin from './plugins/sentry';

/**
 * Entry point for all APIs.
 *
 * @param {FastifyInstance} fastify
 * @param {FastifyRegisterOptions<any>} opts
 */
async function app(fastify: FastifyInstance) {
  const { swagger } = config;

  // Register the plugins.
  fastify.register(cors, { origin: '*' });

  fastify.register(compress);
  fastify.register(fastifySwagger, { ...swagger });

  // Register all the routes.
  fastify.register(fastifyAutoload, {
    dir: join(__dirname, 'routes'),
    autoHooks: true,
    cascadeHooks: true
  });

  fastify.register(sentryPlugin);

  fastify.setErrorHandler(function (error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
    fastify.log.error(error.validation, 'inside error handler');

    Sentry.captureException(error);

    reply.code(error.statusCode || httpStatusCodes.BAD_REQUEST).send({
      error: {
        code: error.name,
        message: error.message,
        details: []
      }
    });
  });

  fastify.setNotFoundHandler(function (request, reply) {
    fastify.log.error('Route not found');

    reply.code(httpStatusCodes.NOT_FOUND).send({
      error: {
        code: ERR.ROUTE_NOT_FOUND,
        message: "API route doesn't exist",
        details: []
      }
    });
  });
}

export default app;
