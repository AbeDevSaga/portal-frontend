"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { FormConfig } from "@/types/formType";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { User, ChevronDown, ChevronUp, Expand, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface LivePreviewProps {
    title: string;
    subtitle?: string;
    avatarSrc?: string;
    avatarAlt?: string;
    formValues: Record<string, any>;
    groupMap?: Record<string, string>;
    allFields: Array<{ key: string; label: string }>;
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
        background: "linear-gradient(to right, #2A7299, #0c4A6B)",
        color: "white",
        borderRadius: "0.5rem",
    },
    config,
    expandedSections = [],
    onAccordionStateChange,
}: LivePreviewProps) {
    const [localExpandedSections, setLocalExpandedSections] = useState<string[]>(expandedSections);

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
        acc[groupName].push({ label: field.label, value });

        return acc;
    }, {} as Record<string, { label: string; value: any }[]>);

    const groupedArray = Object.values(groupedData);

    // Check if we should use accordion (when stepperData is not empty)
    const shouldUseAccordion = config?.stepperData && config.stepperData.length > 0;

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
                <div className="flex gap-2 pb-2 border-b border-white/20 justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={expandAll}
                        className="text-white border-white/30 bg-[#2A7299] hover:bg-white/10 hover:text-white"
                    >
                        <Expand className="w-4 h-4 mr-1" />
                        Expand All
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={collapseAll}
                        className="text-white border-white/30 bg-[#2A7299] hover:bg-white/10 hover:text-white"
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
                        <AccordionItem key={stepIndex} value={`step-${stepIndex}`} className="border-white/20">
                            <AccordionTrigger className="text-white hover:text-white/80 py-3">
                                <div className="flex items-center gap-3">
                                    {/* Step indicator */}
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-white text-xs font-bold">
                                        {stepIndex + 1}
                                    </div>
                                    {/* Step title */}
                                    <span className="text-lg font-semibold text-white">
                                        {step.title}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-white">
                                {/* Step Fields */}
                                <div className="space-y-3 pt-2">
                                    {step.fields.map((field) => {
                                        const value = formValues[field.key] ?? "";
                                        return (
                                            <div key={field.key} className="flex justify-between items-start py-2 border-b border-white/10 last:border-b-0">
                                                <span className="text-sm font-medium text-white/90">
                                                    {field.label}:
                                                </span>
                                                <span className="text-sm text-white/80 text-right max-w-[60%] break-words">
                                                    {value === "" ? (
                                                        <span className="text-white/50 italic">Not filled</span>
                                                    ) : (
                                                        // Handle both string and object values for lookup fields
                                                        typeof value === 'object' && value !== null ? (
                                                            <span>
                                                                {value.label || value.name || value.value || 'Selected'}
                                                            </span>
                                                        ) : (
                                                            value
                                                        )
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
            <div className="space-y-4">                {/* Expand/Collapse Controls for stepper forms */}
                {hasMultipleSteps && (
                    <div className="flex gap-2 pb-2 border-b border-white/20 justify-end">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={expandAll}
                            className="text-white border-white/30 bg-[#2A7299] hover:bg-white/10 hover:text-white"
                        >
                            <Expand className="w-4 h-4 mr-1" />
                            Expand All
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={collapseAll}
                            className="text-white border-white/30 bg-[#2A7299] hover:bg-white/10 hover:text-white"
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
                                value={localExpandedSections.includes(`step-${stepIndex}`) ? `step-${stepIndex}` : undefined}
                                onValueChange={(value) => {
                                    if (value) {
                                        setLocalExpandedSections(prev => [...prev, value]);
                                    } else {
                                        setLocalExpandedSections(prev => prev.filter(item => item !== `step-${stepIndex}`));
                                    }
                                }}
                            >
                                <AccordionItem value={`step-${stepIndex}`} className="border-white/20">
                                    <AccordionTrigger className="text-white hover:text-white/80 py-3">
                                        <div className="flex items-center gap-3">
                                            {/* Step indicator */}
                                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-white text-xs font-bold">
                                                {stepIndex + 1}
                                            </div>
                                            {/* Step title */}
                                            <span className="text-lg font-semibold text-white">
                                                {step.title}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-white">
                                        {/* Step Fields */}
                                        <div className="space-y-3 pt-2">
                                            {step.fields.map((field) => {
                                                const value = formValues[field.key] ?? "";
                                                return (
                                                    <div key={field.key} className="flex justify-between items-start py-2 border-b border-white/10 last:border-b-0">
                                                        <span className="text-sm font-medium text-white/90">
                                                            {field.label}:
                                                        </span>
                                                        <span className="text-sm text-white/80 text-right max-w-[60%] break-words">
                                                            {value === "" ? (
                                                                <span className="text-white/50 italic">Not filled</span>
                                                            ) : (
                                                                // Handle both string and object values for lookup fields
                                                                typeof value === 'object' && value !== null ? (
                                                                    <span>
                                                                        {value.label || value.name || value.value || 'Selected'}
                                                                    </span>
                                                                ) : (
                                                                    value
                                                                )
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
                                    <h3 className="text-lg font-semibold text-white">
                                        {step.title}
                                    </h3>
                                </div>

                                {/* Step Fields */}
                                <div className="space-y-3">
                                    {step.fields.map((field) => {
                                        const value = formValues[field.key] ?? "";
                                        return (
                                            <div key={field.key} className="flex justify-between items-start py-2 border-b border-white/10">
                                                <span className="text-sm font-medium text-white/90">
                                                    {field.label}:
                                                </span>
                                                <span className="text-sm text-white/80 text-right max-w-[60%] break-words">
                                                    {value === "" ? (
                                                        <span className="text-white/50 italic">Not filled</span>
                                                    ) : (
                                                        // Handle both string and object values for lookup fields
                                                        typeof value === 'object' && value !== null ? (
                                                            <span>
                                                                {value.label || value.name || value.value || 'Selected'}
                                                            </span>
                                                        ) : (
                                                            value
                                                        )
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
                    <div
                        key={index}
                        className='space-y-2 py-2 border-b border-white/20'
                    >
                        {group.map((groupItem) => (
                            <div
                                key={groupItem.label + "live preview"}
                                className='flex justify-between items-start'
                            >
                                <span className='text-sm font-medium text-white/90'>
                                    {groupItem.label}:
                                </span>
                                <span className='text-sm text-white/80 text-right max-w-[60%] break-words'>
                                    {groupItem.value === "" ? (
                                        <span className="text-white/50 italic">Not filled</span>
                                    ) : (
                                        // Handle both string and object values for lookup fields
                                        typeof groupItem.value === 'object' && groupItem.value !== null ? (
                                            <span>
                                                {groupItem.value.label || groupItem.value.name || groupItem.value.value || 'Selected'}
                                            </span>
                                        ) : (
                                            groupItem.value
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
            <p className='border-b pb-2.5 max-w-fit pr-20 text-xl font-bold text-primary'>
                Live Preview
            </p>
            <Card className='' style={style}>
                {/* Header */}
                <div className='border-b border-white/30 flex gap-2 pb-3 items-center'>
                    <User className="text-white" />
                    <p className="text-white font-medium">{title}</p>
                </div>

                {/* Avatar and Basic Info */}
                <div className='flex items-center py-3 border-b border-white/20'>
                    <div className='h-10 w-10 relative rounded-sm overflow-clip bg-white/20'>
                        {avatarSrc ? (
                            <Image
                                src={avatarSrc}
                                alt={avatarAlt}
                                fill
                                className='object-contain'
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <User className="text-white/60" size={20} />
                            </div>
                        )}
                    </div>
                    <div className='ml-3'>
                        <p className='text-sm text-white/80'>
                            {subtitle || "Form Preview"}
                        </p>
                        <p className='text-[#FDB114] text-xs'>
                            {format(new Date(), "PPP")}
                        </p>
                    </div>
                </div>

                {/* Content - Dynamic preview based on configuration */}
                <div className="pt-3">
                    {renderPreview()}
                </div>
            </Card>
        </div>
    );
}
