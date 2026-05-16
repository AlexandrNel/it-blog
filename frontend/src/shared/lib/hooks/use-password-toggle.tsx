"use client";

import { useState } from "react";

export function usePasswordToggle() {
	const [isHidden, setHidden] = useState(true);
	const [type, setType] = useState<"password" | "text">("password");
	const handleClick = () => {
		setHidden((prev) => !prev);
		setType((prev) => (prev === "password" ? "text" : "password"));
	};
	return { isHidden, type, handleClick };
}
