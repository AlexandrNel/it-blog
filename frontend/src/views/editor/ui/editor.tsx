import { getPostBySlug } from "@/entities/article/index.server";
import { ArticleCreate } from "@/features/article/article-create";
import { notFound } from "next/navigation";

export default async function Page({
	params,
}: Partial<Pick<PageProps<"/editor/[slug]">, "params">>) {
	const slug = (await params)?.slug;
	if (!slug) {
		return <ArticleCreate />;
	} else {
		const post = await getPostBySlug(slug);
		if (!post) return notFound();
		return <ArticleCreate post={post} />;
	}
}
