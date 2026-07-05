import { ProfileAPI } from "@/entities/profile/api/client";
import { QUERY_KEYS } from "@/shared/config/cache-keys";
import { useQuery } from "@tanstack/react-query";

export const useProfileStatistic = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.profile.statistic(userId),
    queryFn: () => ProfileAPI.getStatistic(userId),
  });
};
