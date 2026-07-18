import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IT Blog",
    short_name: "IT Blog",
    description: "IT Blog про разработку, практики и инженерные заметки.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111111",
    lang: "ru",
  };
}
