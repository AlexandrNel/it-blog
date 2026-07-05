import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Профиль",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return redirect("/");
}
