import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import type { TAutor } from "@/entities/articles";

interface AvatarType {
	user: TAutor;
	imageUrl?: string;
	content?: string;
}

const UserAvatar: React.FC<AvatarType> = ({ user, content }) => {
	return (
		<div>
			<Avatar>
				{user?.avatar && <AvatarImage src={user.avatar} />}
				<AvatarFallback className="text-gray-400 text-sm">
					{user?.name?.includes("")
						? user?.name
								.split(" ")
								.map((item) => item.slice(0, 1))
								.join("")
						: user?.name?.slice(0, 1) || content}
				</AvatarFallback>
			</Avatar>
		</div>
	);
};

export default UserAvatar;
