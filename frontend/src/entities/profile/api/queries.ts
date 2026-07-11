"use client";

import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { ProfileAPI } from "./http";
import { profileFabricKeys } from "../model/consts";
import { type Profile, type ProfileConnectionKind } from "../model/types";

export class ProfileQueries {
  static connections({
    userId,
    type,
  }: {
    userId: Profile["author"]["id"];
    type: ProfileConnectionKind;
  }) {
    return infiniteQueryOptions({
      queryKey: profileFabricKeys.connections(userId, type),
      queryFn: ({ pageParam }) =>
        ProfileAPI.getConnections({ userId, type, page: Number(pageParam) }),
      getNextPageParam: (lastPage: { nextPage: number | null }) => lastPage.nextPage ?? undefined,
      initialPageParam: 1,
      retry: false,
      staleTime: 30_000,
    });
  }

  static connectionsSummary(userId: string) {
    return queryOptions({
      queryKey: profileFabricKeys.connectionSummary(userId),
      queryFn: () => ProfileAPI.getConnectionsSummary(userId),
      staleTime: 30_000,
      retry: false,
    });
  }
}
