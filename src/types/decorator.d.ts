import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    logger(message: string): void;
  }
}
