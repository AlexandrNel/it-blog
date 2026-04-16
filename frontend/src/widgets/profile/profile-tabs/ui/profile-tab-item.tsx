"use client";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TabItem({ href, text }: { href: string; text: string }) {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			className={cn(
				"h-9 flex items-center transition-colors justify-center px-4 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground",
				{ "bg-primary text-primary-foreground": href === pathname },
			)}
		>
			{text}
		</Link>
	);
}
