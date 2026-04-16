"use client";

import { formatDate } from "@/shared/lib/utils/date/format-date";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <Fetch />
    </Suspense>
  );
}

function Fetch() {
  const DATE = "2026-02-05T17:46:43.272Z";
  const value = formatDate(DATE);
  return <>{value}</>;
}
