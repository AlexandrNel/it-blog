import { cn } from "@/shared/lib/utils";
import type { BasePropsWithChildren } from "@/shared/types/components";
import type React from "react";

interface Props extends BasePropsWithChildren {
	sidebar?: React.ReactNode;
	position?: "left" | "right";
	hideSidebar?: boolean;
}

export const PageLayout = async ({
	className,
	sidebar,
	children,

	position = "right",
	hideSidebar = false,
}: Props) => {
	return (
		<div
			className={cn(
				"container mt-2 mx-auto flex gap-4 justify-between flex-col-reverse lg:flex-row",
				{ "flex-row-reverse": position === "left" },
				className,
			)}
		>
			<div className="w-full">{children}</div>
			{!hideSidebar && <div className={cn("lg:max-w-75 w-full lg:block ")}>{sidebar}</div>}
		</div>
	);
};
