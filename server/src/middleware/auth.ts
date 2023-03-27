import { TRPCError } from '@trpc/server';
import type { T_Type } from '../trpc';
export const getAuthMiddleware = (t: T_Type) =>
	t.middleware(({ next, ctx }) => {
		const session = ctx.session;
		if (!session) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
			});
		}
		return next({
			ctx: {
				...ctx,
				session: session,
			},
		});
	});
