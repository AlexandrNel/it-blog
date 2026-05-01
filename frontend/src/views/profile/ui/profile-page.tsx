import { notFound } from "next/navigation";
import { ProfilePosts, ProfilePostsSkeleton } from "@/widgets/profile/profile-posts";
import { getProfileMetaById } from "@/entities/profile/";

import { getHeadersWithCookies } from "@/shared/lib/api";
import { Suspense } from "react";
import { cookies } from "next/headers";

export default async function ProfilePage({ params }: PageProps<"/articles/[id]">) {
	const [param, cookie] = await Promise.all([params, cookies()]);
	const meta = await getProfileMetaById(param.id, getHeadersWithCookies(cookie));

	if (!meta) return notFound();

	return (
		<Suspense fallback={<ProfilePostsSkeleton />}>
			<ProfilePosts userId={param.id} />
		</Suspense>
	);
}
