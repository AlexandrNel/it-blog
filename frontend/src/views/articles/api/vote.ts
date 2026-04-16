import { api } from "@/shared/api/client";

export const sendLike = async (postId: string) => {
	const res = await api.post(`/posts/${postId}/like`);
	return res.data;
};
export const sendDislike = async (postId: string) => {
	const res = await api.post(`/posts/${postId}/dislike`);
	return res.data;
};
