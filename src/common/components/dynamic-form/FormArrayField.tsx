"use client";

import React, { useState } from "react";
import { Field, FieldArray, useFormikContext } from "formik";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldConfig, FormArrayConfig } from "@/common/types/formType";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface FormArrayFieldProps {
    field: FieldConfig;
    formArrayConfig: FormArrayConfig;
}

export const FormArrayField: React.FC<FormArrayFieldProps> = ({
    field,
    formArrayConfig,
}) => {
    const { values, setFieldValue } = useFormikContext<Record<string, any>>();
    const [groupCount, setGroupCount] = useState(
        formArrayConfig.defaultGroupCount || 1
    );

    const addGroup = () => {
        if (
            formArrayConfig.maxItems &&
            groupCount >= formArrayConfig.maxItems
        ) {
            return;
        }
        setGroupCount((prev) => prev + 1);

        // Initialize the new group with empty values
        const newGroup: Record<string, any> = {};
        formArrayConfig.groupFields.forEach((groupField) => {
            newGroup[groupField.key] = "";
        });

        const currentArray = values[field.key] || [];
        setFieldValue(field.key, [...currentArray, newGroup]);
    };

    const removeGroup = (index: number) => {
        if (
            formArrayConfig.minItems &&
            groupCount <= formArrayConfig.minItems
        ) {
            return;
        }
        setGroupCount((prev) => prev - 1);

        const currentArray = values[field.key] || [];
        const newArray = currentArray.filter(
            (_: any, i: number) => i !== index
        );
        setFieldValue(field.key, newArray);
    };

    const getGroupTitle = (index: number) => {
        return (
            formArrayConfig.groupTitle?.replace("{index}", String(index + 1)) ||
            `Group ${index + 1}`
        );
    };

    const renderFieldByType = (
        fieldConfig: FieldConfig,
        formikField: any,
        form: any,
        isDisabled?: boolean
    ) => {
        switch (fieldConfig.type) {
            case "input":
                return (
                    <Input
                        {...formikField}
                        placeholder={fieldConfig.placeholder}
                        disabled={
                            isDisabled !== undefined
                                ? isDisabled
                                : fieldConfig.disabled
                        }
                        className='w-full'
                    />
                );
            case "textarea":
                return (
                    <Textarea
                        {...formikField}
                        placeholder={fieldConfig.placeholder}
                        disabled={
                            isDisabled !== undefined
                                ? isDisabled
                                : fieldConfig.disabled
                        }
                        className='w-full'
                    />
                );
            case "select":
                return (
                    <Select
                        value={formikField.value}
                        onValueChange={(value) =>
                            form.setFieldValue(fieldConfig.key, value)
                        }
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue
                                placeholder={
                                    fieldConfig.placeholder ||
                                    "Select an option"
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {fieldConfig.options?.map((option, index) => (
                                <SelectItem key={index} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case "radio":
                return (
                    <RadioGroup
                        value={formikField.value}
                        onValueChange={(value) =>
                            form.setFieldValue(fieldConfig.key, value)
                        }
                        className='flex flex-col space-y-2'
                    >
                        {fieldConfig.options?.map((option, index) => (
                            <div
                                key={index}
                                className='flex items-center space-x-2'
                            >
                                <RadioGroupItem
                                    value={option.value}
                                    id={`${fieldConfig.key}-${index}`}
                                />
                                <Label htmlFor={`${fieldConfig.key}-${index}`}>
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );
            case "date":
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant='outline'
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !formikField.value &&
                                        "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className='mr-2 h-4 w-4' />
                                {formikField.value ? (
                                    format(formikField.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                            <Calendar
                                mode='single'
                                selected={formikField.value}
                                onSelect={(date) =>
                                    form.setFieldValue(fieldConfig.key, date)
                                }
                                disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                );
            case "number":
                return (
                    <Input
                        {...formikField}
                        type='number'
                        placeholder={fieldConfig.placeholder}
                        disabled={fieldConfig.disabled}
                        className='w-full'
                    />
                );
            case "phone":
                return (
                    <Input
                        {...formikField}
                        type='tel'
                        placeholder={fieldConfig.placeholder}
                        disabled={fieldConfig.disabled}
                        className='w-full'
                    />
                );
            default:
                return (
                    <Input
                        {...formikField}
                        placeholder={fieldConfig.placeholder}
                        disabled={fieldConfig.disabled}
                        className='w-full'
                    />
                );
        }
    };

    const renderGroupFields = (groupIndex: number) => {
        return (
            <Card
                key={groupIndex}
                className='w-full mb-4 border-2 border-gray-200'
            >
                <CardHeader className='pb-3'>
                    <div className='flex items-center justify-between'>
                        <CardTitle className='text-lg font-medium text-gray-800'>
                            {getGroupTitle(groupIndex)}
                        </CardTitle>
                        {groupCount > (formArrayConfig.minItems || 0) && (
                            <Button
                                type='button'
                                variant='outline'
                                size='sm'
                                onClick={() => removeGroup(groupIndex)}
                                className='text-red-600 hover:text-red-700 hover:bg-red-50'
                            >
                                <Trash2 className='h-4 w-4 mr-2' />
                                {formArrayConfig.removeButtonText || "Remove"}
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className='w-full'>
                    {/* Grid container for group fields */}
                    <div className='w-full grid grid-cols-12 gap-4'>
                        {formArrayConfig.groupFields.map(
                            (groupField, fieldIndex) => {
                                // Create a unique key for each field in the group
                                const fieldKey = `${field.key}.${groupIndex}.${groupField.key}`;

                                // Get grid classes for the group field
                                const getGroupFieldGridClasses = (
                                    fieldConfig: FieldConfig
                                ) => {
                                    if (!fieldConfig.gridCols)
                                        return "col-span-12"; // Default to full width

                                    const gridMap: Record<number, string> = {
                                        1: "col-span-1",
                                        2: "col-span-2",
                                        3: "col-span-3",
                                        4: "col-span-4",
                                        6: "col-span-6",
                                        12: "col-span-12",
                                    };

                                    return (
                                        gridMap[fieldConfig.gridCols] ||
                                        "col-span-12"
                                    );
                                };

                                // Create a modified field config with the new key
                                const modifiedField: FieldConfig = {
                                    ...groupField,
                                    key: fieldKey,
                                    label: groupField.label,
                                    description: groupField.description,
                                };

                                return (
                                    <div
                                        key={fieldIndex}
                                        className={getGroupFieldGridClasses(
                                            groupField
                                        )}
                                    >
                                        <Field name={fieldKey}>
                                            {({
                                                field: formikField,
                                                form,
                                            }: any) => {
                                                // Get dependent field values for group field if callback is provided
                                                const groupFieldDependentValues =
                                                    groupField.getDependentValue
                                                        ? groupField.getDependentValue(
                                                              form.values
                                                          )
                                                        : null;

                                                // Dynamic properties for group fields based on dependent values
                                                const groupFieldDynamicDescription =
                                                    groupField.getDescription
                                                        ? groupField.getDescription(
                                                              groupFieldDependentValues
                                                          )
                                                        : groupField.description;
                                                const isGroupFieldDisabled =
                                                    groupField.isDisabled
                                                        ? groupField.isDisabled(
                                                              groupFieldDependentValues
                                                          )
                                                        : groupField.disabled;
                                                const isGroupFieldHidden =
                                                    groupField.isHide
                                                        ? groupField.isHide(
                                                              groupFieldDependentValues
                                                          )
                                                        : false;
                                                const isGroupFieldRequired =
                                                    groupField.isRequired
                                                        ? groupField.isRequired(
                                                              groupFieldDependentValues
                                                          )
                                                        : groupField.required;

                                                // If group field is hidden, render empty div
                                                if (isGroupFieldHidden) {
                                                    return (
                                                        <div
                                                            style={{
                                                                display: "none",
                                                            }}
                                                        ></div>
                                                    );
                                                }

                                                return (
                                                    <div>
                                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                                            {groupField.label}
                                                            {isGroupFieldRequired && (
                                                                <span className='text-red-500 ml-1'>
                                                                    *
                                                                </span>
                                                            )}
                                                        </label>

                                                        {renderFieldByType(
                                                            groupField,
                                                            formikField,
                                                            form,
                                                            isGroupFieldDisabled
                                                        )}

                                                        {groupFieldDynamicDescription && (
                                                            <p className='text-sm text-gray-500 mt-1'>
                                                                {
                                                                    groupFieldDynamicDescription
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className='w-full space-y-4'>
            <Field name={field.key}>
                {({ field: formikField, form }: any) => {
                    // Get dependent field values if callback is provided
                    const dependentValues = field.getDependentValue
                        ? field.getDependentValue(form.values)
                        : null;

                    // Dynamic field properties based on dependent values
                    const dynamicDescription = field.getDescription
                        ? field.getDescription(dependentValues)
                        : field.description;
                    const isFieldDisabled = field.isDisabled
                        ? field.isDisabled(dependentValues)
                        : field.disabled;
                    const isFieldHidden = field.isHide
                        ? field.isHide(dependentValues)
                        : false;
                    const isFieldRequired = field.isRequired
                        ? field.isRequired(dependentValues)
                        : field.required;

                    // If field is hidden, render empty div to maintain hook consistency
                    if (isFieldHidden) {
                        return <div style={{ display: "none" }}></div>;
                    }

                    return (
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                {field.label}
                                {isFieldRequired && (
                                    <span className='text-red-500 ml-1'>*</span>
                                )}
                            </label>

                            {dynamicDescription && (
                                <p className='text-sm text-gray-500 mb-3'>
                                    {dynamicDescription}
                                </p>
                            )}

                            <FieldArray name={field.key}>
                                {({ push, remove, form }: any) => {
                                    const currentArray =
                                        form.values[field.key] || [];

                                    // Initialize with default groups if empty (without hooks)
                                    if (
                                        currentArray.length === 0 &&
                                        formArrayConfig.defaultGroupCount &&
                                        formArrayConfig.defaultGroupCount > 0
                                    ) {
                                        // Use setTimeout to avoid calling setState during render
                                        setTimeout(() => {
                                            const defaultGroups = Array.from(
                                                {
                                                    length: formArrayConfig.defaultGroupCount!,
                                                },
                                                () => {
                                                    const group: Record<
                                                        string,
                                                        any
                                                    > = {};
                                                    formArrayConfig.groupFields.forEach(
                                                        (groupField) => {
                                                            group[
                                                                groupField.key
                                                            ] = "";
                                                        }
                                                    );
                                                    return group;
                                                }
                                            );
                                            setFieldValue(
                                                field.key,
                                                defaultGroups
                                            );
                                        }, 0);
                                    }

                                    return (
                                        <div className='space-y-4'>
                                            {currentArray.map(
                                                (_: any, index: number) =>
                                                    renderGroupFields(index)
                                            )}

                                            {(!formArrayConfig.maxItems ||
                                                currentArray.length <
                                                    formArrayConfig.maxItems) && (
                                                <Button
                                                    type='button'
                                                    variant='outline'
                                                    onClick={addGroup}
                                                    disabled={isFieldDisabled}
                                                    className='w-full border-dashed border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                                                >
                                                    <Plus className='h-4 w-4 mr-2' />
                                                    {formArrayConfig.addButtonText ||
                                                        "Add Group"}
                                                </Button>
                                            )}
                                        </div>
                                    );
                                }}
                            </FieldArray>
                        </div>
                    );
                }}
            </Field>
        </div>
    );
};
