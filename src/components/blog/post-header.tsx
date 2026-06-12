import Image from "next/image"
import type { Blog } from "content-collections"
import { getBlogCover } from "@/lib/blogs"
import BlogMetrics from "@/components/blog-metrics"
import BreadcrumbNavigation from "@/components/layout/breadcrumb-navigation"
import { cn, formatDate } from "@/lib/utils"

interface PostHeaderProps {
    post: Blog
}

const PostHeader = ({ post }: PostHeaderProps) => {
    const { title, createDate } = post
    const cover = getBlogCover(post)

    return (
        <header className="-mt-4 md:-mt-8">
            {cover && (
                <div
                    className={cn(
                        "relative -mx-4 overflow-hidden sm:-mx-6",
                        "h-[min(32vh,280px)] sm:h-[min(36vh,340px)]",
                    )}
                >
                    <Image
                        src={cover}
                        alt=""
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 896px, 1152px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-background" />
                </div>
            )}

            <div className={cn(cover ? "mt-8" : "mt-0")}>
                <BreadcrumbNavigation pageTitle={title} />

                <h1 className="mt-4 font-heading text-4xl leading-tight break-all lg:text-5xl">
                    {title}
                </h1>

                <div className="mt-4 flex flex-col gap-2 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    {createDate && (
                        <time dateTime={createDate} className="text-sm">
                            {formatDate(createDate)}
                        </time>
                    )}
                    <BlogMetrics blog={post} />
                </div>
            </div>
        </header>
    )
}

export default PostHeader
