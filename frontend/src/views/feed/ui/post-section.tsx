import { PostCard } from "@/entities/post";
import { Pagination } from "./Pagination";
import { EditMenuWrapper } from "@/features/post/post-menu";
import { getAllPosts } from "@/entities/post/server";
import { PostSectionFallback } from "./post-section-fallback";

export async function PostSection({
  searchParams,
}: Pick<PageProps<"/posts/[slug]">, "searchParams">) {
  const param = Number((await searchParams).page);
  const sort = (await searchParams).sort;
  const page = Number.isFinite(param) ? param : undefined;
  const posts = await getAllPosts(sort as string, page);
  return (
    <section>
      <h1 className="sr-only">Лента статей</h1>
      <ul>
        {!posts || !posts.data.length ? (
          <PostSectionFallback />
        ) : (
          posts.data.map((p) => (
            <li key={p.id} className="mb-2">
              <EditMenuWrapper slug={p.slug} authorId={p.author.id}>
                <PostCard post={p} />
              </EditMenuWrapper>
            </li>
          ))
        )}
      </ul>
      {posts && <Pagination page={page} pages={posts.pages} />}
    </section>
  );
}
