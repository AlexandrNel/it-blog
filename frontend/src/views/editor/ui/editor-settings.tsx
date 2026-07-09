"use client";

import { FormProvider } from "react-hook-form";

import { Container } from "@/shared/ui/container";
import { PostSettingsFooter } from "../components/post-settings-footer";
import { useEditorSettingsForm } from "../model/use-editor-settings-form";
import { PostEditorForm } from "./post-editor-form";

export function EditorSettingsPage() {
  const form = useEditorSettingsForm();

  return (
    <Container>
      <FormProvider {...form}>
        <div className={"bg-card rounded-lg p-4 mt-2"}>
          <PostEditorForm />
          <PostSettingsFooter />
        </div>
      </FormProvider>
    </Container>
  );
}
