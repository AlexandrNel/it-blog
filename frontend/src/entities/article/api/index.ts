import { serverFetch, serverSafeFetch } from "@/shared/api/server";
import type { PostDto, PostWithStatisticDto, ResponsePaginationDto } from "./types";
import { cache } from "react";

export const getAllPosts = cache(async (sortBy: string = "new", page = 1, limit = 10) => {
  const res = await serverSafeFetch<ResponsePaginationDto<PostWithStatisticDto[]>>(
    `/posts?sortBy=${sortBy}&limit=${limit}&page=${page}`,
  );
  return res.data;
});

export const getPostBySlug = cache(async (slug: string) => {
  const res = await serverSafeFetch<PostDto>(`/posts/${slug}`);
  return res.data;
});
export const getPostsByTag = async (tag: string) => {
  const res = await serverFetch<PostWithStatisticDto[]>(`/posts/tag/${tag}`);
  return res.data;
};
export const getPostById = async (id: string) => {
  const res = await serverSafeFetch<PostDto>(`/posts/id/${id}`);
  return res.data;
};
export const getPostByUserId = async (userId: string) => {
  const res = await serverSafeFetch<PostWithStatisticDto[]>(`/posts/user/${userId}`);
  return res.data;
};
