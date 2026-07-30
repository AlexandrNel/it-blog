import type { Post } from "@/entities/post";
import type { JSONContent } from "@tiptap/core";
import * as z from "zod";
import type { EditorStep } from "./use-editor-store";
import { ALLOWED_MIMETYPE, MAX_FILE_SIZE, MAX_LENGTH_DESCRIPTION } from "./consts";

export const formSchema = z.object({
  title: z
    .string()
    .min(5, "Заголовок должен содержать не менее 5 символов")
    .max(32, "заголовок должен содержать не более 32 символов."),
  desc: z
    .string()
    .min(20, "Описание должно содержать не менее 20 символов.")
    .max(200, "Описание должно содержать не более 200 символов."),
  category: z.custom<Post["category"]>().refine((data) => data.id !== "", { error: "Выберите категорию" }),
  tags: z.array(z.string()).max(8).min(1, { error: "Выберите хотя бы один тег" }),
  previewLength: z
    .number()
    .min(50, "Превью статьи должно содержать не менее 50 символов")
    .max(2000, "Превью статьи должно содержать не более 2000 символов"),
});

const categorySchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
});

const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
  key: z.string(),
});

const previewImageSchema = z.object({
  url: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

export const CreatePostSchema = z.object({
  title: z
    .string("Текст заголовка не может быть пустым")
    .min(5, "Заголовок должен содержать не менее 5 символов")
    .max(64, "заголовок должен содержать не более 32 символов."),
  description: z
    .string("Текст описания не может быть пустым")
    .min(20, "Описание должно содержать не менее 20 символов.")
    .max(MAX_LENGTH_DESCRIPTION, "Описание должно содержать не более 200 символов."),
  category: categorySchema.refine((c) => Boolean(c.value), { error: "Выберите категорию" }),
  tags: z.array(tagSchema).max(8).min(1, { error: "Выберите хотя бы один тег" }),
  content: z.custom<JSONContent>(),
  previewContent: z.custom<JSONContent>(),
  contentSize: z
    .number("Текст статьи не может быть пустым")
    .min(50, "Не менее 50 символов")
    .max(5000, "Не более 5000 символов"),
  previewContentSize: z
    .number("Текст превью не может быть пустым")
    .min(50, "Превью статьи должно содержать не менее 50 символов")
    .max(2000, "Превью статьи должно содержать не более 2000 символов"),
  previewImage: previewImageSchema.nullable(),
  file: z
    .file()
    .nullable()
    .refine(
      (v) => {
        if (!v) return true;
        if (v.size > MAX_FILE_SIZE) return false;
        return true;
      },
      { error: "Изображение должно быть меньше 1мб" },
    )
    .refine(
      (v) => {
        if (!v) return true;
        if (!v.type.startsWith("image/")) return false;
        if (!ALLOWED_MIMETYPE.includes(v.type)) return false;
        return true;
      },
      { error: "Не поддерживаемый формат изображения" },
    ),
});

const EditPostSchema = CreatePostSchema.partial().refine((data) => Object.keys(data).length > 0, {
  error: "Заполните хотя бы 1 поле",
  abort: true,
});

export function createEditorPostSchema<T extends EditorStep>(step: T) {
  return step === "create" ? CreatePostSchema : EditPostSchema;
}

export type CreatePostValues = z.infer<typeof CreatePostSchema>;
export type EditPostValues = z.infer<typeof EditPostSchema>;
