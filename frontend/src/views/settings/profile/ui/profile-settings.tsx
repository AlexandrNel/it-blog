"use client";

import { Card } from "@/shared/ui/card";
import dynamic from "next/dynamic";

import { ProfileFormSkeleton } from "./profile-form-skeleton";

const ProfileForm = dynamic(() => import("./profile-form").then((mod) => mod.ProfileForm), {
  loading: () => <ProfileFormSkeleton />,
  ssr: false,
});

export function ProfileSettingsPage() {
  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Профиль</h2>
      <ProfileForm />
    </Card>
  );
}
