import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const commentRouter = createTRPCRouter({
  getCount: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.blogComment.count({
        where: { slug: input.slug },
      });
    }),

  list: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.blogComment.findMany({
        where: { slug: input.slug },
        orderBy: { createdAt: "desc" },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        name: z.string().min(1).max(50),
        email: z.string().email().optional().or(z.literal("")),
        content: z.string().min(1).max(2000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.blog.upsert({
        where: { slug: input.slug },
        create: { slug: input.slug },
        update: {},
      });

      return ctx.db.blogComment.create({
        data: {
          slug: input.slug,
          name: input.name,
          email: input.email || null,
          content: input.content,
        },
      });
    }),
});
