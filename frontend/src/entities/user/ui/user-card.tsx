import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import { UserAvatar } from "./user-avatar";
import type { PropsWithChildren } from "react";
import { formatUsername } from "../model/user.formatters";
import Link from "next/link";
import { Row } from "@/shared/ui/layout";
import { formatDate } from "@/shared/lib/utils/date/format-date";

interface Props extends BaseProps {
  avatarUrl?: string | null;
  fullName?: string;
  username: string;
  date?: string;
  asLink?: boolean;
}

export const UserCard = ({
  className,
  avatarUrl,
  fullName,
  username,
  date,
  asLink = false,
}: PropsWithChildren<Props>) => {
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
                {date && (
                  <>
                    <span className="text-[13px]  text-muted-foreground">·</span>
                    <span className="text-[13px] ">{formatDate(date)}</span>
                  </>
                )}
              </div>
              <span className="text-[13px] text-muted-foreground">{formatUsername(username)}</span>
            </>
          ) : (
            <>
              <Wrapper asLink={asLink} href={`/profile/${username}`}>
                <span className="text-[15px] font-medium text-primary">{formatUsername(username)}</span>
              </Wrapper>
              {date && <span className="text-[13px] text-tertiary">{formatDate(date)}</span>}
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
