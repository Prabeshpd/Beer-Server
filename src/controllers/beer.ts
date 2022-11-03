import { FastifyReply, FastifyRequest } from 'fastify';

import { BeerPayload } from '../models/beer';
import * as beerService from '../services/beer';

/**
 * Fetches beer.
 *
 * @param {CustomRequest} req
 * @param {FastifyReply} reply
 */
export async function fetchAll(req: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = req.user.id;
    const response = await beerService.fetchAll(userId);

    await reply.code(200).send(response);
  } catch (err: any) {
    reply.status(500).send(err.error);
  }
}

/**
 * Inset beer info.
 *
 * @param {CustomRequest} req
 * @param {FastifyReply} reply
 */
export async function add(req: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = req.user.id;
    const beerPayload = req.body as BeerPayload;
    const payload = { ...beerPayload, user_id: userId };
    const response = await beerService.insertBeer(payload);

    await reply.code(200).send(response);
  } catch (err: any) {
    reply.status(500).send(err.error);
  }
}
