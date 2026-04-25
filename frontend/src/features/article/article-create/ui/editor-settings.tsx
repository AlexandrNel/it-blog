"use client";

import { FormProvider } from "react-hook-form";

import { Container } from "@/shared/ui/container";
import { ArticleSettingsFooter } from "../components/article-settings-footer";
import { useEditorSettingsForm } from "../lib/use-editor-settings-form";
import { ArticleEditorForm } from "./article-editor-form";

export function EditorSettingsPage() {
	const form = useEditorSettingsForm();

	return (
		<Container>
			<FormProvider {...form}>
				<ArticleEditorForm />
				<ArticleSettingsFooter />
			</FormProvider>
		</Container>
	);
}
