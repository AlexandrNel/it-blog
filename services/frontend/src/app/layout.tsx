import type React from "react";
import { Roboto } from "next/font/google";
import "./styles/global.css";

const roboto = Roboto({
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru" className={roboto.className}>
			<body>{children} </body>
		</html>
	);
}
