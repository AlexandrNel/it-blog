import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { Suspense } from "react";
import { HeaderMenu } from "./header-menu";

export const Header = () => {
  return (
    <header className="flex justify-between lg:rounded-lg bg-white items-center border-b sticky z-10 top-0 h-(--header-height)">
      <div className={`container flex justify-between items-center`}>
        <Link href={`/`}>
          <Button>IT BLOG</Button>
        </Link>
        <Suspense
          fallback={
            <div className="flex gap-2">
              <Skeleton className="w-[100px] h-[40px]" />
              <Skeleton className="w-[170px] h-[40px]" />
              <Skeleton className="size-9 rounded-full" />
            </div>
          }
        >
          <HeaderMenu />
        </Suspense>
      </div>
    </header>
  );
};
