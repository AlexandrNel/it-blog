import { PageLayout } from "@/shared/layouts/PageLayout";
import { SettingsSidebar } from "@/widgets/settings/sidebar";
import type { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
	return <PageLayout sidebar={<SettingsSidebar />}>{children}</PageLayout>;
}
