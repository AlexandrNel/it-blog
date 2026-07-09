import { type BaseProps } from "@/shared/types";
import { getInitials } from "../lib/get-initials";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

interface AvatarType extends BaseProps {
  name: string;
  avatarUrl?: string | null;
  content?: string;
}

export const UserAvatar = ({ name, avatarUrl, className }: AvatarType) => {
  const iniitals = getInitials(name);
  return (
    <Avatar size="default" className={`size-9 ${className}`}>
      {avatarUrl && <AvatarImage src={avatarUrl} />}
      <AvatarFallback className="text-gray-400 text-sm">{iniitals}</AvatarFallback>
    </Avatar>
  );
};
