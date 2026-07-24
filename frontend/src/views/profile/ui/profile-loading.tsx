import { PageLayout } from "@/shared/layouts/page-layout/page-layout";
import { Column } from "@/shared/ui/layout";
import { ProfileInfoSkeleton } from "./profile-info";
import { ProfileHeroSkeleton } from "./profile-hero/profile-hero-skeleton";
import { ProfileHeroStatsSkeleton } from "./profile-hero-stats/profile-hero-stats-skeleton";
import { ProfileTabsSkeleton } from "./profile-tabs/profile-tabs-skeleton";

export default function ProfileLoadingPage() {
  return (
    <PageLayout sidebar={<ProfileInfoSkeleton className="max-lg:hidden" />}>
      <Column>
        <ProfileHeroSkeleton />
        <ProfileHeroStatsSkeleton className="max-lg:hidden" />
        <ProfileTabsSkeleton />
      </Column>
    </PageLayout>
  );
}
