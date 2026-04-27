"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ProfileAPI } from "../api/client";
import type {
	Profile,
	ProfileConnectionKind,
	ProfileConnectionsPage,
	ProfileConnectionsSummary,
} from "./profile";

export const profileKeys = {
	summary: ["profile", "connections", "summary"],
};

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
		queryKey: ["profile", "connections", userId, type],
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
		queryKey: ["profile", "connections", "summary", userId],
		queryFn: () => ProfileAPI.getConnectionsSummary(userId),
		staleTime: 30_000,
		retry: false,
	});
};
