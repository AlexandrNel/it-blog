import { cn } from "@/shared/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { type BaseProps } from "@/shared/types/components";
import { type PropsWithChildren } from "react";
import { alignVariants, gapVariants, justifyVariants } from "../variants";

const gridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    },
    gap: gapVariants,
    justify: justifyVariants,
    align: alignVariants,
  },
  defaultVariants: {
    columns: 3,
    gap: "md",
    justify: "start",
    align: "start",
  },
});

type GridVariants = VariantProps<typeof gridVariants>;

interface GridProps extends BaseProps, GridVariants {}

export const Grid = ({
  className,
  children,
  columns,
  gap,
  justify,
  align,
}: PropsWithChildren<GridProps>) => {
  return (
    <div className={cn(gridVariants({ columns, gap, justify, align }), className)}>{children}</div>
  );
};
