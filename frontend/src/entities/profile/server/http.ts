import "server-only";
import { notFound } from "next/navigation";
import type { ProfileResponse, ProfileMetaInfo, ProfileStatistic } from "../model/types";
import { serverSafeFetch } from "@/shared/api/server";
import { cache } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "@/shared/config/cache-keys";
import { cookies } from "next/headers";

/**
 * @param userId принимает id или username
 */
export const getProfileById = cache(async (userId: string) => {
  "use cache";
  cacheLife("days");
  cacheTag(CACHE_TAGS.profile(userId));
  const res = await serverSafeFetch<ProfileResponse>(`/profile/${userId}`);

  if (!res.data) return notFound();
  return res.data;
});

/**
 * @param userId принимает id или username
 */
export const getProfileMetaById = cache(async (userId: string) => {
  const cookiesRaw = (await cookies()).toString();
  const res = await serverSafeFetch<ProfileMetaInfo>(`/profile/${userId}/meta`, {
    headers: { Cookie: cookiesRaw },
  });
  if (!res.data) return notFound();
  return res.data;
});

/**
 * @param userId принимает id или username
 */
export const getProfileStatisticByUserId = cache(async (userId: string) => {
  const res = await serverSafeFetch<ProfileStatistic>(`/profile/${userId}/statistic`);
  return res.data;
});
