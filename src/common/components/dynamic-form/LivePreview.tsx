"use client";
import { Card } from "@/common/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { FormConfig } from "@/common/types/formType";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion";
import {
  User,
  ChevronDown,
  ChevronUp,
  Expand,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { useState, useEffect } from "react";
import { resolveLabel } from "@/common/utils/dynamic-form/resolveLabel";

const formatValueForDisplay = (
  value: any,
  fieldType?: string,
  fieldLabel?: string
): string => {
  console.log(
    "value: ",
    value,
    "fieldType: ",
    fieldType,
    "fieldLabel: ",
    fieldLabel
  );
  if (!value || value === "") return "";

  // Handle array fields
  if (Array.isArray(value)) {
    if (value.length === 0) return "";

    // If it's an array of objects (like array fields), format each item
    if (typeof value[0] === "object" && value[0] !== null) {
      return `${value.length} item(s) entered`;
    }

    // If it's a simple array, join the values
    return value.join(", ");
  }

  // Handle digital signature fields
  if (
    fieldType === "digitalSignature" &&
    typeof value === "object" &&
    value._fieldType === "digitalSignature"
  ) {
    return value._displayText || `✓ ${fieldLabel || "Signature"} captured`;
  }

  // Handle file upload fields
  if (fieldType === "fileUpload") {
    if (Array.isArray(value)) {
      return value.map((file: any) => file.name || "File uploaded").join(", ");
    } else if (value && typeof value === "object") {
      return value.name || "File uploaded";
    }
  }

  // Handle lookup fields (select, lookup)
  if (typeof value === "object" && value !== null) {
    if (value.label) return value.label;
    if (value.name) return value.name;
    if (value.value) return value.value;
    return "Selected";
  }

  // Handle data URLs (base64)
  if (typeof value === "string" && value.startsWith("data:")) {
    return `✓ ${fieldLabel || "File"} uploaded`;
  }

  // Handle regular values
  return String(value);
};

// Helper function to get array field values for display
const getArrayFieldDisplayValue = (field: any, formValues: any): string => {
  const arrayValue = formValues[field.key];

  if (!arrayValue || !Array.isArray(arrayValue)) return "";

  if (arrayValue.length === 0) return "";

  // For array fields, show a summary of what's been filled
  const filledCount = arrayValue.filter(
    (item) =>
      item && Object.values(item).some((val) => val !== "" && val != null)
  ).length;

  return `${filledCount} of ${arrayValue.length} item(s) filled`;
};

interface LivePreviewProps {
  title: string;
  subtitle?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  formValues: Record<string, any>;
  groupMap?: Record<string, string>;
  allFields: Array<{
    key: string;
    label: string;
    type: string;
    fields?: any[];
  }>;
  className?: string;
  style?: React.CSSProperties;
  config?: FormConfig;
  expandedSections?: string[];
  onAccordionStateChange?: (expandedItems: string[]) => void;
}

export default function LivePreview({
  title,
  subtitle,
  avatarSrc = "",
  avatarAlt = "preview",
  formValues,
  groupMap = {},
  allFields,
  className = "",
  style = {
    padding: "1.25rem",
    background: "linear-gradient(to right, #f0f8ff, #e6f3ff)",
    color: "white",
    borderRadius: "0.5rem",
  },
  config,
  expandedSections = [],
  onAccordionStateChange,
}: LivePreviewProps) {
  const [localExpandedSections, setLocalExpandedSections] =
    useState<string[]>(expandedSections);

  useEffect(() => {
    setLocalExpandedSections(expandedSections);
  }, [expandedSections]);

  // Enhanced field processing that handles array fields
  const processFieldForDisplay = (field: any, formValues: any) => {
    const resolvedLabel = resolveLabel(field.label, formValues);

    // Handle array fields specially
    if (field.type === "array") {
      const displayValue = getArrayFieldDisplayValue(field, formValues);
      return {
        label: resolvedLabel,
        value: displayValue,
        type: field.type,
        isArray: true,
        arrayData: formValues[field.key] || [],
      };
    }

    // Handle regular fields
    const value = formValues[field.key] ?? "";
    const displayValue = formatValueForDisplay(
      value,
      field.type,
      resolvedLabel
    );

    return {
      label: resolvedLabel,
      value: displayValue,
      type: field.type,
      isArray: false,
    };
  };

  // Function to render step-based preview with mixed display
  const renderStepBasedPreviewWithMixedDisplay = () => {
    if (!config?.steps) return null;

    return (
      <div className="space-y-4">
        {config.stepperData && config.stepperData.length > 0 && (
          <div className="flex gap-2 pb-2 border-b border-white/20 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={expandAll}
              className="text-primary"
            >
              <Expand className="w-4 h-4 mr-1" />
              Expand All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={collapseAll}
              className="text-primary border-white/30 bg-[#2A7299] hover:bg-white/10 hover:text-primary"
            >
              <ChevronsUpDown className="w-4 h-4 mr-1" />
              Collapse All
            </Button>
          </div>
        )}

        {config.steps.map((step, stepIndex) => {
          const shouldUseAccordionForStep = step.tabular === true;

          if (shouldUseAccordionForStep) {
            return (
              <Accordion
                key={stepIndex}
                type="single"
                collapsible
                className="w-full"
                value={
                  localExpandedSections.includes(`step-${stepIndex}`)
                    ? `step-${stepIndex}`
                    : undefined
                }
                onValueChange={(value) => {
                  if (value) {
                    setLocalExpandedSections((prev) => [...prev, value]);
                  } else {
                    setLocalExpandedSections((prev) =>
                      prev.filter((item) => item !== `step-${stepIndex}`)
                    );
                  }
                }}
              >
                <AccordionItem
                  value={`step-${stepIndex}`}
                  className="border-white/20"
                >
                  <AccordionTrigger className="text-primary hover:text-primary/80 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-primary text-xs font-bold">
                        {stepIndex + 1}
                      </div>
                      <span className="text-base font-semibold text-primary/60">
                        {step.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-primary">
                    <div className="space-y-3">
                      {step.fields.map((field) => {
                        const fieldData = processFieldForDisplay(
                          field,
                          formValues
                        );

                        return (
                          <div
                            key={field.key}
                            className="flex justify-between items-start py-2 border-b border-white/10"
                          >
                            <span className="text-sm font-medium text-primary/90">
                              {fieldData.label}:
                            </span>
                            <span className="text-sm text-primary/80 text-right max-w-[60%] break-words">
                              {fieldData.value === "" ? (
                                <span className="text-primary/50 italic">
                                  Not filled
                                </span>
                              ) : fieldData.isArray ? (
                                <span className="text-blue-600 font-medium">
                                  {fieldData.value}
                                </span>
                              ) : (
                                fieldData.value
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          } else {
            return (
              <div key={stepIndex} className="space-y-3">
                <div className="border-b border-white/30 pb-2">
                  <h3 className="text-lg font-semibold text-primary/60">
                    {step.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {step.fields.map((field) => {
                    const fieldData = processFieldForDisplay(field, formValues);

                    return (
                      <div
                        key={field.key}
                        className="flex justify-between items-start py-2 border-b border-white/10"
                      >
                        <span className="text-sm font-medium text-primary/90">
                          {fieldData.label}:
                        </span>
                        <span className="text-sm text-primary/80 text-right max-w-[60%] break-words">
                          {fieldData.value === "" ? (
                            <span className="text-primary/50 italic">
                              Not filled
                            </span>
                          ) : fieldData.isArray ? (
                            <span className="text-blue-600 font-medium">
                              {fieldData.value}
                            </span>
                          ) : (
                            fieldData.value
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {stepIndex < config.steps.length - 1 && (
                  <hr className="border-white/20 my-4" />
                )}
              </div>
            );
          }
        })}
      </div>
    );
  };

  // Expand/Collapse functions
  const expandAll = () => {
    if (config?.steps) {
      const allStepKeys = config.steps.map((_, index) => `step-${index}`);
      setLocalExpandedSections(allStepKeys);
      if (onAccordionStateChange) {
        onAccordionStateChange(allStepKeys);
      }
    }
  };

  const collapseAll = () => {
    setLocalExpandedSections([]);
    if (onAccordionStateChange) {
      onAccordionStateChange([]);
    }
  };

  return (
    <div className={`space-y-3.5 w-full ${className}`}>
      <p className="border-b pb-2.5 max-w-fit pr-20 text-xl font-bold text-primary">
        Preview
      </p>
      <Card className="" style={style}>
        <div className="border-b border-slate-300 flex gap-2 pb-3 items-center">
          <User className="text-primary" />
          <p className="text-primary font-semibold">{title}</p>
        </div>

        <div className="flex items-center py-3 border-b border-white/20">
          <div className="h-10 w-10 relative rounded-sm overflow-clip bg-white/50">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={avatarAlt}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="text-primary/60" size={20} />
              </div>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm text-primary/80">
              {subtitle || "Form Preview"}
            </p>
            <p className="text-[#FDB114] text-xs">
              {format(new Date(), "PPP")}
            </p>
          </div>
        </div>

        <div className="pt-3 max-h-[550px] overflow-y-auto px-5 no-scrollbar">
          {renderStepBasedPreviewWithMixedDisplay()}
        </div>
      </Card>
    </div>
  );
}
