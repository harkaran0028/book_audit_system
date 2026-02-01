import { FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from '../core/errors';
import { getContext } from '../core/context';

export function errorHandler(
  error: any,
  req: FastifyRequest,
  reply: FastifyReply
) {
  const ctx = getContext();

  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const code = error instanceof AppError ? error.code : 'INTERNAL_ERROR';

  return reply.status(statusCode).send({
    error: {
      code,
      message: error.message || 'Something went wrong',
      requestId: ctx?.requestId,
      ...(error.details && { details: error.details }),
    },
  });
}
