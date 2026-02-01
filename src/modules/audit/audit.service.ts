import { prisma } from '../../config/prisma';
import { auditConfig } from '../../config/audit.config';
import { buildDiff } from '../../utils/diff';

export const auditService = {
  log: async ({
    entity,
    entityId,
    action,
    actorId,
    before,
    after,
    requestId,
  }: any) => {
    const config = (auditConfig as any)[entity];
    if (!config || !config.track) return;

    const diff = buildDiff(before, after, config);

    await prisma.auditLog.create({
      data: {
        entity,
        entityId,
        action,
        actorId,
        diff: JSON.stringify(diff),
        requestId,
      },
    });
  },
};
