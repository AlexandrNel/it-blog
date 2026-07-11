"use client";
import { Skeleton } from "@/shared/ui/skeleton";
import { WrappedCommentCard } from "./wrapped-comment-card";
import { useQuery } from "@tanstack/react-query";
import { CommentQueries } from "@/entities/comment";

export function PostWithQuery({ slug }: { slug: string }) {
  const { data, isLoading } = useQuery(CommentQueries.byPost(slug));

  return (
    <ul>
      {isLoading && (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 2 }, (_v, i) => (
            <Skeleton key={`comment-sk-${i}`} className="w-full h-20 rounded-lg" />
          ))}
        </div>
      )}
      {data?.map((c) => (
        <li className="px-2" key={c.id}>
          <WrappedCommentCard comment={c} />
        </li>
      ))}
    </ul>
  );
}
