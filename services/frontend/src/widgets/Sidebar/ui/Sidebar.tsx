"use client";
import type React from "react";
import type { BaseProps } from "@/shared/types/components";
import { cn } from "@/shared/lib/utils";

export const Sidebar: React.FC<BaseProps> = ({ className }) => {
	return (
		<div id="sidebar" className={cn("bg-card p-3 rounded-lg", className)}>
			sidebar
		</div>
	);
};
