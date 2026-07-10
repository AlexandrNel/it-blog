"use client";

import { Activity, type ReactNode, useState } from "react";

export type StepperItem<Step extends string> = {
  key: Step;
  render: (options: { goTo: (step: Step) => void }) => ReactNode;
};

type StepperProps<Step extends string> = {
  initial: Step;
  items: StepperItem<Step>[];
};

export function Stepper<Step extends string>({ items, initial }: StepperProps<Step>) {
  const [step, setStep] = useState<Step>(initial);

  const goTo = (step: Step) => {
    setStep(step);
  };

  return items.map(({ key, render }) => (
    <Activity key={key} mode={step === key ? "visible" : "hidden"}>
      {render({ goTo })}
    </Activity>
  ));
}
