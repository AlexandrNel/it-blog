"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";

type Props = {
  onUpload?: (url: string, file: File) => void;
};
const MAX_SIZE = 1_048_576;

export const UploadZone = ({ onUpload }: Props) => {
  const prevUrlRef = useRef<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file?: File) => {
    if (!file) throw new Error("Ошибка загрузки файла");
    if (!file.type.startsWith("image/")) {
      throw new Error("Не поддерживаемый тип файла");
    }
    if (file.size > MAX_SIZE) {
      throw new Error("Размер изображения не должен превышать 1 мб");
    }

    return { file };
  };

  const handleUploadImage = async (file: File) => {
    if (prevUrlRef.current) {
      URL.revokeObjectURL(prevUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    prevUrlRef.current = url;
    onUpload?.(url, file);
  };
  const onDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const element = e.target as HTMLElement;
    element.dataset.active = "true";
    if (!e.dataTransfer.files?.[0]?.type.startsWith("image/")) return;
  };
  const onDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const element = e.target as HTMLElement;
    element.dataset.active = "false";
  };

  const onDrop = async (e: DragEvent<HTMLLabelElement>) => {
    onDragLeave(e);
    const file = e.dataTransfer.files?.[0];
    try {
      const result = validateFile(file);
      handleUploadImage(result.file);
    } catch (error) {
      setError((error as Error).message);
    }
  };
  const onInput = async (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    try {
      const result = validateFile(file);
      handleUploadImage(result.file);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <label
      onDragEnter={onDragEnter}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      htmlFor="preview-image"
      className={cn(
        "relative flex pb-[52%] w-full h-full max-h-100   hover:border-gray-300",
        "border-dashed border-2  data-[active=true]:border-black data-[active=true]:border-2 cursor-pointer h-full",
      )}
    >
      <div className="pointer-events-none flex flex-col absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90%] text-center">
        <span className="text-base font-medium">Добавьте обложку</span>
        <span>Перенесети сюда файл (jpg, gif, png, webp) размером 780x440</span>
        <span className="text-muted-foreground">или нажмите</span>
        <Button className="w-max mx-auto">Добавить обложку</Button>
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
      <input
        hidden
        onChange={onInput}
        accept={"image/*"}
        className="pointer-events-none text-center"
        id="preview-image"
        type="file"
      />
    </label>
  );
};
