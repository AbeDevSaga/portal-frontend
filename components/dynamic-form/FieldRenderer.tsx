"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";
import { FieldConfig, FileMetadata } from "@/types/formType";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { updateField } from "@/redux/feature/birthSlice";
import ReactSelect from "react-select";
import { mockApiService, MockApiResponse } from "@/utils/mockApiService";

interface Props {
    field: FieldConfig;
}

export const FieldRenderer: React.FC<Props> = ({ field }) => {
    const t = useTranslations();
    const dispatch = useDispatch();

    switch (field.type) {
        case "input":
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
                                        <span className='text-red-600'>*</span>
                                    ) : null}
                                </Label>
                                <Input
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
                                        form.setFieldValue(field.key, value);
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
                                        <span className='text-red-600'>*</span>
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
                                        {show ? "Hide" : "Show"}
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
                                        <span className='text-red-600'>*</span>
                                    ) : null}
                                </Label>
                                <Textarea
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
                                        form.setFieldValue(field.key, value);
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
        case "radio":
            return (
                <div className='space-y-1'>
                    <Label className='text-primary font-semibold'>
                        {field.label}
                        {field.required ? (
                            <span className='text-red-600'>*</span>
                        ) : null}
                    </Label>
                    <Field name={field.key}>
                        {({ field: formikField, form }: any) => (
                            <RadioGroup
                                value={formikField.value || ""}
                                onValueChange={(value) => {
                                    form.setFieldValue(field.key, value);
                                    dispatch(
                                        updateField({ key: field.key, value })
                                    );
                                }}
                                className='flex space-x-4'
                            >
                                {field.options?.map((opt) => (
                                    <Label
                                        key={opt.value}
                                        className='flex items-center space-x-2'
                                    >
                                        <RadioGroupItem value={opt.value} />
                                        <span>{opt.label}</span>
                                        {field.required && (
                                            <span className='text-red-600'>
                                                *
                                            </span>
                                        )}
                                    </Label>
                                ))}
                            </RadioGroup>
                        )}
                    </Field>
                    {field.description && field.description.trim() !== "" && (
                        <p className='text-[#7D7D7D] text-sm mt-1'>
                            {field.description}
                        </p>
                    )}
                    <ErrorMessage
                        name={field.key}
                        component='div'
                        className='text-red-500 text-sm'
                    />
                </div>
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
                                        <span className='text-red-600'>*</span>
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
                                        {field.description || "Check this box"}
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
                                        <span className='text-red-600'>*</span>
                                    ) : null}
                                </Label>
                                <Input
                                    {...formikField}
                                    type='number'
                                    placeholder={dynamicPlaceholder}
                                    disabled={isFieldDisabled}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Convert to number if possible, otherwise keep as string for validation
                                        const numericValue =
                                            value === "" ? "" : Number(value);

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

                        // Enhanced select configuration
                        const isMulti = field.multiple || false;
                        const isSearchable = field.searchable !== false; // Default to true
                        const isClearable = field.clearable !== false; // Default to true
                        const placeholder =
                            dynamicPlaceholder ||
                            (isMulti
                                ? "Select options..."
                                : "Select an option...");

                        // Convert options to react-select format
                        const selectOptions =
                            field.options?.map((opt) => ({
                                value: opt.value,
                                label: opt.label,
                                isDisabled: opt.disabled || false,
                                data: opt.data || {}, // Additional data for custom rendering
                            })) || [];

                        // Handle current value(s)
                        const currentValue = form.values[field.key];
                        let selectedOptions;

                        if (isMulti) {
                            // For multi-select, ensure we have an array
                            const values = Array.isArray(currentValue)
                                ? currentValue
                                : currentValue
                                ? [currentValue]
                                : [];
                            selectedOptions = selectOptions.filter((option) =>
                                values.includes(option.value)
                            );
                        } else {
                            // For single select
                            selectedOptions = currentValue
                                ? selectOptions.find(
                                      (option) => option.value === currentValue
                                  ) || null
                                : null;
                        }

                        // Custom styles for better integration with your design system
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
                                color: state.isSelected ? "white" : "#374151",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: state.isSelected
                                        ? "#2563eb"
                                        : "#f3f4f6",
                                },
                            }),
                            multiValue: (provided: any) => ({
                                ...provided,
                                backgroundColor: "#e5e7eb",
                                borderRadius: "4px",
                            }),
                            multiValueLabel: (provided: any) => ({
                                ...provided,
                                color: "#374151",
                                fontWeight: "500",
                            }),
                            multiValueRemove: (provided: any) => ({
                                ...provided,
                                color: "#6b7280",
                                "&:hover": {
                                    backgroundColor: "#d1d5db",
                                    color: "#374151",
                                },
                            }),
                            placeholder: (provided: any) => ({
                                ...provided,
                                color: "#9ca3af",
                            }),
                            singleValue: (provided: any) => ({
                                ...provided,
                                color: "#374151",
                            }),
                            menuPortal: (base: any) => ({
                                ...base,
                                zIndex: 9999,
                            }),
                        };

                        const handleChange = (selectedOption: any) => {
                            if (isMulti) {
                                // For multi-select, extract values array
                                const values = selectedOption
                                    ? selectedOption.map(
                                          (option: any) => option.value
                                      )
                                    : [];
                                form.setFieldValue(field.key, values);
                                dispatch(
                                    updateField({
                                        key: field.key,
                                        value: values,
                                    })
                                );
                            } else {
                                // For single select
                                const value = selectedOption
                                    ? selectedOption.value
                                    : null;
                                form.setFieldValue(field.key, value);
                                dispatch(
                                    updateField({ key: field.key, value })
                                );
                            }
                        };

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
                                    <ReactSelect
                                        value={selectedOptions}
                                        onChange={handleChange}
                                        options={selectOptions}
                                        isMulti={isMulti}
                                        isSearchable={isSearchable}
                                        isClearable={isClearable}
                                        placeholder={placeholder}
                                        styles={customStyles}
                                        className='react-select-container'
                                        classNamePrefix='react-select'
                                        noOptionsMessage={() =>
                                            "No options available"
                                        }
                                        loadingMessage={() => "Loading..."}
                                        isDisabled={isFieldDisabled || false}
                                        menuPlacement='auto'
                                        closeMenuOnSelect={!isMulti}
                                        blurInputOnSelect={true}
                                        menuPortalTarget={document.body} // Render the menu outside the component tree
                                        menuPosition='fixed'
                                        // Enhanced features
                                        filterOption={(
                                            option: any,
                                            inputValue: string
                                        ) => {
                                            if (!inputValue) return true;
                                            return (
                                                option.label
                                                    .toLowerCase()
                                                    .includes(
                                                        inputValue.toLowerCase()
                                                    ) ||
                                                option.value
                                                    .toLowerCase()
                                                    .includes(
                                                        inputValue.toLowerCase()
                                                    )
                                            );
                                        }}
                                        formatOptionLabel={(
                                            option: any,
                                            { context }: any
                                        ) => {
                                            // Custom option rendering
                                            if (context === "menu") {
                                                return (
                                                    <div className='flex items-center space-x-2'>
                                                        {option.data.icon && (
                                                            <span className='text-gray-400'>
                                                                {
                                                                    option.data
                                                                        .icon
                                                                }
                                                            </span>
                                                        )}
                                                        <span>
                                                            {option.label}
                                                        </span>
                                                        {option.data
                                                            .description && (
                                                            <span className='text-xs text-gray-500 ml-auto'>
                                                                {
                                                                    option.data
                                                                        .description
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            }
                                            return option.label;
                                        }}
                                    />

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
                                        className='text-red-500'
                                    />
                                </div>
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

                        // Get min and max date constraints from validators
                        const minDateValidator = field.validators?.find(
                            (v) => v.type === "minDate"
                        );
                        const maxDateValidator = field.validators?.find(
                            (v) => v.type === "maxDate"
                        );

                        const minDate = minDateValidator?.value
                            ? new Date(minDateValidator.value as string)
                            : undefined;
                        const maxDate = maxDateValidator?.value
                            ? new Date(maxDateValidator.value as string)
                            : undefined;

                        // Function to check if a date should be disabled
                        const isDateDisabled = (date: Date) => {
                            if (minDate && date < minDate) return true;
                            if (maxDate && date > maxDate) return true;
                            return false;
                        };

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
                                                          form.values[field.key]
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
                                            disabled={isDateDisabled}
                                            fromDate={minDate}
                                            toDate={maxDate}
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
                                        form.setFieldValue(field.key, value);
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
                                        form.setFieldValue(field.key, value);
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
                <div>
                    <Label className='text-primary font-semibold'>
                        {field.label}
                        {field.required && (
                            <span className='pl-2 text-red-600'>*</span>
                        )}
                    </Label>
                    <Field name={field.key}>
                        {({ field: _, form }: any) => {
                            const currentFiles = form.values[field.key] || [];
                            const isMultiple = field.multiple || false;

                            // Get file constraints from field properties
                            const maxFileSize =
                                field.maxFileSize || 5 * 1024 * 1024; // 5MB default
                            const minFiles = field.minFiles || 0;
                            const maxFiles =
                                field.maxFiles || (isMultiple ? 10 : 1);
                            const allowedTypes = field.allowedTypes || ["*"];

                            const handleFileChange = (
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const files = Array.from(e.target.files || []);

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
                                const invalidFiles = files.filter((file) => {
                                    if (allowedTypes.includes("*"))
                                        return false;
                                    return !allowedTypes.some(
                                        (type: string) =>
                                            file.type.startsWith(type) ||
                                            file.name.endsWith(type)
                                    );
                                });

                                if (invalidFiles.length > 0) {
                                    alert(
                                        `Invalid file type(s). Allowed: ${allowedTypes.join(
                                            ", "
                                        )}`
                                    );
                                    return;
                                }

                                // Store only serializable metadata in Redux
                                const fileMetadata: FileMetadata[] = files.map(
                                    (file) => ({
                                        name: file.name,
                                        size: file.size,
                                        type: file.type,
                                        lastModified: file.lastModified,
                                        id: `${file.name}-${file.lastModified}-${file.size}`, // Unique identifier
                                    })
                                );

                                const selectedFiles = isMultiple
                                    ? fileMetadata
                                    : fileMetadata[0];
                                form.setFieldValue(field.key, selectedFiles);
                                dispatch(
                                    updateField({
                                        key: field.key,
                                        value: selectedFiles,
                                    })
                                );

                                // Store actual File objects in a separate storage for upload
                                // This prevents serialization issues while keeping files accessible
                                if (isMultiple) {
                                    files.forEach((file, index) => {
                                        const fileId = fileMetadata[index].id;
                                        // Store in sessionStorage or a separate state management
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
                            };

                            const removeFile = (index: number) => {
                                if (isMultiple) {
                                    const fileToRemove = (
                                        currentFiles as FileMetadata[]
                                    )[index];
                                    if (fileToRemove && fileToRemove.id) {
                                        sessionStorage.removeItem(
                                            `file_${fileToRemove.id}`
                                        );
                                    }
                                    const updatedFiles = Array.from(
                                        currentFiles as FileMetadata[]
                                    ).filter((_, i) => i !== index);
                                    form.setFieldValue(field.key, updatedFiles);
                                    dispatch(
                                        updateField({
                                            key: field.key,
                                            value: updatedFiles,
                                        })
                                    );
                                } else {
                                    if (
                                        currentFiles &&
                                        (currentFiles as FileMetadata).id
                                    ) {
                                        sessionStorage.removeItem(
                                            `file_${
                                                (currentFiles as FileMetadata)
                                                    .id
                                            }`
                                        );
                                    }
                                    form.setFieldValue(field.key, null);
                                    dispatch(
                                        updateField({
                                            key: field.key,
                                            value: null,
                                        })
                                    );
                                }
                            };

                            const formatFileSize = (bytes: number) => {
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
                            };

                            return (
                                <div className='space-y-2'>
                                    {/* File Input */}
                                    <div className='relative'>
                                        <Input
                                            type='file'
                                            onChange={handleFileChange}
                                            placeholder={field.placeholder}
                                            multiple={isMultiple}
                                            accept={allowedTypes.join(",")}
                                            className='cursor-pointer'
                                        />

                                        {/* File Constraints Info */}
                                        <div className='text-xs text-gray-500 mt-1'>
                                            <div>
                                                Max file size:{" "}
                                                {formatFileSize(maxFileSize)}
                                            </div>
                                            <div>
                                                Files: {minFiles} - {maxFiles}
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
                                        </div>
                                    </div>

                                    {/* Selected Files Display */}
                                    {currentFiles && (
                                        <div className='space-y-2'>
                                            {isMultiple
                                                ? Array.from(
                                                      currentFiles as FileMetadata[]
                                                  ).map(
                                                      (
                                                          file: FileMetadata,
                                                          index: number
                                                      ) => (
                                                          <div
                                                              key={
                                                                  file.id ||
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
                                                                          currentFiles as FileMetadata
                                                                      ).name
                                                                  }
                                                              </div>
                                                              <div className='text-xs text-gray-500'>
                                                                  {formatFileSize(
                                                                      (
                                                                          currentFiles as FileMetadata
                                                                      ).size
                                                                  )}{" "}
                                                                  •{" "}
                                                                  {
                                                                      (
                                                                          currentFiles as FileMetadata
                                                                      ).type
                                                                  }
                                                              </div>
                                                          </div>
                                                          <Button
                                                              type='button'
                                                              variant='outline'
                                                              size='sm'
                                                              onClick={() =>
                                                                  removeFile(0)
                                                              }
                                                              className='ml-2 text-red-600 hover:text-red-700'
                                                          >
                                                              Remove
                                                          </Button>
                                                      </div>
                                                  )}
                                        </div>
                                    )}
                                </div>
                            );
                        }}
                    </Field>
                    {field.description && field.description.trim() !== "" && (
                        <p className='text-[#7D7D7D] text-sm mt-1'>
                            {field.description}
                        </p>
                    )}
                    <ErrorMessage
                        name={field.key}
                        component='div'
                        className='text-red-500'
                    />
                </div>
            );

        case "lookup":
            return (
                <Field name={field.key}>
                    {({ field: formikField, form }: any) => {
                        try {
                            const [options, setOptions] = React.useState<
                                { label: string; value: string }[]
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

                            // Get lookup configuration with defaults
                            const lookupConfig = field.lookupConfig;
                            const {
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
                                        <strong>Configuration Error:</strong>{" "}
                                        Lookup field "{field.label}" is missing
                                        required configuration. Please provide
                                        apiEndpoint, valueKey, and labelKey in
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
                                        ? field.getDependentValue(form.values)
                                        : null,
                                [field.getDependentValue, form.values]
                            );

                            // Dynamic field properties based on dependent values
                            const dynamicDescription = React.useMemo(
                                () =>
                                    field.getDescription
                                        ? field.getDescription(dependentValues)
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
                                        ? field.getPlaceholder(dependentValues)
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
                                                const defaultArray = defaultVal
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

                            // Separate effect to handle clearing field value when dependent values change
                            React.useEffect(() => {
                                // Skip clearing if field is hidden
                                if (isFieldHidden) {
                                    return;
                                }

                                // Check if any dependent value has changed and clear the field
                                const shouldClear =
                                    dependentValues &&
                                    Object.values(dependentValues).some(
                                        (value) =>
                                            value !== form.values[field.key] &&
                                            form.values[field.key]
                                    );
                                if (shouldClear) {
                                    const isMultiple =
                                        field.multiple !== undefined
                                            ? field.multiple
                                            : false;

                                    // If default value is provided, reset to default instead of clearing
                                    if (defaultValue !== undefined) {
                                        const defaultVal = getDefaultValue();
                                        if (defaultVal !== undefined) {
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
                                    } else {
                                        // Clear the field if no default is provided
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
                                }
                            }, [
                                dependentValues,
                                defaultValue,
                                form.values,
                                field.key,
                                isFieldHidden,
                                field.multiple,
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

                            // Simple cache for storing API results
                            const cache = new Map();

                            // Debounced search function
                            const debouncedSearch = React.useCallback(
                                (searchTerm: string) => {
                                    // Skip search if field is hidden
                                    if (isFieldHidden) {
                                        return;
                                    }

                                    if (timeoutRef.current) {
                                        clearTimeout(timeoutRef.current);
                                    }
                                    timeoutRef.current = setTimeout(
                                        async () => {
                                            if (
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
                                                        setOptions(cachedData);
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
                                                if (
                                                    transformRequest &&
                                                    dependentValues
                                                ) {
                                                    requestParams =
                                                        transformRequest(
                                                            requestParams,
                                                            dependentValues
                                                        );
                                                }

                                                // Make API request
                                                const response = await fetch(
                                                    `/api/${effectiveApiEndpoint}`,
                                                    {
                                                        method:
                                                            effectiveMethod ||
                                                            "GET",
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                        },
                                                        body:
                                                            effectiveMethod ===
                                                            "POST"
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
                                                                    effectiveValueKey
                                                                ],
                                                                label: item[
                                                                    effectiveLabelKey
                                                                ],
                                                                ...item, // Include all original properties
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
                                ]
                            );

                            // Load initial options on mount and when dependent values change
                            React.useEffect(() => {
                                // Skip loading if field is hidden
                                if (isFieldHidden) {
                                    return;
                                }

                                const loadInitialOptions = async () => {
                                    try {
                                        setIsLoading(true);
                                        setError(null);

                                        // Prepare request parameters
                                        let requestParams = {
                                            limit: 20,
                                            offset: 0,
                                        };

                                        // Add dependent values to request if transformRequest is provided
                                        if (
                                            transformRequest &&
                                            dependentValues
                                        ) {
                                            requestParams = transformRequest(
                                                requestParams,
                                                dependentValues
                                            );
                                        }

                                        // Make API request
                                        const response = await fetch(
                                            `/api/${effectiveApiEndpoint}`,
                                            {
                                                method:
                                                    effectiveMethod || "GET",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                },
                                                body:
                                                    effectiveMethod === "POST"
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
                                                    ...item, // Include all original properties
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
                                effectiveValueKey,
                                effectiveLabelKey,
                                effectiveSearchKey,
                                effectiveDebounceMs,
                                effectiveCacheResults,
                                cacheKey,
                                transformRequest,
                                dependentValues,
                                transformResponse,
                                isFieldHidden,
                            ]);

                            // Handle input change
                            const handleInputChange = (newValue: string) => {
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
                                                Array.isArray(selectedOption)
                                                    ? selectedOption
                                                    : [selectedOption];
                                            console.log(
                                                "Setting multiple field values:",
                                                field.key,
                                                selectedValues
                                            );
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
                                            // Handle clearing the selection
                                            console.log(
                                                "Clearing field value:",
                                                field.key
                                            );
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
                                    } else {
                                        // Handle clearing the selection
                                        console.log(
                                            "Clearing field value:",
                                            field.key
                                        );
                                        form.setFieldValue(field.key, null);
                                        dispatch(
                                            updateField({
                                                key: field.key,
                                                value: null,
                                            })
                                        );
                                    }
                                } catch (error) {
                                    console.error(
                                        "Error in handleChange:",
                                        error
                                    );
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
                                        selectedOption = value ? [value] : [];
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
                                console.error(
                                    "Error getting selected option:",
                                    error
                                );
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
                                                    field.multiple !== undefined
                                                        ? field.multiple
                                                        : false;

                                                // Debug logging for dynamic properties

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
                                                        value={selectedOption}
                                                        onChange={handleChange}
                                                        options={safeOptions}
                                                        onInputChange={
                                                            handleInputChange
                                                        }
                                                        inputValue={
                                                            safeInputValue
                                                        }
                                                        isLoading={isLoading}
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
                                                        styles={customStyles}
                                                        className='react-select-container'
                                                        classNamePrefix='react-select'
                                                        noOptionsMessage={() =>
                                                            isLoading
                                                                ? "Loading..."
                                                                : safeInputValue.length <
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
                                                        closeMenuOnSelect={true}
                                                        blurInputOnSelect={true}
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
                                                        dropdown. Please refresh
                                                        the page.
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
                                    lookup field "{field.label}". Please refresh
                                    the page or contact support.
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

        default:
            return null;
    }
};
