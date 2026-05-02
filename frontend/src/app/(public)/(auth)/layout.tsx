import { PageLayout } from "@/shared/layouts/page-layout";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<PageLayout className="-mt-2 " withoutSidebarColumn>
			{children}
		</PageLayout>
	);
}
