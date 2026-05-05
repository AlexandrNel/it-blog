import { PostCard } from "@/entities/article";
import { getPostByUserId } from "@/entities/article/index.server";

export async function ProfilePosts({ userId }: { userId: string }) {
	const posts = await getPostByUserId(userId);

	return (
		<>
			{posts?.map((p) => (
				<PostCard key={p.id} post={p} />
			))}
		</>
	);
}
