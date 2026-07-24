import { Toaster } from "@/shared/ui/sonner";
import { QueryProvider } from "./query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";
import { UserProvider } from "./user-provider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <NuqsAdapter>
        <UserProvider>{children}</UserProvider>
        <Toaster />
      </NuqsAdapter>
    </QueryProvider>
  );
}
