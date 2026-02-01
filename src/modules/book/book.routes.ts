import { FastifyInstance } from 'fastify';
import { bookService } from './book.service';

export async function bookRoutes(app: FastifyInstance) {
  app.post('/api/books', async (req: any) => {
    const requestId = req.id;
    return bookService.create(req.body, req.user, requestId);
  });

  app.patch('/api/books/:id', async (req: any) => {
    const requestId = req.id;
    return bookService.update(req.params.id, req.body, req.user, requestId);
  });

  app.delete('/api/books/:id', async (req: any) => {
    const requestId = req.id;
    await bookService.delete(req.params.id, req.user, requestId);
    return { ok: true };
  });
}
