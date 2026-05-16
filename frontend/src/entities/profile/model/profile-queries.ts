"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ProfileAPI } from "../api/client";
import type {
	Profile,
	ProfileConnectionKind,
	ProfileConnectionsPage,
	ProfileConnectionsSummary,
} from "./profile";
import { QUERY_KEYS } from "@/shared/config/cache-keys";


export const useProfileConnections = ({
	userId,
	type,
	enabled,
}: {
	userId: Profile["author"]["id"];
	type: ProfileConnectionKind;
	enabled: boolean;
}) => {
	return useInfiniteQuery<ProfileConnectionsPage>({
		queryKey: QUERY_KEYS.profile.summary(userId, type),
		queryFn: ({ pageParam }) =>
			ProfileAPI.getConnections({
				userId,
				type,
				page: Number(pageParam),
			}),
		getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
		initialPageParam: 1,
		enabled,
		retry: false,
		staleTime: 30_000,
	});
};

export const useProfileConnectionsSummary = (userId: string) => {
	return useQuery<ProfileConnectionsSummary>({
		queryKey: QUERY_KEYS.profile.summaryConnections(userId),
		queryFn: () => ProfileAPI.getConnectionsSummary(userId),
		staleTime: 30_000,
		retry: false,
	});
};
