import { FastifyInstance } from 'fastify';

import schema from '../schemas/home.json';
import * as homeController from '../controllers/home';

/**
 * Entry point for '/' routes.
 *
 * @param {FastifyInstance} app
 */
async function home(app: FastifyInstance) {
  app.get('/', {
    ...schema,
    handler: homeController.getAppInfo
  });
}

export default home;
