import { PostCard } from "@/entities/post";
import { getPostByUserId } from "@/entities/post/server";
import { EditMenuWrapper } from "@/features/post/post-menu";
import { EmptyCard } from "@/shared/ui/empty";

export async function ProfilePosts({ userId }: { userId: string }) {
  const posts = await getPostByUserId(userId);

  return (
    <section>
      <h2 className="sr-only">Статьи </h2>
      {!posts?.length ? (
        <EmptyCard />
      ) : (
        posts?.map((p) => (
          <EditMenuWrapper key={p.id} authorId={p.id} slug={p.slug}>
            <PostCard post={p} />
          </EditMenuWrapper>
        ))
      )}
    </section>
  );
}
