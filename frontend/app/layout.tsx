import "@/app/styles/global.css";
import type React from "react";
import { Roboto } from "next/font/google";
import { Header } from "@/widgets/header";
import { AppProviders } from "@/app/providers/app-providers";
import { metadata } from "./metadata";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={roboto.className}>
      <body>
        <AppProviders>
          <div className="min-h-screen grid grid-rows-[max-content] grid-cols-1 w-full max-w-full ">
            <Header />
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}

export { metadata };
