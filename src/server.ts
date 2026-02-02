import { buildApp } from './app';
import { prisma } from './config/prisma';

const start = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");

    const app = await buildApp();

    const port = Number(process.env.PORT) || 3000;

    await app.listen({
      port,
      host: '0.0.0.0',   
    });

    console.log(`Server running on port ${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
