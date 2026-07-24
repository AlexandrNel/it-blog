"use client";

import { Button } from "@/shared/ui/button";
import { useEditorStore } from "../../model/use-editor-store";
import { useSubmitPost } from "../../model/use-submit-post";
import { DeletePostButton } from "@/features/post/post-delete";

export function PostSettingsFooter() {
  const prevPage = useEditorStore((s) => s.prevPage);

  const { submit, id, disabled } = useSubmitPost();

  return (
    <div className="flex justify-between mt-4">
      <Button type="button" onClick={() => prevPage()}>
        Назад
      </Button>
      <div className="flex gap-2">
        {id && <DeletePostButton data={{ id }} />}
        <Button variant="outline" type="button" disabled={disabled} onClick={submit}>
          {id ? "Сохранить" : "Опубликовать"}
        </Button>
      </div>
    </div>
  );
}
