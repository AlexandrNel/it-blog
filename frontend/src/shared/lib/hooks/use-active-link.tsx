"use client";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

export const useActiveLink = () => {
  const pathname = usePathname();
  const splittedPathname = pathname.split("/").filter(Boolean);

  const checkIsActive = useCallback(
    (link: string, exact: boolean = true) => {
      const splittedLink = link.split("/").filter(Boolean);
      if (exact) {
        return splittedPathname.join("/") === splittedLink.join("/");
      }
      return splittedLink.every((segment, i) => {
        return splittedPathname[i] === segment;
      });
    },
    [splittedPathname],
  );
  return { checkIsActive };
};
