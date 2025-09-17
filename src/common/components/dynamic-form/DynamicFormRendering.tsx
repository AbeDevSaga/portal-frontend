// components/DynamicForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { FieldRenderer } from "./FieldRenderer";
import { Stepper } from "../common/stepper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import LivePreview from "./LivePreview";
import { FormConfig } from "@/common/types/formType";
import { generateEnhancedSchema } from "@/common/utils/dynamic-form/schemaGenerator";
import { Button } from "../ui/button";
import HeroSection from "../common/HeroSection";

interface DynamicFormProps {
  config: FormConfig;
  handleSubmit: (data: any) => void;
  formStyle?: string;
  initialValues: object;
  onAccordionStateChange?: (expandedItems: string[]) => void;
  showPreview?: boolean;
}

export default function DynamicFormRendering({
  config,
  handleSubmit,
  formStyle = "",
  initialValues,
  onAccordionStateChange,
  showPreview = false,
}: DynamicFormProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const steps = config?.steps || [];
  const hasStepper = config?.stepperData && config.stepperData.length > 0;
  const stepperPosition = config?.stepperPosition || "top";

  const currentStep = hasStepper
    ? steps[stepIndex] || { title: "", fields: [] }
    : { title: "", fields: steps.flatMap((step) => step.fields) };

  const singleFormSteps = hasStepper ? null : steps;

  // Initialize expanded items for non-stepper forms
  useEffect(() => {
    if (singleFormSteps) {
      const initialExpanded = singleFormSteps
        .map((step, idx) => (step.defaultExpanded ? `step-${idx}` : null))
        .filter(Boolean) as string[];
      setExpandedItems(initialExpanded);
    }
  }, [singleFormSteps]);

  const handleAccordionValueChange = (value: string[]) => {
    setExpandedItems(value);
    if (onAccordionStateChange) onAccordionStateChange(value);
  };

  const validationSchema = generateEnhancedSchema(config);
  const currentStepValidationSchema =
    hasStepper && steps[stepIndex]
      ? generateEnhancedSchema({ ...config, steps: [steps[stepIndex]] })
      : validationSchema;

  const handleNext = (values: any) => {
    if (hasStepper && stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      if (hasStepper) setStepIndex(steps.length);
      handleSubmit(values);
    }
  };

  const handlePrev = () => {
    if (hasStepper && stepIndex > 0) setStepIndex((prev) => prev - 1);
  };

  console.log("formStyle: ", formStyle);
  const renderFields = (fields: any[], values: any) => (
    <div className={`${formStyle}`}>
      {fields.map((field) => (
        <FieldRenderer key={field.key} field={field} formValues={values} />
      ))}
    </div>
  );

  const renderStepper = () => {
    if (!hasStepper) return null;
    const shouldShowHero = config.title && config.showTitle !== false;
    return (
      <div className="flex justify-between">
        {shouldShowHero && (
          <div className="w-full">
            <HeroSection
              title={config.title!}
              description={
                config.description || "Complete your registration form."
              }
              action={<></>}
            />
          </div>
        )}
        <Stepper
          steps={config.stepperData!}
          activeStep={stepIndex}
          orientation={stepperPosition === "left" ? "vertical" : "horizontal"}
        />
      </div>
    );
  };

  const renderStepAccordion = (step: any, index: number, values: any) => {
    if (step.tabular) {
      // Wrap tabular step in Accordion
      const stepValue = `step-${index}`;
      const isExpanded = expandedItems.includes(stepValue);
      return (
        <Accordion
          key={stepValue}
          type="multiple"
          value={expandedItems}
          onValueChange={handleAccordionValueChange}
          className="w-full"
        >
          <AccordionItem
            value={stepValue}
            className="border-gray-200"
          >
            <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-gray-700 py-0">
              <div className="flex items-center gap-3">
                <span>{step.title}</span>
                <span className="text-sm text-gray-500">
                  ({step.fields.length} fields)
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              {renderFields(step.fields, values)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    } else {
      // Non-tabular step just render fields
      return (
        <div key={`step-${index}`}>{renderFields(step.fields, values)}</div>
      );
    }
  };

  return (
    <div
      className={`${
        stepperPosition === "left" ? "flex gap-8" : ""
      }`}
    >
      {stepperPosition === "top" && renderStepper()}
      {stepperPosition === "left" && (
        <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <div className="sticky top-32">{renderStepper()}</div>
        </div>
      )}

      <div className={`${stepperPosition === "left" ? "flex-1" : ""}`}>
        <Formik
          initialValues={initialValues}
          validationSchema={currentStepValidationSchema}
          onSubmit={(values) =>
            hasStepper ? handleNext(values) : handleSubmit(values)
          }
          enableReinitialize
        >
          {({ values, isValid }) => {
            const shouldEnableButton = isValid;

            return (
              <>
                {currentStep && (
                  <div className="py-3 w-full text-[17.5px] text-[#073954] font-bold">
                    {currentStep.title}
                  </div>
                )}
                <Form className="px-[16px] space-y-2.5">
                  {/* Multi-step form */}
                  {hasStepper
                    ? renderStepAccordion(currentStep, stepIndex, values)
                    : singleFormSteps?.map((step, idx) =>
                        renderStepAccordion(step, idx, values)
                      )}

                  {/* Buttons */}
                  <div
                    className={`flex space-x-4 ${
                      hasStepper ? "justify-start" : "justify-end"
                    } pt-4`}
                  >
                    {hasStepper && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrev}
                        disabled={stepIndex === 0}
                        className="px-6"
                      >
                        Previous
                      </Button>
                    )}
                    <Button
                      type="submit"
                      disabled={!shouldEnableButton}
                      className={`px-10 ${
                        !shouldEnableButton
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {hasStepper
                        ? stepIndex === steps.length - 1
                          ? "Submit"
                          : "Next"
                        : shouldEnableButton
                        ? "Submit"
                        : "Fill Required Fields"}
                    </Button>
                  </div>

                  {/* Live Preview */}
                  {showPreview && (
                    <LivePreview
                      title="Form Preview"
                      subtitle="Live preview of your form data"
                      formValues={values}
                      allFields={steps.flatMap((step) => step.fields)}
                      config={config}
                      expandedSections={expandedItems}
                    />
                  )}
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
