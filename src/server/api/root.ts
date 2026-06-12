import { commentRouter } from "@/server/api/routers/comment";
import { viewRouter } from "@/server/api/routers/view";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  view: viewRouter,
  comment: commentRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
