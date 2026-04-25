import type { Post } from "@/entities/article";
import { ArticleCreate } from "@/features/article/article-create";

export default function Page({ post }: { post?: Post }) {
	return <ArticleCreate post={post} />;
}
