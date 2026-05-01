import { cn } from "@/shared/lib/utils";
import type { BasePropsWithChildren } from "@/shared/types/components";
import { HEADER_HIGHT } from "@/shared/lib/constants";
import type React from "react";

interface Props extends BasePropsWithChildren {
	sidebar?: React.ReactNode;
	position?: "left" | "right";
	hideSidebar?: boolean;
}

export const PageLayout = async ({ className, sidebar, children, hideSidebar = false }: Props) => {
	return (
		<div className="grow">
			<div
				className={cn(
					// "container h-full pt-2 mx-auto flex gap-4 justify-between  lg:flex-row",
					"container h-full pt-2 gap-4 justify-between ",
					className,
				)}
			>
				<div className="w-full">{children}</div>
				{!hideSidebar && (
					<div
						style={{ top: HEADER_HIGHT + 8 }}
						className={cn("lg:max-w-75 h-max hidden w-full lg:block sticky top-2")}
					>
						{sidebar}
					</div>
				)}
			</div>
		</div>
	);
};
