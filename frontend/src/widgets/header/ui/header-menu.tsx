"use client";
import Link from "next/link";
import { LogIn, Search, SquarePen } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { ProfileMenu } from "@/features/profile/profile-menu";
import { useQuery } from "@tanstack/react-query";
import { UserQueries } from "@/entities/user";

const hiddenClassName = "md:block hidden";

export function HeaderMenu() {
  const { data: user } = useQuery(UserQueries.getMe());
  const pathname = usePathname();
  const [path] = pathname.split("/").filter(Boolean);
  const isEditPage = Boolean(path === "editor");

  return (
    <div className="flex gap-2 items-center">
      <Button asChild variant={"outline"}>
        <Link href={"/search"}>
          <Search /> <span className={hiddenClassName}>Найти</span>
        </Link>
      </Button>
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
                <span className={hiddenClassName}>Написать статью</span>
              </Link>
            </Button>
            <ProfileMenu />
          </>
        )
      ) : (
        <>
          <Button asChild variant={"outline"}>
            <Link href={"/login"}>
              <span className={hiddenClassName}>Войти</span>
              <LogIn className="md:hidden block" />
            </Link>
          </Button>
          <Button asChild className={hiddenClassName}>
            <Link href={"/register"}>Создать аккаунт</Link>
          </Button>
        </>
      )}
    </div>
  );
}
