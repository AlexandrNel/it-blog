import type { CommentType } from '../comments.service.js'

function getDepth(commentId: string, map: Map<string, any>): number {
  let depth = 1
  let current = map.get(commentId)

  while (current && current.parentId) {
    depth++
    current = map.get(current.parentId)
  }
  return depth
}

// Вспомогательная функция: ищет родителя на нужном уровне
function findAncestorAtDepth(
  comment: any,
  map: Map<string, any>,
  targetDepth: number
) {
  let current = map.get(comment.parentId)

  while (current) {
    const d = getDepth(current.id, map)
    if (d === targetDepth) return current
    current = map.get(current.parentId)
  }
  return null
}

export function buildCollapsedTree(flatComments: CommentType[], maxDepth = 3) {
  const map = new Map<string, CommentType & { replies: CommentType[] }>()
  const roots: CommentType[] = []

  // 1. Сначала просто кладем всё в Map
  flatComments.forEach((c) => map.set(c.id, { ...c, replies: [] }))

  // 2. Распределяем
  flatComments.forEach((comment) => {
    const node = map.get(comment.id)!

    if (!comment.parentId) {
      roots.push(node) // Это корень (Уровень 1)
    } else {
      const currentDepth = getDepth(comment.id, map)

      if (currentDepth <= maxDepth) {
        // Обычная вложенность в прямого родителя
        const parent = map.get(comment.parentId)
        parent?.replies.push(node)
      } else {
        // Схлопывание: ищем предка, который находится на уровне 3
        const ancestor = findAncestorAtDepth(comment, map, maxDepth)
        if (ancestor) {
          ancestor.replies.push(node)
        }
      }
    }
  })

  return roots
}
