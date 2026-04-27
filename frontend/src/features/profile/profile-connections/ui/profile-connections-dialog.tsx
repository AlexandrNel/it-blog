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
import type {
	ProfileConnectionKind,
	ProfileConnectionUser,
} from "@/entities/profile/model/profile";
import { useProfileConnections } from "@/entities/profile/model/profile-queries";

const modalCopy: Record<
	ProfileConnectionKind,
	{ title: string; empty: string; description: string }
> = {
	followers: {
		title: "Подписчики",
		empty: "Нет подписчиков",
		description: "Люди, которые подписаны на этот профиль.",
	},
	following: {
		title: "Подписки",
		empty: "Нет подписок",
		description: "Профили, на которые подписан этот пользователь.",
	},
};

export function ProfileConnectionsDialog({
	userId,
	type,
	count,
	className,
}: {
	userId: string;
	type: ProfileConnectionKind;
	count?: number;
	className?: string;
}) {
	const [open, setOpen] = useState(false);
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const copy = modalCopy[type];

	const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useProfileConnections(
		{
			userId,
			type,
			enabled: open,
		},
	);

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
					{copy.title}
					{typeof count === "number" ? ` ${count}` : ""}
				</button>
			</DialogTrigger>
			<DialogContent className="gap-0 p-0 sm:max-w-md">
				<DialogHeader className="border-b px-6 py-4">
					<DialogTitle>{copy.title}</DialogTitle>
					<DialogDescription>{copy.description}</DialogDescription>
				</DialogHeader>

				<div ref={scrollRef} className="max-h-[420px] overflow-y-auto px-6 py-4">
					{isLoading ? (
						<div className="space-y-3">
							{["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4", "skeleton-5"].map((key) => (
								<ConnectionSkeleton key={key} />
							))}
						</div>
					) : users.length ? (
						<div className="space-y-1">
							{users.map((user) => (
								<ConnectionItem key={`${type}-${user.id}`} user={user} />
							))}
						</div>
					) : (
						<p className="py-10 text-center text-sm text-muted-foreground">{copy.empty}</p>
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
