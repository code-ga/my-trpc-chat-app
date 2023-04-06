import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { prisma } from './db';
import { decodeToken } from './util/token';



export async function createContext({ req, res }: CreateFastifyContextOptions) {
	const token = req.cookies.authorization;
	const session = token ? await decodeToken(token, prisma) : null;

	return {
		req,
		res,
		session: session,
		prisma,
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
