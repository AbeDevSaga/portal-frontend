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
}: DynamicFormProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [internalExpandedItems, setInternalExpandedItems] = useState<string[]>(
    []
  );
  const expandedItems = externalExpandedItems || internalExpandedItems;
  const setExpandedItems = externalExpandedItems
    ? () => {}
    : setInternalExpandedItems;

  const steps = config?.steps || [];
  const hasStepper = config?.stepperData && config.stepperData.length > 0;
  const stepperPosition = config?.stepperPosition || "top";
  const currentStep = hasStepper
    ? steps[stepIndex] || { title: "", fields: [] }
    : { title: "", fields: steps.flatMap((step) => step.fields) };
  const singleFormSteps = hasStepper ? null : steps;

  const validationSchema = generateEnhancedSchema(config);
  const currentStepValidationSchema =
    hasStepper && steps[stepIndex]
      ? generateEnhancedSchema({ ...config, steps: [steps[stepIndex]] })
      : validationSchema;

  // Initialize expanded items for non-stepper forms
  useEffect(() => {
    if (singleFormSteps && !externalExpandedItems) {
      const initialExpanded = singleFormSteps
        .map((step, idx) => (step.defaultExpanded ? `step-${idx}` : null))
        .filter(Boolean) as string[];
      setInternalExpandedItems(initialExpanded);
    }
  }, [singleFormSteps, externalExpandedItems]);

  // Always expand the current step for stepper forms
  useEffect(() => {
    if (hasStepper) {
      const stepValue = `step-${stepIndex}`;
      setExpandedItems((prev) =>
        prev.includes(stepValue) ? prev : [...prev, stepValue]
      );
    }
  }, [stepIndex, hasStepper]);

  // Auto-expand first group of current step
  useEffect(() => {
    if (!hasStepper) return;

    const step = steps[stepIndex];
    if (!step) return;

    const stepperStep = config.stepperData?.[stepIndex];
    const stepLabel = stepperStep?.content || step.title;

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
              return { label: groupObj.label, fields };
            })
            .filter((g) => g.fields.length > 0)
        : [{ label: step.title, fields: step.fields || [] }];

    if (grouped.length > 0) {
      const firstGroupValue = `step-${stepIndex}-group-0`;
      setExpandedItems((prev) =>
        prev.includes(firstGroupValue) ? prev : [...prev, firstGroupValue]
      );
    }
  }, [stepIndex, hasStepper, steps, config.grouping]);

  const handleAccordionValueChange = (value: string[]) => {
    setExpandedItems(value);
    if (onAccordionStateChange) onAccordionStateChange(value);
  };

  const handleNext = (values: any) => {
    if (hasStepper && stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      handleSubmit(values);
    }
  };

  const handlePrev = () => {
    if (hasStepper && stepIndex > 0) setStepIndex((prev) => prev - 1);
  };

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
    const stepperStep = config.stepperData?.[stepIndex];
    const stepLabel = stepperStep?.content || step.title;

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
              return { label: groupObj.label, fields };
            })
            .filter((g) => g.fields.length > 0)
        : [{ label: step.title, fields: step.fields || [] }];

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
                  {/* <span className="text-sm text-gray-500">
                    ({group.fields.length} fields)
                  </span> */}
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
      return (
        <div key={stepValue} className="px-[16px]">
          {renderGroupedFields(step, values)}
        </div>
      );
    }
    return (
      <div className="px-[16px]" key={`step-${index}`}>
        {renderFields(step.fields, values)}
      </div>
    );
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
          {({ values }) => (
            <>
              {customHeader && <div className="mb-4">{customHeader}</div>}
              <LineSeparator width="h-[2px]" />
              <Form className="space-y-2.5">
                {hasStepper
                  ? renderStepAccordion(currentStep, stepIndex, values)
                  : singleFormSteps?.map((step, idx) =>
                      renderStepAccordion(step, idx, values)
                    )}

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
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    type="button"
                    className="px-10"
                    onClick={() => handleNext(values)}
                  >
                    {hasStepper
                      ? stepIndex === steps.length - 1
                        ? "Submit"
                        : "Next"
                      : "Submit"}
                  </Button>
                </div>

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
          )}
        </Formik>
      </div>
    </div>
  );
}
