import { cn } from "@/shared/lib/utils";
import type { BasePropsWithChildren } from "@/shared/types/components";
import type React from "react";
import "./page-layout.scss";

interface Props extends BasePropsWithChildren {
	sidebar?: React.ReactNode;
	position?: "left" | "right";
	hideSidebar?: boolean;
}

export const PageLayout = async ({ className, sidebar, children, hideSidebar = false }: Props) => {
	return (
		<main className={cn("main-layout container", className)}>
			<section className="main-layout__section">{children}</section>
			{!hideSidebar && <aside className={"main-layout__aside"}>{sidebar}</aside>}
		</main>
	);
};
