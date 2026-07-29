import { prisma } from '@/shared/lib/prisma.js'

export async function checkDemoUsers() {
  const date = new Date()

  try {
    const demoUsers = await prisma.demo.findMany()
    const toDelete = demoUsers
      .filter((demo) => {
        const diff = Math.floor(
          (date.getTime() - demo.createdAt.getTime()) / 1000 / 60 / 60
        )
        return diff >= 24
      })
      .map((v) => v.id)
    if (toDelete.length > 0) {
      await prisma.user.deleteMany({
        where: { demo: { id: { in: toDelete } } },
      })
      console.log(`Удалено демо аккаунтов:  ${toDelete.length} `)
    }
  } catch (error) {}
}
