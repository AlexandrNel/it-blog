"use client";

import { Container } from "@/shared/ui/container";
import { PostSettingsFooter } from "./editor-settings-footer";
import { PostEditorForm } from "./post-editor-form";
import type { BaseProps } from "@/shared/types";

export function EditorSettingsPage({ className }: BaseProps) {
  return (
    <Container className={className}>
      <div className={"bg-card rounded-lg p-4 mt-2"}>
        <PostEditorForm />
        <PostSettingsFooter />
      </div>
    </Container>
  );
}
