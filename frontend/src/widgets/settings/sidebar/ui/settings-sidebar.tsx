"use client";
import { useActiveLink } from "@/shared/lib/hooks/use-active-link";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";
import { Column, Row } from "@/shared/ui/layout";
import { Bell, Settings, ShieldCheck, User } from "lucide-react";
import { type Route } from "next";
import Link from "next/link";

const BASE_SEGMENT = "settings";
const LINKS = [
  { href: `/${BASE_SEGMENT}/`, label: "Профиль", icon: <User size={18} /> },
  {
    href: `/${BASE_SEGMENT}/account`,
    label: "Аккаунт",
    icon: <Settings size={18} />,
  },
  {
    href: `/${BASE_SEGMENT}/notifications`,
    label: "Уведомления",
    icon: <Bell size={18} />,
  },
  {
    href: `/${BASE_SEGMENT}/security`,
    label: "Безопасность",
    icon: <ShieldCheck size={18} />,
  },
];

export function SettingsSidebar() {
  const { checkIsActive } = useActiveLink();
  return (
    <Card>
      <h1 className="mb-5 text-xl font-bold">Настройки</h1>
      <Column className="gap-0">
        {LINKS.map((item) => {
          const isActive = checkIsActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href as Route}
              className={cn("px-3 py-2 rounded-lg hover:bg-muted", {
                "bg-muted": isActive,
              })}
            >
              <Row>
                {item.icon}
                <span>{item.label}</span>
              </Row>
            </Link>
          );
        })}
      </Column>
    </Card>
  );
}
