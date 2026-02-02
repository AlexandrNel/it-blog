"use client";
import type React from "react";
import type { BaseProps } from "@/shared/types/components";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

export const Header: React.FC<BaseProps> = ({ className }) => {
	const user = null; // TODO: get user from auth store
	return (
		<header className={cn("container ")}>
			<div className="flex py-2 justify-between rounded-lg bg-white items-center shadow mb-px">
				<div className={`container flex justify-between items-center`}>
					<Link href={`/`}>
						<Button>BLOG</Button>
					</Link>

					{user ? (
						<div className="flex gap-2 items-center">
							<Link href={"/add-post"}>
								<Button variant={"outline"}>Написать статью</Button>
							</Link>
							{/* <LogoutButton /> */}
							{/* <ModeToggle /> */}
						</div>
					) : (
						<div className="flex gap-2 items-center">
							<Link href={"/login"}>
								<Button variant={"outline"}>Войти</Button>
							</Link>
							<Link href={"/register"}>
								<Button>Создать аккаунт</Button>
							</Link>
							{/* <ModeToggle /> */}
						</div>
					)}
				</div>
			</div>
		</header>
	);
};
