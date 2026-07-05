"use client";

import { useEffect, useState } from "react";

export function useLoader<T>(fn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fn()
      .then(setData)
      .finally(() => {
        setIsLoading(false);
      });
  }, [fn]);

  return { data, isLoading };
}
