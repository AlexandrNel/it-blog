import { serverSafeFetch } from "@/shared/api/server";
import type { Comment, ProfileComment } from "../model/comment";

export const getComments = async (postId: string): Promise<Comment[]> => {
  const res = await serverSafeFetch<Comment[]>(`/comments/post/${postId}`);
  return res.data || [];
};
export const getCommentsByUser = async (
  username: string,
): Promise<ProfileComment[]> => {
  const res = await serverSafeFetch<ProfileComment[]>(
    `/comments/user/${username}`,
  );
  return res.data || [];
};
