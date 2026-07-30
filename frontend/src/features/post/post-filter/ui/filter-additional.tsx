import { Checkbox } from "@/shared/ui/checkbox";
import { Field, FieldLabel } from "@/shared/ui/field";
import { useQueryState } from "nuqs";
import { memo } from "react";

export const FilterAdditional = memo(() => {
  const [title, setTitle] = useQueryState("title");
  return (
    <Field className="mt-4">
      <div className="flex items-center gap-2">
        <Checkbox checked={!!title} onCheckedChange={(c) => setTitle(c ? "1" : null)} id="title" />
        <FieldLabel htmlFor="title">Искать по заголовкам</FieldLabel>
      </div>
    </Field>
  );
});
