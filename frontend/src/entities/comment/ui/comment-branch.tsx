import { cn } from "@/shared/lib/utils";

export const CommentBranch = ({ isLast }: { isLast: boolean }) => {
  return (
    <div className="relative flex ">
      {isLast ? (
        <CommentArc isLast />
      ) : (
        <div className="border-l  h-full">
          <CommentArc />
        </div>
      )}
    </div>
  );
};

const CommentArc = ({ isLast = false }: { isLast?: boolean }) => (
  <div className="w-[26px]">
    <div
      className={cn("w-[16px]   h-[30px]  border-b rounded-bl-lg", {
        "border-l": isLast,
      })}
    />
  </div>
);
