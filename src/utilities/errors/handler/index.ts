import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { CError } from '..';

export const sanitiseError = (error: FastifyError | CError, request: FastifyRequest, reply: FastifyReply) => {
  console.error(error, request.url);
  const customError = error as CError;
  if (customError?._CERROR) {
    console.error(error);
    reply.status(customError.code).send({
      statusCode: customError.code,
      message: customError.message
    });
  } else {
    throw error;
  }
};
