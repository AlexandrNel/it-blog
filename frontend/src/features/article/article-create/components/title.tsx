import { useEditorStore } from "../model/use-editor-store";
export function Title() {
  const setData = useEditorStore((state) => state.setData);
  const title = useEditorStore((state) => state.title);
  return (
    <div className="editor-content tiptap ProseMirror editor p-[1rem_3rem_0]">
      <input
        id="title"
        name="title"
        value={title}
        onChange={(e) => setData({ title: e.currentTarget.value })}
        className="outline-none  text-[1.5em] font-bold"
        placeholder="Введите заголовок"
      />
    </div>
  );
}
