import { prisma } from '../../config/prisma';

export const userService = {
  findByApiKey: async (apiKey: string) => {
    return prisma.user.findFirst({
      where: { credentials: apiKey },
    });
  },
};
