import { FilterToolbarModal } from "@/features/article/article-filter";
import { SearchInput } from "@/features/article/article-search";
import { Card } from "@/shared/ui/card";
import { Row } from "@/shared/ui/layout";
import { FetchPosts } from "./search-posts";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <>
      <Card className="mb-2">
        <Row className="flex-nowrap">
          <Suspense>
            <SearchInput />
          </Suspense>
          <FilterToolbarModal />
        </Row>
      </Card>
      <Suspense>
        <FetchPosts />
      </Suspense>
    </>
  );
}
