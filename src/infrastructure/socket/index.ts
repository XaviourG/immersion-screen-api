import { FastifyInstance } from 'fastify';
import fastifyIO from 'fastify-socket.io';
import { getSocketController, initSocketController } from './controller';
import { Server } from 'socket.io';

type SocketFastify = FastifyInstance & { io: Server };

export const setupWebsocket = (server: FastifyInstance) => {
  server.register(fastifyIO, {});
  server.ready().then(() => {
    initSocketController((server as SocketFastify).io);
    getSocketController().io.on('connection', (socket) => {
      getSocketController().connect(socket);
      socket.emit('message', 'connected');
      socket.on('disconnect', () => {
        getSocketController().disconnect(socket);
      });
    });
    console.info('LAUNCH: Websocket Initialised');
  });
};
