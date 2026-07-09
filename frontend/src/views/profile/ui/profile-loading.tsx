import { PageLayout } from "@/shared/layouts/page-layout";
import { Column } from "@/shared/ui/layout";
import { ProfileInfoSkeleton } from "./profile-info";
import { ProfileHeroSkeleton } from "./profile-hero";
import { ProfileHeroStatsSkeleton } from "./profile-hero-stats";
import { ProfileTabsSkeleton } from "./profile-tabs";

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
