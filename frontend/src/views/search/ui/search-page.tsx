import { FilterToolbarModal } from "@/features/post/post-filter";
import { SearchInput } from "@/features/post/post-search";
import { Card, CardContent } from "@/shared/ui/card";
import { Row } from "@/shared/ui/layout";
import { FetchPosts } from "./search-posts";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <>
      <Card className="mb-2">
        <CardContent>
          <Row className="flex-nowrap">
            <Suspense>
              <SearchInput />
            </Suspense>
            <FilterToolbarModal />
          </Row>
        </CardContent>
      </Card>
      <Suspense>
        <FetchPosts />
      </Suspense>
    </>
  );
}
