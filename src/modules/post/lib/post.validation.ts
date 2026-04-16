import slugify from 'slugify'
import z from 'zod'

export const createPostSchema = z.object({
  content: z.string(),
  previewContent: z.string(),
  previewImageUrl: z.string().nullable().optional(),
  title: z.string().min(1, 'Заголовок обязателен'),
  slug: z.string().optional(),
  desc: z.string(),
  tagIds: z.array(z.string()),
  categoryId: z.string(),
  authorId: z.string(),
})
export const updatePostSchema = z.object({
  content: z.string().optional(),
  previewContent: z.string(),
  previewImageUrl: z.string().nullable().optional(),
  title: z.string().min(1, 'Заголовок обязателен').optional(),
  desc: z.string().optional(),
  categoryId: z.string().nonempty().optional(),
  tagIds: z.array(z.string()).optional(),
})
export type CreatePostRequestDto = z.infer<typeof createPostSchema>
export type UpdatePostRequestDto = z.infer<typeof updatePostSchema>

/** Parsed create-post payload (slug is always defined after validation). */
export type ParsedCreatePostDto = Omit<CreatePostRequestDto, 'slug'> & {
  slug: string
}

export async function validateCreatePost(
  data: unknown
): Promise<ParsedCreatePostDto> {
  const raw = data as Record<string, unknown>
  const schema = z.object({
    content: z.string(),
    previewContent: z.string(),
    previewImageUrl: z.string().nullable().optional(),
    title: z.string().min(1, 'Заголовок обязателен'),
    slug: z
      .string()
      .optional()
      .transform(
        (value) =>
          value ||
          (
            slugify as unknown as (
              s: string,
              opts?: { lower?: boolean; strict?: boolean }
            ) => string
          )(String(raw.title ?? ''), { lower: true, strict: true })
      ),
    desc: z.string(),
    tagIds: z.array(z.string()),
    authorId: z.string(),
    categoryId: z.string(),
  })
  return schema.parseAsync(data)
}

export const SortSchema = z
  .string()
  .optional()
  .transform((sort) => {
    if (sort === 'new' || sort === 'popular' || sort === 'top') return sort
    return 'new'
  })
const PageSchema = z
  .string()
  .optional()
  .transform((val) => {
    const parsed = parseInt(val ?? '1', 10)
    return isNaN(parsed) || parsed < 1 ? 1 : parsed
  })

const LimitSchema = z
  .string()
  .optional()
  .transform((val) => {
    const parsed = parseInt(val ?? '10', 10)
    return isNaN(parsed) || parsed < 1 ? 10 : Math.min(parsed, 100) // защита от limit=99999
  })
const DateSchema = z
  .string()
  .optional()
  .transform((val) => {
    if (val === 'day' || val === 'week' || val === 'month' || val === 'year')
      return val
    return 'all'
  })

export const SearchPostsSchema = z.object({
  q: z
    .string()
    .optional()
    .transform((val) => val?.trim() || null),
  sort: SortSchema,
  page: PageSchema,
  limit: LimitSchema,
  date: DateSchema,
  title: z
    .string()
    .optional()
    .transform((val) => (val === '1' ? 1 : null)),
})
export type PostSortParams = z.infer<typeof SortSchema>
export type SearchPostsParams = z.infer<typeof SearchPostsSchema>
