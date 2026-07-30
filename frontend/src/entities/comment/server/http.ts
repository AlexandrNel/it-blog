import "server-only";
import { serverFetch } from "@/shared/api/server";
import type { CommentListResponse, ProfileCommentListResponse } from "../model/types";

export const getComments = async (slug: string) => {
  const res = await serverFetch<CommentListResponse>(`/comments/post/${slug}`);
  return res.data;
};
export const getCommentsByUser = async (username: string) => {
  const res = await serverFetch<ProfileCommentListResponse>(`/comments/user/${username}`);
  return res.data;
};
