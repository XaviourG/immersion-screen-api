import { FastifyInstance } from 'fastify';

export const setupAuthenticatedRoutes = (server: FastifyInstance) => {
  server.get('/is-authenticated', {}, () => {
    return 'Authenticated';
  });
};
