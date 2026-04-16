import { notFound } from "next/navigation";
import { ProfilePosts, ProfilePostsSkeleton } from "@/widgets/profile/profile-posts";
import { getProfileMetaById } from "@/entities/profile/";

import { getHeadersWithCookies } from "@/shared/lib/api";
import { Suspense } from "react";

export default async function ProfilePage({ params }: PageProps<"/articles/[id]">) {
	const [param, headers] = await Promise.all([params, getHeadersWithCookies()]);
	const meta = await getProfileMetaById(param.id, headers);

	if (!meta) return notFound();

	return (
		<Suspense fallback={<ProfilePostsSkeleton />}>
			<ProfilePosts userId={param.id} />
		</Suspense>
	);
}
