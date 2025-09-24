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
import LineSeparator from "../common/LineSeparator";

interface DynamicFormProps {
  config: FormConfig;
  handleSubmit: (data: any) => void;
  formStyle?: string;
  initialValues: object;
  onAccordionStateChange?: (expandedItems: string[]) => void;
  showPreview?: boolean;
  customHeader?: React.ReactNode;
  defaultTitle?: {
    title?: string;
    description?: string;
  };
  expandedItems?: string[];
  extraData?: any;
}

export default function DynamicFormRendering({
  config,
  handleSubmit,
  formStyle = "",
  initialValues,
  onAccordionStateChange,
  showPreview = false,
  customHeader,
  defaultTitle,
  expandedItems: externalExpandedItems,
  extraData,
}: DynamicFormProps) {
  const [stepIndex, setStepIndex] = useState(0);
  // State to track which accordion items are expanded
  const [internalExpandedItems, setInternalExpandedItems] = useState<string[]>(
    []
  );
  // Use external expanded items if provided, otherwise use internal state
  const expandedItems = externalExpandedItems || internalExpandedItems;
  const setExpandedItems = externalExpandedItems
    ? () => {}
    : setInternalExpandedItems;

  const steps = config?.steps || [];
  console.log("config: ", config);
  console.log("steps: ", steps);
  const hasStepper = config?.stepperData && config.stepperData.length > 0;
  const stepperPosition = config?.stepperPosition || "top";

  const currentStep = hasStepper
    ? steps[stepIndex] || { title: "", fields: [] }
    : { title: "", fields: steps.flatMap((step) => step.fields) };

  console.log("currentStep: ", steps);

  const singleFormSteps = hasStepper ? null : steps;

  // Initialize expanded items for non-stepper forms
  useEffect(() => {
    if (singleFormSteps && !externalExpandedItems) {
      const initialExpanded = singleFormSteps
        .map((step, idx) => (step.defaultExpanded ? `step-${idx}` : null))
        .filter(Boolean) as string[];
      setInternalExpandedItems(initialExpanded);
    }
  }, [singleFormSteps, externalExpandedItems]);

  // Always expand the current step (but let user collapse it later if they want)
  useEffect(() => {
    if (hasStepper) {
      const stepValue = `step-${stepIndex}`;
      setExpandedItems((prev) =>
        prev.includes(stepValue) ? prev : [...prev, stepValue]
      );
    }
  }, [stepIndex, hasStepper]);
  // Ensure current step and first group are expanded automatically
  // useEffect(() => {
  //   if (!externalExpandedItems && hasStepper) {
  //     const stepValue = `step-${stepIndex}`;
  //     const baseExpanded = internalExpandedItems.filter(
  //       (item) => !item.startsWith(`step-${stepIndex}`)
  //     );

  //     const stepperStep = config.stepperData?.[stepIndex];

  //     let groupExpanded: string[] = [];

  //     const matchingGroup = config.grouping?.find(
  //       (g) => g.group === stepperStep?.content
  //     );

  //     if (matchingGroup?.groups?.length) {
  //       // Always expand the first group in the current step
  //       groupExpanded.push(`step-${stepIndex}-group-0`);
  //     } else {
  //       // No group, expand the step itself
  //       groupExpanded.push(stepValue);
  //     }

  //     setInternalExpandedItems([...baseExpanded, ...groupExpanded]);
  //   }
  // }, [
  //   stepIndex,
  //   hasStepper,
  //   config,
  //   internalExpandedItems,
  //   externalExpandedItems,
  // ]);

  // Handle accordion value changes
  const handleAccordionValueChange = (value: string[]) => {
    if (externalExpandedItems) {
      // If using external state, notify parent component
      if (onAccordionStateChange) {
        onAccordionStateChange(value);
      }
    } else {
      // If using internal state, update it directly
      setExpandedItems(value);
      if (onAccordionStateChange) {
        onAccordionStateChange(value);
      }
    }
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
    const hasConfigTitle = config.title && config.showTitle !== false;
    const hasDefaultTitle =
      defaultTitle && (defaultTitle.title || defaultTitle.description);

    const title = hasConfigTitle
      ? config.title!
      : hasDefaultTitle
      ? defaultTitle?.title
      : "New Registration";

    const description = hasConfigTitle
      ? config.description || "Complete your registration form."
      : hasDefaultTitle
      ? defaultTitle?.description || ""
      : "";
    return (
      <div className="flex gap-4 items-center justify-between py-[24px]">
        {(hasConfigTitle || hasDefaultTitle) && (
          <div className="basis-1/3 min-w-1/3">
            <HeroSection
              title={title!}
              description={description}
              action={<></>}
            />
          </div>
        )}

        {hasStepper && (
          <div className="basis-2/3 overflow-x-auto flex items-center justify-start px-2">
            <Stepper
              steps={config.stepperData!}
              activeStep={stepIndex}
              orientation={
                stepperPosition === "left" ? "vertical" : "horizontal"
              }
            />
          </div>
        )}
      </div>
    );
  };

  const renderGroupedFields = (step: any, values: any) => {
    // Find the stepperData entry for this stepIndex
    const stepperStep = config.stepperData?.[stepIndex];
    const stepLabel = stepperStep?.content || step.title; // fallback

    // Find the matching grouping config for this stepper label
    const matchingGroup = config.grouping?.find(
      (g: any) => g.group === stepLabel
    );

    const grouped =
      matchingGroup && Array.isArray(matchingGroup.groups)
        ? matchingGroup.groups
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .map((groupObj: any) => {
              const fields = steps
                .filter((s) => s.group === groupObj.name)
                .flatMap((s) => s.fields || [])
                .sort((a, b) => (a.groupOrder || 0) - (b.groupOrder || 0));

              return {
                label: groupObj.label,
                fields,
              };
            })
            .filter((g) => g.fields.length > 0)
        : [
            {
              label: step.title,
              fields: step.fields || [],
            },
          ];

    return (
      <Accordion
        type="multiple"
        value={expandedItems}
        onValueChange={handleAccordionValueChange}
        className="w-full"
      >
        {grouped.map((group, idx) => {
          const valueKey = `step-${stepIndex}-group-${idx}`;
          return (
            <AccordionItem key={valueKey} value={valueKey}>
              <AccordionTrigger className="py-0 w-full text-[17.5px] text-[#073954] font-bold hover:text-gray-700">
                <div className="flex items-center gap-3 py-3">
                  <span>{group.label}</span>
                  <span className="text-sm text-gray-500">
                    ({group.fields.length} fields)
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 px-[16px]">
                {renderFields(group.fields, values)}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  };

  const renderStepAccordion = (step: any, index: number, values: any) => {
    const stepValue = `step-${index}`;
    if (step.tabular) {
      // Wrap tabular step in Accordion
      if (hasStepper) {
        console.log("hasStepper: ", hasStepper);
        return (
          <div key={stepValue} className="px-[16px]">
            {renderGroupedFields(step, values)}
          </div>
        );
      }
      return (
        <Accordion
          key={stepValue}
          type="multiple"
          value={expandedItems}
          onValueChange={handleAccordionValueChange}
          className="w-full"
        >
          <AccordionItem value={stepValue} className="">
            <AccordionTrigger className="py-0 w-full text-[17.5px] text-[#073954] font-bold hover:text-gray-700">
              <div className="flex items-center gap-3 py-3">
                <span>{step.title}</span>
                <span className="text-sm text-gray-500">
                  ({step.fields.length} fields)
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 px-[16px]">
              {renderFields(step.fields, values)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    } else {
      // Non-tabular step just render fields
      return (
        <div className="px-[16px]" key={`step-${index}`}>
          {renderFields(step.fields, values)}
        </div>
      );
    }
  };

  return (
    <div className={`${stepperPosition === "left" ? "flex gap-8" : ""}`}>
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
                {customHeader && <div className="mb-4">{customHeader}</div>}
                <LineSeparator width="h-[2px]" />
                <Form className="space-y-2.5">
                  {/* Multi-step form */}
                  {hasStepper
                    ? renderStepAccordion(currentStep, stepIndex, values)
                    : singleFormSteps?.map((step, idx) =>
                        renderStepAccordion(step, idx, values)
                      )}

                  {/* Buttons */}
                  <div
                    className={`flex space-x-4 px-[16px] ${
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
