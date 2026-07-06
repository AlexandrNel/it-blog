import { env } from "@/shared/config";
import { type Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: env.SITE_URL,
  title: {
    default: "IT Blog",
    template: "%s | IT Blog",
  },
  description: "IT Blog про разработку, практики и инженерные заметки.",
  applicationName: "IT Blog",
  keywords: ["it blog", "frontend", "backend", "web development", "программирование"],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "IT Blog",
    title: "IT Blog",
    description: "IT Blog про разработку, практики и инженерные заметки.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Blog",
    description: "IT Blog про разработку, практики и инженерные заметки.",
  },
  icons: {
    apple: [{ url: "/img/logo-white.png", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
};
