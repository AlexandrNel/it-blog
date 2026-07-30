export const getDateFilter = (date?: string) => {
  if (!date) return undefined

  const map: Record<string, Date> = {
    day: new Date(Date.now() - 1000 * 60 * 60 * 24),
    week: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    month: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    year: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365),
  }

  return { gte: map[date] }
}
