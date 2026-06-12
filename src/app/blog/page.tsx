import { Metadata } from "next";
import { compareDesc } from "@/lib/utils";
import { getPublishedBlogs } from "@/lib/blogs";
import { getServerDictionary } from "@/lib/locale";

import PageHeading from "@/components/page-heading";
import FilteredBlog from "@/components/blog/filtered-blog";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getServerDictionary();
  return {
    title: dict.blog.title,
    description: dict.blog.description,
  };
}

const BlogPage = async () => {
  const dict = await getServerDictionary();
  const blogs = getPublishedBlogs().sort((a, b) => {
    return compareDesc(new Date(a.createDate), new Date(b.createDate));
  });

  return (
    <>
      <PageHeading title={dict.blog.title} description={dict.blog.description} />
      <FilteredBlog blogs={blogs} />
    </>
  );
};

export default BlogPage;
