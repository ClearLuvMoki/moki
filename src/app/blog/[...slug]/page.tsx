import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBlogs } from "content-collections";
import { absoluteUrl, formatDate } from "@/lib/utils";
import Mdx from "@/components/mdx/mdx-components";
import { Metadata } from "next";
import BreadcrumbNavigation from "@/components/layout/breadcrumb-navigation";
import TableOfContents from "@/components/toc";

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
  const blog = allBlogs.find((post) => post.slug === slug);

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

  const { title, createDate, img, slug, author, excerpt, tags, toc } = post;

  return (
    <article className="relative lg:gap-10 xl:grid xl:max-w-6xl xl:grid-cols-[1fr_250px]">
      {/* Blog content */}
      <div className="w-full min-w-0">
        <BreadcrumbNavigation pageTitle={title} />

        <div>
          <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl break-all">
            {title}
          </h1>

          <div className="text-md mt-4 flex justify-between text-muted-foreground">
            {createDate && (
              <time dateTime={createDate}>{formatDate(createDate)}</time>
            )}

            {/* <PostMetrics post={post} /> */}
          </div>

          {/* <div className="mt-4 flex space-x-4">
                        {author}
                    </div> */}

          {img && (
            <Image
              src={post.img}
              alt={post.title}
              width={832}
              height={405}
              className="my-8 rounded-md border bg-muted transition-colors"
              priority
            />
          )}
        </div>

        {/* {series && (
          <div className="not-prose">
            <PostSeriesBox series={post.series} />
          </div>
        )} */}

        <Mdx code={post.code} />

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

        {/* <PostComment slug={slug} /> */}
      </div>

      {/* Table of contents */}
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] pt-10">
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
