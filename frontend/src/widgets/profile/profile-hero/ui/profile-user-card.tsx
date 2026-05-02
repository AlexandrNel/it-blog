import type { Author } from "@/entities/author";
import { formatUsername } from "@/entities/user";

type Props = {
	user: Author;
};

export const ProfileUserCard = ({ user }: Props) => {
	const { username, displayName } = user;
	return (
		<div>
			<h2>{displayName || username}</h2>
			<span className="text-muted-foreground text-sm">{formatUsername(username)}</span>
		</div>
	);
};
