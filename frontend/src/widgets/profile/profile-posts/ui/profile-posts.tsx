import { getPostByUserId } from "@/entities/article";
import { Card } from "@/shared/ui/card";
import { Column } from "@/shared/ui/layout";
import { ProfilePostCard } from "./profile-post-card";
import { cacheLife } from "next/cache";

export async function ProfilePosts({ userId }: { userId: string }) {
	"use cache";
	cacheLife({ stale: 30, revalidate: 10, expire: 60 });
	const posts = await getPostByUserId(userId);

	return (
		<>
			{posts?.map((p) => (
				<ProfilePostCard key={p.id} post={p} />
			))}
		</>
	);
}
