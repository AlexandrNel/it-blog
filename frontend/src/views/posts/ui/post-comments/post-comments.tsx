import { getComments } from "@/entities/comment/server";
import { PostWithQuery } from "./post-comments-with-query";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ScrollToComment } from "./scroll-to-comment";
import { Suspense } from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import { Card, CardContent } from "@/shared/ui/card";
import { commentFabricKeys } from "@/entities/comment";
import { WriteCommentEditor } from "@/features/comments/write-comment";

async function _PostComments({ params }: Pick<PageProps<"/posts/[slug]">, "params">) {
  const queryClient = new QueryClient();

  const slug = (await params).slug;

  await queryClient.prefetchQuery({
    queryKey: commentFabricKeys.list(),
    queryFn: () => getComments(slug),
  });

  return (
    <section id="comments" className="card">
      <h3 className="mb-4">Комментарии</h3>
      <div className="flex flex-col gap-2">
        <WriteCommentEditor entityType="post" entityId={slug} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PostWithQuery slug={slug} />
        </HydrationBoundary>
        <ScrollToComment />
      </div>
    </section>
  );
}

export const PostComments = ({ params }: Pick<PageProps<"/posts/[slug]">, "params">) => {
  return (
    <Suspense fallback={<PostCommentsSkeleton />}>
      <_PostComments params={params} />
    </Suspense>
  );
};

const PostCommentsSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <h2 className="mb-4">Комментарии</h2>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-[90px] rounded-lg p-2 flex items-end justify-start">
            <Skeleton className="h-10 w-[107px] rounded-lg" />
          </Skeleton>
          {Array.from({ length: 2 }, (_v, i) => (
            <Skeleton key={`comment-sk-${i}`} className="w-full h-20 rounded-lg" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
