import { cn } from "../lib/utils";
import { type BasePropsWithChildren } from "../types/components";

export const Container = ({ children, className }: BasePropsWithChildren) => {
  return <div className={cn("container", className)}>{children}</div>;
};
