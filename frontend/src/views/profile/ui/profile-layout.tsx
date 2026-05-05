import type { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ProfileVisibility } from "./profile-visibility";
import { ProfileHero } from "@/widgets/profile/profile-hero";
import { ProfileTabs } from "@/widgets/profile/profile-tabs";
import { getProfileMetaById } from "@/entities/profile/index.server";
import { Column } from "@/shared/ui/layout";
import { PageLayout } from "@/shared/layouts/page-layout";
import { isMobileRequest } from "@/shared/lib/utils/server/is-mobile-request";

const ProfileSidebar = dynamic(() => import("./profile-sidebar").then((mod) => mod.ProfileSidebar));

const ProfileStats = dynamic(() =>
	import("@/widgets/profile/profile-hero-stats").then((mod) => mod.ProfileHeroStats),
);

export default async function ProfilePage({
	params,
	children,
}: PropsWithChildren<LayoutProps<"/profile/[id]">>) {
	const param = await params;
	const [meta, isMobile] = await Promise.all([getProfileMetaById(param.id), isMobileRequest()]);

	if (!meta) return notFound();
	const isHide = meta.isBlocked || !meta.isPublic || !isMobile;
	return (
		<PageLayout
			withoutPaddingTop
			className="md:mt-2"
			sidebar={isHide ? <ProfileSidebar userId={param.id} /> : null}
		>
			<ProfileVisibility meta={meta}>
				<Column className="max-md:gap-0">
					<ProfileHero userId={param.id} isOwner={meta.isOwner} />
					{!isMobile && <ProfileStats userId={param.id} />}
					<ProfileTabs userId={param.id} />
					{children}
				</Column>
			</ProfileVisibility>
		</PageLayout>
	);
}
