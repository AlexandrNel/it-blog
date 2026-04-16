"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export function Pagination({ pages, page = 1 }: { pages: number; page?: number }) {
	// TODO ВЫНЕСТИ ЛОГИКУ В MODEL
	return (
		<div className="flex items-center justify-between">
			<Button asChild className="cursor-pointer" variant={"link"} size={"sm"}>
				<Link
					className={cn({ "opacity-50 pointer-events-none": page <= 1 })}
					href={`/?page=${page - 1}`}
				>
					Назад{page <= 1}
				</Link>
			</Button>
			<div className="text-sm">
				{/* Левая часть */}
				{}
				{/* Центр */}

				{/* Правая часть */}
			</div>
			<Button asChild className="cursor-pointer" variant={"link"} size={"sm"}>
				<Link
					className={cn({ "opacity-50 pointer-events-none": page >= pages })}
					href={`/?page=${page + 1}`}
				>
					Вперед
				</Link>
			</Button>
		</div>
	);
}
