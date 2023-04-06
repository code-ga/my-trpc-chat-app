import {
	createWSClient,
	httpBatchLink,
	loggerLink,
	wsLink,
} from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@server';
import superjson from 'superjson';
import { NextPageContext } from 'next';

function getHost() {
	return `localhost:8080`;
}
function GetEmbedLink(ctx: NextPageContext | undefined) {
	if (typeof window == 'undefined') {
		return httpBatchLink({
			url: `http://${getHost()}/trpc`,
			
		});
	}
	return wsLink({
		client: createWSClient({
			url: `ws://${getHost()}/trpc`,
		}),
	});
}

export const trpc = createTRPCNext<AppRouter>({
	config({ ctx }) {
		return {
			links: [
				loggerLink({
					enabled: (opts) =>
						(process.env.NODE_ENV === 'development' &&
							typeof window !== 'undefined') ||
						(opts.direction === 'down' && opts.result instanceof Error),
				}),
				GetEmbedLink(ctx),
			],
			transformer: superjson,
		};
	},

	ssr: true,
});
