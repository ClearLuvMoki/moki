import Link from "next/link"
import { allBlogs } from "content-collections"
import { cn, compareDesc } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import BlogCard from "./blog-card"
import SectionHeading from "./ui/section-heading"


const BlogSection = () => {
    const blogs = allBlogs
        .sort((a, b) => {
            return compareDesc(new Date(a.createDate), new Date(b.createDate))
        })
        .slice(0, 4)

    return (
        <div>
            <SectionHeading>Recent Posts</SectionHeading>
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
                    See all articles
                </Link>
            </div>
        </div>
    )
}

export default BlogSection
