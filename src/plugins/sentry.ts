import * as Sentry from '@sentry/node';
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

/**
 * Plugin that integrates Sentry for performance measurement and error tracking.
 *
 * @param {FastifyInstance} fastify
 */
async function sentryPlugin(_fastify: FastifyInstance) {
  if (!process.env.SENTRY_DSN) return;

  Sentry.init({
    dsn: process.env.SENTRY_DSN || undefined,

    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true })
    ],
    // Adjust this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0
  });
}

export default fastifyPlugin(sentryPlugin);
