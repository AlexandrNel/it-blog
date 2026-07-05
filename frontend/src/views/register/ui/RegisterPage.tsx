import { RegisterForm } from "@/features/auth/register";

export const RegisterPage: React.FC = () => {
  return (
    <div className="flex h-full justify-center items-center">
      <RegisterForm className="card py-10" />
    </div>
  );
};
