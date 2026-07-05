"use client";

import { useView } from "../model/useView";

export function ArticleView({ id }: { id: string }) {
  useView(id);
  return null;
}
