import { EditorPage } from "@/views/editor";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Новая статья",
  description: "Создание новой статьи в IT Blog.",
  alternates: {
    canonical: "/editor",
  },
};

export default function Page() {
  return <EditorPage />;
}
