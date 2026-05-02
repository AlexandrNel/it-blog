import { notFound } from "next/navigation";
import type { Profile, ProfileMetaInfo, ProfileStatistic } from "../model/profile";
import { serverSafeFetch } from "@/shared/api/server";
import { cache } from "react";
import { cookies } from "next/headers";

export const getProfileById = cache(async (userId: string): Promise<Profile> => {
	const res = await serverSafeFetch<Profile>(`/profile/${userId}`);
	if (!res.data) return notFound();
	return res.data;
});

export const getProfileMetaById = cache(async (userId: string): Promise<ProfileMetaInfo | null> => {
	const cookiesRaw = (await cookies()).toString();
	const res = await serverSafeFetch<ProfileMetaInfo>(`/profile/${userId}/meta`, {
		headers: { Cookie: cookiesRaw },
	});
	return res.data;
});

export const getProfileStatisticById = cache(
	async (userId: string, headers?: Headers): Promise<ProfileStatistic | null> => {
		const res = await serverSafeFetch<ProfileStatistic>(`/profile/${userId}/statistic`, {
			headers,
		});
		return res.data;
	},
);
