import { Button } from "@/shared/ui/button";
import { useFormContext, useFormState } from "react-hook-form";
import type { EditPostValues } from "../../model/schema";
import { useEditorStore } from "../../model/use-editor-store";
import type { BaseProps } from "@/shared/types";

export const EditorWriteFooter = ({ className }: BaseProps) => {
  const { trigger, control } = useFormContext<EditPostValues>();
  const { errors } = useFormState<EditPostValues>({ control, name: ["title", "contentSize"] });
  const nextPage = useEditorStore((s) => s.nextPage);

  const disabled = !!errors.title || !!errors.contentSize;

  const handleNext = async () => {
    const isValid = await trigger(["title", "contentSize"]);
    if (!isValid) return;
    nextPage();
  };

  return (
    <div className={className}>
      <ol className="list-disc pl-5  text-sm text-destructive  mb-2">
        {errors.contentSize && <li>{errors.contentSize.message}</li>}
      </ol>
      <Button disabled={disabled} onClick={handleNext}>
        Далее
      </Button>
    </div>
  );
};
