import { PageLayout } from "@/shared/layouts/page-layout/page-layout";
import type { PropsWithChildren } from "react";
import { SettingsSidebar } from "./settings-sidebar";

export async function SettingsLayout({ children }: PropsWithChildren) {
  return <PageLayout sidebar={<SettingsSidebar />}>{children}</PageLayout>;
}
