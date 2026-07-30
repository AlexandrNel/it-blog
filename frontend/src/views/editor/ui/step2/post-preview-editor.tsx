import type { CSSProperties } from "react";
import { classNames } from "@/shared/lib/utils";
import type { Editor as EditorType } from "@tiptap/core";
import { useFormContext, useFormState } from "react-hook-form";
import type { EditPostValues } from "../../model/schema";
import { EditorPreviewImage } from "../../components/editor-preview-image/editor-preview-image";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("../../components/post-editor/editor").then((mod) => mod.default),
  { ssr: false },
);

function PostPreviewEditor() {
  const { getValues, setValue, control } = useFormContext<EditPostValues>();
  const { errors } = useFormState({ control, name: "previewContentSize" });

  const previewImage = getValues("previewImage");

  const handleChange = (editor: EditorType) => {
    setValue("previewContent", editor.getJSON(), { shouldDirty: true });
    setValue("previewContentSize", editor.storage.characterCount.characters(), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleChangeImage = (data: EditPostValues["previewImage"], file: File | null) => {
    console.log("add immage");

    setValue("previewImage", data, { shouldDirty: true, shouldValidate: true });
    setValue("file", file, { shouldDirty: true, shouldValidate: true });
  };

  const handleMount = (editor: EditorType) => {
    setValue("previewContentSize", editor.storage.characterCount.characters());
  };

  return (
    <div
      className={classNames("p-2 border rounded-lg", {
        "border-red-500": !!errors.previewContentSize,
      })}
    >
      <Editor
        style={{ "--tt-content-padding": "1rem 3rem 8rem" } as CSSProperties}
        header={<EditorPreviewImage value={previewImage} onChange={handleChangeImage} />}
        content={getValues("previewContent")}
        onChange={handleChange}
        onMount={handleMount}
        options={{
          toolbar: { disabled: { image: true }, heading: { levels: [3] } },
        }}
      />
    </div>
  );
}

export { PostPreviewEditor };
