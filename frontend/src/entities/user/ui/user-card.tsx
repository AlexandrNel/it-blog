import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import { UserAvatar } from "./user-avatar";
import type { PropsWithChildren } from "react";
import { formatUsername } from "../model/user.formatters";
import Link from "next/link";
import { Row } from "@/shared/ui/layout";
import { formatDate } from "@/shared/lib/utils/date/format-date";
import type { Author } from "@/entities/author";
import type { Post } from "@/entities/article";

interface Props extends BaseProps {
	asLink?: boolean;
	data: {
		avatarUrl: Author["avatar"];
		fullName: Author["displayName"];
		username: Author["username"];
		date: Post["createdAt"];
	};
}

export const UserCard = ({ className, asLink = false, data }: PropsWithChildren<Props>) => {
	const { date, fullName, username, avatarUrl } = data ?? {};

	const formattedDate = formatDate(date);
	return (
		<div className={cn("flex gap-2 items-center", className)}>
			<UserAvatar className="size-11" name={fullName || username} avatarUrl={avatarUrl} />
			<Row>
				<div className="flex flex-col justify-between">
					{fullName ? (
						<>
							<div className="flex items-center gap-1.5">
								<Wrapper asLink={asLink} href={`/profile/${username}`} className=" leading-tight">
									<span className="text-[15px] font-medium ">{fullName}</span>
								</Wrapper>
								{formattedDate && (
									<>
										<span className="text-[13px]  text-muted-foreground">·</span>
										<span className="text-[13px] ">{formattedDate}</span>
									</>
								)}
							</div>
							<span className="text-[13px] text-muted-foreground">{formatUsername(username)}</span>
						</>
					) : (
						<>
							<Wrapper asLink={asLink} href={`/profile/${username}`}>
								<span className="text-[15px] font-medium text-primary">
									{formatUsername(username)}
								</span>
							</Wrapper>
							{formattedDate && <span className="text-[13px] text-tertiary">{formattedDate}</span>}
						</>
					)}
				</div>
			</Row>
		</div>
	);
};

function Wrapper({
	href,
	asLink,
	children,
	className,
}: PropsWithChildren<{ href: string; className?: string; asLink?: boolean }>) {
	if (href && asLink) {
		return (
			<Link href={href} className={cn("hover:opacity-60", className)}>
				{children}
			</Link>
		);
	}
	return children;
}
