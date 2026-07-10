import { type PostWithStatistic } from "../model/types";
import { cn } from "@/shared/lib/utils";
import { PostInfo } from "./PostInfo";
import { PostPreview } from "./PostPreview";
import { TagList } from "@/entities/tag/@x/post";
import Link from "next/link";
import { PostStatistic } from "./PostStatistic";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { type PropsWithChildren } from "react";
import { type Route } from "next";

interface Props {
  className?: string;
  post: PostWithStatistic;
}

export const PostCard = ({ className, post }: Props) => {
  return (
    <Card
      className={cn(
        `h-full flex flex-col transition-all  text-foreground  rounded-lg  relative group gap-2`,
        className,
      )}
    >
      <CardContent>
        <PostInfo className="z-5 relative" author={post.author} createdAt={post.createdAt} />
        <PostCardHeading href={`/posts/${post.slug}` as Route}>{post.title}</PostCardHeading>
        <PostPreview previewContent={post.previewContent} image={post.previewImage} />
        <Button asChild className="my-1 mt-2 text-sm max-md:hidden" size={"xs"} variant={"outline"}>
          <Link href={`/posts/${post.slug}`}>Читать далее</Link>
        </Button>
        <TagList className="mt-2" list={post.tags} />
      </CardContent>
      <Separator />
      <CardFooter>
        <PostStatistic statistic={post.statistic} />
      </CardFooter>
    </Card>
  );
};

const PostCardHeading = ({ children, href }: PropsWithChildren<{ href: Route }>) => {
  return (
    <h2 className="font-bold md:text-xl text-lg transition-all hover:underline w-max my-2">
      <Link
        className={cn(
          "max-md:before:absolute max-md:before:content-[''] max-md:before:inset-0 max-md:before:z-1 max-md:before:block max-md:before:w-full max-md:before:h-full",
        )}
        href={href}
      >
        {children}
      </Link>
    </h2>
  );
};
