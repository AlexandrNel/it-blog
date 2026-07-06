import { useAuthStore } from "@/entities/auth";
import { useCallback, useEffect, useRef, useState } from "react";

export function useCheckAuth() {
  const { user } = useAuthStore();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(
    (e: PointerEvent) => {
      if (!user) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    },
    [user],
  );

  const onSuccessAuth = () => {
    setIsOpen(false);
    wrapperRef.current?.removeEventListener("click", handleClick);
  };

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    el.addEventListener("click", handleClick);

    return () => {
      el.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return { onSuccessAuth, isOpen, setIsOpen, wrapperRef };
}
