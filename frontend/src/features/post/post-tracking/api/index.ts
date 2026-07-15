import { api } from "@/shared/api";

export const sendView = async (postId: string) => {
  const res = await api.post<{ ttl: number }>(`/posts/${postId}/views`);
  return res.data;
};
