import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { type BaseProps } from "@/shared/types/components";
import { getInitials } from "../lib/get-initials";

interface AvatarType extends BaseProps {
  name: string;
  avatarUrl?: string | null;
  content?: string;
}

export const UserAvatar: React.FC<AvatarType> = ({ name, avatarUrl, className }) => {
  const iniitals = getInitials(name);
  return (
    <Avatar size="default" className={`size-9 ${className}`}>
      {avatarUrl && <AvatarImage src={avatarUrl} />}
      <AvatarFallback className="text-gray-400 text-sm">{iniitals}</AvatarFallback>
    </Avatar>
  );
};
