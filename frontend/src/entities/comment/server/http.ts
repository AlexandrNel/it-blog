import "server-only";
import { serverSafeFetch } from "@/shared/api/server";
import type { CommentListResponse, ProfileCommentListResponse } from "../model/types";

export const getComments = async (slug: string) => {
  const res = await serverSafeFetch<CommentListResponse>(`/comments/post/${slug}`);
  return res.data || [];
};
export const getCommentsByUser = async (username: string) => {
  const res = await serverSafeFetch<ProfileCommentListResponse>(`/comments/user/${username}`);
  return res.data || [];
};
