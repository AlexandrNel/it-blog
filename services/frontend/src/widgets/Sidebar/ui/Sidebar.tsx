"use client";
import type React from "react";
import type { BaseProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";

export const Sidebar: React.FC<BaseProps & { widgets?: React.ReactNode }> = ({
	className,
	widgets,
}) => {
	return (
		<div id="sidebar" className={cn("", className)}>
			{widgets}
		</div>
	);
};
