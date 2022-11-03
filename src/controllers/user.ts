import { FastifyReply, FastifyRequest } from 'fastify';

import { LoginPayload } from '../types/auth';
import * as authService from '../services/auth';
import * as userService from '../services/user';
import { UserPayload } from '../models/user';

/**
 * Logs in the user in the app.
 *
 * @param {CustomRequest} req
 * @param {FastifyReply} reply
 */
export async function login(req: FastifyRequest, reply: FastifyReply) {
  try {
    const payload = req.body as LoginPayload;
    const data = await authService.login(payload);

    await reply.code(200).send(data);
  } catch (err: any) {
    console.log(err);
    reply.status(500).send(err.error);
  }
}

/**
 * Creates user.
 *
 * @param {CustomRequest} req
 * @param {FastifyReply} reply
 */
export async function createUser(req: FastifyRequest, reply: FastifyReply) {
  try {
    const payload = req.body as UserPayload;
    const data = await userService.addUser(payload);

    await reply.code(200).send(data);
  } catch (err: any) {
    console.log(err);
    reply.status(500).send(err.error);
  }
}
