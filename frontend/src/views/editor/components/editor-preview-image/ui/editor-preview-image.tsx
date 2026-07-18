"use client";
import { cn } from "@/shared/lib/utils";
import type { BaseProps } from "@/shared/types/components";
import { ImageEditor } from "./image-editor";
import { UploadZone } from "./upload-zone";
import { useRef, useState } from "react";

export type ImageType = { url: string; position: { x: number; y: number } };

type Props = {
  onChange?: (data: ImageType | null, file?: File | null) => void;
  value?: ImageType | null;
} & BaseProps;

export function EditorPreviewImage({ className, value = null, onChange }: Props) {
  const [image, setImage] = useState<ImageType | null>(value);
  const fileRef = useRef<File | null>(null);
  return (
    <div className={cn(className)}>
      {!image ? (
        <UploadZone
          onUpload={(url, file) => {
            fileRef.current = file;
            setImage({ url, position: { x: 0, y: 0 } });
          }}
        />
      ) : (
        <ImageEditor
          value={image}
          onChange={(image) => {
            setImage(image);
            onChange?.(image, fileRef.current);
          }}
        />
      )}
    </div>
  );
}
