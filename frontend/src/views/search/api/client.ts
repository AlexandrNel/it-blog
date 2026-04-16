"use client";
import type { PostWithStatistic } from "@/entities/article";
import { BaseAPI } from "@/shared/api/base-api";

export class SearchPosts extends BaseAPI {
  static search({
    q,
    sort,
    page,
    date,
    title,
  }: {
    q: string | null;
    title: string | null;
    sort: string | null;
    date: string | null;
    page: number;
  }): Promise<{ posts: PostWithStatistic[]; nextPage: number | null }> {
    const params = new URLSearchParams();
    if (q) params.set("q", q.trim());
    if (sort) params.set("sort", sort);
    if (date) params.set("date", date);
    if (title) params.set("title", title);
    params.set("page", String(page));

    return BaseAPI.get<{ posts: PostWithStatistic[]; nextPage: number | null }>(`/search/posts?${params.toString()}`);
  }
}
