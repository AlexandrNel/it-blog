"use client";

import { useView } from "../model/useView";

export function PostView({ id }: { id: string }) {
  useView(id);
  return null;
}
