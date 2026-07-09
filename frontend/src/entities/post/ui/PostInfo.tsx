import { type BaseProps } from "@/shared/types/components";
import { type Post } from "../model/types";
import { UserCard } from "@/entities/user";

interface Props extends BaseProps, Pick<Post, "author" | "createdAt"> {}

export const PostInfo = ({ author, createdAt, className }: Props) => {
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
