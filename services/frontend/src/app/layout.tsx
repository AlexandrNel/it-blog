import type React from "react";
import { Roboto } from "next/font/google";
import "./styles/global.css";
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";

const roboto = Roboto({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
	sidebar?: React.ReactNode;
}) {
	return (
		<html lang="ru" className={roboto.className}>
			<body>
				<Header />
				<main className="h-screen">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
