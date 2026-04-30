/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { useAuthStore } from "../../../../entities/auth/model/auth-store";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/dialog";
import { LoginForm } from "@/features/auth/login";

type Props = {} & PropsWithChildren;

export const CheckAuthButton = ({ children }: Props) => {
	const { user } = useAuthStore();
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		const el = wrapperRef.current;
		if (!el) return;

		const handleClick = (e: PointerEvent) => {
			if (!user) {
				e.preventDefault();
				e.stopPropagation();
				setIsOpen(true);
			}
		};
		el.addEventListener("click", handleClick);

		return () => {
			el.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<div ref={wrapperRef}>{children}</div>
			<DialogContent>
				<DialogTitle hidden>Авторизация</DialogTitle>
				<LoginForm />
				<DialogDescription hidden></DialogDescription>
			</DialogContent>
		</Dialog>
	);
};
