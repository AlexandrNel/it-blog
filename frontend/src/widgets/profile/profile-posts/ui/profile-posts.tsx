import { getPostByUserId, PostCard } from "@/entities/article";
import { cacheLife } from "next/cache";

export async function ProfilePosts({ userId }: { userId: string }) {
	"use cache";
	cacheLife({ stale: 30, revalidate: 10, expire: 60 });
	const posts = await getPostByUserId(userId);

	return (
		<>
			{posts?.map((p) => (
				<PostCard key={p.id} post={p} />
			))}
		</>
	);
}
