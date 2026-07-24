import { Row } from "@/shared/ui";
import { SortButton } from "./sort-button";
import { SORT_LIST } from "../../config/sort-list";

export const SortToolbarSkeleton = () => {
  return (
    <Row>
      {SORT_LIST.map(({ slug }) => (
        <SortButton disabled isActive={slug === "new"} key={slug} />
      ))}
    </Row>
  );
};
