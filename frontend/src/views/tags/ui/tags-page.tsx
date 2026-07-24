import { PostCard, PostList } from "@/entities/post";
import { getPostsByTag } from "@/entities/post/server";
import { Suspense } from "react";

export async function TagsPage({ params }: Pick<PageProps<"/tags/[tag]">, "params">) {
  const { tag } = await params;
  const tagValue = decodeURIComponent(tag);
  return (
    <div className="mt-2">
      <div className="">
        <div className="mb-2 text-center">
          <h2 className="text-2xl font-bold">Статьи по тэгу: {tagValue}</h2>
        </div>
        <Suspense fallback={`Ищем статьи по тегу: ${tag}`}>
          <FetchTagsPosts tag={tag} />
        </Suspense>
      </div>
    </div>
  );
}

async function FetchTagsPosts({ tag }: { tag: string }) {
  const posts = await getPostsByTag(tag);
  const midIndex = posts.length / 2;
  const columns = [posts.slice(0, midIndex), posts.slice(midIndex)];

  return (
    <div className="grid grid-cols-2 max-lg:flex gap-2 max-lg:flex-col">
      {columns.map((col, i) => (
        <ul key={`column-${i}`} className="flex flex-col gap-2">
          {col.map((post) => (
            <li key={post.id}>
              <PostCard className="h-auto" key={post.id} post={post} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
