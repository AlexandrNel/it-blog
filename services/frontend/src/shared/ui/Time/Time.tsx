"use client";
import { cn } from "@/shared/lib/utils";
import { BaseProps } from "@/shared/types/components";
import React from "react";

interface Props extends BaseProps {
	value: string;
}

export const Time: React.FC<Props> = ({ value, className }) => {
	const localeTime = new Date(value).toLocaleString();
	return <span className={cn("flex gap-1 text-gray-400 text-xs", className)}>{localeTime}</span>;
};
