"use client";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { HeaderMenu } from "./header-menu";
import { Suspense } from "react";

export const Header = () => {
	return (
		<header className="flex justify-between lg:rounded-lg bg-white items-center border-b sticky z-10 top-0 h-(--header-hight)">
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
