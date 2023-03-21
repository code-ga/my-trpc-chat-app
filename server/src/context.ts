import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { prisma } from './db';

export function createContext({ req, res }: CreateFastifyContextOptions) {
	const user = { name: req.headers.username ?? 'anonymous' };

	return {
		req,
		res,
		session: {
			user: {
				email: user.name,
			},
		},
		prisma,
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
