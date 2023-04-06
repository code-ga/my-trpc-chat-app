/* eslint-disable no-mixed-spaces-and-tabs */
import type { T_Type } from '../trpc';
export const getLoggerMiddleware = (t: T_Type) =>
	t.middleware(async ({ path, type, next, ctx }) => {
		const start = Date.now();

		const result = await next({
			ctx,
		});
		const durationMs = Date.now() - start;

		result.ok
			? logMock('OK request timing:', {
					path,
					type,
					durationMs,
					method: ctx.req.method,
			  })
			: logMock('Non-OK request timing', {
					path,
					type,
					durationMs,
					method: ctx.req.method,
			  });

		return result;
	});

function logMock(...args: unknown[]) {
	console.log(new Date(), ...args);
}
