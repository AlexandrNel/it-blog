import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FollowApi } from "../api/follow-profile-api";
import { type FollowStatusResponse, type FollowTypeRequest } from "../api/types";
import { type ApiError } from "@/shared/api";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/shared/config/cache-keys";

const followKey = ["follow-status"];

export const useFollowStatus = (userId: string) => {
  return useQuery<FollowStatusResponse>({
    queryFn: () => FollowApi.getFollowStatus(userId),
    queryKey: followKey,
    staleTime: Infinity,
  });
};
export const useUpdateFollowStatus = (username: string) => {
  const queryClient = useQueryClient();
  return useMutation<FollowStatusResponse, ApiError, FollowTypeRequest>({
    mutationFn: FollowApi.updateFollowStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile.summaryConnections(username) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile.statistic(username) });
      queryClient.setQueryData(followKey, data);
    },
    onError(error) {
      if (error.status === 400) return toast.error(error.message);
    },
  });
};
