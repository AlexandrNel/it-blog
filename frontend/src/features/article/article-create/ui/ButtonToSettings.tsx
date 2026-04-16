import { Button } from "@/shared/ui/button";
import { useEditorStore } from "../model/use-editor-store";
import React from "react";

export const ButtonToSettings = React.memo(() => {
	const setPage = useEditorStore((state) => state.setPage);
	const length = useEditorStore((state) => state.length);
	const disabled = length <= 5;
	return (
		<Button disabled={disabled} onClick={() => setPage(1)} className="mt-2">
			Далее
		</Button>
	);
});
