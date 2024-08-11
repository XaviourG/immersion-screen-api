import fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { getPrisma } from './infrastructure/database';
import { Env } from './utilities/env';
import { setupWebsocket } from './infrastructure/socket';
import { setupAuthentication } from './infrastructure/authentication';

const PORT = Env.getNumeric('PORT');

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();
const database = getPrisma();
setupAuthentication(server);
setupWebsocket(server);

server.listen({ port: PORT }, (err) => {
  if (err) {
    console.error(err);
    database.$disconnect();
    process.exit(1);
  }
});

console.info(`LAUNCH: Immersion Screen Server live at: http://localhost:${PORT}/`);
