import { PageLayout } from "@/shared/layouts/PageLayout";
import { Column } from "@/shared/ui/layout";
import { ProfileSidebarSkeleton } from "@/widgets/profile/profile-sidebar";
import { ProfileHeroSkeleton } from "@/widgets/profile/profile-hero";
import { ProfilePostsSkeleton } from "@/widgets/profile/profile-posts";
import { ProfileHeroStatsSkeleton } from "@/widgets/profile/profile-hero-stats";

export default function ProfileLoadingPage() {
	return (
		<PageLayout sidebar={<ProfileSidebarSkeleton />}>
			<Column>
				<ProfileHeroSkeleton />
				<ProfileHeroStatsSkeleton />
				<ProfilePostsSkeleton />
			</Column>
		</PageLayout>
	);
}
