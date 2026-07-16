"use client";

import { useEffect, useRef } from "react";
import { differenceInMilliseconds } from "date-fns";
import { isAxiosError } from "axios";
import { safeParseJson } from "@/shared/lib/utils/safe-parse-json";
import { useSendView } from "../api/useSendView";
import { TPost } from "@/entities/post";

type View = {
  expiresAt: string;
};
type Views = Record<string, View>;

export const useView = (id: string) => {
  const hasFetched = useRef(false);
  const { mutate } = useSendView();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const viewsJSON = localStorage.getItem("views");
    const views = safeParseJson<Views>(viewsJSON) ?? {};
    let diff: number = -1;
    if (id in views) {
      const view = views[id];
      const expiredAt = new Date(view.expiresAt);
      diff = differenceInMilliseconds(expiredAt, new Date());
    }
    if (diff < 0) {
      const date = new Date();
      mutate(id, {
        onSuccess: (data) => {
          const seconds = data.ttl || 60 * 60 * 24;
          date.setSeconds(date.getSeconds() + seconds);
          const updatedViews = {
            ...views,
            [id]: { expiresAt: date.toISOString() },
          };
          localStorage.setItem("views", JSON.stringify(updatedViews));
        },
        onError: (error) => {
          // TODO: сделать нормальный контракт или задокументировать

          if (isAxiosError<TPost.SendViewResponse>(error)) {
            const data = error.response?.data;
            const seconds = data?.ttl || 60 * 60 * 24;
            date.setSeconds(date.getSeconds() + seconds);
          }
          const updatedViews = {
            ...views,
            [id]: { expiresAt: date.toISOString() },
          };
          localStorage.setItem("views", JSON.stringify(updatedViews));
        },
      });
    }
  }, [id]);
  return null;
};
