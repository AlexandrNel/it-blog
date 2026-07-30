"use client";

import { type ErrorInfo, unstable_catchError as catchError } from "next/error";
import type { ReactNode } from "react";

function ErrorFallback(
  { fallback }: { fallback: ReactNode | ((props: ErrorInfo) => ReactNode) },
  props: ErrorInfo,
) {
  return typeof fallback === "function" ? fallback(props) : fallback;
}

export default catchError(ErrorFallback);
