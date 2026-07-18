"use client";
import { type ErrorInfo, unstable_catchError as catchError } from "next/error";
import type { ReactNode } from "react";

function ErrorFallback(
  { fallback }: { fallback: (props: ErrorInfo) => ReactNode },
  props: ErrorInfo,
) {
  return fallback(props);
}

export default catchError(ErrorFallback);
