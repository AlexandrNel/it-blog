import { PostCard } from "@/entities/post";
import { getPostByUserId } from "@/entities/post/server";
import { EditBlock } from "@/features/post/post-menu";
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
          <PostCard
            key={p.id}
            post={p}
            header={<EditBlock authorId={p.author.id} slug={p.slug} />}
          />
        ))
      )}
    </section>
  );
}
