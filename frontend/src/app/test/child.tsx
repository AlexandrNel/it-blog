"use client";

import { Button } from "@/shared/ui/button";

export const Child = () => {
	return (
		<Button
			onClick={() => {
				console.log("Подписаться");
			}}
		>
			Подписаться
		</Button>
	);
};
