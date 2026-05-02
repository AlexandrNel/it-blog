import type React from "react";
import { Roboto } from "next/font/google";
import "./styles/global.css";
import { Header } from "@/widgets/Header";
import { Toaster } from "@/shared/ui/sonner";
import { GettingUser } from "@/entities/auth";
import { QueryProvider } from "./providers/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const roboto = Roboto({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500", "600", "700"],
});

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
