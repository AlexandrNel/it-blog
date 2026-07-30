import Image from "next/image";
import { classNames, cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import { EditorContent } from "@/shared/ui/tiptap-editor";
import type { Post } from "../model/types";

interface Props extends BaseProps {
  image?: Post["previewImage"];
  previewContent: string;
  isFullPage?: boolean

}

export const PostPreview = ({ className, image, previewContent, isFullPage = false }: Props) => {
  return (
    <>
      {image?.url && (
        <div
          className={cn(
            "overflow-hidden relative w-full md:mb-3 mb-2 rounded-lg bg-slate-50 dark:bg-[#272727]",
            { "pb-[50%] min-h-38": !!image?.url },
            className,
          )}
        >
          <Image
            unoptimized
            fill
            priority
            loading="eager"
            className="dark:brightness-75 mx-auto h-full w-auto object-cover "
            style={{ objectPosition: `${image.position.x}% ${image.position.y}%` }}
            src={image.url}
            alt=""
          />
        </div>
      )}
      <div className={classNames("", {"overflow-hidden text-ellipsis line-clamp-8": !isFullPage})}>
        <EditorContent content={previewContent} />
      </div>
    </>
  );
};
