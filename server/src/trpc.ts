import { initTRPC } from '@trpc/server';
// import { z } from 'zod';
import { createContext } from './context';
import { getAuthMiddleware } from './middleware/auth';
import { getLoggerMiddleware } from './middleware/logger';
import superjson from 'superjson';
const t = initTRPC
	.context<typeof createContext>()
	.create({ transformer: superjson });

export const baseProcedure = t.procedure.use(getLoggerMiddleware(t));
export const publicProcedure = baseProcedure;
export const protectedProcedure = baseProcedure.use(getAuthMiddleware(t));
export const createTRPCRouter = t.router;

export * from './router/rootTrpc';

export type T_Type = typeof t;
