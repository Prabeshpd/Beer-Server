import { FastifyReply, FastifyRequest } from 'fastify';

import * as homeService from '../services/home';

/**
 * Get app information.
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
export async function getAppInfo(request: FastifyRequest, reply: FastifyReply) {
  const appInfo = await homeService.getAppInfo();

  reply.send(appInfo);
}
