import { type BaseProps } from "@/shared/types/components";
import { type CategoryListReponse } from "../model/types";
import { CategoryItem } from "./CategoryUI";
import { cn } from "@/shared/lib/utils";

export function CategoryList({ className, list }: BaseProps & { list: CategoryListReponse }) {
  return (
    <ul className={cn(className)}>
      {list.map((c) => (
        <CategoryItem category={c} key={c.id} />
      ))}
    </ul>
  );
}
