"use client";

import { Button } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const ProfileMobileHeaderContent = () => {
	const router = useRouter();
	const toBack = () => router.back();

	return (
		<div className="flex items-center gap-2">
			<Button onClick={toBack} variant={"ghost"} size={"icon-lg"}>
				<ArrowLeft className="size-5" />
			</Button>
			<h1>Профиль</h1>
		</div>
	);
};
