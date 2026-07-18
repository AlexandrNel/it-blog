"use client";
import { ErrorPage } from "@/views/error";
import { ErrorInfo } from "next/error";

export default function GlobalErrorPage(props: ErrorInfo) {
  return (
    <html>
      <body>
        <main className="min-h-screen flex">
          <ErrorPage {...props} />
        </main>
      </body>
    </html>
  );
}
