"use client";
import { ErrorPage } from "@/views/error";
import type { ErrorInfo } from "next/error";

export default function GlobalErrorPage(props: ErrorInfo) {
  return (
    <html lang="ru">
      <body>
        <main className="min-h-screen flex">
          <ErrorPage {...props} />
        </main>
      </body>
    </html>
  );
}
