"use client";

import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { ProfileAPI } from "./http";
import { profileFabricKeys } from "../model/consts";
import type { ProfileResponse, ProfileConnectionKind } from "../model/types";

export class ProfileQueries {
  static connections({ userId, type }: { userId: ProfileResponse["author"]["id"]; type: ProfileConnectionKind }) {
    return infiniteQueryOptions({
      queryKey: profileFabricKeys.connections(userId, type),
      queryFn: ({ pageParam }) => ProfileAPI.getConnections({ userId, type, page: Number(pageParam) }),
      getNextPageParam: (lastPage: { nextPage: number | null }) => lastPage.nextPage ?? undefined,
      initialPageParam: 1,
      retry: false,
      staleTime: 60_000,
    });
  }

  static connectionsSummary(userId: string) {
    return queryOptions({
      queryKey: profileFabricKeys.connectionSummary(userId),
      queryFn: () => ProfileAPI.getConnectionsSummary(userId),
      staleTime: 60_000,
      retry: false,
    });
  }

  static statistic(userId: string) {
    return queryOptions({
      queryKey: profileFabricKeys.statistic(userId),
      queryFn: () => ProfileAPI.getStatistic(userId),
      staleTime: 60_000,
      retry: false,
    });
  }

  static followStatus = (userId: string) => {
    return queryOptions({
      queryFn: () => ProfileAPI.getFollowStatus(userId),
      queryKey: profileFabricKeys.followStatus(userId),
      staleTime: 60_000,
    });
  };

  static getSettings() {
    return queryOptions({
      queryKey: profileFabricKeys.settings(),
      queryFn: () => ProfileAPI.getSettings(),
      retry: false,
      staleTime: 60_000,
    });
  }
}
