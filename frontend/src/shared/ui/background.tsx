import { cn } from "@/shared/lib/utils";
import { type BasePropsWithChildren } from "../types/components";

export function Background({ children, className }: BasePropsWithChildren) {
  return <div className={cn("p-4 bg-card rounded-lg", className)}>{children}</div>;
}
