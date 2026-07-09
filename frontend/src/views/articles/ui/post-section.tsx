import { cn } from "@/shared/lib/utils";
import { TagList } from "@/entities/tag";
import { ArticleInfo, ArticlePreview } from "@/entities/article";
import { getPostBySlug } from "@/entities/article/server";
import { ArticleStatistic } from "./articles-statistic";
import { ArticleView } from "@/features/article/article-tracking";
import { EditorContent } from "@/shared/ui/tiptap-editor";
import { notFound } from "next/navigation";
import { EditBlock } from "@/features/article/article-menu";
import { Suspense } from "react";

async function _PostSection({ params }: Pick<PageProps<"/articles/[slug]">, "params">) {
  const slug = (await params).slug;
  const data = await getPostBySlug(slug);

  if (!data) {
    return notFound();
  }

  return (
    <article className="mb-2">
      <div className={cn(`transition-all bg-card text-foreground rounded-lg relative group`)}>
        {/* Text content of article */}
        <div className="p-4 max-[425px]:p-2 rounded-lg">
          <div className="mb-3">
            <EditBlock slug={slug} authorId={data.author.id} />
            <ArticleInfo author={data.author} createdAt={data.createdAt} />
            <h1 className="font-bold md:text-[25px] text-lg mb-2 ">{data.title}</h1>
            <ArticlePreview previewContent={data.previewContent} image={data.previewImage} />

            <div className={`mb-5 text-[16px] `}>
              <EditorContent content={data.content} />
            </div>
            <TagList list={data.tags} />
          </div>
          <ArticleStatistic postId={data.id} />
        </div>
      </div>
      <ArticleView id={data.id} />
    </article>
  );
}

export const PostSection = ({ params }: Pick<PageProps<"/articles/[slug]">, "params">) => {
  return (
    <Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse mb-2" />}>
      <_PostSection params={params} />
    </Suspense>
  );
};
