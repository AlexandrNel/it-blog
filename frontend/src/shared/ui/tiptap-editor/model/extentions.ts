import { ImageUploadNode } from "../components/tiptap-node/image-upload-node";
import { handleImageUpload, MAX_FILE_SIZE } from "../lib/tiptap-utils";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { Placeholder } from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";

export const baseToolbarExtentions = [
  StarterKit.configure({
    heading: { levels: [2, 3, 4, 5] },
    codeBlock: {
      enableTabIndentation: true,
    },
    link: {
      openOnClick: false,
      enableClickSelection: true,
    },
  }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Highlight.configure({ multicolor: true }),
  Image,
  Typography,
  Superscript,
  Subscript,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "Введите заголовок";
      }
      if (node.type.name === "paragraph") {
        return "Введите текст";
      }
      return "";
    },
    showOnlyCurrent: true,
  }),
  ImageUploadNode.configure({
    accept: "image/*",
    maxSize: MAX_FILE_SIZE,
    limit: 3,
    upload: handleImageUpload,
    onError: (error) => console.error("Upload failed:", error),
  }),
];

export type ToolType =
  | "blockquote"
  | "bold"
  | "bulletList"
  | "code"
  | "codeBlock"
  | "heading"
  | "undoRedo"
  | "italic"
  | "link"
  | "orderedList"
  | "strike"
  | "underline"
  | "tasklist"
  | "highlight"
  | "superscript"
  | "subscript"
  | "image"
  | "textAlign";
