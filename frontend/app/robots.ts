import { ENV } from "@/shared/config/env";
import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/editor/", "/search", "/tags", "/settings/", "/login", "/register"],
      },
    ],
    sitemap: `${ENV.SITE_URL}/sitemap.xml`,
    host: ENV.SITE_URL,
  };
}
