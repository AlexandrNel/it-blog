"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

const HeaderMenu = dynamic(() => import("./header-menu").then((mod) => mod.HeaderMenu), {
  ssr: false,
  loading: () => (
    <div className="flex gap-2">
      <Skeleton className="w-[100px] h-[40px]" />
      <Skeleton className="w-[170px] h-[40px]" />
    </div>
  ),
});

export const Header = () => {
  return (
    <header className="flex justify-between lg:rounded-lg bg-white items-center border-b sticky z-10 top-0 h-(--header-height)">
      <div className={`container flex justify-between items-center`}>
        <Link href={`/`}>
          <Button>IT BLOG</Button>
        </Link>
        <HeaderMenu />
      </div>
    </header>
  );
};
