import type { PostWithStatistic } from "../model/types";
import { classNames } from "@/shared/lib/utils";
import { PostCard } from "./PostCard";

interface Props {
  classNamePost?: string;
  classNameWrapper?: string;
  postList?: PostWithStatistic[];
}

export const PostList = ({ classNamePost = "", classNameWrapper = "", postList }: Props) => {
  return (
    <>
      {!postList || postList.length === 0 ? (
        <div className="text-center">Ничего не найдено</div>
      ) : (
        <ul className={classNameWrapper}>
          {postList.map((post) => (
            <li className={classNames("mb-2", {}, [classNamePost])} key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
