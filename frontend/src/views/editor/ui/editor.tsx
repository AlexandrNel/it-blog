import { getPostById } from "@/entities/article";
import { ArticleCreate } from "@/features/article/article-create";
import { notFound } from "next/navigation";

export default async function Page({ params }: Partial<Pick<PageProps<"/editor/[id]">, "params">>) {
	const id = (await params)?.id;
	if (!id) {
		return <ArticleCreate />;
	} else {
		const post = await getPostById(id);
		if (!post) return notFound();
		return <ArticleCreate post={post} />;
	}
}
