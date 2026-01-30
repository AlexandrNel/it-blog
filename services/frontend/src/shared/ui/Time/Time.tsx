"use client";
import React from "react";

interface Props {
  value: string;
}

export const Time: React.FC<Props> = ({ value }) => {
  const localeTime = new Date(value).toLocaleString();
  return localeTime;
};
