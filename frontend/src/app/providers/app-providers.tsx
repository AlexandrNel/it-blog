import { Toaster } from "@/shared/ui/sonner";
import { GettingUser } from "@/entities/auth";
import { QueryProvider } from "@/app/providers/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { PropsWithChildren } from "react";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <NuqsAdapter>
      <QueryProvider>
        {children}
        <Toaster />
        <GettingUser />
      </QueryProvider>
    </NuqsAdapter>
  );
}
