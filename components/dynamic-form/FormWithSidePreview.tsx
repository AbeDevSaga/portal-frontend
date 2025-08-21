"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import LivePreview from "./LivePreview";
import { FormConfig } from "@/types/formType";

interface FormWithSidePreviewProps {
    formContent: React.ReactNode;
    formValues: Record<string, any>;
    groupMap: Record<string, string>;
    allFields: Array<{ key: string; label: string }>;
    previewTitle?: string;
    previewSubtitle?: string;
    avatarSrc?: string;
    avatarAlt?: string;
    previewClassName?: string;
    previewStyle?: React.CSSProperties;
    layout?: "2-1" | "1-1" | "3-1"; // Grid layout ratios
    className?: string;
    config?: FormConfig; // Add config for step-based preview
    expandedSections?: string[];
}

export default function FormWithSidePreview({
    formContent,
    formValues,
    groupMap,
    allFields,
    previewTitle = "Form Preview",
    previewSubtitle,
    avatarSrc = "",
    avatarAlt = "preview",
    previewClassName = "",
    previewStyle,
    layout = "2-1",
    className = "",
    config,
    expandedSections = [],
}: FormWithSidePreviewProps) {
    const getGridCols = () => {
        switch (layout) {
            case "2-1":
                return "xl:grid xl:grid-cols-3";
            case "1-1":
                return "xl:grid xl:grid-cols-2";
            case "3-1":
                return "xl:grid xl:grid-cols-4";
            default:
                return "xl:grid xl:grid-cols-3";
        }
    };

    const getFormColSpan = () => {
        switch (layout) {
            case "2-1":
                return "col-span-2";
            case "1-1":
                return "col-span-1";
            case "3-1":
                return "col-span-3";
            default:
                return "col-span-2";
        }
    };

    const getPreviewColSpan = () => {
        switch (layout) {
            case "2-1":
                return "col-span-1";
            case "1-1":
                return "col-span-1";
            case "3-1":
                return "col-span-1";
            default:
                return "col-span-1";
        }
    };

    return (
        <div className={`flex flex-wrap ${getGridCols()} gap-10 ${className}`}>
            <div className={`${getFormColSpan()}`}>
                {formContent}
            </div>
            <div className={`${getPreviewColSpan()} space-y-3.5 w-full`}>
                <LivePreview
                    title={previewTitle}
                    subtitle={previewSubtitle}
                    avatarSrc={avatarSrc}
                    avatarAlt={avatarAlt}
                    formValues={formValues}
                    groupMap={groupMap}
                    allFields={allFields}
                    className={previewClassName}
                    style={previewStyle}
                    config={config}
                    expandedSections={expandedSections}
                />
            </div>
        </div>
    );
}
