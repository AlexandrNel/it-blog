import { type BaseProps } from "@/shared/types/components";
import { type Post } from "../model/post";
import { UserCard } from "@/entities/user";

interface Props extends BaseProps, Pick<Post, "author" | "createdAt"> {}

export const ArticleInfo = ({ author, createdAt, className }: Props) => {
  return (
    <UserCard
      data={{
        fullName: author.displayName,
        avatarUrl: author.avatar,
        username: author.username,
        date: createdAt,
      }}
      className={className}
      asLink
    ></UserCard>
  );
};
