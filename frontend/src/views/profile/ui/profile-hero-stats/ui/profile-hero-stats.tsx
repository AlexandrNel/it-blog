import { getProfileStatisticByUserId } from "@/entities/profile/server";
import { Suspense } from "react";
import { ProfileHeroStatsSkeleton } from "./profile-hero-stats-skeleton";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { PrefetchedHeroStats } from "./prefetched-profile-hero-stats";
import { profileFabricKeys } from "@/entities/profile";

type Props = {
  userId: string;
};

export async function _ProfileHeroStats({ userId }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: profileFabricKeys.statistic(userId),
    queryFn: () => getProfileStatisticByUserId(userId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PrefetchedHeroStats userId={userId} />
    </HydrationBoundary>
  );
}

export const ProfileHeroStats = (props: Props) => {
  return (
    <Suspense fallback={<ProfileHeroStatsSkeleton />}>
      <_ProfileHeroStats {...props} />
    </Suspense>
  );
};
