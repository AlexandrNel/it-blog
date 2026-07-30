import { type FollowStatusResponse, type FollowTypeRequest, ProfileAPI, profileFabricKeys } from "@/entities/profile";
import { type DefaultError, useMutation } from "@tanstack/react-query";

export const useUpdateFollowStatus = (username: string) => {
  return useMutation<FollowStatusResponse, DefaultError, FollowTypeRequest>({
    mutationFn: ProfileAPI.updateFollowStatus,
    onSuccess: (data, vars, _m, context) => {
      context.client.invalidateQueries({ queryKey: profileFabricKeys.connectionSummary(username) });
      context.client.invalidateQueries({ queryKey: profileFabricKeys.statistic(username) });
      context.client.setQueryData(profileFabricKeys.followStatus(vars.userId), data);
    },
  });
};
