import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedBlogs } from "@/lib/blogs";
import { absoluteUrl } from "@/lib/utils";
import Mdx from "@/components/mdx/mdx-components";
import { Metadata } from "next";
import PostComment from "@/components/blog/post-comment";
import PostHeader from "@/components/blog/post-header";
import { PostViewTracker } from "@/components/blog/post-view-tracker";
import TableOfContents from "@/components/toc";
import { siteConfig } from "@/config/site";

const BASE_URL = absoluteUrl("/");

interface BlogPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const { title, excerpt, author } = post;

  return {
    title: title,
    description: excerpt,
    authors: [
      {
        name: author,
      },
    ],
  };
}

async function getPostFromParams(paramsPromise: Promise<{ slug: string[] }>) {
  const params = await paramsPromise;
  const slug = params.slug.join("/");
  const blog = getPublishedBlogs().find((post) => post.slug === slug);

  if (!blog) {
    return null;
  }

  return blog;
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const { slug, tags, toc } = post;

  return (
    <article className="relative lg:gap-10 xl:grid xl:max-w-6xl xl:grid-cols-[1fr_250px]">
      <PostViewTracker slug={slug} />
      <div className="w-full min-w-0">
        <PostHeader post={post} />

        <div className="mt-10">
          <Mdx code={post.code} />
        </div>

        <hr className="my-4" />

        {/* Post tag */}
        <div className="flex flex-row items-center justify-between">
          {tags && (
            <ul className="m-0 list-none space-x-2 p-0 text-sm text-muted-foreground">
              {tags.map((tag: string) => (
                <li className="inline-block p-0" key={tag}>
                  <Link
                    href={`/tags/${tag}`}
                    className="inline-block transition hover:text-muted-foreground/70"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {/* <SocialShare
                        text={`${title} via ${siteConfig.handle}`}
                        url={`${BASE_URL}/blog/${slug}`}
                    /> */}
        </div>

        {siteConfig.comments.enabled && <PostComment slug={slug} />}
      </div>

      {/* Table of contents */}
      <div className="hidden text-sm xl:block">
        <div className="sticky top-[var(--site-header-height)] -mt-10 max-h-[calc(var(--vh)-var(--site-header-height))] pt-10">
          <TableOfContents toc={toc} />
          {/* <hr className="my-4" /> */}
          {/* <div className="flex items-center justify-between">
                        <LikeButton slug={slug} />
                    </div> */}
        </div>
      </div>
    </article>
  );
};

export default BlogPage;
