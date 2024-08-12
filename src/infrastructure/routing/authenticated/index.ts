import { FastifyInstance } from 'fastify';
import { GENERIC_SUCCESS_RESPONSE, SESSION_COOKIE_KEY } from '../../../utilities/global-constants';
import { CharacterCreateInput, CharacterService } from '../../../services/character';
import { getRequestUser } from '../../authentication';
import { PaginationInput } from '../../../utilities/global-types';

export const setupAuthenticatedRoutes = (server: FastifyInstance) => {
  server.get('/user/logout', {}, (request, reply) => {
    reply.setCookie(SESSION_COOKIE_KEY, '', { path: '/' });
    return GENERIC_SUCCESS_RESPONSE;
  });

  // CHARACTER ENDPOINTS

  server.get('/characters', {}, async (request) => {
    const user = getRequestUser(request);
    return await CharacterService.page(user, request.query as PaginationInput);
  });

  server.get('/character/:uuid', {}, async (request) => {
    const user = getRequestUser(request);
    const { uuid } = request.params as { uuid: string };
    return await CharacterService.get(user, uuid);
  });

  server.post('/character', {}, async (request) => {
    const user = getRequestUser(request);
    return await CharacterService.create(user, request.body as CharacterCreateInput);
  });

  server.post('/character/:uuid', {}, async (request) => {
    const user = getRequestUser(request);
    const { uuid } = request.params as { uuid: string };
    return await CharacterService.update(user, uuid, request.body as CharacterCreateInput);
  });
};
