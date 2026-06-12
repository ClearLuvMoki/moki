"use client";

import { usePostView } from "@/hooks/use-post-view";

export function PostViewTracker({ slug }: { slug: string }) {
  usePostView(slug);
  return null;
}
