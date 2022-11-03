import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import * as jwt from '../utils/jwt';
import LoggedInUser from '../types/user';
import { childLogger } from '../utils/logger';
import ErrorFormatter from '../utils/ErrorHandler';

/**
 * Plugin that authenticates the request from client.
 * It verifies the JWT token and also sets the decoded token value,
 * as a user object in the request instance.
 *
 * @param {FastifyInstance} fastify
 */
export async function auth(fastify: FastifyInstance) {
  fastify.addHook('onRequest', hook);
}

/**
 * Hook that authenticates the request from client.
 * It verifies the JWT token and also sets the decoded token value,
 * as a user object in the request instance.
 *
 * @param {FastifyRequest} req
 * @param {FastifyReply} reply
 */
export async function hook(req: FastifyRequest, reply: FastifyReply) {
  try {
    const logger = childLogger({
      moduleName: 'beers-service',
      nameSpace: 'JWT_AUTH'
    });
    logger.info('Authenticate process started');

    const { accessTokenSecret } = process.env;

    const secret = `${accessTokenSecret}`;
    const token = req.headers.authorization;

    if (!token) {
      const error = new ErrorFormatter({ code: 'BadRequest', message: 'No authorization header set' })
        .addInnerError({ code: 'NOAUTHORIZATIONHEADER' })
        .construct();
      logger.error(error);

      return reply.status(401).send(error);
    }

    if (!token.includes('Bearer')) {
      const error = new ErrorFormatter({
        code: 'BadRequest',
        message: "Authorization header doesn't include a Bearer token"
      })
        .addInnerError({ code: 'NOBEARERTOKEN' })
        .construct();
      logger.error(error);

      return reply.status(401).send(error);
    }

    const bearerToken = token.split(' ')[1];

    try {
      const decodedResult = (await jwt.verifyToken(bearerToken, secret)) as LoggedInUser;
      req.user = decodedResult;
    } catch (err) {
      logger.error({ code: 'UNAUTHORIZED', msg: 'Invalid Token', details: [] });

      return reply.status(401).send({ code: 'UNAUTHORIZED', msg: 'Invalid Token', details: [] });
    }
  } catch (err) {
    reply.status(500).send({ code: 'SERVER_ERROR', msg: 'Something went wrong' });
  }
}

export default fastifyPlugin(auth);
