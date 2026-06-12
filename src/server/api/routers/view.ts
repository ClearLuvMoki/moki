import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const viewRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const blog = await ctx.db.blog.findUnique({
        where: { slug: input.slug },
      });

      return {
        views: blog?.views ?? 0,
      };
    }),

  increment: publicProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const blog = await ctx.db.blog.upsert({
        where: { slug: input.slug },
        create: { slug: input.slug, views: 1 },
        update: { views: { increment: 1 } },
      });

      return { views: blog.views };
    }),
});
