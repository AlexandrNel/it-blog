import { PrismaClientKnownRequestError } from '../../../../generated/prisma/internal/prismaNamespace.js'

export async function withUniqueSlug<T>(
  base: string,
  action: (slug: string) => Promise<T>
): Promise<T> {
  for (let i = 0; i < 3; i++) {
    const slug = i === 0 ? base : `${base}-${crypto.randomUUID().slice(0, 4)}`
    try {
      return await action(slug)
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
        continue
      throw e
    }
  }
  throw new Error('Не удалось сгенерировать уникальный slug')
}
