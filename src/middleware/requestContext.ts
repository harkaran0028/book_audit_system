import { als } from '../core/context';
import { FastifyRequest, FastifyReply } from 'fastify';

export function requestContext(
  req: FastifyRequest,
  reply: FastifyReply,
  done: any
) {
  als.run(
    {
      requestId: req.id,
      startTime: Date.now(),
    },
    done
  );
}
