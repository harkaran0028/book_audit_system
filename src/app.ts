import Fastify from 'fastify';
import { authMiddleware } from './middleware/auth';
import { seedUsers } from './modules/user/user.seed';
import { adminOnly } from './middleware/rbac';
import { bookRoutes } from './modules/book/book.routes';
import { auditRoutes } from './modules/audit/audit.routes';
import { logger } from './config/logger';
import { requestContext } from './middleware/requestContext';
import { getContext } from './core/context';
import { errorHandler } from './middleware/errorHandler';

export async function buildApp() {
  // Use custom structured logger
  const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});


  // 🌱 Seed initial users (admin + reviewer)
  await seedUsers();

  // 📌 Create request context (requestId + timing)
  app.addHook('onRequest', requestContext);

  // 🔐 Global authentication hook (runs before every route)
  app.addHook('preHandler', authMiddleware);

  // 📚 Book CRUD APIs (audit logging happens inside service layer)
  app.register(bookRoutes);

  // 🔎 Audit query APIs (admin only inside routes)
  app.register(auditRoutes);

  // 🏥 Health check
  app.get('/health', async () => {
    return { status: 'ok' };
  });

  // 🔒 Admin-only test route (to verify RBAC)
  app.get('/admin-test', { preHandler: adminOnly }, async () => {
    return { secret: 'Admin access granted' };
  });

  app.setErrorHandler(errorHandler);


  // 📊 Response logging with duration
  app.addHook('onResponse', (req, reply, done) => {
    const ctx = getContext();
    const duration = Date.now() - ctx.startTime;

    logger.info(
      {
        route: req.url,
        method: req.method,
        status: reply.statusCode,
        durationMs: duration,
      },
      'request completed'
    );

    done();
  });

  return app;
}
