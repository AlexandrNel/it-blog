import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import type React from "react";

export const PageLayout: React.FC<BaseProps & { sidebar?: React.ReactNode }> = ({
	className,
	sidebar,
	children,
}) => {
	return (
		<div className={cn("container mx-auto flex justify-between", className)}>
			<div className="w-full mr-4">{children}</div>
			<div className="max-w-75 w-full max-md:hidden">{sidebar}</div>
		</div>
	);
};
