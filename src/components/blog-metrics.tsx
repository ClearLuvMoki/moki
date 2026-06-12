"use client";

import type { Blog } from "content-collections";
import { EyeIcon, MessageSquare, TimerIcon } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { api } from "@/trpc/react";

interface BlogMetricsProps {
  blog: Blog;
}

const BlogMetrics = ({ blog }: BlogMetricsProps) => {
  const { dict } = useLocale();

  const viewQuery = api.view.get.useQuery({ slug: blog.slug });
  const commentQuery = api.comment.getCount.useQuery({ slug: blog.slug });

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      <div className="flex items-center gap-1">
        <TimerIcon className="size-4" />
        <span>
          {blog.readingTime} {dict.blog.minRead}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <EyeIcon className="size-4" />
        <span>
          {viewQuery.isLoading ? "--" : viewQuery.data?.views} {dict.blog.views}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <MessageSquare className="size-4" />
        <span>
          {commentQuery.isLoading ? "--" : commentQuery.data}{" "}
          {dict.blog.comments}
        </span>
      </div>
    </div>
  );
};

export default BlogMetrics;
