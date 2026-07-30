type SortCategory = "new" | "top" | "popular";
type SortItem = { slug: SortCategory; name: string };

const defaultSort: SortCategory = "new" as const;

const SORT_LIST: SortItem[] = [
  {
    slug: "new",
    name: "Новые",
  },
  {
    slug: "top",
    name: "Топ",
  },
  {
    slug: "popular",
    name: "Популярные",
  },
] as const;

export { defaultSort, SORT_LIST, type SortItem, type SortCategory };
