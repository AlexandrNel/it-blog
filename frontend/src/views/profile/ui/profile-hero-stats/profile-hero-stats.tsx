import { getProfileStatisticByUserId } from "@/entities/profile/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { PrefetchedHeroStats } from "./prefetched-profile-hero-stats";
import { profileFabricKeys } from "@/entities/profile";

type Props = {
  username: string;
};

export async function ProfileHeroStats({ username }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: profileFabricKeys.statistic(username),
    queryFn: () => getProfileStatisticByUserId(username),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PrefetchedHeroStats userId={username} />
    </HydrationBoundary>
  );
}
