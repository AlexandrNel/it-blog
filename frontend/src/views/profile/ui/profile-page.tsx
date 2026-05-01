import { notFound } from "next/navigation";
import { ProfilePosts, ProfilePostsSkeleton } from "@/widgets/profile/profile-posts";
import { getProfileMetaById } from "@/entities/profile/index.server";
import { Suspense } from "react";

export default async function ProfilePage({ params }: PageProps<"/articles/[id]">) {
	const param = await params;
	const meta = await getProfileMetaById(param.id);

	if (!meta) return notFound();

	return (
		<Suspense fallback={<ProfilePostsSkeleton />}>
			<ProfilePosts userId={param.id} />
		</Suspense>
	);
}
