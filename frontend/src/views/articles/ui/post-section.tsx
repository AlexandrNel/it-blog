import { cn } from "@/shared/lib/utils";
import { TagList } from "@/entities/tag";
import { ArticleInfo, ArticlePreview, getPostBySlug, getTagForCache } from "@/entities/article";
import { ArticleStatistic } from "./ArticlesStatistic";
import { ArticleView } from "@/features/article/article-tracking";
import { EditorContent } from "@/shared/ui/tiptap-editor";
import { notFound } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";
import { EditBlock } from "@/features/article/article-menu";
import { Suspense } from "react";

async function _PostSection({ params }: Pick<PageProps<"/articles/[id]">, "params">) {
	"use cache";
	cacheLife("max");

	const id = (await params).id;
	const data = await getPostBySlug(id);

	if (!data) {
		return notFound();
	}

	cacheTag(getTagForCache(data.id));

	return (
		<article className="mb-2">
			<div className={cn(` transition-all bg-card text-foreground rounded-lg  relative group`)}>
				<EditBlock postId={data.id} authorId={data.author.id} />

				{/* Text content of article */}
				<div className="px-5 py-3  rounded-lg">
					<ArticleInfo author={data.author} createdAt={data.createdAt} />
					<h1 className="font-bold text-[25px] mb-2 ">{data.title}</h1>
					<ArticlePreview previewContent={data.previewContent} imageUrl={data.previewImageUrl} />

					<div className={`mb-5 text-[16px] `}>
						<EditorContent content={data.content} />
					</div>
					<TagList className="mb-5" list={data.tags} />
					<ArticleStatistic postId={data.id} />
				</div>
			</div>

			<ArticleView id={data.id} />
		</article>
	);
}

export const PostSection = ({ params }: Pick<PageProps<"/articles/[id]">, "params">) => {
	return (
		<Suspense fallback={<div className="h-96 bg-card rounded-lg animate-pulse mb-2" />}>
			<_PostSection params={params} />
		</Suspense>
	);
};
