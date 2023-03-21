import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { createContext } from './context';
import { appRouter } from './trpc';
import ws from '@fastify/websocket';

const server = fastify();

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
