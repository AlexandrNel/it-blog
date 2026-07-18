import type { Category } from "../model/types";

export function CategoryItem({ category }: { category: Category }) {
  return <div className="text-sm p-1 w-max hover:text-blue-500">{category.value}</div>;
}
