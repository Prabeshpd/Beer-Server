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
    const response = await beerService.fetchAll();

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
    const payload = req.body as BeerPayload;
    const response = await beerService.insertBeer(payload);

    await reply.code(200).send(response);
  } catch (err: any) {
    reply.status(500).send(err.error);
  }
}
