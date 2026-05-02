import { cn } from "@/shared/lib/utils";
import type { BasePropsWithChildren } from "@/shared/types/components";
import type React from "react";
import "./page-layout.scss";

interface Props extends BasePropsWithChildren {
	sidebar?: React.ReactNode;
	withoutSidebar?: boolean;
}

export const PageLayout = async ({
	className,
	sidebar,
	withoutSidebar = false,
	children,
}: Props) => {
	return (
		<main className={cn("main-layout container", { "main-layout--only-page": withoutSidebar })}>
			<div className={cn("main-layout__section", className)}>{children}</div>
			{!!sidebar && <aside className={"main-layout__aside"}>{sidebar}</aside>}
		</main>
	);
};
