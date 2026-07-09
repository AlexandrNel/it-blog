import { api } from "@/shared/api/http";

export const sendView = async (postId: string) => {
  const res = await api.post<{ ttl: number }>(`/posts/${postId}/views`);
  return res.data;
};
