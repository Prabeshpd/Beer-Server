import { FastifyInstance } from 'fastify';

// import schema from '../../../../schemas/recommendations.json';
import * as authController from '../../../controllers/auth';

/**
 * Login Api for user.
 *
 * @param {FastifyInstance} app
 */
async function login(app: FastifyInstance) {
  app.post('/', {
    handler: authController.login
  });
}

export default login;
