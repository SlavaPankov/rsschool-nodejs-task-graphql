import { PrismaClient } from '@prisma/client';
import { setupDataLoaders } from './setupDataLoaders.js';

export type Context = { prisma: PrismaClient } & ReturnType<typeof setupDataLoaders>;