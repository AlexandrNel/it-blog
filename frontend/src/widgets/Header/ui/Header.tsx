"use client";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { HeaderMenu } from "./header-menu";
import { Suspense } from "react";
import { HEADER_HIGHT } from "@/shared/lib/constants";

export const Header = () => {
	return (
		<header
			style={{ height: HEADER_HIGHT }}
			className="flex justify-between rounded-lg bg-white items-center shadow mb-px sticky z-10 top-0"
		>
			<div className={`container flex justify-between items-center`}>
				{/* logo */}
				<Link href={`/`}>
					<Button>IT BLOG</Button>
				</Link>
				<Suspense>
					<HeaderMenu />
				</Suspense>
			</div>
		</header>
	);
};
