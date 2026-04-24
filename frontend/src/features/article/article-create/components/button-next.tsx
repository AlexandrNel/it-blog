import { Button } from "@/shared/ui/button";
import React from "react";
import { useValidateMainEditor, MIN_LENGTH } from "../lib/use-validate-main-editor";

export const ButtonNext = React.memo(() => {
	const { disabled, onNext } = useValidateMainEditor();
	return (
		<>
			<Button disabled={disabled} onClick={onNext} className="mt-2">
				Далее
			</Button>
			{disabled && (
				<ol className=" list-disc pl-5 mt-5 text-muted-foreground text-sm">
					<li>Длина текста статьи должна быть не менее {MIN_LENGTH} символов</li>
				</ol>
			)}
		</>
	);
});
