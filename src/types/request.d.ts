import fastify from 'fastify';
import LoggedInUser from '../types/user';

declare module 'fastify' {
  interface FastifyRequest {
    user: LoggedInUser;
  }
}
