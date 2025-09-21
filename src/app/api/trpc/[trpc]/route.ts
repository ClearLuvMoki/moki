// app/api/trpc/[trpc]/route.ts
import { appRouter } from "@/server/api/root"
import { createTRPCContext } from "@/server/api/trpc"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { type NextRequest } from "next/server"

async function handler(req: NextRequest) {
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => createTRPCContext({ headers: req.headers }),
        onError:
            process.env.NODE_ENV === "development"
                ? ({ path, error }) => {
                    console.error(
                        `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
                    )
                }
                : undefined,
    })
}

export async function GET(req: NextRequest) {
    return handler(req)
}

export async function POST(req: NextRequest) {
    return handler(req)
}
