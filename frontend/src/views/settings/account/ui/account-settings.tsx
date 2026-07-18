"use client";
import { Card } from "@/shared/ui/card";
import dynamic from "next/dynamic";
import { AccountFormSkeleton } from "./account-form-skeleton";

const AccountForm = dynamic(() => import("./account-form").then((mod) => mod.AccountForm), {
  loading: () => <AccountFormSkeleton />,
  ssr: false,
});

export function AccountSettingsPage() {
  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Настройки аккаунта</h2>
      <AccountForm />
    </Card>
  );
}
