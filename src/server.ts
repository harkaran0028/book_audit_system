import { buildApp } from './app';
import { prisma } from './config/prisma';

const start = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");

    const app = await buildApp();

    await app.listen({ port: 3000 });
    console.log('🚀 Server running on http://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
