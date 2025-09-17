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
  if (!value || value === "") return "";

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
    if (Array.isArray(value) && value.length > 0) {
      if (typeof value[0] === "object" && value[0].label) {
        return value.map((item: any) => item.label).join(", ");
      }
      return value.join(", ");
    }
    return "Selected";
  }

  // Handle data URLs (base64)
  if (typeof value === "string" && value.startsWith("data:")) {
    return `✓ ${fieldLabel || "File"} uploaded`;
  }

  // Handle regular values
  return String(value);
};

interface LivePreviewProps {
  title: string;
  subtitle?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  formValues: Record<string, any>;
  groupMap?: Record<string, string>;
  allFields: Array<{ key: string; label: string; type: string }>;
  className?: string;
  style?: React.CSSProperties;
  config?: FormConfig; // Add config to access step information
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

  // Sync local state with parent form's accordion state
  useEffect(() => {
    setLocalExpandedSections(expandedSections);
  }, [expandedSections]);

  // Group the data based on the groupMap
  const groupedData = allFields.reduce((acc, field) => {
    if (!groupMap[field.key]) return acc;

    const groupName = groupMap[field.key];
    const value = formValues[field.key] ?? "";

    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push({
      label: field.label,
      value,
      type: field.type, // Include field type for proper formatting
    });

    return acc;
  }, {} as Record<string, { label: string; value: any; type: string }[]>);

  const groupedArray = Object.values(groupedData);

  // Check if we should use accordion (when stepperData is not empty)
  const shouldUseAccordion =
    config?.stepperData && config.stepperData.length > 0;

  // Check if form has multiple steps (stepper)
  const hasMultipleSteps = config?.steps && config.steps.length > 1;

  // Function to expand all sections
  const expandAll = () => {
    if (config?.steps) {
      const allStepKeys = config.steps.map((_, index) => `step-${index}`);
      setLocalExpandedSections(allStepKeys);
      // Notify parent form of the change
      if (onAccordionStateChange) {
        onAccordionStateChange(allStepKeys);
      }
    }
  };

  // Function to collapse all sections
  const collapseAll = () => {
    setLocalExpandedSections([]);
    // Notify parent form of the change
    if (onAccordionStateChange) {
      onAccordionStateChange([]);
    }
  };

  // Function to handle accordion value change
  const handleAccordionChange = (value: string[]) => {
    setLocalExpandedSections(value);
  };

  // Function to render step-based preview with accordion
  const renderStepBasedPreviewWithAccordion = () => {
    if (!config?.steps) return null;

    return (
      <div className="space-y-3">
        {/* Expand/Collapse Controls */}
        <div className="flex gap-2 pb-2 border-b border-white/20 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={expandAll}
            className="text-primary border-white/30 hover:border-white/50  hover:bg-white/50 hover:text-primary"
          >
            <Expand className="w-4 h-4 mr-1" />
            Expand All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={collapseAll}
            className="text-primary border-white/30  hover:bg-white/10 hover:text-primary"
          >
            <ChevronUp className="w-4 h-4 mr-1" />
            Collapse All
          </Button>
        </div>
        <Accordion
          type="multiple"
          className="w-full"
          value={localExpandedSections}
          onValueChange={handleAccordionChange}
        >
          {config.steps.map((step, stepIndex) => (
            <AccordionItem
              key={stepIndex}
              value={`step-${stepIndex}`}
              className="border-white/20"
            >
              <AccordionTrigger className="text-primary hover:text-primary/80 py-3">
                <div className="flex items-center gap-3">
                  {/* Step indicator */}
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-primary text-xs font-bold">
                    {stepIndex + 1}
                  </div>
                  {/* Step title */}
                  <span className="text-base font-semibold text-primary/60">
                    {step.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-primary">
                {/* Step Fields */}
                <div className="space-y-3">
                  {step.fields.map((field) => {
                    const value = formValues[field.key] ?? "";
                    const resolvedLabel = resolveLabel(field.label, formValues);
                    const displayValue = formatValueForDisplay(
                      value,
                      field.type,
                      resolvedLabel
                    );

                    return (
                      <div
                        key={field.key}
                        className="flex justify-between items-start py-2 border-b border-white/10"
                      >
                        <span className="text-sm font-medium text-primary/90">
                          {resolvedLabel}:
                        </span>
                        <span className="text-sm text-primary/80 text-right max-w-[60%] break-words">
                          {displayValue === "" ? (
                            <span className="text-primary/50 italic">
                              Not filled
                            </span>
                          ) : (
                            // Handle both string and object values for lookup fields
                            displayValue
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  };

  // Function to render step-based preview with mixed accordion/normal display based on tabular property
  const renderStepBasedPreviewWithMixedDisplay = () => {
    if (!config?.steps) return null;

    return (
      <div className="space-y-4">
        {" "}
        {/* Expand/Collapse Controls for stepper forms */}
        {hasMultipleSteps && (
          <div className="flex gap-2 pb-2 border-b border-white/20 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={expandAll}
              className="text-primary "
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
          // Check if this step should use accordion (tabular: true)
          const shouldUseAccordionForStep = step.tabular === true;

          if (shouldUseAccordionForStep) {
            // Render step as accordion
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
                      {/* Step indicator */}
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-primary text-xs font-bold">
                        {stepIndex + 1}
                      </div>
                      {/* Step title */}
                      <span className="text-base font-semibold text-primary/60">
                        {step.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-primary">
                    {/* Step Fields */}
                    <div className="space-y-3">
                      {step.fields.map((field) => {
                        const value = formValues[field.key] ?? "";
                        const resolvedLabel = resolveLabel(
                          field.label,
                          formValues
                        );
                        const displayValue = formatValueForDisplay(
                          value,
                          field.type,
                          resolvedLabel
                        );

                        return (
                          <div
                            key={field.key}
                            className="flex justify-between items-start py-2 border-b border-white/10"
                          >
                            <span className="text-sm font-medium text-primary/90">
                              {resolvedLabel}:
                            </span>
                            <span className="text-sm text-primary/80 text-right max-w-[60%] break-words">
                              {displayValue === "" ? (
                                <span className="text-primary/50 italic">
                                  Not filled
                                </span>
                              ) : (
                                // Handle both string and object values for lookup fields
                                displayValue
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
            // Render step normally (non-accordion)
            return (
              <div key={stepIndex} className="space-y-3">
                {/* Step Title with horizontal line */}
                <div className="border-b border-white/30 pb-2">
                  <h3 className="text-lg font-semibold text-primary/60">
                    {step.title}
                  </h3>
                </div>

                {/* Step Fields */}
                <div className="space-y-3">
                  {step.fields.map((field) => {
                    const value = formValues[field.key] ?? "";
                    const resolvedLabel = resolveLabel(field.label, formValues);
                    const displayValue = formatValueForDisplay(
                      value,
                      field.type,
                      resolvedLabel
                    );

                    return (
                      <div
                        key={field.key}
                        className="flex justify-between items-start py-2 border-b border-white/10"
                      >
                        <span className="text-sm font-medium text-primary/90">
                          {resolvedLabel}:
                        </span>
                        <span className="text-sm text-primary/80 text-right max-w-[60%] break-words">
                          {displayValue === "" ? (
                            <span className="text-primary/50 italic">
                              Not filled
                            </span>
                          ) : (
                            // Handle both string and object values for lookup fields
                            displayValue
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Horizontal line after each step (except the last one) */}
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

  // Function to render grouped preview (fallback)
  const renderGroupedPreview = () => {
    return (
      <div className="space-y-3">
        {groupedArray?.map((group, index) => (
          <div key={index} className="space-y-2 py-2 border-b border-white/20">
            {group.map((groupItem) => (
              <div
                key={groupItem.label + "live preview"}
                className="flex justify-between items-start"
              >
                <span className="text-sm font-medium text-primary/90">
                  {groupItem.label}:
                </span>
                <span className="text-sm text-primary/80 text-right max-w-[60%] break-words">
                  {groupItem.value === "" ? (
                    <span className="text-primary/50 italic">Not filled</span>
                  ) : (
                    // Handle both string and object values for lookup fields
                    formatValueForDisplay(
                      groupItem.value,
                      groupItem.type,
                      groupItem.label
                    )
                  )}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Determine which preview to render
  const renderPreview = () => {
    if (config?.steps) {
      // If stepperData exists and is not empty, use accordion
      if (shouldUseAccordion) {
        return renderStepBasedPreviewWithAccordion();
      }
      // Otherwise use regular step-based preview
      return renderStepBasedPreviewWithMixedDisplay();
    }
    // Fallback to grouped preview
    return renderGroupedPreview();
  };

  return (
    <div className={`space-y-3.5 w-full ${className}`}>
      <p className="border-b pb-2.5 max-w-fit pr-20 text-xl font-bold text-primary">
        Preview
      </p>
      <Card className="" style={style}>
        {/* Header */}
        <div className="border-b border-slate-300 flex gap-2 pb-3 items-center">
          <User className="text-primary" />
          <p className="text-primary font-semibold">{title}</p>
        </div>

        {/* Avatar and Basic Info */}
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

        {/* Content - Dynamic preview based on configuration */}
        <div className="pt-3 max-h-[550px] overflow-y-auto px-5 no-scrollbar">
          {renderPreview()}
        </div>
      </Card>
    </div>
  );
}
