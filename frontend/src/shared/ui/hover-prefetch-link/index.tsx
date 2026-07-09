"use client";

import Link from "next/link";
import { type ComponentProps, useState } from "react";

type HoverPrefetchLinkProps = ComponentProps<typeof Link>;

export function HoverPrefetchLink({ href, children, ...props }: HoverPrefetchLinkProps) {
  const [active, setActive] = useState(false);

  return (
    <Link href={href} prefetch={active ? null : false} onMouseEnter={() => setActive(true)} {...props}>
      {children}
    </Link>
  );
}
