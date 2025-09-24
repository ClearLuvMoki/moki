import { Metadata } from "next"
import { allBlogs } from "content-collections"
import { compareDesc } from "@/lib/utils"

import PageHeading from "@/components/page-heading"
import FilteredBlog from "@/components/blog/filtered-blog"

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
    title: "Blog",
}

const BlogPage = () => {
    const blogs = allBlogs
        .sort((a, b) => {
            return compareDesc(new Date(a.createDate), new Date(b.createDate))
        })

    return (
        <>
            <PageHeading
                title="Blog"
                description=""
            />

            <FilteredBlog blogs={blogs} />
        </>
    )
}

export default BlogPage
