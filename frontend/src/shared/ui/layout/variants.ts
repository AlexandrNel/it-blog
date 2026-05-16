export const justifyVariants = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between",
	around: "justify-around",
	evenly: "justify-evenly",
	none: "",
} as const;

export const alignVariants = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	stretch: "items-stretch",
	none: "",
} as const;

export const gapVariants = {
	sm: "gap-1",
	md: "gap-2",
	lg: "gap-4",
} as const;
