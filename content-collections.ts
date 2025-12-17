import {
  defineCollection,
  defineConfig,
  type Context,
  type Meta,
} from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import { rehypePlugins, remarkPlugins } from "@/lib/mdx-plugins"
import { getTOC } from "@/lib/toc"
import { calculateReadingTime } from "@/lib/read-time"

type BaseDoc = {
  _meta: Meta
  content: string
}

export enum TagOption {
  Starter = "starter",
  Development = "development",
  Docs = "docs",
  Freelancing = "freelancing",
  Opinion = "opinion",
  Jamstack = "jamstack",
  Frontend = "frontend",
  Javascript = "javascript",
  Typescript = "typescript",
  React = "react",
  Nextjs = "nextjs",
  Gatsby = "gatsby",
  Tailwindcss = "tailwindcss",
  Git = "Git",
}

const transform = async <D extends BaseDoc>(document: D, context: Context) => {
  const code = await compileMDX(context, document, {
    remarkPlugins,
    rehypePlugins,
  })
  const [path] = document._meta.path.split(/[/\\]/)

  if (!path) {
    throw new Error(`Invalid path: ${document._meta.path}`)
  }

  return {
    ...document,
    code,
    slug: path,
    toc: await getTOC(document.content),
    readingTime: calculateReadingTime(document.content),
  }
}


const blogs = defineCollection({
  name: "blogs",
  directory: "src/content/blogs",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    createDate: z.string(),
    updateDate: z.string(),
    excerpt: z.string(),
    author: z.string(),
    img: z.string(),
    tags: z.array(z.nativeEnum(TagOption)).optional(),
  }),
  transform,
})

const moments = defineCollection({
  name: "moment",
  directory: "src/content/moments",
  include: "**/*.mdx",
  schema: (z) => ({
    content: z.string(),
    images: z.array(z.string())
  })
})

export default defineConfig({
  collections: [blogs, moments],
})