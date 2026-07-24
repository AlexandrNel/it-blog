import { auth } from "@/entities/auth/server";
import { PageLayout } from "@/shared/layouts/page-layout/page-layout";
import { Spinner } from "@/shared/ui";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    <Suspense
      fallback={
        <PageLayout className=" justify-center">
          <div className="h-full w-full flex justify-center items-center">
            <Spinner />
          </div>
        </PageLayout>
      }
    >
      {(async () => {
        const { isAuthenticated } = await auth();
        if (!isAuthenticated) {
          redirect("/login");
        }

        return children;
      })()}
    </Suspense>
  );
}
