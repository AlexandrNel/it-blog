import { Button } from "@/shared/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export const SearchPost = () => {
  return (
    <Button asChild variant={"outline"}>
      <Link href={"/search"}>
        <Search /> <span>Найти</span>
      </Link>
    </Button>
  );
};
