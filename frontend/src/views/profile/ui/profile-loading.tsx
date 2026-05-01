import { PageLayout } from "@/shared/layouts/PageLayout";
import { Column } from "@/shared/ui/layout";
import { ProfileInfoSkeleton } from "@/widgets/profile/profile-info";
import { ProfileHeroSkeleton } from "@/widgets/profile/profile-hero";
import { ProfilePostsSkeleton } from "@/widgets/profile/profile-posts";
import { ProfileHeroStatsSkeleton } from "@/widgets/profile/profile-hero-stats";

export default function ProfileLoadingPage() {
	return (
		<PageLayout sidebar={<ProfileInfoSkeleton />}>
			<Column>
				<ProfileHeroSkeleton />
				<ProfileHeroStatsSkeleton />
				<ProfilePostsSkeleton />
			</Column>
		</PageLayout>
	);
}
