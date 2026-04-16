import { LoginForm } from "@/widgets/login-form";

export const LoginPage: React.FC = () => {
  return (
    <div className="flex container justify-center items-center">
      <LoginForm className="card py-10" />
    </div>
  );
};
