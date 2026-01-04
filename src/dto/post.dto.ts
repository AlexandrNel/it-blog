import slugify from "slugify";
import z from "zod";

export const postSchema = z.object({
    content: z.string(),
    title: z.string(),
    slug: z.string(),
    desc: z.string(),
    tags: z.array(z.string()),
    authorId: z.string()
})

export const validatePostSchema = async (data: PostDataType) => {
    const postSchema = z.object({
        content: z.string(),
        title: z.string().nonempty(),
        slug: z.string().optional().transform((value) => {
            if (value) return value
            return slugify.default(String(data.title), { lower: true, strict: true })
        }),
        desc: z.string(),
        tags: z.array(z.string()),
        authorId: z.string()
    })
    const parseData = await postSchema.parseAsync(data)
    return parseData
}

export type PostDataType = z.infer<typeof postSchema>
