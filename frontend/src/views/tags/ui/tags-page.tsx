import { PostList } from "@/entities/article";
import { getPostsByTag } from "@/entities/article/index.server";
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
        <Suspense>
          <FetchTagsPosts tag={tag} />
        </Suspense>
      </div>
    </div>
  );
}

async function FetchTagsPosts({ tag }: { tag: string }) {
  const articles = await getPostsByTag(tag);
  return <PostList classNameWrapper="lg:grid lg:grid-cols-2 flex flex-col gap-1" postList={articles} />;
}
