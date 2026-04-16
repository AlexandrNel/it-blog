import { getComments } from "@/entities/comment/api/server";
import { WriteCommentEditor } from "@/features/comments/write-comment";
import { PostWithQuery } from "./post-with-query";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPostBySlug } from "@/entities/article";
import { notFound } from "next/navigation";
import { ScrollToComment } from "./scroll-to-comment";

export async function PostComments({ params }: PageProps<"/articles/[id]">) {
  const queryClient = new QueryClient();

  const id = (await params).id;
  const post = await getPostBySlug(id);

  if (!post) {
    return notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(post.id),
  });

  return (
    <section id="comments" className="card">
      <h3 className="mb-4">Комментарии</h3>
      <WriteCommentEditor entityType="post" entityId={post.id} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostWithQuery postId={post.id} />
      </HydrationBoundary>
      <ScrollToComment />
    </section>
  );
}
