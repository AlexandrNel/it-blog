/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import { cn } from "@/shared/lib/utils";
import { safeParseJson } from "@/shared/lib/utils/safe-parse-json";
import { renderToHTMLString } from "@tiptap/static-renderer";
import { type JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";

export function EditorContent({ content, className }: { content: string; className?: string }) {
  const json = safeParseJson<JSONContent>(content);
  let output: string;
  if (!json) output = "";
  else
    output = renderToHTMLString({
      content: json,
      extensions: [StarterKit, Image, Highlight],
    });

  return <div className={cn("prose", className)} dangerouslySetInnerHTML={{ __html: output }} />;
}
