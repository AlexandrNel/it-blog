"use client";

import { useFormContext } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import { useEditorStore } from "../model/use-editor-store";
import { type FormSchemaType } from "../model/schema";
import { useSubmitPost } from "../model/use-submit-post";
import { DeletePostButton } from "@/features/post/post-delete";

export function PostSettingsFooter() {
  const form = useFormContext<FormSchemaType>();
  const setData = useEditorStore((state) => state.setData);
  const id = useEditorStore((state) => state.post?.id);

  const { isSubmitting, submit } = useSubmitPost();

  const handlePublish = async () => {
    const isFormValid = await form.trigger();

    if (isFormValid) {
      await submit(form.getValues());
    }
  };

  return (
    <div className="flex justify-between mt-4">
      <Button type="button" onClick={() => setData({ page: 0 })}>
        Назад
      </Button>
      <div className="flex gap-2">
        {id && <DeletePostButton data={{ id }} />}
        <Button variant="outline" type="button" disabled={isSubmitting} onClick={handlePublish}>
          {id ? "Сохранить" : "Опубликовать"}
        </Button>
      </div>
    </div>
  );
}
