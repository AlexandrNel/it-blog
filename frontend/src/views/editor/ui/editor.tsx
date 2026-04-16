import type { Post } from "@/entities/article";
import { ArticleCreate } from "@/features/article/article-create";
import { DeletePostButton } from "@/features/article/article-delete";

export default function Page({ post }: { post?: Post }) {
	return <ArticleCreate deleteButton={<DeletePostButton id={post?.id} />} post={post} />;
}
