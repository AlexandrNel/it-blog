"use client";

import { useParams } from "next/navigation";
import { useFormContext } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import { useEditorStore } from "../model/use-editor-store";
import { type FormSchemaType } from "../model/schema";
import { ArticleDeleteButton } from "./article-delete-button";
import { useSubmitArticle } from "../lib/use-submit-article";

export function ArticleSettingsFooter() {
  const { slug } = useParams<{ slug: string }>();
  const form = useFormContext<FormSchemaType>();
  const setData = useEditorStore((state) => state.setData);

  const { isSubmitting, submit } = useSubmitArticle();

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
        <ArticleDeleteButton id={typeof slug === "string" ? slug : undefined} />
        <Button variant="outline" type="button" disabled={isSubmitting} onClick={handlePublish}>
          {slug ? "Сохранить" : "Опубликовать"}
        </Button>
      </div>
    </div>
  );
}
