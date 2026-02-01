import { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '../modules/user/user.service';
import { getContext } from '../core/context';

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    return reply.status(401).send({ error: 'Missing API key' });
  }

  const user = await userService.findByApiKey(apiKey);

  if (!user) {
    return reply.status(401).send({ error: 'Invalid API key' });
  }

  (req as any).user = user;

  // 🔥 Add userId to request tracing context
  const ctx = getContext();
  if (ctx) {
    ctx.userId = user.id;
  }
}
