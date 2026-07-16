import { PageLayout } from "@/shared/layouts/page-layout/page-layout";
import { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <PageLayout withoutPaddingTop withoutSidebarColumn className="content-center">
      {children}
    </PageLayout>
  );
}
