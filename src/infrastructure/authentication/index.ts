import { FastifyInstance, FastifyRequest } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { Env } from '../../utilities/env';
import { AnyObject } from '../../utilities/global-types';
import { SESSION_COOKIE_KEY } from '../../utilities/global-constants';
import { getPrisma } from '../database';

const COOKIE_SECRET = Env.get('COOKIE_SECRET');

export const getRequestUser = (request: FastifyRequest) => {
  const user = (request as AnyObject).user;
  if (!user) {
    throw new Error('AUTH: No user found on authenticated request.');
  }
  return user;
};

export const setupAuthenticationHook = (server: FastifyInstance) => {
  server.addHook('preHandler', async (request) => {
    const authCookie = request?.cookies?.[SESSION_COOKIE_KEY];
    if (!authCookie) {
      throw new Error('AUTH: Missing cookie');
    }
    const user = await getPrisma().user.findUnique({ where: { uuid: authCookie } });
    if (!authCookie) {
      throw new Error('AUTH: Invalid cookie');
    }
    (request as AnyObject).user = user;
  });
};

export const setupAuthentication = (server: FastifyInstance) => {
  server.register(fastifyCookie, {
    secret: COOKIE_SECRET,
    hook: 'onRequest',
    parseOptions: {}
  });
  console.info('LAUNCH: Authentication Initialised');
};
