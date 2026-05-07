import { serverSafeFetch } from "./server";

type ResponseData = {
	articles: {
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
	if (!res.data) return { articles: [], profiles: [] };
	return res.data;
};
