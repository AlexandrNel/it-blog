"use client";

import { FormProvider } from "react-hook-form";

import { Container } from "@/shared/ui/container";
import { ArticleSettingsFooter } from "../components/article-settings-footer";
import { useEditorSettingsForm } from "../model/use-editor-settings-form";
import { ArticleEditorForm } from "./article-editor-form";

export function EditorSettingsPage() {
  const form = useEditorSettingsForm();

  return (
    <Container>
      <FormProvider {...form}>
        <div className={"bg-card rounded-lg p-4 mt-2"}>
          <ArticleEditorForm />
          <ArticleSettingsFooter />
        </div>
      </FormProvider>
    </Container>
  );
}
