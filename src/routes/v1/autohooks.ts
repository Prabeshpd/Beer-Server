import { FastifyInstance } from 'fastify';
import auth from '../../plugins/auth';

/**
 * Auto hook registers all the hooks for the root level route where
 * it is placed. For e.g: This autohook registers hooks for all
 * the routes under /v1/beer, when cascading option for
 * autohooks is set to true (This is done when registering
 * the fastify-autoload plugin beforehand.)
 *
 * See https://github.com/fastify/fastify-autoload#autohooks
 *
 * Register all hooks that will be used by /v1/beer routes,
 * but not by / routes here.
 *
 * @param {FastifyInstance} fastify
 */
async function autoHooks(fastify: FastifyInstance) {
  fastify.register(auth);
}

export default autoHooks;
