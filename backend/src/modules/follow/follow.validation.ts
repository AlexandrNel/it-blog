import z from 'zod'

export const FollowRequestSchema = z.object({ userId: z.string().nonempty() })
export type FollowRequestValues = z.infer<typeof FollowRequestSchema>
