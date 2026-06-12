"use client"

import Link from "next/link"
import type { Blog } from "content-collections"
import { useLocale } from "@/components/providers/locale-provider"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import BlogCard from "./blog-card"
import SectionHeading from "./ui/section-heading"

interface BlogSectionProps {
    blogs: Blog[]
}

const BlogSection = ({ blogs }: BlogSectionProps) => {
    const { dict } = useLocale()

    return (
        <div id="recent-blogs" className="scroll-mt-20 sm:scroll-mt-24">
            <SectionHeading className="hidden sm:block">{dict.home.recentBlogs}</SectionHeading>
            {blogs?.length ? (
                <div className="grid gap-10 sm:grid-cols-2">
                    {blogs.map((blog, index) => (
                        <BlogCard key={blog.slug} blog={blog} index={index} />
                    ))}
                </div>
            ) : null}

            <div className="my-8 flex items-center justify-center">
                <Link
                    href="/blog"
                    className={cn(
                        buttonVariants({
                            variant: "outline",
                        }),
                        "rounded-xl"
                    )}
                >
                    {dict.home.seeAll}
                </Link>
            </div>
        </div>
    )
}

export default BlogSection
