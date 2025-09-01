"use client";

import React from "react";
import { Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { updateField } from "@/redux/feature/birthSlice";
import { useTranslations } from "next-intl";
// import { FieldConfig, FileMetadata } from "@/types/formType";
// import { FormArrayField } from "./FormArrayField";

// UI Components
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactSelect from "react-select";
import { FieldConfig, FileMetadata } from "@/common/types/formType";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormArrayField } from "./FormArrayField";
import { getAutoFlowGridClasses } from "@/common/utils/dynamic-form/dynamicGridLayout";

interface Props {
    field: FieldConfig;
    formValues?: Record<string, any>; // Add formValues prop for dynamic grid calculation
}

export const FieldRenderer: React.FC<Props> = ({ field, formValues = {} }) => {
    const t = useTranslations();
    const dispatch = useDispatch();

    // Generate grid classes based on field configuration with dynamic visibility
    const getGridClasses = (field: FieldConfig) => {
        return getAutoFlowGridClasses(field, formValues);
    };

    // Render the field content
    const renderFieldContent = () => {
        switch (field.type) {
            case "input":
                return (
                    <Field name={field.key}>
                        {({ field: formikField, form }: any) => {
                            // Get dependent field values if callback is provided
                            const dependentValues = field.getDependentValue
                                ? field.getDependentValue(form.values)
                                : null;

                            // Handle default value logic without hooks
                            if (
                                !form.values[field.key] &&
                                field.defaultValue !== undefined
                            ) {
                                const getDefaultValue = () => {
                                    if (
                                        typeof field.defaultValue === "function"
                                    ) {
                                        return field.defaultValue(
                                            dependentValues,
                                            form.values
                                        );
                                    }
                                    return field.defaultValue;
                                };

                                const defaultVal = getDefaultValue();
                                if (defaultVal !== undefined) {
                                    // Use setTimeout to avoid calling setState during render
                                    setTimeout(() => {
                                        form.setFieldValue(
                                            field.key,
                                            defaultVal
                                        );
                                        dispatch(
                                            updateField({
                                                key: field.key,
                                                value: defaultVal,
                                            })
                                        );
                                    }, 0);
                                }
                            }

                            // Dynamic field properties based on dependent values
                            const dynamicDescription = field.getDescription
                                ? field.getDescription(dependentValues)
                                : field.description;
                            const dynamicPlaceholder = field.getPlaceholder
                                ? field.getPlaceholder(dependentValues)
                                : field.placeholder;
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
                                    <Label
                                        className='text-primary font-semibold'
                                        htmlFor={field.key}
                                    >
                                        {field.label}
                                        {isFieldRequired ? (
                                            <span className='text-red-600'>
                                                *
                                            </span>
                                        ) : null}
                                    </Label>
                                    <Input
                                        {...formikField}
                                        value={formikField.value || ''}
                                        placeholder={dynamicPlaceholder}
                                        disabled={isFieldDisabled}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            dispatch(
                                                updateField({
                                                    key: field.key,
                                                    value,
                                                })
                                            );
                                            form.setFieldValue(
                                                field.key,
                                                value
                                            );
                                        }}
                                    />
                                    {dynamicDescription &&
                                        dynamicDescription.trim() !== "" && (
                                            <p className='text-[#7D7D7D] text-sm mt-1'>
                                                {dynamicDescription}
                                            </p>
                                        )}
                                    <ErrorMessage
                                        name={field.key}
                                        component='div'
                                        className='text-red-500'
                                    />
                                </div>
                            );
                        }}
                    </Field>
                );

            case "password":
                return (
                    <Field name={field.key}>
                        {({ field: formikField, form }: any) => {
                            const [show, setShow] = React.useState(false);

                            // Get dependent field values if callback is provided
                            const dependentValues = field.getDependentValue
                                ? field.getDependentValue(form.values)
                                : null;

                            // Dynamic field properties based on dependent values
                            const dynamicDescription = field.getDescription
                                ? field.getDescription(dependentValues)
                                : field.description;
                            const dynamicPlaceholder = field.getPlaceholder
                                ? field.getPlaceholder(dependentValues)
                                : field.placeholder;
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
                                <div className='space-y-1 relative'>
                                    <Label
                                        htmlFor={field.key}
                                        className='text-primary font-semibold'
                                    >
                                        {field.label}
                                        {isFieldRequired ? (
                                            <span className='text-red-600'>
                                                *
                                            </span>
                                        ) : null}
                                    </Label>
                                    <div className='relative'>
                                        <Input
                                            {...formikField}
                                            id={field.key}
                                            type={show ? "text" : "password"}
                                            placeholder={dynamicPlaceholder}
                                            disabled={isFieldDisabled}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                dispatch(
                                                    updateField({
                                                        key: field.key,
                                                        value,
                                                    })
                                                );
                                                form.setFieldValue(
                                                    field.key,
                                                    value
                                                );
                                            }}
                                        />
                                        <Button
                                            type='button'
                                            variant='ghost'
                                            size='sm'
                                            className='absolute right-2 top-1/2 -translate-y-1/2'
                                            onClick={() => setShow(!show)}
                                        >
                                            {show ? (
                                                <EyeOff className='h-4 w-4' />
                                            ) : (
                                                <Eye className='h-4 w-4' />
                                            )}
                                        </Button>
                                    </div>
                                    {dynamicDescription &&
                                        dynamicDescription.trim() !== "" && (
                                            <p className='text-[#7D7D7D] text-sm mt-1'>
                                                {dynamicDescription}
                                            </p>
                                        )}
                                    <ErrorMessage
                                        name={field.key}
                                        component='div'
                                        className='text-red-500 text-sm'
                                    />
                                </div>
                            );
                        }}
                    </Field>
                );

            case "textarea":
                return (
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
                            const dynamicPlaceholder = field.getPlaceholder
                                ? field.getPlaceholder(dependentValues)
                                : field.placeholder;
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
                                    <Label
                                        className='text-primary font-semibold'
                                        htmlFor={field.key}
                                    >
                                        {field.label}
                                        {isFieldRequired ? (
                                            <span className='text-red-600'>
                                                *
                                            </span>
                                        ) : null}
                                    </Label>
                                    <textarea
                                        {...formikField}
                                        placeholder={dynamicPlaceholder}
                                        disabled={isFieldDisabled}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            dispatch(
                                                updateField({
                                                    key: field.key,
                                                    value,
                                                })
                                            );
                                            form.setFieldValue(
                                                field.key,
                                                value
                                            );
                                        }}
                                    />
                                    {dynamicDescription &&
                                        dynamicDescription.trim() !== "" && (
                                            <p className='text-[#7D7D7D] text-sm mt-1'>
                                                {dynamicDescription}
                                            </p>
                                        )}
                                    <ErrorMessage
                                        name={field.key}
                                        component='div'
                                        className='text-red-500'
                                    />
                                </div>
                            );
                        }}
                    </Field>
                );

            case "select":
                return (
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
                            const dynamicPlaceholder = field.getPlaceholder
                                ? field.getPlaceholder(dependentValues)
                                : field.placeholder;
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
                                    <Label className='text-primary font-semibold'>
                                        {field.label}
                                        {isFieldRequired && (
                                            <span className='pl-2 text-red-600'>
                                                *
                                            </span>
                                        )}
                                    </Label>
                                    <Select
                                        value={formikField.value || ''}
                                        onValueChange={(value) => {
                                            form.setFieldValue(
                                                field.key,
                                                value
                                            );
                                            dispatch(
                                                updateField({
                                                    key: field.key,
                                                    value,
                                                })
                                            );
                                        }}
                                    >
                                        <SelectTrigger className='w-full'>
                                            <SelectValue
                                                placeholder={
                                                    dynamicPlaceholder ||
                                                    "Select an option"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {field.options?.map(
                                                (opt, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={opt.value}
                                                    >
                                                        {opt.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {dynamicDescription &&
                                        dynamicDescription.trim() !== "" && (
                                            <p className='text-[#7D7D7D] text-sm mt-1'>
                                                {dynamicDescription}
                                            </p>
                                        )}
                                    <ErrorMessage
                                        name={field.key}
                                        component='div'
                                        className='text-red-500'
                                    />
                                </div>
                            );
                        }}
                    </Field>
                );

            case "radio":
                return (
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
                                <div className='space-y-1'>
                                    <Label className='text-primary font-semibold'>
                                        {field.label}
                                        {isFieldRequired ? (
                                            <span className='text-red-600'>*</span>
                                        ) : null}
                                    </Label>
                                    <RadioGroup
                                        value={formikField.value || ""}
                                        onValueChange={(value) => {
                                            form.setFieldValue(field.key, value);
                                            dispatch(
                                                updateField({
                                                    key: field.key,
                                                    value,
                                                })
                                            );
                                        }}
                                        className='flex space-x-4'
                                        disabled={isFieldDisabled}
                                    >
                                        {field.options?.map((opt) => (
                                            <Label
                                                key={opt.value}
                                                className='flex items-center space-x-2'
                                            >
                                                <RadioGroupItem value={opt.value} />
                                                <span>{opt.label}</span>
                                            </Label>
                                        ))}
                                    </RadioGroup>
                                    {dynamicDescription &&
                                        dynamicDescription.trim() !== "" && (
                                            <p className='text-[#7D7D7D] text-sm mt-1'>
                                                {dynamicDescription}
                                            </p>
                                        )}
                                    <ErrorMessage
                                        name={field.key}
                                        component='div'
                                        className='text-red-500 text-sm'
                                    />
                                </div>
                            );
                        }}
                    </Field>
                );

            case "checkbox":
                return (
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
                                <div className='space-y-1'>
                                    <Label className='text-primary font-semibold'>
                                        {field.label}
                                        {isFieldRequired ? (
                                            <span className='text-red-600'>
                                                *
                                            </span>
                                        ) : null}
                                    </Label>
                                    <div className='flex items-center space-x-2'>
                                        <input
                                            type='checkbox'
                                            id={field.key}
                                            checked={formikField.value || false}
                                            onChange={(e) => {
                                                const value = e.target.checked;
                                                form.setFieldValue(
                                                    field.key,
                                                    value
                                                );
                                                dispatch(
                                                    updateField({
                                                        key: field.key,
                                                        value,
                                                    })
                                                );
                                            }}
                                            disabled={isFieldDisabled}
                                            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                                        />
                                        <span className='text-sm text-gray-700'>
                                            {field.description ||
                                                "Check this box"}
                                        </span>
                                    </div>
                                    {dynamicDescription &&
                                        dynamicDescription.trim() !== "" && (
                                            <p className='text-[#7D7D7D] text-sm mt-1'>
                                                {dynamicDescription}
                                            </p>
                                        )}
                                    <ErrorMessage
                                        name={field.key}
                                        component='div'
                                        className='text-red-500 text-sm'
                                    />
                                </div>
                            );
                        }}
                    </Field>
                );

            case "number":
                return (
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
                            const dynamicPlaceholder = field.getPlaceholder
                                ? field.getPlaceholder(dependentValues)
                                : field.placeholder;
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
                                    <Label className='text-primary font-semibold'>
                                        {field.label}
                                        {isFieldRequired ? (
                                            <span className='text-red-600'>
                                                *
                                            </span>
                                        ) : null}
                                    </Label>
                                    <Input
                                        {...formikField}
                                        value={formikField.value || ''}
                                        type='number'
                                        placeholder={dynamicPlaceholder}
                                        disabled={isFieldDisabled}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // Convert to number if possible, otherwise keep as string for validation
                                            const numericValue =
                                                value === ""
                                                    ? ""
                                                    : Number(value);

                                            dispatch(
                                                updateField({
                                                    key: field.key,
                                                    value: numericValue,
                                                })
                                            );
                                            form.setFieldValue(
                                                field.key,
                                                numericValue
                                            );
                                        }}
                                    />
                                    {dynamicDescription &&
                                        dynamicDescription.trim() !== "" && (
                                            <p className='text-[#7D7D7D] text-sm mt-1'>
                                                {dynamicDescription}
                                            </p>
                                        )}
                                    <ErrorMessage
                                        name={field.key}
                                        component='div'
                                        className='text-red-500'
                                    />
                                </div>
                            );
                        }}
                    </Field>
                );

            case "date":
                return (
                    <Field name={field.key}>
                        {({ field: _, form }: any) => {
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
                                <div className='space-y-1 flex flex-col gap-2'>
                                    <Label
                                        className='text-primary font-semibold'
                                        htmlFor={field.key}
                                    >
                                        {field.label}
                                        {isFieldRequired && (
                                            <span className='pl-2 text-red-600'>
                                                *
                                            </span>
                                        )}
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant='outline'
                                                className='!text-left w-full md:min-w-[250px]'
                                            >
                                                {form.values[field.key]
                                                    ? new Date(
                                                          form.values[field.key]
                                                      ).toLocaleDateString()
                                                    : "Select date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-auto p-0'>
                                            <Calendar
                                                mode='single'
                                                selected={
                                                    form.values[field.key]
                                                        ? new Date(
                                                              form.values[
                                                                  field.key
                                                              ]
                                                          )
                                                        : undefined
                                                }
                                                onSelect={(date) => {
                                                    const isoDate = date
                                                        ? date.toISOString()
                                                        : null;
                                                    form.setFieldValue(
                                                        field.key,
                                                        isoDate
                                                    );

                                                    dispatch(
                                                        updateField({
                                                            key: field.key,
                                                            value: isoDate,
                                                        })
                                                    );
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    {/* Dynamic description */}
                                    {dynamicDescription &&
                                        dynamicDescription.trim() !== "" && (
                                            <p className='text-[#7D7D7D] text-sm mt-1'>
                                                {dynamicDescription}
                                            </p>
                                        )}

                                    {/* Formik validation errors */}
                                    <ErrorMessage
                                        name={field.key}
                                        component='div'
                                        className='text-red-500 text-sm'
                                    />
                                </div>
                            );
                        }}
                    </Field>
                );

            case "email":
                return (
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
                            const dynamicPlaceholder = field.getPlaceholder
                                ? field.getPlaceholder(dependentValues)
                                : field.placeholder;
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
                                    <Label className='text-primary font-semibold'>
                                        {field.label}
                                        {isFieldRequired && (
                                            <span className='pl-2 text-red-600'>
                                                *
                                            </span>
                                        )}
                                    </Label>
                                    <Input
                                        {...formikField}
                                        type='email'
                                        placeholder={dynamicPlaceholder}
                                        disabled={isFieldDisabled}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            dispatch(
                                                updateField({
                                                    key: field.key,
                                                    value: value,
                                                })
                                            );
                                            form.setFieldValue(
                                                field.key,
                                                value
                                            );
                                        }}
                                    />
                                    {dynamicDescription &&
                                        dynamicDescription.trim() !== "" && (
                                            <p className='text-[#7D7D7D] text-sm mt-1'>
                                                {dynamicDescription}
                                            </p>
                                        )}
                                    <ErrorMessage
                                        name={field.key}
                                        component='div'
                                        className='text-red-500'
                                    />
                                </div>
                            );
                        }}
                    </Field>
                );

            case "phone":
                return (
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
                            const dynamicPlaceholder = field.getPlaceholder
                                ? field.getPlaceholder(dependentValues)
                                : field.placeholder;
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
                                    <Label className='text-primary font-semibold'>
                                        {field.label}
                                        {isFieldRequired && (
                                            <span className='pl-2 text-red-600'>
                                                *
                                            </span>
                                        )}
                                    </Label>
                                    <Input
                                        {...formikField}
                                        type='tel'
                                        placeholder={dynamicPlaceholder}
                                        disabled={isFieldDisabled}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            dispatch(
                                                updateField({
                                                    key: field.key,
                                                    value: value,
                                                })
                                            );
                                            form.setFieldValue(
                                                field.key,
                                                value
                                            );
                                        }}
                                    />
                                    {dynamicDescription &&
                                        dynamicDescription.trim() !== "" && (
                                            <p className='text-[#7D7D7D] text-sm mt-1'>
                                                {dynamicDescription}
                                            </p>
                                        )}
                                    <ErrorMessage
                                        name={field.key}
                                        component='div'
                                        className='text-red-500'
                                    />
                                </div>
                            );
                        }}
                    </Field>
                );

            case "fileUpload":
                return (
                    <Field name={field.key}>
                        {({ field: _, form }: any) => {
                            try {
                                // Add ref for the file input to clear it when files are removed
                                const fileInputRef = React.useRef<HTMLInputElement>(null);
                                
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

                                // Get file constraints from field properties
                                const maxFileSize =
                                    field.maxFileSize || 5 * 1024 * 1024; // 5MB default
                                const minFiles = field.minFiles || 0;
                                const maxFiles = field.maxFiles || 10;
                                const allowedTypes = field.allowedTypes || ["*"];
                                const isMultiple = field.multiple || false;

                                // DEBUG: Monitor form validation state changes - with safer dependency handling
                                // IMPORTANT: This hook must be called before any conditional returns
                                React.useEffect(() => {
                                    try {
                                        // Only log if field is visible to avoid unnecessary logging
                                        if (!isFieldHidden) {
                                            const currentFiles = form.values[field.key] || (isMultiple ? [] : null);
                                            console.log(`[DEBUG] FileUpload ${field.key} - Form state changed:`, {
                                                fieldKey: field.key,
                                                fieldValue: form.values[field.key],
                                                fieldTouched: form.touched[field.key],
                                                fieldErrors: form.errors[field.key],
                                                formIsValid: form.isValid,
                                                formIsValidating: form.isValidating,
                                                formDirty: form.dirty,
                                                isFieldRequired: isFieldRequired,
                                                hasFiles: !!currentFiles,
                                                dependentValues: dependentValues
                                            });
                                        }
                                    } catch (error) {
                                        console.error(`[ERROR] FileUpload ${field.key} - Debug logging failed:`, error);
                                    }
                                }, [
                                    field.key,
                                    form.values[field.key],
                                    form.touched[field.key],
                                    form.errors[field.key],
                                    form.isValid,
                                    form.isValidating,
                                    form.dirty,
                                    isFieldRequired,
                                    isMultiple,
                                    dependentValues,
                                    isFieldHidden
                                ]);

                                // If field is hidden, render empty div to maintain hook consistency
                                if (isFieldHidden) {
                                    return <div style={{ display: "none" }}></div>;
                                }

                                const currentFiles =
                                    form.values[field.key] || (isMultiple ? [] : null);

                                const handleFileChange = (
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    try {
                                        const files = Array.from(
                                            e.target.files || []
                                        );

                                        // Validate file count
                                        if (files.length < minFiles) {
                                            alert(
                                                `Please select at least ${minFiles} file(s)`
                                            );
                                            return;
                                        }

                                        if (files.length > maxFiles) {
                                            alert(
                                                `Please select no more than ${maxFiles} file(s)`
                                            );
                                            return;
                                        }

                                        // Validate file sizes
                                        const oversizedFiles = files.filter(
                                            (file) => file.size > maxFileSize
                                        );
                                        if (oversizedFiles.length > 0) {
                                            const maxSizeMB = Math.round(
                                                maxFileSize / (1024 * 1024)
                                            );
                                            alert(
                                                `File(s) too large. Maximum size is ${maxSizeMB}MB`
                                            );
                                            return;
                                        }

                                        // Validate file types
                                        const invalidFiles = files.filter(
                                            (file) => {
                                                if (allowedTypes.includes("*"))
                                                    return false;
                                                return !allowedTypes.some(
                                                    (type: string) =>
                                                        file.type.startsWith(
                                                            type
                                                        ) ||
                                                        file.name.endsWith(type)
                                                );
                                            }
                                        );

                                        if (invalidFiles.length > 0) {
                                            alert(
                                                `Invalid file type(s). Allowed: ${allowedTypes.join(
                                                    ", "
                                                )}`
                                            );
                                            return;
                                        }

                                        // CRITICAL: Store the actual File objects in Formik for validation
                                        // This ensures Formik recognizes the field as having a valid value
                                        const selectedFiles = isMultiple ? files : files[0];
                                        
                                        // First set the field value with actual File objects
                                        form.setFieldValue(
                                            field.key,
                                            selectedFiles
                                        );
                                        
                                        // CRITICAL FIX: Mark field as touched and trigger validation
                                        // Use setTimeout to ensure the field value is set before marking as touched
                                        setTimeout(() => {
                                            // Mark field as touched
                                            form.setFieldTouched(field.key, true, false);
                                            
                                            // Trigger field validation
                                            form.validateField(field.key);
                                            
                                            // Force entire form validation to update submit button state
                                            form.validateForm();
                                            
                                            // ENHANCED DEBUG: Check why form is still invalid
                                            setTimeout(() => {
                                                console.log(`[DEBUG] FileUpload ${field.key} - Deep validation check:`, {
                                                    fieldKey: field.key,
                                                    fieldValue: form.values[field.key],
                                                    fieldTouched: form.touched[field.key],
                                                    fieldErrors: form.errors[field.key],
                                                    formIsValid: form.isValid,
                                                    formIsValidating: form.isValidating,
                                                    formDirty: form.dirty,
                                                    formErrors: form.errors,
                                                    formTouched: form.touched,
                                                    formValues: form.values,
                                                    // Check if there are other fields with errors
                                                    allFieldErrors: Object.keys(form.errors).filter(key => form.errors[key]),
                                                    allTouchedFields: Object.keys(form.touched).filter(key => form.touched[key]),
                                                    // Check if this field is actually required
                                                    isFieldRequired: isFieldRequired,
                                                    // Check if the field value is truthy
                                                    hasValidValue: !!form.values[field.key],
                                                    // Check if the field value is a File object
                                                    isFileObject: form.values[field.key] instanceof File,
                                                    // Check if the field value has the expected properties
                                                    valueProperties: form.values[field.key] ? Object.getOwnPropertyNames(form.values[field.key]) : 'null'
                                                });
                                            }, 100); // Small delay to ensure validation completes
                                            
                                            // DEBUG: Log the touch state after setting it
                                            console.log(`[DEBUG] FileUpload ${field.key} - After setting touched:`, {
                                                fieldTouched: form.touched[field.key],
                                                formIsValid: form.isValid,
                                                formIsValidating: form.isValidating
                                            });
                                        }, 0);
                                        
                                        // DEBUG: Log validation state after file selection
                                        console.log(`[DEBUG] FileUpload ${field.key} - After file selection:`, {
                                            fieldKey: field.key,
                                            fieldValue: form.values[field.key],
                                            fieldValueType: typeof form.values[field.key],
                                            fieldValueIsArray: Array.isArray(form.values[field.key]),
                                            fieldValueKeys: form.values[field.key] ? Object.keys(form.values[field.key]) : 'null',
                                            fieldTouched: form.touched[field.key],
                                            fieldErrors: form.errors[field.key],
                                            formIsValid: form.isValid,
                                            formIsValidating: form.isValidating,
                                            formDirty: form.dirty,
                                            formValues: form.values,
                                            isFieldRequired: isFieldRequired,
                                            hasFiles: !!selectedFiles,
                                            selectedFilesType: typeof selectedFiles,
                                            selectedFilesIsArray: Array.isArray(selectedFiles),
                                            selectedFilesKeys: selectedFiles ? Object.keys(selectedFiles) : 'null'
                                        });
                                        
                                        dispatch(
                                            updateField({
                                                key: field.key,
                                                value: selectedFiles,
                                            })
                                        );

                                        // Also store metadata for display purposes
                                        const fileMetadata: FileMetadata[] =
                                            files.map((file) => ({
                                                name: file.name,
                                                size: file.size,
                                                type: file.type,
                                                lastModified: file.lastModified,
                                                id: `${file.name}-${file.lastModified}-${file.size}`, // Unique identifier
                                            }));

                                        // Store metadata in sessionStorage for display purposes
                                        if (isMultiple) {
                                            files.forEach((file, index) => {
                                                const fileId = fileMetadata[index].id;
                                                sessionStorage.setItem(
                                                    `file_${fileId}`,
                                                    JSON.stringify({
                                                        name: file.name,
                                                        size: file.size,
                                                        type: file.type,
                                                        lastModified: file.lastModified,
                                                    })
                                                );
                                            });
                                        } else {
                                            const fileId = fileMetadata[0].id;
                                            sessionStorage.setItem(
                                                `file_${fileId}`,
                                                JSON.stringify({
                                                    name: files[0].name,
                                                    size: files[0].size,
                                                    type: files[0].type,
                                                    lastModified: files[0].lastModified,
                                                })
                                            );
                                        }
                                    } catch (error) {
                                        console.error(`[ERROR] FileUpload ${field.key} - File change handling failed:`, error);
                                        alert(`Error processing file: ${error instanceof Error ? error.message : 'Unknown error'}`);
                                    }
                                };

                                const removeFile = (index: number) => {
                                    try {
                                        if (isMultiple) {
                                            // Get the file to remove from the current files array
                                            const currentFilesArray = Array.isArray(currentFiles) ? currentFiles : [];
                                            const fileToRemove = currentFilesArray[index];
                                            
                                            // Remove from sessionStorage if it has metadata
                                            if (fileToRemove && typeof fileToRemove === 'object' && 'id' in fileToRemove) {
                                                sessionStorage.removeItem(
                                                    `file_${(fileToRemove as any).id}`
                                                );
                                            }
                                            
                                            // Remove the file from the array
                                            const updatedFiles = currentFilesArray.filter((_, i) => i !== index);
                                            form.setFieldValue(
                                                field.key,
                                                updatedFiles
                                            );
                                            
                                            // Mark field as touched and trigger validation
                                            form.setFieldTouched(field.key, true, false);
                                            
                                            // Trigger form validation to update submit button state
                                            form.validateField(field.key);
                                            
                                            // DEBUG: Log validation state after file removal (multiple)
                                            console.log(`[DEBUG] FileUpload ${field.key} - After file removal (multiple):`, {
                                                fieldKey: field.key,
                                                fieldValue: form.values[field.key],
                                                fieldTouched: form.touched[field.key],
                                                fieldErrors: form.errors[field.key],
                                                formIsValid: form.isValid,
                                                formIsValidating: form.isValidating,
                                                formDirty: form.dirty,
                                                remainingFiles: updatedFiles.length,
                                                isFieldRequired: isFieldRequired
                                            });
                                            
                                            dispatch(
                                                updateField({
                                                    key: field.key,
                                                    value: updatedFiles,
                                                })
                                            );
                                            
                                            // Clear the file input if no files remain
                                            if (updatedFiles.length === 0 && fileInputRef.current) {
                                                fileInputRef.current.value = '';
                                            }
                                        } else {
                                            // Single file case - clear the field
                                            if (currentFiles && typeof currentFiles === 'object' && 'id' in currentFiles) {
                                                sessionStorage.removeItem(
                                                    `file_${(currentFiles as any).id}`
                                                );
                                            }
                                            form.setFieldValue(field.key, null);
                                            
                                            // Mark field as touched and trigger validation
                                            form.setFieldTouched(field.key, true, false);
                                            
                                            // Trigger form validation to update submit button state
                                            form.validateField(field.key);
                                            
                                            // DEBUG: Log validation state after file removal (single)
                                            console.log(`[DEBUG] FileUpload ${field.key} - After file removal (single):`, {
                                                fieldKey: field.key,
                                                fieldValue: form.values[field.key],
                                                fieldTouched: form.touched[field.key],
                                                fieldErrors: form.errors[field.key],
                                                formIsValid: form.isValid,
                                                formIsValidating: form.isValidating,
                                                formDirty: form.dirty,
                                                isFieldRequired: isFieldRequired
                                            });
                                            
                                            dispatch(
                                                updateField({
                                                    key: field.key,
                                                    value: null,
                                                })
                                            );
                                            
                                            // Clear the file input
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = '';
                                            }
                                        }
                                    } catch (error) {
                                        console.error(`[ERROR] FileUpload ${field.key} - File removal failed:`, error);
                                        alert(`Error removing file: ${error instanceof Error ? error.message : 'Unknown error'}`);
                                    }
                                };

                                const formatFileSize = (bytes: number) => {
                                    try {
                                        if (bytes === 0) return "0 Bytes";
                                        const k = 1024;
                                        const sizes = ["Bytes", "KB", "MB", "GB"];
                                        const i = Math.floor(
                                            Math.log(bytes) / Math.log(k)
                                        );
                                        return (
                                            parseFloat(
                                                (bytes / Math.pow(k, i)).toFixed(2)
                                            ) +
                                            " " +
                                            sizes[i]
                                        );
                                    } catch (error) {
                                        console.error(`[ERROR] FileUpload ${field.key} - File size formatting failed:`, error);
                                        return "Unknown size";
                                    }
                                };

                                return (
                                    <div>
                                        <Label className='text-primary font-semibold'>
                                            {field.label}
                                            {isFieldRequired ? (
                                                <span className='pl-2 text-red-600'>*</span>
                                            ) : null}
                                        </Label>
                                        <div className='space-y-2'>
                                            {/* File Input */}
                                            <div className='relative'>
                                                <Input
                                                    ref={fileInputRef}
                                                    type='file'
                                                    onChange={handleFileChange}
                                                    placeholder={field.placeholder}
                                                    multiple={isMultiple}
                                                    accept={allowedTypes.join(",")}
                                                    className={`cursor-pointer ${isFieldRequired && !currentFiles ? 'border-red-500 focus:border-red-500' : ''}`}
                                                    disabled={isFieldDisabled}
                                                />

                                                {/* File Constraints Info */}
                                                <div className='text-xs text-gray-500 mt-1'>
                                                    <div>
                                                        Max file size:{" "}
                                                        {formatFileSize(
                                                            maxFileSize
                                                        )}
                                                    </div>
                                                    <div>
                                                        Files: {minFiles} -{" "}
                                                        {maxFiles}
                                                    </div>
                                                    {allowedTypes.length > 0 &&
                                                        allowedTypes[0] !== "*" && (
                                                            <div>
                                                                Allowed types:{" "}
                                                                {allowedTypes.join(
                                                                    ", "
                                                                )}
                                                            </div>
                                                        )}
                                                    {isFieldRequired && (
                                                        <div className='text-red-500 font-medium'>
                                                            * This field is required
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Selected Files Display */}
                                            {currentFiles && (
                                                <div className='space-y-2'>
                                                    {isMultiple
                                                        ? Array.from(
                                                              currentFiles as File[]
                                                          ).map(
                                                              (
                                                                  file: File,
                                                                  index: number
                                                              ) => (
                                                                  <div
                                                                      key={
                                                                          `${file.name}-${file.lastModified}-${file.size}` ||
                                                                          index
                                                                      }
                                                                      className='flex items-center justify-between p-2 bg-gray-50 rounded border'
                                                                  >
                                                                      <div className='flex-1 min-w-0'>
                                                                          <div className='text-sm font-medium text-gray-900 truncate'>
                                                                              {
                                                                                  file.name
                                                                              }
                                                                          </div>
                                                                      <div className='text-xs text-gray-500'>
                                                                          {formatFileSize(
                                                                              file.size
                                                                          )}{" "}
                                                                          •{" "}
                                                                          {
                                                                              file.type
                                                                          }
                                                                      </div>
                                                                  </div>
                                                                  <Button
                                                                      type='button'
                                                                      variant='outline'
                                                                      size='sm'
                                                                      onClick={() =>
                                                                          removeFile(
                                                                              index
                                                                          )
                                                                      }
                                                                      className='ml-2 text-red-600 hover:text-red-700'
                                                                  >
                                                                      Remove
                                                                  </Button>
                                                              </div>
                                                          )
                                                        )
                                                        : currentFiles && (
                                                              <div className='flex items-center justify-between p-2 bg-gray-50 rounded border'>
                                                                  <div className='flex-1 min-w-0'>
                                                                      <div className='text-sm font-medium text-gray-900 truncate'>
                                                                          {
                                                                              (
                                                                                  currentFiles as File
                                                                              ).name
                                                                          }
                                                                      </div>
                                                                      <div className='text-xs text-gray-500'>
                                                                          {formatFileSize(
                                                                              (
                                                                                  currentFiles as File
                                                                              ).size
                                                                          )}{" "}
                                                                          •{" "}
                                                                          {
                                                                              (
                                                                                  currentFiles as File
                                                                              ).type
                                                                          }
                                                                      </div>
                                                                  </div>
                                                                  <Button
                                                                      type='button'
                                                                      variant='outline'
                                                                      size='sm'
                                                                      onClick={() =>
                                                                          removeFile(
                                                                              0
                                                                          )
                                                                      }
                                                                      className='ml-2 text-red-600 hover:text-red-700'
                                                                  >
                                                                      Remove
                                                                  </Button>
                                                              </div>
                                                          )}
                                                </div>
                                            )}
                                            
                                            {/* Required field validation message */}
                                            {isFieldRequired && !currentFiles && (
                                                <div className='text-red-500 text-sm'>
                                                    Please select a file. This field is required.
                                                </div>
                                            )}
                                            
                                            {/* DEBUG: Validation Status Display */}
                                            <div className='mt-4 p-3 bg-gray-100 rounded border text-xs'>
                                                <div className='font-semibold mb-2 text-gray-700'>🔍 Validation Debug Info:</div>
                                                <div className='grid grid-cols-2 gap-2'>
                                                    <div>
                                                        <span className='font-medium'>Field Key:</span> {field.key}
                                                    </div>
                                                    <div>
                                                        <span className='font-medium'>Required:</span> 
                                                        <span className={isFieldRequired ? 'text-red-600' : 'text-green-600'}>
                                                            {isFieldRequired ? 'Yes' : 'No'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className='font-medium'>Has Files:</span> 
                                                        <span className={currentFiles ? 'text-green-600' : 'text-red-600'}>
                                                            {currentFiles ? 'Yes' : 'No'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className='font-medium'>Field Value:</span> 
                                                        <span className='text-gray-600'>
                                                            {currentFiles ? (Array.isArray(currentFiles) ? `${currentFiles.length} file(s)` : '1 file') : 'null'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className='font-medium'>Field Touched:</span> 
                                                        <span className={form.touched[field.key] ? 'text-blue-600' : 'text-red-600'}>
                                                            {form.touched[field.key] ? 'Yes' : 'No'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className='font-medium'>Field Errors:</span> 
                                                        <span className={form.errors[field.key] ? 'text-red-600' : 'text-green-600'}>
                                                            {form.errors[field.key] || 'None'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className='font-medium'>Form Valid:</span> 
                                                        <span className={form.isValid ? 'text-green-600' : 'text-red-600'}>
                                                            {form.isValid ? 'Yes' : 'No'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className='font-medium'>Form Validating:</span> 
                                                        <span className={form.isValidating ? 'text-yellow-600' : 'text-gray-600'}>
                                                            {form.isValidating ? 'Yes' : 'No'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='mt-2 pt-2 border-t border-gray-300'>
                                                    <div className='font-medium text-gray-700'>Current Form Values:</div>
                                                    <pre className='text-xs bg-white p-2 rounded border mt-1 overflow-auto max-h-20'>
                                                        {JSON.stringify(form.values, null, 2)}
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                        {dynamicDescription &&
                                            dynamicDescription.trim() !== "" && (
                                                <p className='text-[#7D7D7D] text-sm mt-1'>
                                                    {dynamicDescription}
                                                </p>
                                            )}
                                        <ErrorMessage
                                            name={field.key}
                                            component='div'
                                            className='text-red-500'
                                        />
                                    </div>
                                );
                            } catch (error) {
                                console.error(`[ERROR] FileUpload ${field.key} - Rendering failed:`, error);
                                return (
                                    <div className='p-4 border border-red-200 rounded bg-red-50 text-red-600'>
                                        <strong>Error:</strong> Failed to render file upload field "{field.label}". 
                                        <br />
                                        <small>Error details: {error instanceof Error ? error.message : 'Unknown error'}</small>
                                    </div>
                                );
                            }
                        }}
                    </Field>
                );

            case "lookup":
                return (
                    <Field name={field.key}>
                        {({ field: formikField, form }: any) => {
                            try {
                                const [options, setOptions] = React.useState<
                                    any[]
                                >([]);
                                const [isLoading, setIsLoading] =
                                    React.useState(false);
                                const [inputValue, setInputValue] =
                                    React.useState("");
                                const [error, setError] = React.useState<
                                    string | null
                                >(null);
                                const timeoutRef =
                                    React.useRef<NodeJS.Timeout | null>(null);

                                // ADD THIS: Declare the ref for dependency tracking
                                const dependencyRef = React.useRef<{
                                    previousDependentValues: any;
                                } | null>(null);

                                // Get lookup configuration with defaults
                                const lookupConfig = field.lookupConfig;
                                const {
                                    isExternal = true,
                                    apiEndpoint,
                                    method,
                                    valueKey,
                                    labelKey,
                                    searchKey,
                                    debounceMs,
                                    minSearchLength,
                                    cacheResults,
                                    transformResponse,
                                    transformRequest,
                                    defaultValue,
                                } = lookupConfig || {};

                                // Provide fallback values for required properties
                                const effectiveApiEndpoint = apiEndpoint;
                                const effectiveValueKey = valueKey;
                                const effectiveLabelKey = labelKey;
                                const effectiveSearchKey = searchKey;
                                const effectiveDebounceMs = debounceMs;
                                const effectiveCacheResults = cacheResults;
                                const effectiveMethod = method;

                                // Validate that required configuration is provided
                                if (
                                    !effectiveApiEndpoint ||
                                    !effectiveValueKey ||
                                    !effectiveLabelKey
                                ) {
                                    return (
                                        <div className='text-red-500 text-sm p-4 border border-red-200 rounded bg-red-50'>
                                            <strong>
                                                Configuration Error:
                                            </strong>{" "}
                                            Lookup field "{field.label}" is
                                            missing required configuration.
                                            Please provide apiEndpoint,
                                            valueKey, and labelKey in
                                            lookupConfig.
                                        </div>
                                    );
                                }

                                // Set defaults only for properties that need them for logic to work
                                const minSearchLengthForLogic =
                                    minSearchLength ?? 0;

                                // Get dependent field values if callback is provided (supports multiple dependencies)
                                const dependentValues = React.useMemo(
                                    () =>
                                        field.getDependentValue
                                            ? field.getDependentValue(
                                                  form.values
                                              )
                                            : null,
                                    [field.getDependentValue, form.values]
                                );

                                // Dynamic field properties based on dependent values
                                const dynamicDescription = React.useMemo(
                                    () =>
                                        field.getDescription
                                            ? field.getDescription(
                                                  dependentValues
                                              )
                                            : field.description,
                                    [
                                        field.getDescription,
                                        dependentValues,
                                        field.description,
                                    ]
                                );
                                const dynamicPlaceholder = React.useMemo(
                                    () =>
                                        field.getPlaceholder
                                            ? field.getPlaceholder(
                                                  dependentValues
                                              )
                                            : field.placeholder,
                                    [
                                        field.getPlaceholder,
                                        dependentValues,
                                        field.placeholder,
                                    ]
                                );
                                const isFieldDisabled = React.useMemo(
                                    () =>
                                        field.isDisabled
                                            ? field.isDisabled(dependentValues)
                                            : field.disabled,
                                    [
                                        field.isDisabled,
                                        dependentValues,
                                        field.disabled,
                                    ]
                                );
                                const isFieldHidden = React.useMemo(
                                    () =>
                                        field.isHide
                                            ? field.isHide(dependentValues)
                                            : false,
                                    [field.isHide, dependentValues]
                                );
                                const isFieldRequired = React.useMemo(
                                    () =>
                                        field.isRequired
                                            ? field.isRequired(dependentValues)
                                            : field.required,
                                    [
                                        field.isRequired,
                                        dependentValues,
                                        field.required,
                                    ]
                                );

                                // Handle default value logic
                                const getDefaultValue = () => {
                                    if (typeof defaultValue === "function") {
                                        return defaultValue(
                                            dependentValues,
                                            form.values
                                        );
                                    }
                                    return defaultValue;
                                };

                                // Set default value if field has no value and default is provided
                                React.useEffect(() => {
                                    if (
                                        !form.values[field.key] &&
                                        defaultValue !== undefined
                                    ) {
                                        const defaultVal = getDefaultValue();
                                        if (defaultVal !== undefined) {
                                            const isMultiple =
                                                field.multiple !== undefined
                                                    ? field.multiple
                                                    : false;

                                            if (isMultiple) {
                                                // Handle multiple selection defaults
                                                if (Array.isArray(defaultVal)) {
                                                    form.setFieldValue(
                                                        field.key,
                                                        defaultVal
                                                    );
                                                    dispatch(
                                                        updateField({
                                                            key: field.key,
                                                            value: defaultVal,
                                                        })
                                                    );
                                                } else {
                                                    // Convert single default to array for multiple selection
                                                    const defaultArray =
                                                        defaultVal
                                                            ? [defaultVal]
                                                            : [];
                                                    form.setFieldValue(
                                                        field.key,
                                                        defaultArray
                                                    );
                                                    dispatch(
                                                        updateField({
                                                            key: field.key,
                                                            value: defaultArray,
                                                        })
                                                    );
                                                }
                                            } else {
                                                // Handle single selection defaults
                                                if (
                                                    typeof defaultVal ===
                                                        "object" &&
                                                    defaultVal !== null
                                                ) {
                                                    // If default is an object, store it directly
                                                    form.setFieldValue(
                                                        field.key,
                                                        defaultVal
                                                    );
                                                    dispatch(
                                                        updateField({
                                                            key: field.key,
                                                            value: defaultVal,
                                                        })
                                                    );
                                                } else {
                                                    // If default is a simple value, store it
                                                    form.setFieldValue(
                                                        field.key,
                                                        defaultVal
                                                    );
                                                    dispatch(
                                                        updateField({
                                                            key: field.key,
                                                            value: defaultVal,
                                                        })
                                                    );
                                                }
                                            }
                                        }
                                    }
                                }, [
                                    defaultValue,
                                    dependentValues,
                                    form.values,
                                    field.key,
                                    field.multiple,
                                ]);

                                // FIXED: Dependency change detection with proper ref
                                React.useEffect(() => {
                                    // Skip clearing if field is hidden or no dependent values
                                    if (isFieldHidden || !dependentValues) {
                                        return;
                                    }

                                    // Check if dependent values have changed significantly
                                    const currentDependentValues =
                                        field.getDependentValue?.(
                                            form.values
                                        ) || null;
                                    const previousDependentValues =
                                        dependencyRef.current
                                            ?.previousDependentValues;

                                    // Store current values for next comparison
                                    if (!dependencyRef.current) {
                                        dependencyRef.current = {
                                            previousDependentValues: null,
                                        };
                                    }
                                    dependencyRef.current.previousDependentValues =
                                        currentDependentValues;

                                    // If this is the first render or dependencies haven't been set yet, don't clear
                                    if (previousDependentValues === null) {
                                        return;
                                    }

                                    // Compare dependent values to see if they changed
                                    const hasDependencyChanged =
                                        JSON.stringify(
                                            currentDependentValues
                                        ) !==
                                        JSON.stringify(previousDependentValues);

                                    if (hasDependencyChanged) {
                                        const isMultiple =
                                            field.multiple !== undefined
                                                ? field.multiple
                                                : false;
                                        const clearValue = isMultiple
                                            ? []
                                            : null;

                                        form.setFieldValue(
                                            field.key,
                                            clearValue
                                        );
                                        dispatch(
                                            updateField({
                                                key: field.key,
                                                value: clearValue,
                                            })
                                        );
                                    }
                                }, [
                                    dependentValues,
                                    isFieldHidden,
                                    field.key,
                                    field.multiple,
                                    field.getDependentValue,
                                    form.values,
                                ]);

                                // Cache for storing API results
                                const cacheKey = React.useMemo(
                                    () =>
                                        `${effectiveApiEndpoint}_${inputValue}_${
                                            JSON.stringify(dependentValues) ||
                                            "none"
                                        }`,
                                    [
                                        effectiveApiEndpoint,
                                        inputValue,
                                        dependentValues,
                                    ]
                                );

                                // Ensure options is always an array
                                const safeOptions = React.useMemo(() => {
                                    try {
                                        return Array.isArray(options)
                                            ? options
                                            : [];
                                    } catch (error) {
                                        console.error(
                                            "Error processing options:",
                                            error
                                        );
                                        return [];
                                    }
                                }, [options]);

                                // Safe input value
                                const safeInputValue = inputValue || "";

                                // Simple cache for storing API results - use useRef to persist across renders
                                const cacheRef = React.useRef(new Map());
                                const cache = cacheRef.current;

                                // Debounced search function
                                const debouncedSearch = React.useCallback(
                                    (searchTerm: string) => {
                                        // Skip search if field is hidden or disabled
                                        if (isFieldHidden || isFieldDisabled) {
                                            return;
                                        }

                                        if (timeoutRef.current) {
                                            clearTimeout(timeoutRef.current);
                                        }
                                        timeoutRef.current = setTimeout(
                                            async () => {
                                                // Only skip search if minSearchLength > 0 and search term is too short
                                                if (
                                                    minSearchLengthForLogic >
                                                        0 &&
                                                    searchTerm.length <
                                                        minSearchLengthForLogic
                                                ) {
                                                    setOptions([]);
                                                    return;
                                                }

                                                try {
                                                    setIsLoading(true);
                                                    setError(null);

                                                    // Check cache first if caching is enabled
                                                    if (
                                                        effectiveCacheResults &&
                                                        cache.has(cacheKey)
                                                    ) {
                                                        const cachedData =
                                                            cache.get(cacheKey);
                                                        if (cachedData) {
                                                            setOptions(
                                                                cachedData
                                                            );
                                                            setIsLoading(false);
                                                            return;
                                                        }
                                                    }

                                                    // Prepare request parameters
                                                    let requestParams = {
                                                        search: searchTerm,
                                                        limit: 20,
                                                        offset: 0,
                                                    };

                                                    // Add dependent values to request if transformRequest is provided
                                                    let modifiedEndpoint =
                                                        isExternal
                                                            ? `${process.env.NEXT_PUBLIC_CRRSA_BACKEND_API_URL}${effectiveApiEndpoint}`
                                                            : `/api/${effectiveApiEndpoint}`;

                                                    if (
                                                        transformRequest &&
                                                        dependentValues
                                                    ) {
                                                        // FIXED: Pass correct parameters to transformRequest
                                                        const transformedRequest =
                                                            transformRequest(
                                                                {
                                                                    url: modifiedEndpoint,
                                                                    params: requestParams,
                                                                },
                                                                dependentValues
                                                            );

                                                        // Update both requestParams and endpoint if transformRequest modifies them
                                                        if (
                                                            transformedRequest.url
                                                        ) {
                                                            modifiedEndpoint =
                                                                transformedRequest.url;
                                                        }
                                                        if (
                                                            transformedRequest.params
                                                        ) {
                                                            requestParams =
                                                                transformedRequest.params;
                                                        }
                                                    }

                                                    // For GET requests, construct the query string properly
                                                    if (
                                                        effectiveMethod ===
                                                            "GET" &&
                                                        Object.keys(
                                                            requestParams
                                                        ).length > 0
                                                    ) {
                                                        const queryParams =
                                                            new URLSearchParams();
                                                        Object.entries(
                                                            requestParams
                                                        ).forEach(
                                                            ([key, value]) => {
                                                                if (
                                                                    value !==
                                                                        undefined &&
                                                                    value !==
                                                                        null &&
                                                                    value !== ""
                                                                ) {
                                                                    queryParams.append(
                                                                        key,
                                                                        String(
                                                                            value
                                                                        )
                                                                    );
                                                                }
                                                            }
                                                        );

                                                        const separator =
                                                            modifiedEndpoint.includes(
                                                                "?"
                                                            )
                                                                ? "&"
                                                                : "?";
                                                        modifiedEndpoint = `${modifiedEndpoint}${separator}${queryParams.toString()}`;
                                                    }

                                                    // Make API request
                                                    const requestOptions: RequestInit =
                                                        {
                                                            method:
                                                                effectiveMethod ||
                                                                "GET",
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/json",
                                                            },
                                                        };

                                                    if (
                                                        effectiveMethod ===
                                                        "POST"
                                                    ) {
                                                        requestOptions.body =
                                                            JSON.stringify(
                                                                requestParams
                                                            );
                                                    }

                                                    const response =
                                                        await fetch(
                                                            modifiedEndpoint,
                                                            requestOptions
                                                        );

                                                    if (!response.ok) {
                                                        throw new Error(
                                                            `API request failed: ${response.status}`
                                                        );
                                                    }

                                                    const data =
                                                        await response.json();

                                                    // Transform response if custom transformer is provided
                                                    let transformedOptions =
                                                        data;
                                                    if (transformResponse) {
                                                        transformedOptions =
                                                            transformResponse(
                                                                data
                                                            );
                                                    } else {
                                                        // Default transformation
                                                        transformedOptions =
                                                            data.map(
                                                                (
                                                                    item: any
                                                                ) => ({
                                                                    value: item[
                                                                        effectiveValueKey
                                                                    ],
                                                                    label: item[
                                                                        effectiveLabelKey
                                                                    ],
                                                                    ...item,
                                                                })
                                                            );
                                                    }

                                                    setOptions(
                                                        transformedOptions
                                                    );

                                                    // Cache results if enabled
                                                    if (effectiveCacheResults) {
                                                        cache.set(
                                                            cacheKey,
                                                            transformedOptions
                                                        );
                                                    }
                                                } catch (error) {
                                                    console.error(
                                                        "Search error:",
                                                        error
                                                    );
                                                    setError(
                                                        error instanceof Error
                                                            ? error.message
                                                            : "Search failed"
                                                    );
                                                    setOptions([]);
                                                } finally {
                                                    setIsLoading(false);
                                                }
                                            },
                                            effectiveDebounceMs || 300
                                        );
                                    },
                                    [
                                        effectiveApiEndpoint,
                                        effectiveValueKey,
                                        effectiveLabelKey,
                                        effectiveSearchKey,
                                        effectiveDebounceMs,
                                        minSearchLengthForLogic,
                                        effectiveCacheResults,
                                        cacheKey,
                                        transformRequest,
                                        dependentValues,
                                        transformResponse,
                                        isFieldHidden,
                                        effectiveMethod,
                                    ]
                                );

                                // Load initial options on mount and when dependent values change
                                React.useEffect(() => {
                                    // Skip loading if field is hidden or disabled
                                    if (isFieldHidden || isFieldDisabled) {
                                        return;
                                    }

                                    const loadInitialOptions = async () => {
                                        try {
                                            setIsLoading(true);
                                            setError(null);

                                            // Prepare request parameters
                                            let requestParams: any = {
                                                limit: 20,
                                                offset: 0,
                                            };

                                            // Add dependent values to request if transformRequest is provided
                                            let modifiedEndpoint = isExternal
                                                ? `${process.env.NEXT_PUBLIC_CRRSA_BACKEND_API_URL}${effectiveApiEndpoint}`
                                                : `/api/${effectiveApiEndpoint}`;

                                            if (
                                                transformRequest &&
                                                dependentValues
                                            ) {
                                                // FIXED: Pass correct parameters to transformRequest
                                                const transformedRequest =
                                                    transformRequest(
                                                        {
                                                            url: modifiedEndpoint,
                                                            params: requestParams,
                                                        },
                                                        dependentValues
                                                    );

                                                // Update both requestParams and endpoint if transformRequest modifies them
                                                if (transformedRequest.url) {
                                                    modifiedEndpoint =
                                                        transformedRequest.url;
                                                }
                                                if (transformedRequest.params) {
                                                    requestParams =
                                                        transformedRequest.params;
                                                }
                                            }

                                            // For GET requests, construct the query string properly
                                            if (
                                                effectiveMethod === "GET" &&
                                                Object.keys(requestParams)
                                                    .length > 0
                                            ) {
                                                const queryParams =
                                                    new URLSearchParams();
                                                Object.entries(
                                                    requestParams
                                                ).forEach(([key, value]) => {
                                                    if (
                                                        value !== undefined &&
                                                        value !== null &&
                                                        value !== ""
                                                    ) {
                                                        queryParams.append(
                                                            key,
                                                            String(value)
                                                        );
                                                    }
                                                });

                                                const separator =
                                                    modifiedEndpoint.includes(
                                                        "?"
                                                    )
                                                        ? "&"
                                                        : "?";
                                                modifiedEndpoint = `${modifiedEndpoint}${separator}${queryParams.toString()}`;
                                            }

                                            // Make API request
                                            const requestOptions: RequestInit =
                                                {
                                                    method:
                                                        effectiveMethod ||
                                                        "GET",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                };

                                            if (effectiveMethod === "POST") {
                                                requestOptions.body =
                                                    JSON.stringify(
                                                        requestParams
                                                    );
                                            }

                                            const response = await fetch(
                                                modifiedEndpoint,
                                                requestOptions
                                            );

                                            if (!response.ok) {
                                                throw new Error(
                                                    `API request failed: ${response.status}`
                                                );
                                            }

                                            const data = await response.json();

                                            // Transform response if custom transformer is provided
                                            let transformedOptions = data;
                                            if (transformResponse) {
                                                transformedOptions =
                                                    transformResponse(data);
                                            } else {
                                                // Default transformation
                                                transformedOptions = data.map(
                                                    (item: any) => ({
                                                        value: item[
                                                            effectiveValueKey
                                                        ],
                                                        label: item[
                                                            effectiveLabelKey
                                                        ],
                                                        ...item,
                                                    })
                                                );
                                            }

                                            setOptions(transformedOptions);

                                            // Cache results if enabled
                                            if (effectiveCacheResults) {
                                                cache.set(
                                                    cacheKey,
                                                    transformedOptions
                                                );
                                            }
                                        } catch (error) {
                                            console.error(
                                                "Initial options loading error:",
                                                error
                                            );
                                            setError(
                                                error instanceof Error
                                                    ? error.message
                                                    : "Failed to load options"
                                            );
                                            setOptions([]);
                                        } finally {
                                            setIsLoading(false);
                                        }
                                    };

                                    loadInitialOptions();
                                }, [
                                    effectiveApiEndpoint,
                                    effectiveMethod,
                                    effectiveValueKey,
                                    effectiveLabelKey,
                                    transformRequest,
                                    transformResponse,
                                    dependentValues,
                                    isFieldHidden,
                                    isFieldDisabled,
                                ]);

                                // Handle input change
                                const handleInputChange = (
                                    newValue: string
                                ) => {
                                    if (newValue === inputValue) {
                                        return;
                                    }
                                    setInputValue(newValue);
                                    debouncedSearch(newValue);
                                };

                                // Handle option selection
                                const handleChange = (selectedOption: any) => {
                                    try {
                                        // Get dynamic properties from field configuration
                                        const isMultiple =
                                            field.multiple !== undefined
                                                ? field.multiple
                                                : false;

                                        if (selectedOption) {
                                            if (isMultiple) {
                                                // Handle multiple selection - selectedOption is an array
                                                const selectedValues =
                                                    Array.isArray(
                                                        selectedOption
                                                    )
                                                        ? selectedOption
                                                        : [selectedOption];
                                                form.setFieldValue(
                                                    field.key,
                                                    selectedValues
                                                );
                                                dispatch(
                                                    updateField({
                                                        key: field.key,
                                                        value: selectedValues,
                                                    })
                                                );
                                            } else {
                                                // Handle single selection - store the full selected object
                                                form.setFieldValue(
                                                    field.key,
                                                    selectedOption
                                                );
                                                dispatch(
                                                    updateField({
                                                        key: field.key,
                                                        value: selectedOption,
                                                    })
                                                );
                                            }
                                        } else {
                                            // Handle clearing the selection
                                            const clearValue = isMultiple
                                                ? []
                                                : null;
                                            form.setFieldValue(
                                                field.key,
                                                clearValue
                                            );
                                            dispatch(
                                                updateField({
                                                    key: field.key,
                                                    value: clearValue,
                                                })
                                            );
                                        }
                                    } catch (error) {
                                        // Fallback to simple value if object storage fails
                                        try {
                                            const isMultiple =
                                                field.multiple !== undefined
                                                    ? field.multiple
                                                    : false;
                                            if (
                                                isMultiple &&
                                                Array.isArray(selectedOption)
                                            ) {
                                                const simpleValues =
                                                    selectedOption.map(
                                                        (option) =>
                                                            option?.value ||
                                                            option?.id ||
                                                            option
                                                    );
                                                form.setFieldValue(
                                                    field.key,
                                                    simpleValues
                                                );
                                                dispatch(
                                                    updateField({
                                                        key: field.key,
                                                        value: simpleValues,
                                                    })
                                                );
                                            } else {
                                                const simpleValue =
                                                    selectedOption?.value ||
                                                    selectedOption?.id ||
                                                    selectedOption;
                                                form.setFieldValue(
                                                    field.key,
                                                    simpleValue
                                                );
                                                dispatch(
                                                    updateField({
                                                        key: field.key,
                                                        value: simpleValue,
                                                    })
                                                );
                                            }
                                        } catch (fallbackError) {
                                            console.error(
                                                "Fallback error:",
                                                fallbackError
                                            );
                                        }
                                    }
                                };

                                // Get current selected value - now returns the full object
                                const currentValue = form.values[field.key];
                                let selectedOption: any = null;
                                // Get multiple property outside try-catch to ensure it's in scope
                                const isMultiple =
                                    field.multiple !== undefined
                                        ? field.multiple
                                        : false;

                                try {
                                    if (isMultiple) {
                                        // Handle multiple selection
                                        if (Array.isArray(currentValue)) {
                                            selectedOption = currentValue
                                                .map((value) =>
                                                    typeof value === "object"
                                                        ? value
                                                        : safeOptions.find(
                                                              (option) =>
                                                                  option.value ===
                                                                  value
                                                          )
                                                )
                                                .filter(Boolean);
                                        } else if (currentValue) {
                                            // Convert single value to array for multiple selection
                                            const value =
                                                typeof currentValue === "object"
                                                    ? currentValue
                                                    : safeOptions.find(
                                                          (option) =>
                                                              option.value ===
                                                              currentValue
                                                      );
                                            selectedOption = value
                                                ? [value]
                                                : [];
                                        } else {
                                            selectedOption = [];
                                        }
                                    } else {
                                        // Handle single selection
                                        selectedOption = currentValue
                                            ? typeof currentValue === "object"
                                                ? currentValue
                                                : safeOptions.find(
                                                      (option) =>
                                                          option.value ===
                                                          currentValue
                                                  )
                                            : null;
                                    }
                                } catch (error) {
                                    selectedOption = isMultiple ? [] : null;
                                }

                                // Custom styles for the lookup select
                                const customStyles = {
                                    control: (provided: any, state: any) => ({
                                        ...provided,
                                        minHeight: "40px",
                                        border: state.isFocused
                                            ? "2px solid #3b82f6"
                                            : "1px solid #d1d5db",
                                        borderRadius: "6px",
                                        boxShadow: state.isFocused
                                            ? "0 0 0 1px #3b82f6"
                                            : "none",
                                        "&:hover": {
                                            border: "1px solid #9ca3af",
                                        },
                                    }),
                                    option: (provided: any, state: any) => ({
                                        ...provided,
                                        backgroundColor: state.isSelected
                                            ? "#3b82f6"
                                            : state.isFocused
                                            ? "#f3f4f6"
                                            : "white",
                                        color: state.isSelected
                                            ? "white"
                                            : "#374151",
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: state.isSelected
                                                ? "#2563eb"
                                                : "#f3f4f6",
                                        },
                                    }),
                                    singleValue: (provided: any) => ({
                                        ...provided,
                                        color: "#374151",
                                    }),
                                    placeholder: (provided: any) => ({
                                        ...provided,
                                        color: "#9ca3af",
                                    }),
                                    loadingMessage: (provided: any) => ({
                                        ...provided,
                                        color: "#6b7280",
                                        fontStyle: "italic",
                                    }),
                                    noOptionsMessage: (provided: any) => ({
                                        ...provided,
                                        color: "#6b7280",
                                        fontStyle: "italic",
                                    }),
                                    menuPortal: (base: any) => ({
                                        ...base,
                                        zIndex: 9999,
                                    }),
                                };

                                // Don't return early - let the component render but conditionally show content
                                // This maintains hook consistency

                                // Conditionally render the field content based on isFieldHidden
                                if (isFieldHidden) {
                                    return <div style={{ display: "none" }}></div>;
                                }

                                return (
                                    <div>
                                        <Label className='text-primary font-semibold'>
                                            {field.label}
                                            {isFieldRequired && (
                                                <span className='pl-2 text-red-600'>
                                                    *
                                                </span>
                                            )}
                                        </Label>

                                        <div className='space-y-2'>
                                            {(() => {
                                                try {
                                                    // Get dynamic properties from field configuration
                                                    const isSearchable =
                                                        field.searchable !==
                                                        undefined
                                                            ? field.searchable
                                                            : true;
                                                    const isClearable =
                                                        field.clearable !==
                                                        undefined
                                                            ? field.clearable
                                                            : true;
                                                    const isMultiple =
                                                        field.multiple !==
                                                        undefined
                                                            ? field.multiple
                                                            : false;

                                                    return (
                                                        <ReactSelect
                                                            menuPortalTarget={
                                                                typeof window !==
                                                                "undefined"
                                                                    ? document.body
                                                                    : undefined
                                                            }
                                                            menuShouldScrollIntoView={
                                                                false
                                                            }
                                                            value={
                                                                selectedOption
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            options={
                                                                safeOptions
                                                            }
                                                            onInputChange={
                                                                handleInputChange
                                                            }
                                                            inputValue={
                                                                safeInputValue
                                                            }
                                                            isLoading={
                                                                isLoading
                                                            }
                                                            isSearchable={
                                                                isSearchable
                                                            }
                                                            isClearable={
                                                                isClearable
                                                            }
                                                            isMulti={isMultiple}
                                                            placeholder={
                                                                dynamicPlaceholder ||
                                                                `Search ${field.label.toLowerCase()}...`
                                                            }
                                                            styles={
                                                                customStyles
                                                            }
                                                            className='react-select-container'
                                                            classNamePrefix='react-select'
                                                            noOptionsMessage={() =>
                                                                isLoading
                                                                    ? "Loading..."
                                                                    : minSearchLengthForLogic >
                                                                          0 &&
                                                                      safeInputValue.length <
                                                                          minSearchLengthForLogic
                                                                    ? `Type at least ${minSearchLengthForLogic} characters to search`
                                                                    : "No options found"
                                                            }
                                                            loadingMessage={() =>
                                                                "Loading options..."
                                                            }
                                                            isDisabled={
                                                                isFieldDisabled ||
                                                                false
                                                            }
                                                            menuPlacement='auto'
                                                            closeMenuOnSelect={
                                                                true
                                                            }
                                                            blurInputOnSelect={
                                                                true
                                                            }
                                                            filterOption={() =>
                                                                true
                                                            } // Disable client-side filtering since we're using server-side search
                                                            // Enhanced features
                                                            formatOptionLabel={(
                                                                option: any,
                                                                { context }: any
                                                            ) => {
                                                                try {
                                                                    if (
                                                                        context ===
                                                                        "menu"
                                                                    ) {
                                                                        return (
                                                                            <div className='flex items-center space-x-2'>
                                                                                <span className='font-medium'>
                                                                                    {option?.label ||
                                                                                        "Unknown"}
                                                                                </span>
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return (
                                                                        option?.label ||
                                                                        "Unknown"
                                                                    );
                                                                } catch (error) {
                                                                    console.error(
                                                                        "Error in formatOptionLabel:",
                                                                        error
                                                                    );
                                                                    return "Unknown";
                                                                }
                                                            }}
                                                        />
                                                    );
                                                } catch (error) {
                                                    console.error(
                                                        "Error rendering ReactSelect:",
                                                        error
                                                    );
                                                    return (
                                                        <div className='p-4 border border-red-200 rounded bg-red-50 text-red-600'>
                                                            Error rendering
                                                            dropdown. Please
                                                            refresh the page.
                                                        </div>
                                                    );
                                                }
                                            })()}

                                            {/* Error display */}
                                            {error && (
                                                <div className='text-red-500 text-sm'>
                                                    {error}
                                                </div>
                                            )}

                                            {/* Description */}
                                            {dynamicDescription &&
                                                dynamicDescription.trim() !==
                                                    "" && (
                                                    <p className='text-[#7D7D7D] text-sm mt-1'>
                                                        {dynamicDescription}
                                                    </p>
                                                )}

                                            {/* Formik validation errors */}
                                            <ErrorMessage
                                                name={field.key}
                                                component='div'
                                                className='text-red-500 text-sm'
                                            />
                                        </div>
                                    </div>
                                );
                            } catch (error) {
                                console.error("Error in lookup case:", error);
                                return (
                                    <div className='text-red-500 text-sm p-4 border border-red-200 rounded bg-red-50'>
                                        <strong>Error:</strong> Failed to render
                                        lookup field "{field.label}". Please
                                        refresh the page or contact support.
                                        <br />
                                        <small>
                                            Error details:{" "}
                                            {error instanceof Error
                                                ? error.message
                                                : "Unknown error"}
                                        </small>
                                    </div>
                                );
                            }
                        }}
                    </Field>
                );
            case "digitalSignature":
                return (
                    <Field name={field.key}>
                        {({ field: formikField, form }: any) => {
                            const canvasRef =
                                React.useRef<HTMLCanvasElement>(null);
                            const [isDrawing, setIsDrawing] =
                                React.useState(false);
                            const [hasSignature, setHasSignature] =
                                React.useState(false);
                            const [context, setContext] =
                                React.useState<CanvasRenderingContext2D | null>(
                                    null
                                );

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

                            // Digital signature configuration with defaults
                            const config = field.digitalSignatureConfig || {};
                            const canvasWidth = config.canvasWidth || 400;
                            const canvasHeight = config.canvasHeight || 200;
                            const penColor = config.penColor || "#000000";
                            const penWidth = config.penWidth || 2;
                            const backgroundColor =
                                config.backgroundColor || "#ffffff";
                            const showClearButton =
                                config.showClearButton !== false; // Default to true
                            const showSaveButton =
                                config.showSaveButton !== false; // Default to true;
                            const placeholder =
                                config.placeholder ||
                                "Click and drag to sign here";

                            // Don't return early - let the component render but conditionally show content
                            // This maintains hook consistency

                            // Initialize canvas context
                            React.useEffect(() => {
                                if (canvasRef.current) {
                                    const canvas = canvasRef.current;
                                    const ctx = canvas.getContext("2d");
                                    if (ctx) {
                                        ctx.strokeStyle = penColor;
                                        ctx.lineWidth = penWidth;
                                        ctx.lineCap = "round";
                                        ctx.lineJoin = "round";
                                        setContext(ctx);
                                    }
                                }
                            }, [penColor, penWidth]);

                            // Check if there's an existing signature value
                            React.useEffect(() => {
                                if (form.values[field.key]) {
                                    setHasSignature(true);
                                    // Load existing signature if it's a data URL
                                    if (
                                        typeof form.values[field.key] ===
                                            "string" &&
                                        form.values[field.key].startsWith(
                                            "data:"
                                        )
                                    ) {
                                        loadSignature(form.values[field.key]);
                                    }
                                }
                            }, [form.values[field.key], field.key]);

                            const loadSignature = (dataUrl: string) => {
                                if (canvasRef.current && context) {
                                    const img = new Image();
                                    img.onload = () => {
                                        if (canvasRef.current && context) {
                                            context.clearRect(
                                                0,
                                                0,
                                                canvasWidth,
                                                canvasHeight
                                            );
                                            context.drawImage(
                                                img,
                                                0,
                                                0,
                                                canvasWidth,
                                                canvasHeight
                                            );
                                        }
                                    };
                                    img.src = dataUrl;
                                }
                            };

                            const startDrawing = (
                                e:
                                    | React.MouseEvent<HTMLCanvasElement>
                                    | React.TouchEvent<HTMLCanvasElement>
                            ) => {
                                if (isFieldDisabled) return;

                                setIsDrawing(true);
                                const rect =
                                    canvasRef.current?.getBoundingClientRect();
                                if (rect && context) {
                                    const x = (e as any).clientX - rect.left;
                                    const y = (e as any).clientY - rect.top;
                                    context.beginPath();
                                    context.moveTo(x, y);
                                }
                            };

                            const draw = (
                                e:
                                    | React.MouseEvent<HTMLCanvasElement>
                                    | React.TouchEvent<HTMLCanvasElement>
                            ) => {
                                if (!isDrawing || isFieldDisabled) return;

                                const rect =
                                    canvasRef.current?.getBoundingClientRect();
                                if (rect && context) {
                                    const x = (e as any).clientX - rect.left;
                                    const y = (e as any).clientY - rect.top;
                                    context.lineTo(x, y);
                                    context.stroke();
                                }
                            };

                            const stopDrawing = () => {
                                setIsDrawing(false);
                                if (context) {
                                    setHasSignature(true);
                                }
                            };

                            const clearSignature = () => {
                                if (canvasRef.current && context) {
                                    context.clearRect(
                                        0,
                                        0,
                                        canvasWidth,
                                        canvasHeight
                                    );
                                    setHasSignature(false);
                                    form.setFieldValue(field.key, "");
                                    dispatch(
                                        updateField({
                                            key: field.key,
                                            value: "",
                                        })
                                    );
                                }
                            };

                            const saveSignature = () => {
                                if (canvasRef.current && hasSignature) {
                                    const dataUrl =
                                        canvasRef.current.toDataURL(
                                            "image/png"
                                        );

                                    // Create a custom display value for the live preview
                                    const displayValue = {
                                        _signatureData: dataUrl, // Store actual signature data
                                        _displayText: `✓ ${field.label} captured`, // User-friendly display text
                                        _timestamp: new Date().toISOString(),
                                        _fieldType: "digitalSignature",
                                    };

                                    form.setFieldValue(field.key, displayValue);
                                    dispatch(
                                        updateField({
                                            key: field.key,
                                            value: displayValue,
                                        })
                                    );
                                }
                            };

                            // Handle touch events for mobile devices
                            const handleTouchStart = (
                                e: React.TouchEvent<HTMLCanvasElement>
                            ) => {
                                e.preventDefault();
                                const touch = e.touches[0];
                                const mouseEvent = new MouseEvent("mousedown", {
                                    clientX: touch.clientX,
                                    clientY: touch.clientY,
                                });
                                startDrawing(mouseEvent as any);
                            };

                            const handleTouchMove = (
                                e: React.TouchEvent<HTMLCanvasElement>
                            ) => {
                                e.preventDefault();
                                const touch = e.touches[0];
                                const mouseEvent = new MouseEvent("mousemove", {
                                    clientX: touch.clientX,
                                    clientY: touch.clientY,
                                });
                                draw(mouseEvent as any);
                            };

                            const handleTouchEnd = (
                                e: React.TouchEvent<HTMLCanvasElement>
                            ) => {
                                e.preventDefault();
                                stopDrawing();
                            };

                            // Conditionally render the field content based on isFieldHidden
                            if (isFieldHidden) {
                                return <div style={{ display: "none" }}></div>;
                            }

                            return (
                                <div>
                                    <Label className='text-primary font-semibold'>
                                        {field.label}
                                        {isFieldRequired && (
                                            <span className='pl-2 text-red-600'>
                                                *
                                            </span>
                                        )}
                                    </Label>

                                    <div className='space-y-3'>
                                        {/* Signature Canvas */}
                                        <div className='border-2 border-gray-300 rounded-lg overflow-hidden relative'>
                                            <canvas
                                                ref={canvasRef}
                                                width={canvasWidth}
                                                height={canvasHeight}
                                                className='cursor-crosshair bg-white'
                                                style={{ backgroundColor }}
                                                onMouseDown={startDrawing}
                                                onMouseMove={draw}
                                                onMouseUp={stopDrawing}
                                                onMouseLeave={stopDrawing}
                                                onTouchStart={handleTouchStart}
                                                onTouchMove={handleTouchMove}
                                                onTouchEnd={handleTouchEnd}
                                            />

                                            {/* Placeholder text when no signature */}
                                            {!hasSignature && (
                                                <div className='absolute inset-0 flex items-center justify-center pointer-events-none bg-gray-50/50'>
                                                    <span className='text-gray-400 text-sm font-medium px-4 py-2 bg-white/80 rounded-lg border border-gray-200 shadow-sm'>
                                                        {placeholder}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className='flex gap-2'>
                                            {showClearButton && (
                                                <Button
                                                    type='button'
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={clearSignature}
                                                    disabled={isFieldDisabled}
                                                    className='text-red-600 hover:text-red-700'
                                                >
                                                    Clear Signature
                                                </Button>
                                            )}

                                            {showSaveButton && hasSignature && (
                                                <Button
                                                    type='button'
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={saveSignature}
                                                    disabled={isFieldDisabled}
                                                    className='text-blue-600 hover:text-blue-700'
                                                >
                                                    Save Signature
                                                </Button>
                                            )}
                                        </div>

                                        {/* Signature Status */}
                                        <div className='text-sm'>
                                            {hasSignature ? (
                                                <span className='text-green-600'>
                                                    ✓ Signature captured
                                                </span>
                                            ) : (
                                                <span className='text-gray-500'>
                                                    No signature yet
                                                </span>
                                            )}
                                        </div>

                                        {/* Dynamic description */}
                                        {dynamicDescription &&
                                            dynamicDescription.trim() !==
                                                "" && (
                                                <p className='text-[#7D7D7D] text-sm mt-1'>
                                                    {dynamicDescription}
                                                </p>
                                            )}

                                        {/* Formik validation errors */}
                                        <ErrorMessage
                                            name={field.key}
                                            component='div'
                                            className='text-red-500 text-sm'
                                        />
                                    </div>
                                </div>
                            );
                        }}
                    </Field>
                );

            case "inputSearch":
                return (
                    <Field name={field.key}>
                        {({ field: formikField, form }: any) => {
                            const [options, setOptions] = React.useState<any[]>(
                                []
                            );
                            const [isLoading, setIsLoading] =
                                React.useState(false);
                            const [inputValue, setInputValue] =
                                React.useState("");
                            const [isOpen, setIsOpen] = React.useState(false);
                            const [error, setError] = React.useState<
                                string | null
                            >(null);
                            const timeoutRef =
                                React.useRef<NodeJS.Timeout | null>(null);
                            const dropdownRef =
                                React.useRef<HTMLDivElement>(null);

                            // Get inputSearch configuration
                            const inputSearchConfig = field.inputSearchConfig;
                            const {
                                isExternal = true,
                                baseUrl,
                                apiEndpoint,
                                method = "GET",
                                searchKey = "search",
                                searchFormat = "query", // Default to query parameter format
                                valueKey = "id",
                                labelKey = "name",
                                minSearchLength = 3,
                                debounceMs = 300,
                                cacheResults = true,
                                placeholder,
                                noOptionsMessage = "No options found",
                                loadingMessage = "Loading...",
                                transformResponse,
                                transformRequest,
                            } = inputSearchConfig || {};

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

                            // Don't return early - let the component render but conditionally show content
                            // This maintains hook consistency

                            // Validate required configuration
                            if (!apiEndpoint || !valueKey || !labelKey) {
                                return (
                                    <div className='text-red-500 text-sm p-4 border border-red-200 rounded bg-red-50'>
                                        <strong>Configuration Error:</strong>{" "}
                                        InputSearch field "{field.label}" is
                                        missing required configuration. Please
                                        provide apiEndpoint, valueKey, and
                                        labelKey in inputSearchConfig.
                                    </div>
                                );
                            }

                            // Cache for storing API results
                            const cacheRef = React.useRef(new Map());
                            const cache = cacheRef.current;

                            // Debounced search function
                            const debouncedSearch = React.useCallback(
                                (searchTerm: string) => {
                                    if (timeoutRef.current) {
                                        clearTimeout(timeoutRef.current);
                                    }
                                    timeoutRef.current = setTimeout(
                                        async () => {
                                            if (
                                                searchTerm.length <
                                                minSearchLength
                                            ) {
                                                setOptions([]);
                                                return;
                                            }

                                            try {
                                                setIsLoading(true);
                                                setError(null);

                                                // Check cache first if caching is enabled
                                                const cacheKey = `${apiEndpoint}_${searchTerm}_${
                                                    JSON.stringify(
                                                        dependentValues
                                                    ) || "none"
                                                }`;
                                                if (
                                                    cacheResults &&
                                                    cache.has(cacheKey)
                                                ) {
                                                    const cachedData =
                                                        cache.get(cacheKey);
                                                    if (cachedData) {
                                                        setOptions(cachedData);
                                                        setIsLoading(false);
                                                        return;
                                                    }
                                                }

                                                // Prepare request parameters based on search format
                                                let requestParams: Record<string, any> = {};
                                                
                                                // Add search term based on format
                                                if (searchFormat === "path") {
                                                    // For path format, don't add search term to query params
                                                    // It will be inserted into the URL path later
                                                } else {
                                                    // Default query format - add search term as query parameter
                                                    requestParams[searchKey] = searchTerm;
                                                }

                                                // Add additional query parameters from config if provided
                                                if (
                                                    inputSearchConfig?.additionalParams
                                                ) {
                                                    requestParams = {
                                                        ...requestParams,
                                                        ...inputSearchConfig.additionalParams,
                                                    };
                                                }

                                                // Add dependent values to request if transformRequest is provided
                                                let modifiedEndpoint =
                                                    isExternal
                                                        ? `${baseUrl || process.env.NEXT_PUBLIC_CRRSA_BACKEND_API_URL}${apiEndpoint}`
                                                        : `/api/${apiEndpoint}`;

                                                if (
                                                    transformRequest &&
                                                    dependentValues
                                                ) {
                                                    const transformedRequest =
                                                        transformRequest(
                                                            {
                                                                ...requestParams,
                                                                url: modifiedEndpoint,
                                                            },
                                                            dependentValues
                                                        );

                                                    if (
                                                        transformedRequest.url
                                                    ) {
                                                        modifiedEndpoint =
                                                            transformedRequest.url;
                                                    }
                                                    if (
                                                        transformedRequest.params
                                                    ) {
                                                        requestParams =
                                                            transformedRequest.params;
                                                    } else if (
                                                        transformedRequest.search
                                                    ) {
                                                        requestParams =
                                                            transformedRequest.search;
                                                    } else if (
                                                        transformedRequest.body
                                                    ) {
                                                        requestParams =
                                                            transformedRequest.body;
                                                    } else {
                                                        const {
                                                            url,
                                                            ...params
                                                        } = transformedRequest;
                                                        requestParams = params;
                                                    }
                                                }

                                                // For GET requests, append query parameters to URL
                                                if (method === "GET") {
                                                    try {
                                                        // For external APIs, we need to construct the full URL
                                                        if (isExternal) {
                                                            // Start with the base URL (use custom baseUrl if provided, otherwise fall back to environment variable)
                                                            let effectiveBaseUrl =
                                                                baseUrl ||
                                                                process.env
                                                                    .NEXT_PUBLIC_CRRSA_BACKEND_API_URL ||
                                                                "";
                                                            // Remove trailing slash if present
                                                            if (
                                                                effectiveBaseUrl.endsWith(
                                                                    "/"
                                                                )
                                                            ) {
                                                                effectiveBaseUrl =
                                                                    effectiveBaseUrl.slice(
                                                                        0,
                                                                        -1
                                                                    );
                                                            }
                                                            // Remove leading slash from apiEndpoint if present
                                                            let cleanEndpoint =
                                                                apiEndpoint;
                                                            if (
                                                                cleanEndpoint.startsWith(
                                                                    "/"
                                                                )
                                                            ) {
                                                                cleanEndpoint =
                                                                    cleanEndpoint.slice(
                                                                        1
                                                                    );
                                                            }

                                                            // Handle path format search - insert search term into the endpoint
                                                            if (searchFormat === "path") {
                                                                // Replace any placeholder in the endpoint with the search term
                                                                // Common patterns: /{search}, /{id}, /{term}, etc.
                                                                const searchPlaceholders = [
                                                                    "{search}",
                                                                    "{id}",
                                                                    "{term}",
                                                                    "{query}",
                                                                    "{value}"
                                                                ];
                                                
                                                                for (const placeholder of searchPlaceholders) {
                                                                    if (cleanEndpoint.includes(placeholder)) {
                                                                        cleanEndpoint = cleanEndpoint.replace(placeholder, encodeURIComponent(searchTerm));
                                                                        break;
                                                                    }
                                                                }
                                                                
                                                                // If no placeholder found, append the search term to the endpoint
                                                                if (!searchPlaceholders.some(p => cleanEndpoint.includes(p))) {
                                                                    // Remove trailing slash if present
                                                                    if (cleanEndpoint.endsWith("/")) {
                                                                        cleanEndpoint = cleanEndpoint.slice(0, -1);
                                                                    }
                                                                    cleanEndpoint = `${cleanEndpoint}/${encodeURIComponent(searchTerm)}`;
                                                                }
                                                            }

                                                            // Construct the full URL
                                                            let fullUrl = `${effectiveBaseUrl}/${cleanEndpoint}`;

                                                            // Add query parameters
                                                            const queryParams =
                                                                Object.entries(
                                                                    requestParams
                                                                )
                                                                    .filter(
                                                                        ([
                                                                            _,
                                                                            value,
                                                                        ]) =>
                                                                            value !==
                                                                                undefined &&
                                                                            value !==
                                                                                null &&
                                                                            value !==
                                                                                ""
                                                                    )
                                                                    .map(
                                                                        ([
                                                                            key,
                                                                            value,
                                                                        ]) =>
                                                                            `${key}=${encodeURIComponent(
                                                                                String(
                                                                                    value
                                                                                )
                                                                            )}`
                                                                    )
                                                                    .join("&");

                                                            if (queryParams) {
                                                                const separator =
                                                                    fullUrl.includes(
                                                                        "?"
                                                                    )
                                                                        ? "&"
                                                                        : "?";
                                                                fullUrl = `${fullUrl}${separator}${queryParams}`;
                                                            }

                                                            modifiedEndpoint =
                                                                fullUrl;
                                                        } else {
                                                            // For local API routes, handle both query and path formats
                                                            if (searchFormat === "path") {
                                                                // Handle path format for local API routes
                                                                let localEndpoint = apiEndpoint;
                                                                
                                                                // Replace any placeholder in the endpoint with the search term
                                                                const searchPlaceholders = [
                                                                    "{search}",
                                                                    "{id}",
                                                                    "{term}",
                                                                    "{query}",
                                                                    "{value}"
                                                                ];
                                                
                                                                for (const placeholder of searchPlaceholders) {
                                                                    if (localEndpoint.includes(placeholder)) {
                                                                        localEndpoint = localEndpoint.replace(placeholder, encodeURIComponent(searchTerm));
                                                                        break;
                                                                    }
                                                                }
                                                                
                                                                // If no placeholder found, append the search term to the endpoint
                                                                if (!searchPlaceholders.some(p => localEndpoint.includes(p))) {
                                                                    // Remove trailing slash if present
                                                                    if (localEndpoint.endsWith("/")) {
                                                                        localEndpoint = localEndpoint.slice(0, -1);
                                                                    }
                                                                    localEndpoint = `${localEndpoint}/${encodeURIComponent(searchTerm)}`;
                                                                }
                                                                
                                                                modifiedEndpoint = `/api/${localEndpoint}`;
                                                            } else {
                                                                // Default query format - append query parameters
                                                                const queryParams =
                                                                    Object.entries(
                                                                        requestParams
                                                                    )
                                                                        .filter(
                                                                            ([
                                                                                _,
                                                                                value,
                                                                            ]) =>
                                                                                value !==
                                                                                    undefined &&
                                                                                value !==
                                                                                null &&
                                                                                value !==
                                                                                ""
                                                                        )
                                                                        .map(
                                                                            ([
                                                                                key,
                                                                                value,
                                                                            ]) =>
                                                                                `${key}=${encodeURIComponent(
                                                                                    String(
                                                                                        value
                                                                                    )
                                                                                )}`
                                                                        )
                                                                        .join("&");

                                                                if (queryParams) {
                                                                    const separator =
                                                                        modifiedEndpoint.includes(
                                                                            "?"
                                                                        )
                                                                            ? "&"
                                                                        : "?";
                                                                    modifiedEndpoint = `${modifiedEndpoint}${separator}${queryParams}`;
                                                                }
                                                            }
                                                        }
                                                    } catch (error) {
                                                        console.error(
                                                            "Error constructing URL:",
                                                            error
                                                        );
                                                        // Fallback: manually construct query string
                                                        const queryParams =
                                                            Object.entries(
                                                                requestParams
                                                            )
                                                                .filter(
                                                                    ([
                                                                        _,
                                                                        value,
                                                                    ]) =>
                                                                        value !==
                                                                            undefined &&
                                                                        value !==
                                                                            null &&
                                                                        value !==
                                                                            ""
                                                                )
                                                                .map(
                                                                    ([
                                                                        key,
                                                                        value,
                                                                    ]) =>
                                                                        `${key}=${encodeURIComponent(
                                                                            String(
                                                                                value
                                                                            )
                                                                        )}`
                                                                )
                                                                .join("&");

                                                        if (queryParams) {
                                                            const separator =
                                                                modifiedEndpoint.includes(
                                                                    "?"
                                                                )
                                                                    ? "&"
                                                                    : "?";
                                                            modifiedEndpoint = `${modifiedEndpoint}${separator}${queryParams}`;
                                                        }
                                                    }
                                                }

                                                // Make API request
                                                const response = await fetch(
                                                    modifiedEndpoint,
                                                    {
                                                        method: method,
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                        },
                                                        body:
                                                            method === "POST"
                                                                ? JSON.stringify(
                                                                      requestParams
                                                                  )
                                                                : undefined,
                                                    }
                                                );

                                                if (!response.ok) {
                                                    throw new Error(
                                                        `API request failed: ${response.status}`
                                                    );
                                                }

                                                const data =
                                                    await response.json();

                                                // Transform response if custom transformer is provided
                                                let transformedOptions = data;
                                                if (transformResponse) {
                                                    transformedOptions =
                                                        transformResponse(data);
                                                } else {
                                                    // Default transformation
                                                    transformedOptions =
                                                        data.map(
                                                            (item: any) => ({
                                                                value: item[
                                                                    valueKey
                                                                ],
                                                                label: item[
                                                                    labelKey
                                                                ],
                                                                ...item, // Include all original properties
                                                            })
                                                        );
                                                }

                                                setOptions(transformedOptions);

                                                // Cache results if enabled
                                                if (cacheResults) {
                                                    cache.set(
                                                        cacheKey,
                                                        transformedOptions
                                                    );
                                                }
                                            } catch (error) {
                                                console.error(
                                                    "Search error:",
                                                    error
                                                );
                                                setError(
                                                    error instanceof Error
                                                        ? error.message
                                                        : "Search failed"
                                                );
                                                setOptions([]);
                                            } finally {
                                                setIsLoading(false);
                                            }
                                        },
                                        debounceMs
                                    );
                                },
                                [
                                    apiEndpoint,
                                    valueKey,
                                    labelKey,
                                    searchKey,
                                    debounceMs,
                                    minSearchLength,
                                    cacheResults,
                                    dependentValues,
                                    transformRequest,
                                    transformResponse,
                                ]
                            );

                            // Handle input change
                            const handleInputChange = (
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const newValue = e.target.value;
                                setInputValue(newValue);
                                formikField.onChange(e);

                                if (newValue.length >= minSearchLength) {
                                    debouncedSearch(newValue);
                                    setIsOpen(true);
                                } else {
                                    setOptions([]);
                                    setIsOpen(false);
                                }
                            };

                            // Handle option selection
                            const handleOptionSelect = (option: any) => {
                                const inputEvent = {
                                    target: {
                                        name: field.key,
                                        value: option[labelKey],
                                    },
                                } as React.ChangeEvent<HTMLInputElement>;
                                formikField.onChange(inputEvent);
                                setInputValue(option[labelKey]);
                                setIsOpen(false);

                                // Store the full selected object as the field value
                                form.setFieldValue(field.key, option);
                                dispatch(
                                    updateField({
                                        key: field.key,
                                        value: option,
                                    })
                                );
                            };

                            // Handle input focus
                            const handleInputFocus = () => {
                                if (inputValue.length >= minSearchLength) {
                                    setIsOpen(true);
                                }
                            };

                            // Handle input blur
                            const handleInputBlur = () => {
                                // Delay closing to allow option selection
                                setTimeout(() => setIsOpen(false), 200);
                            };

                            // Close dropdown when clicking outside
                            React.useEffect(() => {
                                const handleClickOutside = (
                                    event: MouseEvent
                                ) => {
                                    if (
                                        dropdownRef.current &&
                                        !dropdownRef.current.contains(
                                            event.target as Node
                                        )
                                    ) {
                                        setIsOpen(false);
                                    }
                                };

                                document.addEventListener(
                                    "mousedown",
                                    handleClickOutside
                                );
                                return () => {
                                    document.removeEventListener(
                                        "mousedown",
                                        handleClickOutside
                                    );
                                };
                            }, []);

                            // Conditionally render the field content based on isFieldHidden
                            if (isFieldHidden) {
                                return <div style={{ display: "none" }}></div>;
                            }

                            return (
                                <div className='relative' ref={dropdownRef}>
                                    <Label className='text-primary font-semibold'>
                                        {field.label}
                                        {isFieldRequired && (
                                            <span className='pl-2 text-red-600'>
                                                *
                                            </span>
                                        )}
                                    </Label>

                                    <div className='space-y-2'>
                                        <Input
                                            {...formikField}
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
                                            onBlur={handleInputBlur}
                                            placeholder={
                                                placeholder ||
                                                `Enter at least ${minSearchLength} characters to search...`
                                            }
                                            disabled={isFieldDisabled}
                                            className='w-full'
                                        />

                                        {/* Dropdown Options */}
                                        {isOpen && (
                                            <div className='absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto'>
                                                {isLoading ? (
                                                    <div className='px-4 py-2 text-sm text-gray-500'>
                                                        {loadingMessage}
                                                    </div>
                                                ) : options.length > 0 ? (
                                                    options.map(
                                                        (option, index) => (
                                                            <div
                                                                key={index}
                                                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
                                                                onClick={() =>
                                                                    handleOptionSelect(
                                                                        option
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    option[
                                                                        labelKey
                                                                    ]
                                                                }
                                                            </div>
                                                        )
                                                    )
                                                ) : inputValue.length >=
                                                  minSearchLength ? (
                                                    <div className='px-4 py-2 text-sm text-gray-500'>
                                                        {noOptionsMessage}
                                                    </div>
                                                ) : null}
                                            </div>
                                        )}

                                        {/* Error message */}
                                        {error && (
                                            <p className='text-sm text-red-600'>
                                                {error}
                                            </p>
                                        )}

                                        {/* Dynamic description */}
                                        {dynamicDescription &&
                                            dynamicDescription.trim() !==
                                                "" && (
                                                <p className='text-[#7D7D7D] text-sm mt-1'>
                                                    {dynamicDescription}
                                                </p>
                                            )}

                                        {/* Formik validation errors */}
                                        <ErrorMessage
                                            name={field.key}
                                            component='div'
                                            className='text-red-500 text-sm'
                                        />
                                    </div>
                                </div>
                            );
                        }}
                    </Field>
                );
            case "formArray":
                if (!field.formArrayConfig) {
                    console.warn(
                        "FormArray field missing formArrayConfig:",
                        field
                    );
                    return null;
                }
                return (
                    <FormArrayField
                        field={field}
                        formArrayConfig={field.formArrayConfig}
                    />
                );

            default:
                return null;
        }
    };

    // Return the field wrapped with grid classes
    // For formArray fields, always use full width to avoid layout issues
    const shouldUseFullWidth = field.type === "formArray";

    return (
        <div
            className={
                shouldUseFullWidth
                    ? "col-span-12 w-full"
                    : getGridClasses(field)
            }
        >
            {renderFieldContent()}
        </div>
    );
};
