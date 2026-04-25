import { Post } from "@/entities/article";
import * as z from "zod";

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
    .max(100, "Превью статьи должно содержать не более 100 символов"),
});

export type FormSchemaType = z.infer<typeof formSchema>;
