import { FastifyRequest } from 'fastify';

import { PaginationParams } from './pagination';

export type PaginationQueryRequest = FastifyRequest<{ Querystring: PaginationParams }>;
