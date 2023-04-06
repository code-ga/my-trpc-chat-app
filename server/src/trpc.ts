import { initTRPC } from '@trpc/server';
import { createContext } from './context';
import { getAuthMiddleware } from './middleware/auth';
import { getLoggerMiddleware } from './middleware/logger';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { FieldError } from './types';
const t = initTRPC.context<typeof createContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error, path, type }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
						? error.cause.flatten()
						: null,
				fieldError:
					error.cause instanceof FieldError
						? error.cause.toErrorResponseObject()
						: null,
			},
			path,
			type,
		};
	},
});

export const baseProcedure = t.procedure.use(getLoggerMiddleware(t));
export const publicProcedure = baseProcedure;
export const protectedProcedure = baseProcedure.use(getAuthMiddleware(t));
export const createTRPCRouter = t.router;

export * from './router/rootTrpc';

export type T_Type = typeof t;
export type T_Procedure = typeof t.procedure;
