// "use client"

// import { api } from "@/trpc/react"
// import { Blog } from "content-collections"
// import { EyeIcon, MessageSquare, ThumbsUpIcon, TimerIcon } from "lucide-react"

// interface BlogMetricsProps {
//     blog: Blog
// }

// const BlogMetrics = ({ blog }: BlogMetricsProps) => {
//     const utils = api.useUtils()

//     const viewQuery = api.view.get.useQuery({
//         slug: blog.slug,
//     })

//     const likeQuery = api.like.get.useQuery({
//         slug: blog.slug,
//     })

//     const commentQuery = api.comment.getCount.useQuery({
//         slug: blog.slug,
//     })

//     return (
//         <div className="flex items-center gap-4">
//             <div className="flex items-center gap-1">
//                 <TimerIcon className="size-4" />
//                 <span>{blog.readingTime} min read</span>
//             </div>

//             <div className="flex items-center gap-1">
//                 <EyeIcon className="size-4" />
//                 <span>{viewQuery.isLoading ? "--" : viewQuery.data?.views} views</span>
//             </div>

//             <div className="flex items-center gap-1">
//                 <ThumbsUpIcon className="size-4" />
//                 <span>{likeQuery.isLoading ? "--" : likeQuery.data?.likes} likes</span>
//             </div>

//             <div className="flex items-center gap-1">
//                 <MessageSquare className="size-4" />
//                 <span>
//                     {commentQuery.isLoading ? "--" : commentQuery.data} comments
//                 </span>
//             </div>
//         </div>
//     )
// }

// export default BlogMetrics
