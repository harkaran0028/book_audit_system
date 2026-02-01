import { FastifyRequest, FastifyReply } from 'fastify';

export async function adminOnly(req: FastifyRequest, reply: FastifyReply) {
  const user = (req as any).user;

  console.log("RBAC user:", user); // 👈 DEBUG

  if (!user || user.role !== 'admin') {
    return reply.status(403).send({
      error: 'Access denied. Admins only.',
    });
  }

  console.log("RBAC passed"); // 👈 DEBUG
}
