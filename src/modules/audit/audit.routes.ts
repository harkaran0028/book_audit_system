import { FastifyInstance } from 'fastify';
import { prisma } from '../../config/prisma';
import { adminOnly } from '../../middleware/rbac';

export async function auditRoutes(app: FastifyInstance) {
  // List audits
  app.get('/api/audits', { preHandler: adminOnly }, async (req: any) => {
    const {
      entity,
      entityId,
      actorId,
      action,
      requestId,
      from,
      to,
      limit = 20,
    } = req.query;

    const where: any = {};

    if (entity) where.entity = entity;
    if (entityId) where.entityId = entityId;
    if (actorId) where.actorId = actorId;
    if (action) where.action = action;
    if (requestId) where.requestId = requestId;

    if (from || to) {
      where.timestamp = {};
      if (from) where.timestamp.gte = new Date(from);
      if (to) where.timestamp.lte = new Date(to);
    }

    const audits = await prisma.auditLog.findMany({
      where,
      take: Number(limit),
      orderBy: { timestamp: 'desc' },
    });

    return audits.map((a: { diff: string; }) => ({
      ...a,
      diff: JSON.parse(a.diff),
    }));
  });

  // Get single audit
  app.get('/api/audits/:id', { preHandler: adminOnly }, async (req: any) => {
    const audit = await prisma.auditLog.findUnique({
      where: { id: req.params.id },
    });

    if (!audit) return { error: 'Not found' };

    return { ...audit, diff: JSON.parse(audit.diff) };
  });
}
