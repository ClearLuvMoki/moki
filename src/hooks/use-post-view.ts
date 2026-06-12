"use client";

import { useEffect, useRef } from "react";
import { api } from "@/trpc/react";

export function usePostView(slug: string) {
  const hasIncremented = useRef(false);
  const utils = api.useUtils();
  const incrementMutation = api.view.increment.useMutation({
    onSuccess: () => {
      utils.view.get.invalidate({ slug });
    },
  });

  useEffect(() => {
    if (hasIncremented.current) return;
    hasIncremented.current = true;
    incrementMutation.mutate({ slug });
  }, [slug, incrementMutation]);
}
