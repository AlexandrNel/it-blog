import { type PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getProfileById, getProfileStatisticByUserId, getProfileMetaById } from "@/entities/profile/server";
import { ProfileVisibility } from "./profile-visibility";
import { ProfileHero } from "./profile-hero";
import { ProfileTabs } from "./profile-tabs";
import { Column } from "@/shared/ui/layout";
import { PageLayout } from "@/shared/layouts/page-layout/page-layout";
import { isMobileRequest } from "@/shared/lib/utils/server/is-mobile-request";

const ProfileSidebar = dynamic(() => import("./profile-sidebar").then((mod) => mod.ProfileSidebar));

const ProfileStats = dynamic(() => import("@/views/profile/ui/profile-hero-stats").then((mod) => mod.ProfileHeroStats));

export default async function ProfilePage({ params, children }: PropsWithChildren<LayoutProps<"/profile/[id]">>) {
  const param = await params;
  const [meta, profile, isMobile] = await Promise.all([
    getProfileMetaById(param.id),
    getProfileById(param.id),
    isMobileRequest(),
    getProfileStatisticByUserId(param.id),
  ]);

  if (!meta || !profile) return notFound();
  const isHide = meta.isBlocked || !meta.isPublic || !isMobile;
  return (
    <PageLayout withoutPaddingTop className="md:mt-2" sidebar={isHide ? <ProfileSidebar userId={param.id} /> : null}>
      <ProfileVisibility meta={meta}>
        <ProfileHero userId={param.id} />
        {!isMobile && <ProfileStats userId={param.id} />}
        <Column className="max-md:gap-0 lg:mt-2">
          <ProfileTabs userId={param.id} />
          {children}
        </Column>
      </ProfileVisibility>
    </PageLayout>
  );
}
