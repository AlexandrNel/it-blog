"use client";

import { UserAvatar, UserCard, UserQueries } from "@/entities/user";
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
import { useQuery } from "@tanstack/react-query";
import { LogoutButton } from "@/features/auth/logout";
import { useState } from "react";

export function ProfileMenu() {
  const { data: user } = useQuery(UserQueries.getMe());
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger className="rounded-full cursor-pointer">
        <UserAvatar avatarUrl={user.avatar} name={user.displayName || user.username} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-3" side="bottom" align="end">
        <DropdownMenuGroup>
          <UserCard
            data={{
              avatarUrl: user.avatar,
              fullName: user.displayName,
              username: user.username,
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
          <LogoutButton
            asChild
            mutateOptions={{
              onSuccess: () => {
                setOpen(true);
              },
            }}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">
              <LogOut /> Выйти
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
