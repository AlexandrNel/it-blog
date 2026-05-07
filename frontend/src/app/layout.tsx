import type { Metadata } from "next";
import type React from "react";
import { Roboto } from "next/font/google";
import "./styles/global.css";
import { Header } from "@/widgets/header";
import { Toaster } from "@/shared/ui/sonner";
import { GettingUser } from "@/entities/auth";
import { QueryProvider } from "./providers/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ENV } from "@/shared/config/env";

const roboto = Roboto({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	metadataBase: ENV.SITE_URL,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru" className={roboto.className}>
			<body>
				<NuqsAdapter>
					<QueryProvider>
						<div className="min-h-screen grid grid-rows-[max-content] grid-cols-1 w-full max-w-full ">
							<Header />
							{children}
						</div>
						<Toaster />
						<GettingUser />
					</QueryProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
