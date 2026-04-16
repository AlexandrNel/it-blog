"use client";
import { api } from "@/shared/api/client";

export const getStatistic = async (postId: string) => {
	const res = await api.get(`/posts/${postId}/statistic`);
	return res.data;
};
