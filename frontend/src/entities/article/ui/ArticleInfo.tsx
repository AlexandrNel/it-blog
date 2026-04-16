import type { BaseProps } from "@/shared/types/components";
import type { Post } from "../model/post";
import { UserCard } from "@/entities/user";

interface Props extends BaseProps, Pick<Post, "author" | "createdAt"> {}

export const ArticleInfo = ({ author, createdAt }: Props) => {
  return (
    <UserCard
      fullName={author.displayName}
      avatarUrl={author.avatar}
      username={author.username}
      date={createdAt}
      asLink
    ></UserCard>
  );
};
