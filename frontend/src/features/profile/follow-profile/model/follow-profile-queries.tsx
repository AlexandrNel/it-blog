import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FollowApi } from "../api/follow-profile-api";
import type { FollowStatusResponse, FollowTypeRequest } from "../api/types";
import type { ApiError } from "@/shared/lib/api";
import { toast } from "sonner";

const follorKey = ["follow-status"];

export const useFollowStatus = (userId: string) => {
	return useQuery<FollowStatusResponse>({
		queryFn: () => FollowApi.getFollowStatus(userId),
		queryKey: follorKey,
		staleTime: Infinity,
	});
};
export const useUpdateFollowStatus = () => {
	const queryClient = useQueryClient();
	return useMutation<FollowStatusResponse, ApiError, FollowTypeRequest>({
		mutationFn: FollowApi.updateFollowStatus,
		onSuccess: (data) => {
			queryClient.setQueryData(follorKey, data);
		},
		onError(error) {
			if (error.status === 400 || error.status === 500) return toast.error(error.message);
		},
	});
};
