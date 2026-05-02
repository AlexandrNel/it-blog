import { PageLayout } from "@/shared/layouts/PageLayout";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<PageLayout className="-mt-2 " withoutSidebar>
			{children}
		</PageLayout>
	);
}
