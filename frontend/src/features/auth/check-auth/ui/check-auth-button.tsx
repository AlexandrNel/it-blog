"use client";

import { type PropsWithChildren } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/dialog";
import { LoginForm } from "@/features/auth/login";
import { Button } from "@/shared/ui/button";
import { RegisterForm } from "../../register";
import { useCheckAuth } from "../model/use-check-auth";
import { Stepper } from "@/shared/ui/stepper";

type Props = {} & PropsWithChildren;

export const CheckAuthButton = ({ children }: Props) => {
  const { isOpen, setIsOpen, wrapperRef, onSuccessAuth } = useCheckAuth();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div ref={wrapperRef}>{children}</div>
      <DialogContent>
        <DialogTitle className="sr-only">Авторизация</DialogTitle>
        <Stepper
          initial="login"
          items={[
            {
              key: "login",
              render: ({ goTo }) => (
                <LoginForm
                  className="p-2"
                  mutateOptions={{
                    onSuccess: onSuccessAuth,
                  }}
                  footer={
                    <p className="text-center">
                      <span className="text-center mr-1">Нет аккаунта?</span>
                      <Button
                        onClick={() => goTo("register")}
                        variant={"link"}
                        className="text-blue-500 font-medium px-0"
                      >
                        Регистрация
                      </Button>
                    </p>
                  }
                />
              ),
            },
            {
              key: "register",
              render: ({ goTo }) => (
                <RegisterForm
                  className="p-2"
                  footer={
                    <p className="text-center">
                      <span className="text-center mr-1">Нет аккаунта?</span>
                      <Button
                        onClick={() => goTo("login")}
                        variant={"link"}
                        className="text-blue-500 font-medium px-0"
                      >
                        Вход
                      </Button>
                    </p>
                  }
                />
              ),
            },
          ]}
        />

        <DialogDescription hidden></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
