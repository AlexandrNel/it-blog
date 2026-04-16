"use client";
import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import { useRef, type ChangeEvent, type DragEvent } from "react";
import { useEditorStore } from "../model/use-editor-store";
import { uploadImage } from "@/shared/api/uploadImage";
import Image from "next/image";
import { API_URL } from "@/shared/config/env";
import { Button } from "@/shared/ui/button";

export function EditorPreviewImage({ className }: BaseProps) {
	const imagePath = useEditorStore((state) => state.previewImage);
	const imageUrl = imagePath ? API_URL + imagePath : null;
	const setImage = useEditorStore((state) => state.setPreviewImage);

	const handleUploadImage = async (file: File) => {
		const data = new FormData();
		data.append("image", file);
		try {
			const image = await uploadImage(data);
			setImage(image.url);
		} catch {
			setImage(null);
		}
	};
	const onDragEnter = (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		const element = e.target as HTMLElement;
		element.dataset.active = "true";
	};
	const onDragLeave = (e: DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		const element = e.target as HTMLElement;
		element.dataset.active = "false";
	};

	const onDrop = async (e: DragEvent<HTMLLabelElement>) => {
		onDragLeave(e);
		const files = e.dataTransfer.files;
		if (files.length > 0) {
			handleUploadImage(files[0]);
		}
	};
	const onInput = async (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
		const files = e.target.files ?? [];
		if (files.length > 0) {
			handleUploadImage(files[0]);
		}
	};
	const ref = useRef<HTMLDivElement>(null);
	return (
		<div ref={ref} className={cn("", className)}>
			{!imageUrl && (
				<div className={cn("w-full h-[100px]")}>
					<label
						onDragEnter={onDragEnter}
						onDragOver={onDragEnter}
						onDragLeave={onDragLeave}
						onDrop={onDrop}
						htmlFor="preview-image"
						className="relative data-[active=true]:border-black data-[active=true]:border-2 cursor-pointer border h-full border-dashed hover:border-2 hover:border-gray-300 transition-all flex items-center justify-center"
					>
						<input
							onChange={onInput}
							accept={"image/*"}
							className=" pointer-events-none"
							id="preview-image"
							type="file"
						/>
					</label>
				</div>
			)}

			{imageUrl && (
				<div className={cn("w-full h-[400px] relative  overflow-hidden")}>
					<DeleteImageButton />
					<Image unoptimized src={imageUrl} alt="" fill className="object-cover" />
				</div>
			)}
		</div>
	);
}

function DeleteImageButton() {
	const setImage = useEditorStore((state) => state.setPreviewImage);
	const handleClick = () => {
		setImage(null);
	};
	return (
		<Button
			className="absolute right-[5px] top-[5px] z-10"
			onClick={handleClick}
			variant={"destructive"}
		>
			Удалить
		</Button>
	);
}
