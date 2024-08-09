import fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { getPrisma } from './infrastructure/database';

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();
const database = getPrisma();
server.listen({ port: 3004 }, (err) => {
  if (err) {
    console.error(err);
    database.$disconnect();
    process.exit(1);
  }
});
console.info('Immersion Screen Server live at: http://localhost:3004/');
