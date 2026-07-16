import { ProfileAPI, profileFabricKeys } from "@/entities/profile";
import { useQuery } from "@tanstack/react-query";

export const useProfileStatistic = (userId: string) => {
  return useQuery({
    queryKey: profileFabricKeys.statistic(userId),
    queryFn: () => ProfileAPI.getStatistic(userId),
  });
};
