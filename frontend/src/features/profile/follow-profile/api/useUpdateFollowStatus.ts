import { type FollowStatusResponse, type FollowTypeRequest, ProfileAPI, profileFabricKeys } from "@/entities/profile";
import { DefaultError, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateFollowStatus = (username: string) => {
  const queryClient = useQueryClient();
  return useMutation<FollowStatusResponse, DefaultError, FollowTypeRequest>({
    mutationFn: ProfileAPI.updateFollowStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: profileFabricKeys.connectionSummary(username) });
      queryClient.invalidateQueries({ queryKey: profileFabricKeys.statistic(username) });
      queryClient.setQueryData(profileFabricKeys.followStatus(username), data);
    },
  });
};
