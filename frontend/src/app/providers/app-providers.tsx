import { Toaster } from "@/shared/ui/sonner";
import { GettingUser } from "@/entities/user";
import { QueryProvider } from "./query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <NuqsAdapter>
        {children}
        <Toaster />
        <GettingUser />
      </NuqsAdapter>
    </QueryProvider>
  );
}
