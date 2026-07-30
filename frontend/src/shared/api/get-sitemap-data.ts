import { serverSafeFetch } from "./server";

type ResponseData = {
  posts: {
    slug: string;
    updatedAt: string;
  }[];
  profiles: {
    username: string;
    updatedAt: string;
  }[];
};

export const getSitemapData = async (): Promise<ResponseData> => {
  const res = await serverSafeFetch<ResponseData>("/seo/sitemap/");
  if (!res.data) return { posts: [], profiles: [] };
  return res.data;
};
