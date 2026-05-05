import { PostCard } from "@/entities/article";
import { getPostByUserId } from "@/entities/article/index.server";
import { EditBlock } from "@/features/article/article-menu";

export async function ProfilePosts({ userId }: { userId: string }) {
	const posts = await getPostByUserId(userId);

	return (
		<>
			{posts?.map((p) => (
				<PostCard key={p.id} post={p} header={<EditBlock authorId={p.author.id} slug={p.slug} />} />
			))}
		</>
	);
}
