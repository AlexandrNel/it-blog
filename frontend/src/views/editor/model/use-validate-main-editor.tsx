"use client";

import { useEditorStore } from "./use-editor-store";

export const MIN_LENGTH = 10;

export const useValidateMainEditor = () => {
  const length = useEditorStore((state) => state.length);
  const setData = useEditorStore((state) => state.setData);
  const disabled = length < MIN_LENGTH;
  const onNext = () => {
    setData({ page: 1 });
  };
  return { disabled, onNext };
};
