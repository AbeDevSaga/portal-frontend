// components/DynamicForm.tsx
"use client";

import React, { useState } from "react";
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
import { ArrowLeftIcon, ArrowRightIcon, Eye, X, FileText } from "lucide-react";
import Image from "next/image";

interface DynamicFormProps {
  config: FormConfig;
  handleSubmit: (data: any) => void;
  formStyle?: string;
  initialValues: object;
  onAccordionStateChange?: (expandedItems: string[]) => void;
  showPreview?: boolean;
  expandedItems?: string[];
}

export default function DynamicForm({
  config,
  handleSubmit,
  formStyle = "",
  initialValues,
  onAccordionStateChange,
  showPreview = false,
  expandedItems: externalExpandedItems,
}: DynamicFormProps) {
  const [stepIndex, setStepIndex] = useState(0);
  // State to track which accordion items are expanded
  const [internalExpandedItems, setInternalExpandedItems] = useState<string[]>(
    []
  );
  // State for file preview modal
  const [previewFile, setPreviewFile] = useState<{
    url: string;
    fileName: string;
    fileType?: string;
  } | null>(null);

  // Use external expanded items if provided, otherwise use internal state
  const expandedItems = externalExpandedItems || internalExpandedItems;
  const setExpandedItems = externalExpandedItems
    ? () => {}
    : setInternalExpandedItems;

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
    if (singleFormSteps && !externalExpandedItems) {
      const initialExpanded = singleFormSteps
        .map((step, index) => (step.defaultExpanded ? `step-${index}` : null))
        .filter(Boolean) as string[];
      setInternalExpandedItems(initialExpanded);
    }
  }, [singleFormSteps, externalExpandedItems]);

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

  // Handle file preview
  const handleFilePreview = (
    fileUrl: string,
    fileName: string,
    fileType?: string
  ) => {
    setPreviewFile({ url: fileUrl, fileName, fileType });
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  // Helper function to check if file is an image
  const isImageFile = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(
      extension || ""
    );
  };

  // Helper function to get file URL from attachment object
  const getFileUrl = (attachment: any): string => {
    if (typeof attachment === "string") return attachment;
    if (attachment?.fileUrl) return attachment.fileUrl;
    if (attachment?.url) return attachment.url;
    if (attachment?.file && typeof attachment.file === "string")
      return attachment.file;
    // If it's a File object, create a blob URL
    if (attachment instanceof File) {
      return URL.createObjectURL(attachment);
    }
    return "";
  };

  // Function to render fields in tabular/accordion mode
  const renderTabularFields = (
    fields: any[],
    stepTitle: string,
    defaultExpanded: boolean = false,
    stepIndex: number = 0,
    formValues: any = {}
  ) => {
    const accordionValue = `step-${stepIndex}`;
    return (
      <AccordionItem
        value={accordionValue}
        className="border-gray-200">
        <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-gray-700 py-3">
          <div className="flex items-center gap-3">
            <span>{stepTitle}</span>
            <span className="text-sm text-gray-500">
              ({fields.length} fields)
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <div
            className={`${formStyle} grid grid-cols-12 gap-4 auto-rows-auto`}>
            {fields.map((field: any) => (
              <FieldRenderer
                key={field.key}
                field={field}
                formValues={formValues}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // Function to render fields normally
  const renderNormalFields = (fields: any[], formValues: any = {}) => {
    return (
      <div className={`${formStyle} grid grid-cols-12 gap-4 auto-rows-auto`}>
        {fields.map((field: any) => (
          <FieldRenderer
            key={field.key}
            field={field}
            formValues={formValues}
          />
        ))}
      </div>
    );
  };

  // Render stepper based on position
  const renderStepper = () => {
    if (!hasStepper) return null;

    // Only show HeroSection if title exists and showTitle is not false
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

  return (
    <div className={`${stepperPosition === "left" ? "flex gap-8" : ""}`}>
      {stepperPosition === "top" && renderStepper()}

      {stepperPosition === "left" && (
        <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <div className="sticky top-32">{renderStepper()}</div>
        </div>
      )}

      <div
        className={`${stepperPosition === "left" ? "flex-1" : ""} ${
          hasStepper ? "" : "space-y-4"
        }`}>
        {hasStepper ? (
          // Multi-step form
          <>
            <h2 className="text-xl font-bold mb-4">{currentStep.title}</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={currentStepValidationSchema}
              onSubmit={(values) => handleNext(values)}
              enableReinitialize>
              {({ values, isValid, errors, touched }) => {
                console.log("Formik state:", {
                  isValid,
                  errors,
                  touched,
                  values,
                });

                // Button should be enabled based on Formik validation
                const shouldEnableButton = isValid;

                // Check if this is the final step (review step) with no fields
                const isReviewStep =
                  currentStep.fields.length === 0 &&
                  stepIndex === steps.length - 1;

                return (
                  <Form className="space-y-2.5">
                    {isReviewStep ? (
                      // Review section
                      <div className="flex flex-col gap-4">
                        {/* This is for the information other than attachments */}
                        <div className="bg-gray-100 p-4 rounded-lg border">
                          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                            Review Your Information
                          </h3>
                          <div className="space-y-2">
                            {Object.entries(values).map(([key, value]) => {
                              // Filter out attachment fields
                              if (
                                !value ||
                                key === "attachment" ||
                                key.toLowerCase().includes("attachment")
                              )
                                return null;

                              // Format the field label
                              const fieldLabel = key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str: string) =>
                                  str.toUpperCase()
                                );

                              return (
                                <div
                                  key={key}
                                  className="flex justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-xl text-gray-700">
                                    {fieldLabel}:
                                  </span>
                                  <span className="text-xl text-gray-900">
                                    {typeof value === "object" && value !== null
                                      ? (value as any).label ||
                                        (value as any).name ||
                                        JSON.stringify(value)
                                      : String(value)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {/* This is for the attachments */}
                        <div className="bg-gray-100 p-4 rounded-lg border">
                          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                            Review Your Attachments
                          </h3>
                          <div className="space-y-2">
                            {(values as any).attachment &&
                            Array.isArray((values as any).attachment)
                              ? (values as any).attachment.map(
                                  (attachment: any, index: number) => {
                                    if (!attachment) return null;

                                    const fileName =
                                      typeof attachment === "object" &&
                                      attachment !== null
                                        ? attachment.name ||
                                          attachment.label ||
                                          attachment.fileName ||
                                          "File attached"
                                        : String(attachment);

                                    const fileUrl = getFileUrl(attachment);

                                    return (
                                      <div
                                        key={`attachment-${index}`}
                                        className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="font-medium text-xl text-gray-700">
                                          Attachment {index + 1}:
                                        </span>
                                        <div className="flex items-center gap-3">
                                          <span className="text-xl text-gray-900">
                                            {fileName}
                                          </span>
                                          {fileUrl && (
                                            <Button
                                              type="button"
                                              variant="outline"
                                              size="sm"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleFilePreview(
                                                  fileUrl,
                                                  fileName
                                                );
                                              }}
                                              className="flex items-center gap-2">
                                              <Eye className="w-4 h-4" />
                                              Preview
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  }
                                )
                              : // Also check for other attachment-related fields
                                Object.entries(values).map(([key, value]) => {
                                  if (
                                    !value ||
                                    !key.toLowerCase().includes("attachment")
                                  )
                                    return null;

                                  const fieldLabel = key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (str: string) =>
                                      str.toUpperCase()
                                    );

                                  const fileName =
                                    typeof value === "object" && value !== null
                                      ? (value as any).name ||
                                        (value as any).label ||
                                        (value as any).fileName ||
                                        "File attached"
                                      : String(value);

                                  const fileUrl = getFileUrl(value);

                                  return (
                                    <div
                                      key={`attachment-field-${key}`}
                                      className="flex justify-between items-center py-2 border-b border-gray-200">
                                      <span className="font-medium text-xl text-gray-700">
                                        {fieldLabel}:
                                      </span>
                                      <div className="flex items-center gap-3">
                                        <span className="text-xl text-gray-900">
                                          {fileName}
                                        </span>
                                        {fileUrl && (
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="lg"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleFilePreview(
                                                fileUrl,
                                                fileName
                                              );
                                            }}
                                            className="flex items-center gap-2 px-4">
                                            <Eye className="size-5" />
                                            Preview
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                            {/* Show message if no attachments */}
                            {!(values as any).attachment &&
                              !Object.keys(values).some((key) =>
                                key.toLowerCase().includes("attachment")
                              ) && (
                                <div className="text-gray-500 text-lg italic">
                                  No attachments uploaded
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Regular form fields
                      <>
                        {currentStep.tabular
                          ? renderTabularFields(
                              currentStep.fields,
                              currentStep.title,
                              currentStep.defaultExpanded,
                              stepIndex,
                              values
                            )
                          : renderNormalFields(currentStep.fields, values)}
                      </>
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

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className=" h-14 text-xl"
                        onClick={handlePrev}
                        disabled={stepIndex === 0}>
                        <ArrowLeftIcon className="mr-2" />
                        Previous
                      </Button>
                      <Button
                        type="submit"
                        disabled={!shouldEnableButton}
                        className={`h-14 text-xl ${
                          !shouldEnableButton
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}>
                        {stepIndex === steps.length - 1 ? (
                          shouldEnableButton ? (
                            "Submit"
                          ) : (
                            "Fill Required Fields"
                          )
                        ) : (
                          <>
                            <span>Next</span>
                            <ArrowRightIcon className="ml-2" />
                          </>
                        )}
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
              enableReinitialize>
              {({ values, isValid, errors, touched }) => {
                // console.log("Single form state:", { isValid, errors, touched, values });

                // Button should be enabled based on Formik validation
                const shouldEnableButton = isValid;

                return (
                  <Form className="space-y-2.5">
                    {/* Render each step individually to preserve tabular property */}
                    {singleFormSteps?.some((step) => step.tabular) ? (
                      <Accordion
                        type="multiple"
                        className="w-full"
                        value={expandedItems}
                        onValueChange={handleAccordionValueChange}>
                        {singleFormSteps?.map((step, stepIndex) => (
                          <div
                            key={stepIndex}
                            className="mb-8">
                            {!step.tabular && (
                              <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">
                                {step.title}
                              </h3>
                            )}
                            {step.tabular
                              ? renderTabularFields(
                                  step.fields,
                                  step.title,
                                  step.defaultExpanded,
                                  stepIndex,
                                  values
                                )
                              : renderNormalFields(step.fields)}
                          </div>
                        ))}
                      </Accordion>
                    ) : (
                      singleFormSteps?.map((step, stepIndex) => (
                        <div
                          key={stepIndex}
                          className="mb-8">
                          <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2">
                            {step.title}
                          </h3>
                          {renderNormalFields(step.fields, values)}
                        </div>
                      ))
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

                    {/* <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        disabled={!shouldEnableButton}
                        className={`px-8 primary-button ${
                          !shouldEnableButton
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}>
                        {shouldEnableButton ? "Submit" : "Fill Required Fields"}
                      </Button>
                    </div> */}
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
                );
              }}
            </Formik>
          </>
        )}
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {previewFile.fileName}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={closePreview}
                className="flex-shrink-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              {isImageFile(previewFile.fileName) ? (
                <div className="flex justify-center">
                  <Image
                    src={previewFile.url}
                    alt={previewFile.fileName}
                    width={800}
                    height={600}
                    className="max-w-full h-auto rounded-lg shadow-lg"
                    unoptimized
                  />
                </div>
              ) : previewFile.fileName.toLowerCase().endsWith(".pdf") ? (
                <div className="h-[600px]">
                  <iframe
                    src={previewFile.url}
                    className="w-full h-full border-0 rounded"
                    title={`Preview of ${previewFile.fileName}`}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
                  <FileText className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Preview not available for this file type
                  </p>
                  <Button
                    onClick={() => window.open(previewFile.url, "_blank")}
                    className="bg-blue-600 hover:bg-blue-700">
                    Open in New Tab
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
