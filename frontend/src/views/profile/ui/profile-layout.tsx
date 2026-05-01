import { notFound } from "next/navigation";
import { ProfileSidebar, ProfileSidebarSkeleton } from "@/widgets/profile/profile-sidebar";
import { ProfileHero, ProfileHeroSkeleton } from "@/widgets/profile/profile-hero";
import { ProfileVisibility } from "./profile-visibility";
import { getProfileMetaById } from "@/entities/profile/";
import { Column } from "@/shared/ui/layout";
import { PageLayout } from "@/shared/layouts/PageLayout";
import { ProfileHeroStats, ProfileHeroStatsSkeleton } from "@/widgets/profile/profile-hero-stats";
import { getHeadersWithCookies } from "@/shared/lib/api";
import { type PropsWithChildren, Suspense } from "react";
import { ProfileTabs } from "@/widgets/profile/profile-tabs";
import { cookies } from "next/headers";

export default async function ProfilePage({
	params,
	children,
}: PropsWithChildren<LayoutProps<"/profile/[id]">>) {
	const [param, cookie] = await Promise.all([params, cookies()]);
	const meta = await getProfileMetaById(param.id, getHeadersWithCookies(cookie));

	if (!meta) return notFound();

	return (
		<PageLayout
			hideSidebar={meta.isBlocked || !meta.isPublic}
			sidebar={
				<Suspense fallback={<ProfileSidebarSkeleton />}>
					<ProfileSidebar userId={param.id} />
				</Suspense>
			}
		>
			<ProfileVisibility meta={meta}>
				<Column>
					<Suspense fallback={<ProfileHeroSkeleton />}>
						<ProfileHero userId={param.id} isOwner={meta.isOwner} />
					</Suspense>
					<Suspense fallback={<ProfileHeroStatsSkeleton />}>
						<ProfileHeroStats userId={param.id} />
					</Suspense>
					<Suspense>
						<ProfileTabs userId={param.id} />
					</Suspense>
					{children}
				</Column>
			</ProfileVisibility>
		</PageLayout>
	);
}
