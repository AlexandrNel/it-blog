import type React from "react";
import type { BaseProps } from "@/shared/types/components";

export const Header: React.FC<BaseProps> = ({ className }) => {
	return <header className={className}></header>;
};
