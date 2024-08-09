import { PrismaClient } from '@prisma/client';

let PRISMA_CLIENT: PrismaClient | null = null;

export const getPrisma = () => {
  if (!PRISMA_CLIENT) {
    PRISMA_CLIENT = new PrismaClient();
  }
  return PRISMA_CLIENT;
};

getPrisma(); // init
