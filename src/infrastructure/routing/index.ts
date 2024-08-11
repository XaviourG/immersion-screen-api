/* eslint-disable require-await */
import { FastifyInstance } from 'fastify';
import { setupAuthenticationHook } from '../authentication';
import { setupPublicRoutes } from './public';
import { setupAuthenticatedRoutes } from './authenticated';

export const setupRouting = (server: FastifyInstance) => {
  server.register(async (server) => {
    setupPublicRoutes(server);
  });
  server.register(async (server) => {
    setupAuthenticationHook(server);
    setupAuthenticatedRoutes(server);
  });
  console.info('LAUNCH: Routing Initialized');
};
