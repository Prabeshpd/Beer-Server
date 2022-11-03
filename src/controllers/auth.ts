import { FastifyReply, FastifyRequest } from 'fastify';

import * as authService from '../services/auth';
import { LoginPayload, RefreshPayload } from '../types/auth';

/**
 * Logs in the user in the app.
 *
 * @param {CustomRequest} req
 * @param {FastifyReply} reply
 */
export async function login(req: FastifyRequest, reply: FastifyReply) {
  try {
    const payload = req.body as LoginPayload;
    const response = await authService.login(payload);

    await reply.code(200).send(response);
  } catch (err: any) {
    reply.status(500).send(err.error);
  }
}

/**
 * Refresh access token.
 *
 * @param {CustomRequest} req
 * @param {FastifyReply} reply
 */
export async function refresh(req: FastifyRequest, reply: FastifyReply) {
  try {
    const payload = req.body as RefreshPayload;
    const response = await authService.refresh(payload);

    await reply.code(200).send(response);
  } catch (err: any) {
    reply.status(500).send(err.error);
  }
}
