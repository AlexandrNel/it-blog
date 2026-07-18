import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import Image from "next/image";

type Props = BaseProps & {};
export const ProfileCover = ({ className }: Props) => {
  return (
    <div className={cn("min-h-35 pb-[30%] flex relative rounded-t-lg overflow-hidden", className)}>
      <Image src={"/img/profile-cover.webp"} alt="cover" fill />
    </div>
  );
};
