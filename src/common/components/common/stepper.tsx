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
        <div className='w-full'>
            <div
                className={cn(
                    "flex mb-6",
                    orientation === "horizontal"
                        ? "items-center justify-center"
                        : "flex-col items-start gap-4"
                )}
            >
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex",
                            orientation === "horizontal"
                                ? ""
                                : "flex-col items-start gap-4"
                        )}
                    >
                        <div
                            className={cn(
                                "flex",
                                orientation === "horizontal"
                                    ? "flex-col items-center gap-2 text-center"
                                    : "items-center gap-4"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors border border-primary",
                                    index < activeStep
                                        ? "bg-primary text-white"
                                        : ""
                                )}
                            >
                                {index < activeStep ? <Check /> : index + 1}
                            </div>
                            <div
                                className={cn(
                                    "text-sm",
                                    index <= activeStep ? "font-semibold" : "",
                                    orientation === "vertical"
                                        ? "min-w-[200px]"
                                        : ""
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
                                        ? "w-12 h-[2px] mt-4"
                                        : "w-[2px] h-8 ml-4",
                                    index < activeStep
                                        ? "bg-primary"
                                        : "bg-muted"
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
