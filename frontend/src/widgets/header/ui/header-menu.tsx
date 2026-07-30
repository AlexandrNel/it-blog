"use client";
import Link from "next/link";
import { LogIn, Search, SquarePen } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { ProfileMenu } from "@/features/profile/profile-menu";

import { HoverPrefetchLink, Skeleton } from "@/shared/ui";
import { Suspense } from "react";
import { useUser } from "@/entities/user";

const hiddenClassName = "md:block hidden";

export function HeaderMenu() {
  const { data: user, isLoading } = useUser();

  return (
    <div className="flex gap-2 items-center">
      <Button asChild variant={"outline"}>
        <Link href={"/search"}>
          <Search /> <span className={hiddenClassName}>Найти</span>
        </Link>
      </Button>

      {user ? (
        <Suspense fallback={"loading"}>
          <EditorButtons />
        </Suspense>
      ) : isLoading ? (
        <>
          <Skeleton className="w-[170px] h-[40px]" />
          <Skeleton className="size-9 rounded-full" />
        </>
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

function EditorButtons() {
  const pathname = usePathname();
  const [path] = pathname.split("/").filter(Boolean);
  const isEditPage = Boolean(path === "editor");

  return isEditPage ? (
    <>
      <Button variant={"outline"} asChild>
        <Link href={`/`}>Вернуться к ленте</Link>
      </Button>
      <ProfileMenu />
    </>
  ) : (
    <>
      <Button asChild variant={"outline"}>
        <HoverPrefetchLink href={"/editor"}>
          <SquarePen strokeWidth={1} />
          <span className={hiddenClassName}>Написать статью</span>
        </HoverPrefetchLink>
      </Button>
      <ProfileMenu />
    </>
  );
}
