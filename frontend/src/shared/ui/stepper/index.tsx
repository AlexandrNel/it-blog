"use client";

import { Activity, createContext, type ReactNode, useContext, useState } from "react";

export type StepperItem<Step extends string> = {
  key: Step;
  render: (props: { goTo: (step: Step) => void }) => ReactNode;
};

type StepperProps<Step extends string> = {
  initial: Step;
  items: StepperItem<Step>[];
};

type StepperState<T> = {
  goTo: (step: T) => void;
} | null;

const StepperContext = createContext<unknown>(null);

export function Stepper<Step extends string>({ items, initial }: StepperProps<Step>) {
  const [step, setStep] = useState<Step>(initial);

  const goTo = (step: Step) => {
    setStep(step);
  };

  return (
    <StepperContext.Provider value={{ goTo } satisfies StepperState<Step>}>
      {items.map(({ key, render }) => (
        <Activity key={key} mode={step === key ? "visible" : "hidden"}>
          {render({ goTo })}
        </Activity>
      ))}
    </StepperContext.Provider>
  );
}

export function useStepper<Step extends string>(): StepperState<Step> {
  const context = useContext(StepperContext) as StepperState<Step> | null;
  if (!context) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return context;
}
