import { z } from "zod"
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";

export const viewRouter = createTRPCRouter({
    get: publicProcedure
        .input(
            z.object({
                slug: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const post = await ctx.db.blog.findUnique({
                where: { slug: input.slug}
            })

            return { views: post?.views ?? 0 }
        }),
    increment: publicProcedure
        .input(
            z.object({
                slug: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
              console.log('要增加浏览次数的slug:', input.slug)
            
            try {
                const result = await ctx.db.blog.upsert({
                    where: { slug: input.slug },
                    update: {
                        views: {
                            increment: 1
                        }
                    },
                    create: {
                        slug: input.slug,
                        views: 1,
                        likes: 0,
                    }
                })
                
                console.log('upsert结果:', result)
                return { 
                    views: result.views,
                }
            } catch (error) {
                console.error('增加浏览次数时出错:', error)
                return { views: 0 }
            }
        }),
})


