import { prisma } from '../../config/prisma';
import { auditService } from '../audit/audit.service';

export const bookService = {
  create: async (data: any, user: any, requestId: string) => {
    const book = await prisma.book.create({
      data: {
        ...data,
        createdBy: user.id,
      },
    });

    await auditService.log({
      entity: 'Book',
      entityId: book.id,
      action: 'create',
      actorId: user.id,
      before: null,
      after: book,
      requestId,
    });

    return book;
  },

  update: async (id: string, data: any, user: any, requestId: string) => {
    const before = await prisma.book.findUnique({ where: { id } });

    const book = await prisma.book.update({
      where: { id },
      data: {
        ...data,
        updatedBy: user.id,
      },
    });

    await auditService.log({
      entity: 'Book',
      entityId: id,
      action: 'update',
      actorId: user.id,
      before,
      after: book,
      requestId,
    });

    return book;
  },

  delete: async (id: string, user: any, requestId: string) => {
    const before = await prisma.book.findUnique({ where: { id } });

    await prisma.book.delete({ where: { id } });

    await auditService.log({
      entity: 'Book',
      entityId: id,
      action: 'delete',
      actorId: user.id,
      before,
      after: null,
      requestId,
    });
  },
};
