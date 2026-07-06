import { LoginForm } from "@/features/auth/login";
import { routes } from "@/shared/config";
import Link from "next/link";

export function LoginPage() {
  return (
    <div className="flex h-full justify-center items-center">
      <LoginForm
        footer={
          <p className="text-center">
            <span className="text-center mr-1">Нет аккаунта?</span>
            <Link href={routes.auth.register()} className="text-blue-500 font-medium">
              Регистрация
            </Link>
          </p>
        }
      />
    </div>
  );
}
