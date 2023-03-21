import type { T_Type } from '../trpc';
export const getAuthMiddleware = (t: T_Type) =>
	t.middleware(({ next, ctx }) => {
		// if (!ctx.session?.user?.email) {
		// 	throw new TRPCError({
		// 		code: 'UNAUTHORIZED',
		// 	});
		// }
		return next({
			ctx: {
				// Infers the `session` as non-nullable
				...ctx,
			},
		});
	});
