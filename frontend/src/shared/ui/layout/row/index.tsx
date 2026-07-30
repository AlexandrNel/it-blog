import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import { cva, type VariantProps } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import { alignVariants, gapVariants, justifyVariants } from "../variants";

const variants = cva("flex", {
  variants: {
    gap: gapVariants,
    justify: justifyVariants,
    align: alignVariants,
  },
  defaultVariants: {
    justify: "start",
    align: "center",
    gap: "md",
  },
});
type RowVariants = VariantProps<typeof variants>;

interface RowProps extends BaseProps, RowVariants {}
export const Row = ({ className, children, justify, align, gap }: PropsWithChildren<RowProps>) => {
  return <div className={cn(variants({ justify, align, gap }), className)}>{children}</div>;
};
