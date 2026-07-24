import { PostCard } from "@/entities/post";
import { getPostByUserId } from "@/entities/post/server";
import { EditMenuWrapper } from "@/features/post/post-menu";
import { EmptyCard } from "@/shared/ui/empty";

export async function ProfilePosts({ username }: { username: string }) {
  const posts = await getPostByUserId(username);
  return (
    <section>
      <h2 className="sr-only">Статьи </h2>
      {posts.length === 0 ? (
        <EmptyCard />
      ) : (
        <ul className="flex flex-col gap-2">
          {posts?.map((p) => (
            <li key={p.id}>
              <EditMenuWrapper authorId={p.id} slug={p.slug}>
                <PostCard post={p} />
              </EditMenuWrapper>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
