import { FastifyInstance } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { Env } from '../../utilities/env';

const COOKIE_SECRET = Env.get('COOKIE_SECRET');

export const setupAuthentication = (server: FastifyInstance) => {
  server.register(fastifyCookie, {
    secret: COOKIE_SECRET,
    hook: 'onRequest',
    parseOptions: {}
  });
  console.info('LAUNCH: Authentication Initialised');
};
