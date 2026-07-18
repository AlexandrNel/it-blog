"use client";
import { Card } from "@/shared/ui/card";
import dynamic from "next/dynamic";
import { AccountFormSkeleton } from "./account-form-skeleton";
import { ErrorBoundary } from "@/shared/layouts";
import { ErrorSubPage } from "@/views/error";

const AccountForm = dynamic(() => import("./account-form").then((mod) => mod.AccountForm), {
  loading: () => <AccountFormSkeleton />,
  ssr: false,
});

export function AccountSettingsPage() {
  return (
    <Card className="p-4 space-y-4">
      <ErrorBoundary fallback={ErrorSubPage}>
        <h2 className="text-lg font-semibold">Настройки аккаунта</h2>
        <AccountForm />
      </ErrorBoundary>
    </Card>
  );
}
