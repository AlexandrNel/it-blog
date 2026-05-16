import { prisma } from '@/shared/lib/prisma.js'

export class SeoService {
  async getSitemapData() {
    const [articles, profiles] = await prisma.$transaction([
      prisma.post.findMany({
        where: { published: true },
        select: {
          updatedAt: true,
          slug: true,
        },
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.profile.findMany({
        where: {
          user: {
            emailVerifiedAt: { not: null },
            OR: [
              { posts: { some: { published: true } } },
              { displayName: { not: null } },
            ],
          },
        },
        select: {
          updatedAt: true,
          user: {
            select: {
              username: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      }),
    ])

    return {
      articles,
      profiles: profiles.map((profile) => ({
        username: profile.user.username,
        updatedAt: profile.updatedAt,
      })),
    }
  }
}
