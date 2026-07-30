import { ProfileSettingsPage } from "@/views/settings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Настройки профиля",
  description: "Управление профилем в IT Blog.",
  alternates: {
    canonical: "/settings",
  },
};

export default ProfileSettingsPage;
