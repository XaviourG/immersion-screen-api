import { FastifyInstance } from 'fastify';
import { GENERIC_SUCCESS_RESPONSE, SESSION_COOKIE_KEY } from '../../../utilities/global-constants';

export const setupAuthenticatedRoutes = (server: FastifyInstance) => {
  server.get('/user/logout', {}, (request, reply) => {
    reply.setCookie(SESSION_COOKIE_KEY, '', { path: '/' });
    return GENERIC_SUCCESS_RESPONSE;
  });
};
