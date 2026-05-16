import { ProfilePosts, ProfilePostsSkeleton } from "@/widgets/profile/profile-posts";
import { Suspense } from "react";

export default async function ProfilePage({ params }: PageProps<"/profile/[id]">) {
	const param = await params;
	return (
		<Suspense fallback={<ProfilePostsSkeleton />}>
			<ProfilePosts userId={param.id} />
		</Suspense>
	);
}
