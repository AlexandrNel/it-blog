import { PageLayout } from "@/shared/layouts/page-layout";
import { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <PageLayout withoutSidebarColumn>{children}</PageLayout>;
}
