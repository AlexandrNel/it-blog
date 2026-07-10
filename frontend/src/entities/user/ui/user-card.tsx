import Link from "next/link";
import { type PropsWithChildren } from "react";
import { formatUsername } from "../model/user.formatters";
import { UserAvatar } from "./user-avatar";
import { classNames, cn, formatDate } from "@/shared/lib/utils";
import { type BaseProps } from "@/shared/types";
import { type Author } from "@/entities/user";
import { type Post } from "@/entities/post";
import { type Route } from "next";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/shared/ui";
import { routes } from "@/shared/config";

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

  const formattedDate = formatDate(date) ?? undefined;
  const formattedUsername = formatUsername(username);

  const formattedData: UserCardProps["data"] = {
    ...data,
    date: formattedDate,
    username: formattedUsername,
  };

  return (
    <Item className={classNames("flex  gap-2 items-center p-0", {}, [className])}>
      <ItemMedia>
        <UserAvatar className="md:size-11 size-10" name={fullName || username} avatarUrl={avatarUrl} />
      </ItemMedia>
      <ItemContent className="flex flex-col justify-between">
        <ItemTitle>
          <Title href={routes.profile.user(username)} asLink={asLink} data={formattedData} />
        </ItemTitle>
        <ItemDescription>
          <Description data={formattedData} />
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}

const Title = ({
  asLink,
  href,
  data: { fullName, username, date },
}: {
  data: UserCardProps["data"];
  href: string;
  asLink: boolean;
}) => {
  return (
    <>
      {fullName ? (
        <div className="flex items-center gap-1.5">
          <Wrapper asLink={asLink} href={href as Route} className=" leading-tight">
            <FullName name={fullName} />
          </Wrapper>
          {date && (
            <>
              <span className="text-[13px]">·</span>
              <PostDate date={date} />
            </>
          )}
        </div>
      ) : (
        <Wrapper asLink={asLink} href={href as Route}>
          <FullName name={username} />
        </Wrapper>
      )}
    </>
  );
};

const Description = ({ data: { username, fullName, date } }: Pick<UserCardProps, "data">) => {
  if (fullName) return <span className={"text-[13px] text-muted-foreground"}>{username}</span>;
  if (date) return <PostDate date={date} />;
  return null;
};

const FullName = ({ name }: { name: string }) => {
  return <span className={"md:text-[15px] text-[14px] font-medium"}>{name}</span>;
};

const PostDate = ({ date }: { date: string }) => {
  return <span className={"md:text-[13px] text-xs font-normal text-muted-foreground"}>{date}</span>;
};

function Wrapper({
  href,
  asLink,
  children,
  className,
}: PropsWithChildren<{ href: Route; className?: string; asLink?: boolean }>) {
  if (href && asLink) {
    return (
      <Link href={href} className={classNames("hover:opacity-60", {}, [className])}>
        {children}
      </Link>
    );
  }
  return children;
}
