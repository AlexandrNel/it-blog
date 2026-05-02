import { PageLayout } from "@/shared/layouts/page-layout";
import { Column } from "@/shared/ui/layout";
import { ProfileInfoSkeleton } from "@/widgets/profile/profile-info";
import { ProfileHeroSkeleton } from "@/widgets/profile/profile-hero";
import { ProfilePostsSkeleton } from "@/widgets/profile/profile-posts";
import { ProfileHeroStatsSkeleton } from "@/widgets/profile/profile-hero-stats";
// TODO: добавь скелетон табов
export default function ProfileLoadingPage() {
	return (
		<PageLayout sidebar={<ProfileInfoSkeleton className="max-lg:hidden" />}>
			<Column>
				<ProfileHeroSkeleton />
				<ProfileHeroStatsSkeleton className="max-lg:hidden" />
				{/* TODO */}
				<ProfilePostsSkeleton />
			</Column>
		</PageLayout>
	);
}
