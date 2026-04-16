import { RegisterForm } from "@/widgets/register-form";

export const RegisterPage: React.FC = () => {
  return (
    <div className="flex container justify-center items-center">
      <RegisterForm className="card py-10" />
    </div>
  );
};
