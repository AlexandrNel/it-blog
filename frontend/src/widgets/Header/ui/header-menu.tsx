"use client";
import { useAuthStore } from "@/entities/auth";
import { SquarePen } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ProfileMenu } from "@/features/profile/profile-menu";
import { SearchPost } from "@/features/article/article-search";

export function HeaderMenu() {
	const user = useAuthStore((state) => state.user);
	const pathname = usePathname();
	const [path] = pathname.split("/").filter(Boolean);
	const isEditPage = Boolean(path === "editor");
	return (
		<div className="flex gap-2 items-center">
			<SearchPost />
			{user ? (
				isEditPage ? (
					<Button variant={"outline"} asChild>
						<Link href={`/`}>Вернуться к ленте</Link>
					</Button>
				) : (
					<>
						<Button asChild variant={"outline"}>
							<Link href={"/editor"}>
								<SquarePen strokeWidth={1} />
								Написать статью
							</Link>
						</Button>
						<ProfileMenu />
					</>
				)
			) : (
				<>
					<Button asChild variant={"outline"}>
						<Link href={"/login"}>Войти</Link>
					</Button>
					<Button asChild>
						<Link href={"/register"}>Создать аккаунт</Link>
					</Button>
				</>
			)}
		</div>
	);
}
