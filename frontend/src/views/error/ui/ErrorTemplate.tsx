import { type BasePropsWithChildren } from "@/shared/types/components";
import { type ReactNode } from "react";

interface Props extends BasePropsWithChildren {
  title: string;
  code?: string | number;
  text: string | string[];
  errorMessage?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

export const ErrorTemplate = ({ title, code, text, header, children, footer }: Props) => {
  return (
    <div className="flex flex-col justify-center ">
      {header}
      <div className=" leading-tight">
        <h1 className="text-6xl font-bold mb-5 relative w-max">
          {title}
          {code && <span className="absolute top-0 -right-5 text-xl text-gray-400 font-normal">{code}</span>}
        </h1>
        <div>
          {!Array.isArray(text) ? (
            <p className="text-lg leading-normal">{text}</p>
          ) : (
            text.map((v, i) => {
              return (
                <p key={i} className="text-lg leading-normal">
                  {v}
                </p>
              );
            })
          )}
        </div>
        {children}
      </div>
      {footer}
    </div>
  );
};
