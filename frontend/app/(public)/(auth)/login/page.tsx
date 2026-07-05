import { LoginPage } from "@/views/login";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход",
  description: "Войдите в аккаунт IT Blog, чтобы публиковать и комментировать статьи.",
  alternates: {
    canonical: "/login",
  },
};

export default function Page() {
  return <LoginPage />;
}
