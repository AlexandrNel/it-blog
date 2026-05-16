import { FilterToolbarModal } from "@/features/article/article-filter";
import { SearchInput } from "@/features/article/article-search";
import { Card } from "@/shared/ui/card";
import { Column, Row } from "@/shared/ui/layout";
import { FetchPosts } from "./search-posts";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <div>
      <Card className="mb-2">
        <Column>
          <Row className="flex-nowrap">
            <Suspense>
              <SearchInput />
            </Suspense>
            <FilterToolbarModal />
          </Row>
        </Column>
      </Card>
      <Suspense>
        <FetchPosts />
      </Suspense>
    </div>
  );
}
