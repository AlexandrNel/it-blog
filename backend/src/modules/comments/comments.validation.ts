import z from 'zod'

export const CommentPayloadSchema = z.object({
  content: z.string().min(1, 'Комментарий не должен быть пустым'),
})
