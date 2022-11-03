import { FastifyInstance } from 'fastify';

import * as beerController from '../../../controllers/beer';

/**
 * Beer Api for user.
 *
 * @param {FastifyInstance} app
 */
async function beers(app: FastifyInstance) {
  app.get('/', {
    handler: beerController.fetchAll
  });

  app.post('/', {
    handler: beerController.add
  });
}

export default beers;
