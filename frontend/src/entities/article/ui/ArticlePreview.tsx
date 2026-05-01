import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import { EditorContent } from "@/shared/ui/tiptap-editor";
import type { Post } from "../model/post";

interface Props extends BaseProps {
	image?: Post["previewImage"];
	previewContent: string;
}

export const ArticlePreview = ({ className, image, previewContent }: Props) => {
	return (
		<>
			{image?.url && (
				<div
					className={cn(
						"overflow-hidden relative w-full md:mb-3 mb-2 rounded-lg bg-slate-50 dark:bg-[#272727]",
						{ "md:h-[400px] min-[450px]:h-[300px] h-[150px]": !!image?.url },
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
			<div className={cn("max-h-[200px] overflow-hidden text-ellipsis line-clamp-6  ")}>
				<EditorContent content={previewContent} />
			</div>
		</>
	);
};
