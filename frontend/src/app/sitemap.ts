import { getSitemapData } from "@/shared/api/get-sitemap-data";
import { CACHE_TAGS } from "@/shared/config/cache-keys";
import { ENV } from "@/shared/config/env";
import { ROUTES } from "@/shared/config/routes";
import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";

const staticRoutes = ["/"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	"use cache";
	cacheTag(CACHE_TAGS.sitemap);
	cacheLife("max");

	const now = new Date();
	const { articles, profiles } = await getSitemapData();

	const articlesSitemap: MetadataRoute.Sitemap = articles.map((item) => ({
		url: `${ENV.SITE_URL}${ROUTES.article(item.slug)}`,
		lastModified: item.updatedAt,
		changeFrequency: "weekly",
		priority: 0.7,
	}));

	const profilesSitemap: MetadataRoute.Sitemap = profiles.map((item) => ({
		url: `${ENV.SITE_URL}${ROUTES.profile.user(item.username)}`,
		lastModified: item.updatedAt,
		changeFrequency: "weekly",
		priority: 0.6,
	}));
	const staticSitemap: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
		url: `${ENV.SITE_URL}${route}`,
		lastModified: now,
		changeFrequency: route === "/" ? "daily" : "weekly",
		priority: route === "/" ? 1 : 0.7,
	}));
	return [...staticSitemap, ...articlesSitemap, ...profilesSitemap];
}
