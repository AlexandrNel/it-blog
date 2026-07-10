import { TagList } from "@/entities/tag";
import { PostInfo, PostPreview } from "@/entities/post";
import { getPostBySlug } from "@/entities/post/server";
import { PostStatistic } from "./posts-statistic";
import { PostView } from "@/features/post/post-tracking";
import { EditorContent } from "@/shared/ui/tiptap-editor";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EditMenuWrapper } from "@/features/post/post-menu";
import { Card, CardContent, CardFooter } from "@/shared/ui";

async function _PostSection({ params }: Pick<PageProps<"/posts/[slug]">, "params">) {
  const slug = (await params).slug;
  const data = await getPostBySlug(slug);

  if (!data) {
    return notFound();
  }

  return (
    <article className="mb-2">
      <EditMenuWrapper slug={slug} authorId={data.author.id}>
        <Card className="gap-2">
          <CardContent>
            <PostInfo author={data.author} createdAt={data.createdAt} />
            <h1 className="font-bold md:text-[20px] text-lg my-2 ">{data.title}</h1>
            <PostPreview previewContent={data.previewContent} image={data.previewImage} />

            <div className={`mb-5 text-[16px] `}>
              <EditorContent content={data.content} />
            </div>
            <TagList list={data.tags} />
          </CardContent>
          <CardFooter>
            <PostStatistic postId={data.id} />
          </CardFooter>
        </Card>
      </EditMenuWrapper>
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
