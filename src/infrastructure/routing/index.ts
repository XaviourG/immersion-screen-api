import { FastifyInstance } from 'fastify';
import { UserService } from '../../services/user';
import { AnyObject } from '../../utilities/global-types';
import { SESSION_COOKIE_KEY } from '../../utilities/global-constants';
import { getRequestUser, setupAuthenticationHook } from '../authentication';

export const setupRouting = (server: FastifyInstance) => {
  // public
  server.register(async (server) => {
    server.post('/user/register', {}, async (request, reply) => {
      const { email, password } = request.body as AnyObject;
      const user = await UserService.register(email, password);
      reply.setCookie(SESSION_COOKIE_KEY, user.uuid, { path: '/' });
      return user;
    });
    server.post('/user/login', {}, async (request, reply) => {
      const { email, password } = request.body as AnyObject;
      const user = await UserService.login(email, password);
      reply.setCookie(SESSION_COOKIE_KEY, user.uuid, { path: '/' });
      return user;
    });
  });
  // authenticated
  server.register(async (server) => {
    setupAuthenticationHook(server);
    server.get('/is-authenticated', {}, async (request) => {
      console.log({ user: getRequestUser(request) });
      return 'Authenticated';
    });
  });
  console.info('LAUNCH: Routing Initialized');
};
