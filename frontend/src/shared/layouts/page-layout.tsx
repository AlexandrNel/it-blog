import { cn } from "@/shared/lib/utils";
import type { BasePropsWithChildren } from "@/shared/types/components";
import type React from "react";
import "./page-layout.scss";

interface Props extends BasePropsWithChildren {
	sidebar?: React.ReactNode;
	withoutSidebarColumn?: boolean;
	withoutPaddingTop?: boolean;
}

export const PageLayout = async ({
	className,
	sidebar,
	withoutSidebarColumn = false,
	withoutPaddingTop = false,
	children,
}: Props) => {
	return (
		<div
			className={cn(
				"main-layout container",
				{ "main-layout--only-page": withoutSidebarColumn },
				className,
			)}
		>
			<main className={cn("main-layout__section py-2", { "pt-0": withoutPaddingTop })}>
				{children}
			</main>
			{!!sidebar && <aside className={"main-layout__aside"}>{sidebar}</aside>}
		</div>
	);
};
