import type React from "react";
import { type PostWithStatistic } from "../model/post";
import { cn } from "@/shared/lib/utils";
import { PostCard } from "./PostCard";

interface Props {
  classNamePost?: string | null;
  classNameWrapper?: string;
  postList?: PostWithStatistic[];
}

export const PostList: React.FC<Props> = ({ classNamePost, classNameWrapper, postList }) => {
  return (
    <>
      {!postList || postList.length === 0 ? (
        <div className="text-center">Ничего не найдено</div>
      ) : (
        <ul className={cn(classNameWrapper)}>
          {postList.map((post) => (
            <li className={cn("mb-2", classNamePost)} key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
