import { RegisterForm } from "@/features/auth/register";
import { routes } from "@/shared/config";
import Link from "next/link";

export function RegisterPage() {
  return (
    <div className="flex h-full justify-center items-center">
      <RegisterForm
        footer={
          <p className="text-center">
            <span className="text-center mr-1">Есть аккаунт?</span>
            <Link href={routes.auth.login()} className="text-blue-500 font-medium">
              Вход
            </Link>
          </p>
        }
      />
    </div>
  );
}
