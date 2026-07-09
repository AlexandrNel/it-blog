import Link from "next/link";
import { Fragment, type PropsWithChildren } from "react";
import { formatUsername } from "../model/user.formatters";
import { UserAvatar } from "./user-avatar";
import { formatDate } from "@/shared/lib/utils";
import { cn } from "@/shared/lib/utils";
import { type BaseProps } from "@/shared/types";
import { type Author } from "@/entities/user";
import { type Post } from "@/entities/post";
import { type Route } from "next";

interface UserCardProps extends BaseProps {
  asLink?: boolean;
  data: {
    avatarUrl: Author["avatar"];
    fullName: Author["displayName"];
    username: Author["username"];
    date?: Post["createdAt"];
  };
}

export function UserCard({ className, asLink = false, data }: PropsWithChildren<UserCardProps>) {
  const { date, fullName, username, avatarUrl } = data ?? {};

  const formattedDate = formatDate(date);
  const formattedUsername = formatUsername(username);

  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <UserAvatar
        className="md:size-11 size-10"
        name={fullName || username}
        avatarUrl={avatarUrl}
      />
      <div className="flex flex-col justify-between">
        {fullName ? (
          <Fragment>
            <div className="flex items-center gap-1.5">
              <Wrapper
                asLink={asLink}
                href={`/profile/${username}` as Route}
                className=" leading-tight"
              >
                <FullName name={fullName} />
              </Wrapper>
              {formattedDate && (
                <Fragment>
                  <span className="text-[13px]  text-muted-foreground">·</span>
                  <PostDate date={formattedDate} />
                </Fragment>
              )}
            </div>
            <UserName name={formattedUsername} />
          </Fragment>
        ) : (
          <Fragment>
            <Wrapper asLink={asLink} href={`/profile/${username}` as Route}>
              <FullName name={formattedUsername} />
            </Wrapper>
            {formattedDate && <PostDate date={formattedDate} />}
          </Fragment>
        )}
      </div>
    </div>
  );
}

export const FullName = ({ name, className }: { name: string; className?: string }) => {
  return <span className={cn("md:text-[15px] text-[14px] font-medium", className)}>{name}</span>;
};
export const UserName = ({ name, className }: { name: string; className?: string }) => {
  return <span className={cn("text-[13px] text-muted-foreground", className)}>{name}</span>;
};
export const PostDate = ({ date, className }: { date: string; className?: string }) => {
  return <span className={cn("md:text-[13px] text-xs", className)}>{date}</span>;
};

function Wrapper({
  href,
  asLink,
  children,
  className,
}: PropsWithChildren<{ href: Route; className?: string; asLink?: boolean }>) {
  if (href && asLink) {
    return (
      <Link href={href} className={cn("hover:opacity-60", className)}>
        {children}
      </Link>
    );
  }
  return children;
}
