"use client";

import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { TProfile } from "@/entities/profile";
import { routes } from "@/shared/config";
import Link from "next/link";
import { classNames } from "@/shared/lib/utils";

type LinkItem = {
  label: string;
  path: (username: string) => Route;
  isMobile?: boolean;
};

type LinkKey = "POSTS" | "COMMENTS" | "PROFILE";

const LINKS: Record<LinkKey, LinkItem> = {
  POSTS: { label: "Статьи", path: routes.profile.posts },
  COMMENTS: { label: "Комментарии", path: routes.profile.comments },
  PROFILE: { label: "Профиль", path: routes.profile.about, isMobile: true },
};

export function ProfileTabList({
  statistic,
  username,
}: {
  statistic: TProfile.ProfileStatistic | null;
  username: string;
}) {
  const statsMap: Record<LinkKey, string> = {
    POSTS: statistic?.publishedPosts.toString() ?? "",
    COMMENTS: statistic?.comments.toString() ?? "",
    PROFILE: "",
  };
  const pathhame = usePathname();
  return Object.entries(LINKS).map(([key, value]) => {
    const label = `${value.label} ${statsMap[key as LinkKey]}`;
    const href = value.path(username);

    return (
      <Link
        key={label}
        href={href}
        className={classNames(
          "h-9 flex items-center transition-colors justify-center px-4 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground",
          {
            "bg-primary text-primary-foreground": pathhame === href,
            "md:hidden": href.includes("about"),
          },
        )}
      >
        {label}
      </Link>
    );
  });
}
