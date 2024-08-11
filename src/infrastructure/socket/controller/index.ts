/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server, Socket } from 'socket.io';
import { Uuid } from '../../../utilities/global-types';

type ConnectedSocket = Socket & { liveSession: Uuid };

export class SocketController {
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  connect = (socket: Socket) => {
    const { liveSession } = socket.handshake.query as { liveSession: Uuid };
    if (!liveSession) {
      console.error('SOCKET: failed to connect socket, missing liveSession uuid');
      return;
    }
    socket.join(`LIVE-${liveSession}`);
    (socket as ConnectedSocket).liveSession = liveSession;
  };

  disconnect = (socket: Socket) => {
    socket.leave(`LIVE-${(socket as ConnectedSocket).liveSession}`);
  };

  emitToLive = (uuid: Uuid, event: string, ...args: any[]) => this.io.to(`LIVE-${uuid}`).emit(event, ...args);
}

let INSTANCE: SocketController | null = null;

export const initSocketController = (io: Server) => {
  INSTANCE = new SocketController(io);
};

export const getSocketController = (): SocketController => {
  if (!INSTANCE) {
    throw new Error('SOCKET: Controller uninitialized');
  }
  return INSTANCE;
};
