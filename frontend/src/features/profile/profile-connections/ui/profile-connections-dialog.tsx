"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Spinner } from "@/shared/ui/spinner";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import { UserAvatar, formatUsername } from "@/entities/user";
import {
  ProfileQueries,
  type ProfileConnectionKind,
  type ProfileConnectionUser,
} from "@/entities/profile";
import { modalLables } from "../config/modal-labels";
import { useInfiniteQuery } from "@tanstack/react-query";

type ProfileConnectionsDialogProps = {
  userId: string;
  type: ProfileConnectionKind;
  count?: number;
  className?: string;
};

export function ProfileConnectionsDialog({
  userId,
  type,
  count,
  className,
}: ProfileConnectionsDialogProps) {
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const labels = modalLables[type];

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...ProfileQueries.connections({ userId, type }),
    enabled: open,
  });

  const users = useMemo(() => data?.pages.flatMap((page) => page.users) ?? [], [data?.pages]);

  useEffect(() => {
    if (!open || !hasNextPage || isFetchingNextPage) return;

    const root = scrollRef.current;
    const target = sentinelRef.current;
    if (!root || !target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root,
        rootMargin: "96px",
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [open, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "text-sm text-primary underline-offset-4 hover:underline cursor-pointer",
            className,
          )}
        >
          {labels.title}
          {typeof count === "number" ? ` ${count}` : ""}
        </button>
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 sm:max-w-md">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>{labels.title}</DialogTitle>
          <DialogDescription>{labels.description}</DialogDescription>
        </DialogHeader>

        <div ref={scrollRef} className="max-h-[420px] overflow-y-auto px-6 py-4">
          {isLoading ? (
            <div className="space-y-3">
              {new Array(5).fill(null).map((_, i) => (
                <ConnectionSkeleton key={`skeleton-${i}`} />
              ))}
            </div>
          ) : users.length ? (
            <div className="space-y-1">
              {users.map((user) => (
                <ConnectionItem key={`${type}-${user.id}`} user={user} />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">{labels.empty}</p>
          )}

          {hasNextPage && <div ref={sentinelRef} className="h-1 w-full" />}

          {isFetchingNextPage && (
            <div className="flex items-center justify-center py-4">
              <Spinner />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ConnectionItem({ user }: { user: ProfileConnectionUser }) {
  const hasDisplayName = Boolean(user.displayName);
  const title = user.displayName || user.username;

  return (
    <Link
      href={`/profile/${user.username}`}
      className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted"
    >
      <UserAvatar className="size-10" name={title} avatarUrl={user.avatar} />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{title}</p>
        {hasDisplayName && (
          <p className="truncate text-sm text-muted-foreground">{formatUsername(user.username)}</p>
        )}
      </div>
    </Link>
  );
}

function ConnectionSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
