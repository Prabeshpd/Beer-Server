import { FastifyInstance } from 'fastify';

import * as userController from '../../controllers/user';

/**
 * Fetches recommendations for a user.
 *
 * @param {FastifyInstance} app
 */
async function recommendations(app: FastifyInstance) {
  app.post('/', {
    handler: userController.createUser
  });
}

export default recommendations;
