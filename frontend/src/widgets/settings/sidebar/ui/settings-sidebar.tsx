"use client";
import { routes } from "@/shared/config";
import { useActiveLink } from "@/shared/lib/hooks/use-active-link";
import { classNames } from "@/shared/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Column, Row } from "@/shared/ui/layout";
import { Settings, ShieldCheck, User } from "lucide-react";
import { type Route } from "next";
import Link from "next/link";

const LINKS = [
  { href: routes.settings.root(), label: "Профиль", icon: <User size={18} /> },
  {
    href: routes.settings.account(),
    label: "Аккаунт",
    icon: <Settings size={18} />,
  },
  {
    href: routes.settings.security(),
    label: "Безопасность",
    icon: <ShieldCheck size={18} />,
  },
];

export function SettingsSidebar() {
  const { checkIsActive } = useActiveLink();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки</CardTitle>
        <CardDescription>Настройки профиля</CardDescription>
      </CardHeader>
      <CardContent>
        <Column className="gap-0">
          {LINKS.map((item) => {
            const isActive = checkIsActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href as Route}
                className={classNames("px-3 py-2 rounded-lg hover:bg-muted", {
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
      </CardContent>
    </Card>
  );
}
