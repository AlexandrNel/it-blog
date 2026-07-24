"use client";

import { Container } from "@/shared/ui/container";
import { EditorWriteFooter } from "./editor-write-footer";
import dynamic from "next/dynamic";
import type { Editor as EditorType } from "@tiptap/core";
import type { BaseProps } from "@/shared/types/components";
import { Field, FieldError, Skeleton } from "@/shared/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { EditPostValues } from "../../model/schema";
import { useParams } from "next/navigation";
import { useCallback } from "react";

const Editor = dynamic(() => import("../../components/post-editor/editor"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-px">
      <Skeleton className="h-11 rounded-lg" />
      <Skeleton className="md:h-100 h-60 rounded-lg" />
    </div>
  ),
});

export function EditoWritePage({ className }: BaseProps) {
  const params = useParams<{ slug: string }>();

  const { control, setValue, getValues } = useFormContext<EditPostValues>();

  const updateStore = useCallback(
    (editor: EditorType) => {
      setValue("content", editor.getJSON(), { shouldDirty: true });
      setValue("contentSize", editor.storage.characterCount.characters(), { shouldValidate: true });
    },
    [setValue],
  );

  const handleMount = useCallback(
    (editor: EditorType) => {
      setValue("contentSize", editor.storage.characterCount.characters());
    },
    [setValue],
  );

  const handleUnmount = useCallback(
    (editor: EditorType) => {
      setValue("content", editor.getJSON());
    },
    [setValue],
  );

  return (
    <Container className={className}>
      <div className="bg-card rounded-lg">
        <Editor
          key={params.slug}
          classNameContentWraper=""
          content={getValues("content")}
          header={
            <div className="editor-content tiptap ProseMirror editor p-[1rem_3rem_0]">
              <Controller
                control={control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field className="gap-2">
                    <textarea
                      className="outline-none text-[1.25em] resize-none field-sizing-content leading-tight overflow-visible font-bold border-b-transparent aria-invalid:border-b-red-500 border-b "
                      placeholder="Введите заголовок"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                  </Field>
                )}
              />
            </div>
          }
          onMount={handleMount}
          onChange={updateStore}
          onUnmount={handleUnmount}
        ></Editor>
        <EditorWriteFooter className="mx-6 pb-4 mt-2" />
      </div>
    </Container>
  );
}
