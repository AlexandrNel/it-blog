import { profileKeys } from "@/entities/profile";
import { ProfileAPI } from "@/entities/profile/api/client";
import { useQuery } from "@tanstack/react-query";

export const useProfileStatistic = (userId: string) => {
	return useQuery({
		queryKey: profileKeys.summary,
		queryFn: () => ProfileAPI.getStatistic(userId),
	});
};
