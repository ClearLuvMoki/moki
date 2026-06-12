"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import { api } from "@/trpc/react";

interface PostCommentProps {
  slug: string;
}

const PostComment = ({ slug }: PostCommentProps) => {
  const { dict } = useLocale();
  const utils = api.useUtils();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const commentsQuery = api.comment.list.useQuery({ slug });

  const createMutation = api.comment.create.useMutation({
    onSuccess: async () => {
      setContent("");
      await utils.comment.list.invalidate({ slug });
      await utils.comment.getCount.invalidate({ slug });
      toast.success(dict.blog.submit);
    },
    onError: () => {
      toast.error("Failed to post comment");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    createMutation.mutate({
      slug,
      name: name.trim(),
      email: email.trim(),
      content: content.trim(),
    });
  };

  return (
    <section className="not-prose mt-12 space-y-6">
      <h2 className="font-heading text-2xl">
        {dict.blog.comments} ({commentsQuery.data?.length ?? 0})
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            placeholder={dict.blog.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder={dict.blog.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Textarea
          placeholder={dict.blog.commentPlaceholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          required
        />
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? dict.blog.submitting : dict.blog.submit}
        </Button>
      </form>

      <div className="space-y-4">
        {commentsQuery.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : commentsQuery.data?.length ? (
          commentsQuery.data.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border bg-muted/30 p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-2 text-sm">
                <span className="font-medium">{comment.name}</span>
                <time
                  dateTime={comment.createdAt.toISOString()}
                  className="text-muted-foreground"
                >
                  {formatDate(comment.createdAt.toISOString())}
                </time>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">{dict.blog.noComments}</p>
        )}
      </div>
    </section>
  );
};

export default PostComment;
