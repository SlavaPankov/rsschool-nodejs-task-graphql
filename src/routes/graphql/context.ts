import { PrismaClient } from '@prisma/client';
import { initializeDataLoaders } from './initializeDataLoaders.js';

export type Context = { prisma: PrismaClient } & ReturnType<
  typeof initializeDataLoaders
>;