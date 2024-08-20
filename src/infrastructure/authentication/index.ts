import { FastifyInstance, FastifyRequest } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { Env } from '../../utilities/env';
import { AnyObject } from '../../utilities/global-types';
import { SESSION_COOKIE_KEY } from '../../utilities/global-constants';
import { getPrisma } from '../database';
import { CError } from '../../utilities/errors';
import { User } from '@prisma/client';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';

const COOKIE_SECRET = Env.get('COOKIE_SECRET');

export type AuthenticatedUser = User;

export const getRequestUser = (request: FastifyRequest): AuthenticatedUser => {
  const user = (request as AnyObject).user;
  if (!user) {
    throw new CError('AUTH: No user found on authenticated request.', { url: request.url });
  }
  return user;
};

export const setupAuthenticationHook = (server: FastifyInstance) => {
  server.addHook('preHandler', async (request) => {
    const authCookie = request?.cookies?.[SESSION_COOKIE_KEY];
    if (!authCookie) {
      throw new CError('AUTH: Missing cookie', { url: request.url }, 'Unauthorized');
    }
    const user = await getPrisma().user.findUnique({ where: { uuid: authCookie } });
    if (!authCookie) {
      throw new CError('AUTH: Invalid cookie', { url: request.url }, 'Unauthorized');
    }
    (request as AnyObject).user = user;
  });
};

export const setupAuthentication = (server: FastifyInstance) => {
  server.register(fastifyCors, {
    origin: `${Env.get('CLIENT_URL')}`,
    credentials: true
  });
  server.register(fastifyHelmet, {
    contentSecurityPolicy: false
  });
  server.register(fastifyCookie, {
    secret: COOKIE_SECRET,
    hook: 'onRequest',
    parseOptions: {}
  });
  console.info('LAUNCH: Authentication Initialised');
};
