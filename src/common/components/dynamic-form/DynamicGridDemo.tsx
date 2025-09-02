"use client";

import React, { useState } from "react";
import { FieldRenderer } from "./FieldRenderer";
import { FieldConfig } from "@/common/types/formType";
import { getGridContainerClasses } from "@/common/utils/dynamic-form/dynamicGridLayout";

/**
 * Demo component showcasing the dynamic grid system
 * This demonstrates how hidden fields automatically don't take up grid space
 */
export const DynamicGridDemo: React.FC = () => {
    const [formValues, setFormValues] = useState({
        fieldType: "type1",
        field1: "",
        field2: "",
        field3: "",
        field4: "",
    });

    // Sample form configuration with conditional fields
    const demoFields: FieldConfig[] = [
        {
            type: "radio",
            key: "fieldType",
            label: "Field Type",
            description: "Select a field type to show/hide fields",
            options: [
                { label: "Type 1", value: "type1" },
                { label: "Type 2", value: "type2" },
                { label: "Type 3", value: "type3" },
            ],
            required: true,
            gridCols: 12,
        },
        {
            type: "input",
            key: "field1",
            label: "Field 1 (Always Visible)",
            placeholder: "This field is always visible",
            description: "This field takes 6 columns and is always shown",
            required: true,
            gridCols: 6,
        },
        {
            type: "input",
            key: "field2",
            label: "Field 2 (Type 1 Only)",
            placeholder: "This field is only visible for Type 1",
            description: "This field takes 6 columns and is only shown for Type 1",
            required: true,
            gridCols: 6,
            getDependentValue: (formValues: any) => ({
                fieldType: formValues.fieldType,
            }),
            isHide: (dependentValues: any) => {
                return dependentValues?.fieldType !== "type1";
            },
        },
        {
            type: "input",
            key: "field3",
            label: "Field 3 (Type 2 Only)",
            placeholder: "This field is only visible for Type 2",
            description: "This field takes 6 columns and is only shown for Type 2",
            required: true,
            gridCols: 6,
            getDependentValue: (formValues: any) => ({
                fieldType: formValues.fieldType,
            }),
            isHide: (dependentValues: any) => {
                return dependentValues?.fieldType !== "type2";
            },
        },
        {
            type: "input",
            key: "field4",
            label: "Field 4 (Type 3 Only)",
            placeholder: "This field is only visible for Type 3",
            description: "This field takes 6 columns and is only shown for Type 3",
            required: true,
            gridCols: 6,
            getDependentValue: (formValues: any) => ({
                fieldType: formValues.fieldType,
            }),
            isHide: (dependentValues: any) => {
                return dependentValues?.fieldType !== "type3";
            },
        },
    ];

    const handleFieldChange = (key: string, value: any) => {
        setFormValues(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Dynamic Grid System Demo
                </h1>
                <p className="text-gray-600">
                    This demo shows how the grid system automatically adjusts when fields are hidden.
                    Change the "Field Type" selection to see fields appear/disappear without affecting the layout.
                </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Current Form Values:
                    </h2>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                        {JSON.stringify(formValues, null, 2)}
                    </pre>
                </div>

                <div className={getGridContainerClasses()}>
                    {demoFields.map((field) => (
                        <FieldRenderer
                            key={field.key}
                            field={field}
                            formValues={formValues}
                        />
                    ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-md font-semibold text-blue-800 mb-2">
                        How It Works:
                    </h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• <strong>Field 1:</strong> Always visible, takes 6 columns</li>
                        <li>• <strong>Field 2:</strong> Only visible for "Type 1", takes 6 columns</li>
                        <li>• <strong>Field 3:</strong> Only visible for "Type 2", takes 6 columns</li>
                        <li>• <strong>Field 4:</strong> Only visible for "Type 3", takes 6 columns</li>
                        <li>• <strong>Result:</strong> Hidden fields don't take up grid space, visible fields flow naturally</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
