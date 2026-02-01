import { prisma } from '../../config/prisma';

export async function seedUsers() {
  const existing = await prisma.user.count();
  if (existing > 0) return;

  await prisma.user.createMany({
    data: [
      {
        name: 'Admin User',
        role: 'admin',
        credentials: 'admin-key',
      },
      {
        name: 'Reviewer User',
        role: 'reviewer',
        credentials: 'reviewer-key',
      },
    ],
  });

  console.log('👤 Users seeded');
}
