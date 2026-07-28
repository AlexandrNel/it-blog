"use client";
import type { BaseProps } from "@/shared/types/components";
import { useRef, useState } from "react";
import { UploadZone } from "./upload-zone";
import { ImageEditor } from "./image-editor";

export type ImageType = { url: string; position: { x: number; y: number } };

type Props = {
  onChange?: (data: ImageType | null, file: File | null) => void;
  value?: ImageType | null;
} & BaseProps;

export function EditorPreviewImage({ className = "", value = null, onChange }: Props) {
  const [image, setImage] = useState<ImageType | null>(value);
  const fileRef = useRef<File | null>(null);
  return (
    <div className={className}>
      {!image ? (
        <UploadZone
          onUpload={(url, file) => {
            fileRef.current = file;
            setImage({ url, position: { x: 0, y: 0 } });
            onChange?.({ url, position: { x: 0, y: 0 } }, fileRef.current);
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
