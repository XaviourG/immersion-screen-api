import { FastifyInstance } from 'fastify';
import { SESSION_COOKIE_KEY } from '../../../utilities/global-constants';
import { AnyObject } from '../../../utilities/global-types';
import { UserService } from '../../../services/user';

export const setupPublicRoutes = (server: FastifyInstance) => {
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
};
