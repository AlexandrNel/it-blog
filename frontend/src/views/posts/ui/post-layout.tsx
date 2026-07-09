import { PageLayout } from "@/shared/layouts/page-layout";
import { type PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  return <PageLayout>{children}</PageLayout>;
}
