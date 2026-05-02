import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import { cva, type VariantProps } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import { alignVariants, gapVariants, justifyVariants } from "../variants";

const columnVariants = cva("flex flex-col", {
	variants: {
		gap: gapVariants,
		justify: justifyVariants,
		align: alignVariants,
	},
	defaultVariants: {
		justify: "none",
		align: "none",
		gap: "md",
	},
});

type ColumnVariants = VariantProps<typeof columnVariants>;

interface ColumnProps extends BaseProps, ColumnVariants {}

export const Column = ({
	className,
	children,
	justify,
	align,
	gap,
}: PropsWithChildren<ColumnProps>) => {
	return <div className={cn(columnVariants({ justify, align, gap }), className)}>{children}</div>;
};
