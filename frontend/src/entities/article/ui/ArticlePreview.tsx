import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import { EditorContent } from "@/shared/ui/tiptap-editor";
import { API_URL } from "@/shared/config/env";

interface Props extends BaseProps {
  imageUrl?: string;
  previewContent: string;
}

export const ArticlePreview = ({ className, imageUrl, previewContent }: Props) => {
  const url = API_URL! + imageUrl;
  return (
    <>
      <div
        className={cn("overflow-hidden relative w-full", className, {
          "md:h-[300px] min-[450px]:h-[200px] h-[150px]": !!imageUrl,
        })}
      >
        {imageUrl && (
          <Image
            unoptimized
            fill
            className="dark:brightness-75 mx-auto h-full w-auto object-cover rounded-lg"
            src={url}
            alt=""
          />
        )}
      </div>
      <div className={cn("max-h-[200px] overflow-hidden text-ellipsis line-clamp-6  ")}>
        <EditorContent content={previewContent} />
      </div>
    </>
  );
};
