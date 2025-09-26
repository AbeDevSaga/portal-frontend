// components/ui/stepper.tsx
"use client";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  label: string;
  content: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
  onFinish?: () => void;
  activeStep: number;
  orientation?: "horizontal" | "vertical";
}

export function Stepper({
  steps,
  onFinish,
  activeStep,
  orientation = "horizontal",
}: StepperProps) {
  return (
    <div className="w-full flex items-center justify-end">
      <div className="w-auto overflow-x-scroll">
        <div
          className={cn(
            "flex",
            orientation === "horizontal"
              ? "flex-nowrap items-center"
              : "flex-col items-start gap-4"
          )}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex",
                orientation === "horizontal" ? "" : "flex-col items-start gap-4"
              )}
            >
              <div
                className={cn(
                  "flex text-lg",
                  orientation === "horizontal"
                    ? "flex-col items-center gap-1 text-center"
                    : "items-center gap-2"
                )}
              >
                <div
                  className={cn(
                    "flex p-[16px] items-center justify-center w-[32px] h-[32px] rounded-full font-medium transition-colors border border-[#073954]",
                    index === activeStep
                      ? "bg-[#073954] text-white"
                      : index < activeStep
                      ? "bg-primary text-white"
                      : "text-[#073954]"
                  )}
                >
                  {index < activeStep ? "✓" : index + 1}
                </div>

                <div
                  className={cn(
                    "truncate text-[13px]",
                    index <= activeStep ? "font-semibold" : "",
                    orientation === "vertical" ? "min-w-[80px]" : "max-w-[80px]"
                  )}
                >
                  {step.content}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "transition-colors",
                    orientation === "horizontal"
                      ? "flex-1 w-[60px] h-[2px] mt-[16px]"
                      : "w-[2px] h-[60px] ml-4",
                    index < activeStep ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
