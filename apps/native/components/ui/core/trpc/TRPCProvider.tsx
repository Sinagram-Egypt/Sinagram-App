import { getQueryClient, trpc } from "@repo/api/client";
import { useState } from "react";
import { httpBatchLink, retryLink } from "@trpc/client";
// @ts-ignore
import superjson from "superjson";
import { QueryClientProvider } from "@tanstack/react-query";
import { getJWT, useSession } from "@/components/AuthContext";

export function TRPCNativeProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const { logOut, logIn } = useSession();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        retryLink({
          retry(opts) {
            if (opts.error.data && opts.error.data.code === "UNAUTHORIZED") {
              (async () => {
                const session = getJWT();
                const refreshResponse = await fetch(
                  "http://192.168.1.19:3000/api/auth/refresh",
                  {
                    method: "POST",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      refreshToken: session?.refreshToken,
                    }),
                  },
                );

                if (!refreshResponse.ok || !session) logOut();

                const newSessionData = await refreshResponse.json();
                const deserialized = superjson.parse(
                  superjson.stringify(newSessionData.data),
                );
                logIn(deserialized as JWTPayload);
              })();
              return true;
            }

            if (
              opts.error.data &&
              opts.error.data.code !== "INTERNAL_SERVER_ERROR"
            ) {
              // Don't retry on non-500s
              return false;
            }

            if (opts.op.type !== "query") {
              // Only retry queries
              return false;
            }

            // Retry up to 3 times
            return opts.attempts <= 3;
          },
        }),
        httpBatchLink({
          transformer: superjson,
          url: "http://192.168.1.19:3000/api/trpc",
          async headers() {
            const session = getJWT();
            return {
              Authorization: session?.accessToken,
            };
          },
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
