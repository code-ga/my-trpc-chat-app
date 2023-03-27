import { createWSClient, httpBatchLink, wsLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../../../server/src/trpc";
import superjson from "superjson";

function getHost() {
  return `localhost:8080`;
}
function GetEmbedLink() {
  if (typeof window == "undefined") {
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
      links: [GetEmbedLink()],
      transformer: superjson,
    };
  },

  ssr: true,
});
