"use cache";

import type { BaseProps } from "@/shared/types/components";
import { cacheLife } from "next/cache";

export async function Footer({ className }: BaseProps) {
	cacheLife({ expire: Infinity, revalidate: Infinity });
	return <footer className={className}></footer>;
}
