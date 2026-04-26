"use client";

import { UserAvatar, UserCard } from "@/entities/user";
import { useAuthStore } from "@/features/auth";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { LogOut, Settings2, UserRound } from "lucide-react";
import Link from "next/link";

export function ProfileMenu() {
	const user = useAuthStore((state) => state.user);
	const { logout } = useAuthStore();
	if (!user) return null;
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className="rounded-full cursor-pointer">
				<UserAvatar avatarUrl={user.avatar} name={user.displayName} />
			</DropdownMenuTrigger>
				<DropdownMenuContent className="p-3" side="bottom" align="end">
					<DropdownMenuGroup>
						<UserCard
							data={{
								avatarUrl: user.avatar,
								fullName: user.displayName,
								username: user.username,
								date: "",
							}}
						/>
					</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href={`/profile/${user.username}`}>
							<UserRound className="text-foreground" />
							<span>Мой профиль</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem asChild>
						<Link href={"/settings"}>
							<Settings2 className="text-foreground" />
							<span>Настройки</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={logout}>
						<LogOut className="text-red-700" />
						<span className="text-red-700">Выйти</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
