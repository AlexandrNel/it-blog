import { RegisterPage } from "@/views/register";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Создайте аккаунт в IT Blog, чтобы публиковать и сохранять материалы.",
  alternates: {
    canonical: "/register",
  },
};

export default function Page() {
  return <RegisterPage />;
}
