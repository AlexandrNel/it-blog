"use client";

import { Card } from "@/shared/ui/card";
import dynamic from "next/dynamic";

import { ProfileFormSkeleton } from "./profile-form-skeleton";
import { ErrorBoundary } from "@/shared/layouts";
import { ErrorSubPage } from "@/views/error";

const ProfileForm = dynamic(() => import("./profile-form").then((mod) => mod.ProfileForm), {
  loading: () => <ProfileFormSkeleton />,
  ssr: false,
});

export function ProfileSettingsPage() {
  return (
    <Card className="p-4 space-y-4">
      <ErrorBoundary fallback={ErrorSubPage}>
        <h2 className="text-lg font-semibold">Профиль</h2>
        <ProfileForm />
      </ErrorBoundary>
    </Card>
  );
}
