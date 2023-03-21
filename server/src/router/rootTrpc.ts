import { UserRouter } from './user';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const appRouter = createTRPCRouter({
	user: UserRouter,
	status: publicProcedure.query(() => ({
		status: 200,
		message: 'still alive',
	})),
});
export type AppRouter = typeof appRouter;
