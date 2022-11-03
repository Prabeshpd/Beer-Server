import { FastifyInstance } from 'fastify';

// import schema from '../../../../schemas/recommendations.json';
import * as authController from '../../../controllers/auth';

/**
 * Login Api for user.
 *
 * @param {FastifyInstance} app
 */
async function refresh(app: FastifyInstance) {
  app.post('/', {
    handler: authController.refresh
  });
}

export default refresh;
