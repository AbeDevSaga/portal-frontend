"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@/components/ui/button";
import { FieldRenderer } from "./FieldRenderer";
import { FormConfig } from "@/types/formType";
import { useDynamicForm } from "@/hooks/useDynamicForm";
import { useDynamicFormValidation } from "@/hooks/useDynamicFormValidation";
import { generateEnhancedSchema } from "@/utils/dynamic-form/schemaGenerator";
import { Stepper } from "../common/stepper";
import LivePreview from "./LivePreview";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";

interface DynamicFormWithPreviewProps {
    config: FormConfig;
    handleSubmit: (data: any) => void;
    formStyle?: string;
    initialValues: object;
    showPreview?: boolean;
    previewTitle?: string;
    previewSubtitle?: string;
    avatarSrc?: string;
    avatarAlt?: string;
    groupMap?: Record<string, string>;
    previewClassName?: string;
    previewStyle?: React.CSSProperties;
}

export default function DynamicFormWithPreview({
    config,
    handleSubmit,
    formStyle = "",
    initialValues,
    showPreview = true,
    previewTitle = "Form Preview",
    previewSubtitle,
    avatarSrc = "",
    avatarAlt = "preview",
    groupMap = {},
    previewClassName = "",
    previewStyle,
}: DynamicFormWithPreviewProps) {
    const [stepIndex, setStepIndex] = useState(0);
    // State to track which accordion items are expanded
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    // Ensure config has steps before accessing
    const steps = config?.steps || [];
    // console.log("config steps", steps);

    // Check if stepper should be shown
    const hasStepper = config?.stepperData && config.stepperData.length > 0;
    const stepperPosition = config?.stepperPosition || "top";

    // If no stepper, show all fields at once
    const currentStep = hasStepper
        ? steps[stepIndex] || { title: "", fields: [] }
        : { title: "", fields: steps.flatMap((step) => step.fields) };
    // console.log("config steps Index", stepIndex);

    // For single forms, we need to preserve step structure to check tabular property
    const singleFormSteps = hasStepper ? null : steps;

    // Initialize expanded items based on defaultExpanded values
    React.useEffect(() => {
        if (singleFormSteps) {
            const initialExpanded = singleFormSteps
                .map((step, index) =>
                    step.defaultExpanded ? `step-${index}` : null
                )
                .filter(Boolean) as string[];
            setExpandedItems(initialExpanded);
        }
    }, [singleFormSteps]);

    // Handle accordion value changes
    const handleAccordionValueChange = (value: string[]) => {
        setExpandedItems(value);
    };

    // Get all fields from all steps for preview
    const allFields = steps.flatMap((step) => step.fields);

    const handleNext = (values: any) => {
        // console.log("Step values:", values);
        if (hasStepper && stepIndex < steps.length - 1) {
            setStepIndex((prev) => prev + 1);
        } else {
            // console.log("Final submit from dynamic form:", values);
            if (hasStepper) {
                setStepIndex(steps.length);
            }
            handleSubmit(values);
        }
    };

    const handlePrev = () => {
        if (hasStepper && stepIndex > 0) {
            setStepIndex((prev) => prev - 1);
        }
    };

    // Function to render fields in tabular/accordion mode
    const renderTabularFields = (
        fields: any[],
        stepTitle: string,
        defaultExpanded: boolean = false,
        stepIndex: number = 0
    ) => {
        const accordionValue = `step-${stepIndex}`;
        return (
            <AccordionItem value={accordionValue} className='border-gray-200'>
                <AccordionTrigger className='text-lg font-semibold text-gray-900 hover:text-gray-700 py-3'>
                    <div className='flex items-center gap-3'>
                        <span>{stepTitle}</span>
                        <span className='text-sm text-gray-500'>
                            ({fields.length} fields)
                        </span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className='pt-4'>
                    <div className={`${formStyle} space-y-4`}>
                        {fields.map((field: any) => (
                            <FieldRenderer key={field.key} field={field} />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        );
    };

    // Function to render fields normally
    const renderNormalFields = (fields: any[]) => {
        return (
            <div className={`${formStyle}`}>
                {fields.map((field: any) => (
                    <FieldRenderer key={field.key} field={field} />
                ))}
            </div>
        );
    };

    // Render stepper based on position
    const renderStepper = () => {
        if (!hasStepper) return null;

        return (
            <Stepper
                steps={config.stepperData!}
                activeStep={stepIndex}
                orientation={
                    stepperPosition === "left" ? "vertical" : "horizontal"
                }
            />
        );
    };

    return (
        <div className={`${stepperPosition === "left" ? "flex gap-8" : ""}`}>
            {stepperPosition === "top" && renderStepper()}

            {stepperPosition === "left" && (
                <div className='hidden lg:block lg:w-64 lg:flex-shrink-0'>
                    <div className='sticky top-32'>{renderStepper()}</div>
                </div>
            )}

            <div
                className={`${stepperPosition === "left" ? "flex-1" : ""} ${
                    hasStepper ? "" : "space-y-4"
                }`}
            >
                {hasStepper ? (
                    // Multi-step form
                    <>
                        <h2 className='text-xl font-bold mb-4'>
                            {currentStep.title}
                        </h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={generateEnhancedSchema({
                                steps: [currentStep],
                            })}
                            onSubmit={(values) => handleNext(values)}
                            enableReinitialize
                        >
                            {({ values, isValid }) => (
                                <>
                                    <Form className='space-y-2.5'>
                                        {currentStep.tabular
                                            ? renderTabularFields(
                                                  currentStep.fields,
                                                  currentStep.title,
                                                  currentStep.defaultExpanded,
                                                  stepIndex
                                              )
                                            : renderNormalFields(
                                                  currentStep.fields
                                              )}

                                        <div className='flex justify-between mt-4'>
                                            {stepIndex > 0 && (
                                                <Button
                                                    type='button'
                                                    onClick={handlePrev}
                                                >
                                                    Previous
                                                </Button>
                                            )}
                                            <Button
                                                type='submit'
                                                disabled={!isValid}
                                            >
                                                {stepIndex === steps.length - 1
                                                    ? "Submit"
                                                    : "Next"}
                                            </Button>
                                        </div>
                                    </Form>

                                    {showPreview && (
                                        <LivePreview
                                            title={previewTitle}
                                            subtitle={previewSubtitle}
                                            avatarSrc={avatarSrc}
                                            avatarAlt={avatarAlt}
                                            formValues={values}
                                            groupMap={groupMap}
                                            allFields={allFields}
                                            className={previewClassName}
                                            style={previewStyle}
                                            config={config}
                                            expandedSections={expandedItems}
                                        />
                                    )}
                                </>
                            )}
                        </Formik>
                    </>
                ) : (
                    // Single form - render each step individually to preserve tabular property
                    <>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={generateEnhancedSchema({
                                steps: [currentStep],
                            })}
                            onSubmit={(values) => handleSubmit(values)}
                            enableReinitialize
                        >
                            {({ values, isValid }) => (
                                <>
                                    <Form className='space-y-2.5'>
                                        {/* Render each step individually to preserve tabular property */}
                                        {singleFormSteps?.some(
                                            (step) => step.tabular
                                        ) ? (
                                            <Accordion
                                                type='multiple'
                                                className='w-full'
                                                value={expandedItems}
                                                onValueChange={
                                                    handleAccordionValueChange
                                                }
                                            >
                                                {singleFormSteps?.map(
                                                    (step, stepIndex) => (
                                                        <div
                                                            key={stepIndex}
                                                            className='mb-8'
                                                        >
                                                            {!step.tabular && (
                                                                <h3 className='text-lg font-semibold mb-4 text-gray-900 border-b pb-2'>
                                                                    {step.title}
                                                                </h3>
                                                            )}
                                                            {step.tabular
                                                                ? renderTabularFields(
                                                                      step.fields,
                                                                      step.title,
                                                                      step.defaultExpanded,
                                                                      stepIndex
                                                                  )
                                                                : renderNormalFields(
                                                                      step.fields
                                                                  )}
                                                        </div>
                                                    )
                                                )}
                                            </Accordion>
                                        ) : (
                                            singleFormSteps?.map(
                                                (step, stepIndex) => (
                                                    <div
                                                        key={stepIndex}
                                                        className='mb-8'
                                                    >
                                                        <h3 className='text-lg font-semibold mb-4 text-gray-900 border-b pb-2'>
                                                            {step.title}
                                                        </h3>
                                                        {renderNormalFields(
                                                            step.fields
                                                        )}
                                                    </div>
                                                )
                                            )
                                        )}

                                        <div className='flex justify-end mt-4'>
                                            <Button
                                                type='submit'
                                                disabled={!isValid}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </Form>

                                    {showPreview && (
                                        <LivePreview
                                            title={previewTitle}
                                            subtitle={previewSubtitle}
                                            avatarSrc={avatarSrc}
                                            avatarAlt={avatarAlt}
                                            formValues={values}
                                            groupMap={groupMap}
                                            allFields={allFields}
                                            className={previewClassName}
                                            style={previewStyle}
                                            config={config}
                                            expandedSections={expandedItems}
                                        />
                                    )}
                                </>
                            )}
                        </Formik>
                    </>
                )}
            </div>
        </div>
    );
}
