"use cache";
import { cn } from "@/shared/lib/utils";
import { TagList } from "@/entities/tag";
import { ArticleInfo, ArticlePreview, getPostBySlug, getTagForCache } from "@/entities/article";
import { ArticleStatistic } from "./ArticlesStatistic";
import { ArticleView } from "@/features/article/article-tracking";
import { EditorContent } from "@/shared/ui/tiptap-editor";
import { EditBlock } from "@/features/article/article-menu";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";

export async function generateMetadata(props: PageProps<"/articles/[id]">): Promise<Metadata> {
	const { id } = await props.params;
	const post = await getPostBySlug(id);
	if (!post) return {};

	return {
		title: post.title,
		description: post.desc,
		publisher: post.author.username,
		other: {
			date: new Date(post.createdAt).toUTCString(),
		},
	};
}

export async function PostSection({ params }: PageProps<"/articles/[id]">) {
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
