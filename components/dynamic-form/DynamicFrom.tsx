// components/DynamicForm.tsx
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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import LivePreview from "./LivePreview";

interface DynamicFormProps {
    config: FormConfig;
    handleSubmit: (data: any) => void;
    formStyle?: string;
    initialValues: object;
    onAccordionStateChange?: (expandedItems: string[]) => void;
    showPreview?: boolean;
}

export default function DynamicForm({
    config,
    handleSubmit,
    formStyle = "",
    initialValues,
    onAccordionStateChange,
    showPreview = false,
}: DynamicFormProps) {
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
        // 🆕 Notify parent component of accordion state changes
        if (onAccordionStateChange) {
            onAccordionStateChange(value);
        }
    };

    // Generate validation schema for the entire form
    const validationSchema = generateEnhancedSchema(config);

    // Generate validation schema for current step only (for multi-step forms)
    const currentStepValidationSchema =
        hasStepper && steps[stepIndex]
            ? generateEnhancedSchema({
                  ...config,
                  steps: [steps[stepIndex]],
              })
            : validationSchema;

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
                            validationSchema={currentStepValidationSchema}
                            onSubmit={(values) => handleNext(values)}
                            enableReinitialize
                        >
                            {({ values, isValid, errors, touched }) => {
                                console.log("Formik state:", {
                                    isValid,
                                    errors,
                                    touched,
                                    values,
                                });

                                // Button should be enabled based on Formik validation
                                const shouldEnableButton = isValid;

                                return (
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
                                        {/* ************************************************ NOTE: for debugging purpose only *********************************** */}
                                        {/* Validation Status */}
                                        {/* <div className="bg-gray-50 p-3 rounded-lg mb-4">
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <span className="font-medium">Required Fields:</span> {getRequiredFieldsCount()}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Filled Required Fields:</span> {getFilledRequiredFieldsCount()}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Form Valid:</span> 
                                                    <span className={canSubmit() ? 'text-green-600' : 'text-red-600'}>
                                                        {canSubmit() ? ' Yes' : ' No'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Visible Required Fields:</span>
                                                    <div className="text-xs text-gray-600 mt-1">
                                                        {visibleRequiredFields.length > 0 ? 
                                                            visibleRequiredFields.join(', ') : 
                                                            'None (all fields are optional or hidden)'
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* ************************************************ NOTE: for debugging purpose only - END *********************************** */}

                                        <div className='flex justify-between pt-4'>
                                            <Button
                                                type='button'
                                                variant='outline'
                                                onClick={handlePrev}
                                                disabled={stepIndex === 0}
                                            >
                                                Previous
                                            </Button>
                                            <Button
                                                type='submit'
                                                disabled={!shouldEnableButton}
                                                className={
                                                    !shouldEnableButton
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }
                                            >
                                                {stepIndex === steps.length - 1
                                                    ? shouldEnableButton
                                                        ? "Submit"
                                                        : "Fill Required Fields"
                                                    : "Next"}
                                            </Button>
                                        </div>

                                        {/* Debug info */}
                                        {/* {process.env.NODE_ENV === 'development' && (
                                            <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                                                <div>Step {stepIndex + 1} of {steps.length}</div>
                                                <div>Is Valid: {isValid ? '✅ Yes' : '❌ No'}</div>
                                                <div>Has Required Fields: {currentStepHasRequiredFields ? '✅ Yes' : '❌ No'}</div>
                                                <div>Required Fields Filled: {areRequiredFieldsFilled ? '✅ Yes' : '❌ No'}</div>
                                                <div>Has Touched Required Fields: {hasTouchedRequiredFields ? '✅ Yes' : '❌ No'}</div>
                                                <div>Should Enable Button: {shouldEnableButton ? '✅ Yes' : '❌ No'}</div>
                                                <div>Errors: {Object.keys(errors).length}</div>
                                                <div>Current Step Fields: {currentStep.fields.length}</div>
                                            </div>
                                        )} */}
                                    </Form>
                                );
                            }}
                        </Formik>
                    </>
                ) : (
                    // Single form - render each step individually to preserve tabular property
                    <>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={currentStepValidationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {({ values, isValid, errors, touched }) => {
                                // console.log("Single form state:", { isValid, errors, touched, values });

                                // Button should be enabled based on Formik validation
                                const shouldEnableButton = isValid;

                                return (
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

                                        {/* ************************************************ NOTE: for debugging purpose only *********************************** */}

                                        {/* Validation Status */}
                                        {/* <div className="bg-gray-50 p-3 rounded-lg mb-4">
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <span className="font-medium">Required Fields:</span> {getRequiredFieldsCount()}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Filled Required Fields:</span> {getFilledRequiredFieldsCount()}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Form Valid:</span> 
                                                    <span className={canSubmit() ? 'text-green-600' : 'text-red-600'}>
                                                        {canSubmit() ? ' Yes' : ' No'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Visible Required Fields:</span>
                                                    <div className="text-xs text-gray-600 mt-1">
                                                        {visibleRequiredFields.length > 0 ? 
                                                            visibleRequiredFields.join(', ') : 
                                                            'None (all fields are optional or hidden)'
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* ************************************************ NOTE: for debugging purpose only - END *********************************** */}

                                        <div className='flex justify-end pt-4'>
                                            <Button
                                                type='submit'
                                                disabled={!shouldEnableButton}
                                                className={`px-8 primary-button ${
                                                    !shouldEnableButton
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                            >
                                                {shouldEnableButton
                                                    ? "Submit"
                                                    : "Fill Required Fields"}
                                            </Button>
                                        </div>
                                        {showPreview && (
                                            <LivePreview
                                                title='Form Preview'
                                                subtitle='Live preview of your form data'
                                                formValues={values}
                                                allFields={steps.flatMap(
                                                    (step) => step.fields
                                                )}
                                                config={config}
                                                expandedSections={expandedItems}
                                            />
                                        )}
                                    </Form>
                                );
                            }}
                        </Formik>
                    </>
                )}
            </div>
        </div>
    );
}
