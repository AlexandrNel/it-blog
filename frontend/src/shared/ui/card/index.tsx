import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import type { HTMLAttributes, PropsWithChildren } from "react";

export function Card({
	children,
	className,
	...attributes
}: PropsWithChildren<BaseProps & HTMLAttributes<HTMLDivElement>>) {
	return (
		<div className={cn("card", className)} {...attributes}>
			{children}
		</div>
	);
}
