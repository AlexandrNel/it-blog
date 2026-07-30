import { Suspense, type PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { getProfileMetaById } from "@/entities/profile/server";
import { ProfileVisibility } from "./profile-visibility";
import { Column } from "@/shared/ui/layout";
import { PageLayout } from "@/shared/layouts/page-layout/page-layout";
import { isMobileRequest } from "@/shared/lib/utils/server/is-mobile-request";
import { ProfileHeroStatsSkeleton } from "./profile-hero-stats/profile-hero-stats-skeleton";
import { ProfileHero } from "./profile-hero/profile-hero";
import { ProfileTabs } from "./profile-tabs/profile-tabs";
import { ProfileTabsSkeleton } from "./profile-tabs/profile-tabs-skeleton";
import { ErrorBoundary } from "@/shared/layouts";
import { ProfileHeroSkeleton } from "./profile-hero/profile-hero-skeleton";

const ProfileSidebar = dynamic(() => import("./profile-sidebar").then((mod) => mod.ProfileSidebar));

const ProfileStats = dynamic(() =>
  import("@/views/profile/ui/profile-hero-stats/profile-hero-stats").then(
    (mod) => mod.ProfileHeroStats,
  ),
);

export default async function ProfilePage({
  params,
  children,
}: PropsWithChildren<LayoutProps<"/profile/[username]">>) {
  const { username } = await params;

  const [meta, isMobile] = await Promise.all([getProfileMetaById(username), isMobileRequest()]);

  const isHide = meta.isBlocked || !meta.isPublic || !isMobile;

  return (
    <PageLayout
      withoutPaddingTop
      className="md:mt-2"
      sidebar={isHide ? <ProfileSidebar userId={username} /> : null}
    >
      <ProfileVisibility meta={meta}>
        <Suspense fallback={<ProfileHeroSkeleton />}>
          <ProfileHero userId={username} />
        </Suspense>
        <Suspense fallback={<ProfileHeroStatsSkeleton />}>
          {!isMobile && <ProfileStats username={username} />}
        </Suspense>
        <Column className="max-md:gap-0 lg:mt-2">
          <ErrorBoundary fallback={"error"}>
            <Suspense fallback={<ProfileTabsSkeleton />}>
              <ProfileTabs username={username} />
            </Suspense>
          </ErrorBoundary>
          {children}
        </Column>
      </ProfileVisibility>
    </PageLayout>
  );
}
