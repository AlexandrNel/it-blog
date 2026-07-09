"use client";
import { usePostComments } from "@/entities/comment";
import { Skeleton } from "@/shared/ui/skeleton";
import { WrappedCommentCard } from "./wrapped-comment-card";

export function PostWithQuery({ slug }: { slug: string }) {
  const { data, isLoading } = usePostComments(slug);

  return (
    <ul>
      {isLoading && <Skeleton className="w-full h-20 rounded-lg my-2" />}
      {data?.map((c) => (
        <li className="mt-2 px-2" key={c.id}>
          <WrappedCommentCard comment={c} />
        </li>
      ))}
    </ul>
  );
}
