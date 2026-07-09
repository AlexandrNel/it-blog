import { cn } from "@/shared/lib/utils";
import { TagList } from "@/entities/tag";
import { PostInfo, PostPreview } from "@/entities/post";
import { getPostBySlug } from "@/entities/post/server";
import { PostStatistic } from "./posts-statistic";
import { PostView } from "@/features/post/post-tracking";
import { EditorContent } from "@/shared/ui/tiptap-editor";
import { notFound } from "next/navigation";
import { EditBlock } from "@/features/post/post-menu";
import { Suspense } from "react";

async function _PostSection({ params }: Pick<PageProps<"/posts/[slug]">, "params">) {
  const slug = (await params).slug;
  const data = await getPostBySlug(slug);

  if (!data) {
    return notFound();
  }

  return (
    <article className="mb-2">
      <div className={cn(`transition-all bg-card text-foreground rounded-lg relative group`)}>
        {/* Text content of post */}
        <div className="p-4 max-[425px]:p-2 rounded-lg">
          <div className="mb-3">
            <EditBlock slug={slug} authorId={data.author.id} />
            <PostInfo author={data.author} createdAt={data.createdAt} />
            <h1 className="font-bold md:text-[25px] text-lg mb-2 ">{data.title}</h1>
            <PostPreview previewContent={data.previewContent} image={data.previewImage} />

            <div className={`mb-5 text-[16px] `}>
              <EditorContent content={data.content} />
            </div>
            <TagList list={data.tags} />
          </div>
          <PostStatistic postId={data.id} />
        </div>
      </div>
      <PostView id={data.id} />
    </article>
  );
}

export const PostSection = ({ params }: Pick<PageProps<"/posts/[slug]">, "params">) => {
  return (
    <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse mb-2" />}>
      <_PostSection params={params} />
    </Suspense>
  );
};
