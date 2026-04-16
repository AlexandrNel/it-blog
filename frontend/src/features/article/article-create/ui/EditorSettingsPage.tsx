"use client";

import { Container } from "@/shared/ui/container";
import { EditorForm } from "./EditorForm";
import { useEditorStore } from "../model/use-editor-store";
import { Button } from "@/shared/ui/button";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";

export function EditorSettingsPage({ deleteButton }: { deleteButton?: ReactNode }) {
	const { id } = useParams();
	const setPage = useEditorStore((state) => state.setPage);

	return (
		<Container>
			<EditorForm
				footer={
					<div className="flex justify-between mt-2">
						<Button type="button" onClick={() => setPage(0)}>
							Назад
						</Button>
						<div className="flex gap-2">
							{deleteButton}
							<Button variant={"outline"} type="submit">
								{id ? "Сохранить" : "Опубликовать"}
							</Button>
						</div>
					</div>
				}
			/>
		</Container>
	);
}
