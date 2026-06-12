import { allBlogs, type Blog } from "content-collections";

export function getPublishedBlogs(): Blog[] {
  return allBlogs.filter((blog) => !blog.slug.startsWith("_"));
}

export function getBlogCover(blog: Blog): string {
  return blog.cover ?? blog.img;
}
