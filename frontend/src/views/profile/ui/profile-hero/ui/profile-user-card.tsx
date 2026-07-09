import { type Author } from "@/entities/user";
import { formatUsername } from "@/entities/user";

type Props = {
  user: Author;
};

export const ProfileUserCard = ({ user }: Props) => {
  const { username, displayName } = user;
  return (
    <>
      <span className="font-bold text-xl block mb-1">{displayName || username}</span>
      <h1 className="text-muted-foreground text-sm font-normal">{formatUsername(username)}</h1>
    </>
  );
};
