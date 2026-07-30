"use client";

import { scrollToElementOnLoad } from "@/shared/lib/utils/scroll-to-element-on-load";
import { useEffect } from "react";

export function ScrollToComment() {
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash) {
      scrollToElementOnLoad(hash);
    }
  }, []);
  return null;
}
