import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import type { PropsWithChildren } from "react";

export function Container({ children, className }: PropsWithChildren<BaseProps>) {
  return <div className={cn("container", className)}>{children}</div>;
}
