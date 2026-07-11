import "server-only";
import { serverFetch, serverSafeFetch } from "@/shared/api/server";
import {
  type PostListWithStatisticResponse,
  type PostResponse,
  type PostWithStatisticResponse,
  type ResponsePagination,
} from "../model/types";
import { cache } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "@/shared/config/cache-keys";

export const getAllPosts = cache(async (sortBy: string = "new", page = 1, limit = 10) => {
  const res = await serverSafeFetch<ResponsePagination<PostWithStatisticResponse>>(
    `/posts?sortBy=${sortBy}&limit=${limit}&page=${page}`,
  );
  return res.data;
});

export const getPostBySlug = cache(async (slug: string) => {
  "use cache";
  cacheLife("max");
  cacheTag(CACHE_TAGS.post(slug));

  const res = await serverSafeFetch<PostResponse>(`/posts/${slug}`);
  return res.data;
});

export const getPostsByTag = async (tag: string) => {
  const res = await serverFetch<PostListWithStatisticResponse>(`/posts/tag/${tag}`);
  return res.data;
};

export const getPostById = async (id: string) => {
  const res = await serverSafeFetch<PostResponse>(`/posts/id/${id}`);
  return res.data;
};

export const getPostByUserId = async (userId: string) => {
  const res = await serverSafeFetch<PostListWithStatisticResponse>(`/posts/user/${userId}`);
  return res.data;
};
