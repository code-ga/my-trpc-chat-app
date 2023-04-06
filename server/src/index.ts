import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { createContext } from './context';
import { appRouter } from './trpc';
import ws from '@fastify/websocket';
import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'


const server = fastify(); 

server.register(cookie, {
  parseOptions: {}    
} as FastifyCookieOptions)

server.register(ws);
server.register(fastifyTRPCPlugin, {
	prefix: '/trpc',
	trpcOptions: { router: appRouter, createContext },
	useWSS: true,
});

(async () => {
	try {
		const PORT = Number(process.env.PORT || 8080);
		await server.listen({ port: PORT });
		console.log(`Server is open at ${PORT}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
})();

export type * from './types';
export type * from './generated/zod';
export type * from './router/rootTrpc';
export type * from './trpc';
