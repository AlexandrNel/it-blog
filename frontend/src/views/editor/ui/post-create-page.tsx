"use client";

import { useLayoutEffect, useState } from "react";
import { PostEditor } from "./post-editor";

export function PostCreatePage() {
  const [visit, setVisit] = useState(0);

  useLayoutEffect(() => {
    setVisit((v) => v + 1);
  }, []);

  return <PostEditor key={visit} />;
}
