import React, { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { FormikErrors, FormikTouched, FormikValues } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import CustomSelectComponent from "./CustomSelectComponent";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import DatePickerComponent from "./DatePickerComponent";

type FormValues = {
    [key: string]: any;
};

type formData = {
    label: string;
    name: string;
    type: string;
    required: boolean;
    placeholder?: string;
    options?: { label: string; value: string }[];
};
type formProps = {
    values: FormValues;
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormValues>;
    handleChange: (e: ChangeEvent<any>) => void;
    handleBlur: (e: FocusEvent<any>) => void;
    setFieldValue?: (
        field: string,
        value: any,
        shouldValidate?: boolean
    ) => Promise<void | FormikErrors<FormValues>>;
};
const useRenderFormItem = ({
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
}: formProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const t = useTranslations();
    const renderFormInput = (formItem: formData) => {
        switch (formItem.type) {
            case "datepicker":
                return (
                    <DatePickerComponent
                        formItem={formItem}
                        setFieldValue={(field: string, value: string) =>
                            setFieldValue?.(field, value)
                        }
                        value={values[formItem.name]}
                        error={errors[formItem.name]}
                        touched={touched[formItem.name]}
                    />
                );
            case "radio":
                return (
                    <div className='space-y-2 w-full'>
                        <div className='flex items-center gap-2'>
                            <RadioGroup
                                value={values[formItem.name]}
                                defaultValue=''
                                onValueChange={(value) =>
                                    setFieldValue?.(formItem.name, value)
                                }
                            >
                                {formItem.options?.map((radioItem) => (
                                    <div
                                        key={radioItem.label}
                                        className='flex items-center space-x-2'
                                    >
                                        <RadioGroupItem
                                            value={radioItem.value}
                                            id={radioItem.label}
                                        />
                                        <Label
                                            htmlFor={radioItem.label}
                                            className='text-lg'
                                        >
                                            {radioItem.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        {touched[formItem.name] && errors[formItem.name] ? (
                            <p className='text-red-500 text-sm'>
                                {errors[formItem.name] as string}
                            </p>
                        ) : null}
                    </div>
                );
            case "checkbox":
                return (
                    <div className='space-y-2 w-full'>
                        <div className='flex items-center gap-2'>
                            <Checkbox
                                name={formItem.name}
                                onCheckedChange={(checked) => {
                                    setFieldValue?.(formItem.name, checked);
                                }}
                                checked={values[formItem.name]}
                                onBlur={handleBlur}
                            />
                            <Label
                                htmlFor={formItem.name}
                                className='flex gap-1'
                            >
                                <p>{t(formItem.label)}</p>
                                {formItem.required ? (
                                    <span className='text-red-600'>*</span>
                                ) : null}
                            </Label>
                        </div>
                        {touched[formItem.name] && errors[formItem.name] ? (
                            <p className='text-red-500 text-sm'>
                                {errors[formItem.name] as string}
                            </p>
                        ) : null}
                    </div>
                );
            case "text":
                return (
                    <div className='space-y-2 w-full'>
                        <Label htmlFor={formItem.name} className='flex gap-1'>
                            <p>{t(formItem.label)}</p>
                            {formItem.required ? (
                                <span className='text-red-600'>*</span>
                            ) : null}
                        </Label>
                        <Input
                            name={formItem.name}
                            type='text'
                            onChange={handleChange}
                            value={values[formItem.name]}
                            onBlur={handleBlur}
                            placeholder={t(formItem.placeholder || "") || ""}
                            className='py-3'
                        />
                        {touched[formItem.name] && errors[formItem.name] ? (
                            <p className='text-red-500 text-sm'>
                                {errors[formItem.name] as string}
                            </p>
                        ) : null}
                    </div>
                );
            case "email":
                return (
                    <div className='space-y-2 w-full'>
                        <Label htmlFor={formItem.name} className='flex gap-1'>
                            <p>{t(formItem.label)}</p>
                            {formItem.required ? (
                                <span className='text-red-600'>*</span>
                            ) : null}
                        </Label>
                        <Input
                            name={formItem.name}
                            type='email'
                            onChange={handleChange}
                            value={values[formItem.name]}
                            onBlur={handleBlur}
                            placeholder={t(formItem.placeholder || "")}
                            className='py-3'
                        />
                        {touched[formItem.name] && errors[formItem.name] ? (
                            <p className='text-red-500 text-sm'>
                                {errors[formItem.name] as string}
                            </p>
                        ) : null}
                    </div>
                );
            case "password":
                return (
                    <div className='space-y-2 w-full'>
                        <Label htmlFor={formItem.name} className='flex gap-1'>
                            <p>{t(formItem.label)}</p>
                            {formItem.required ? (
                                <span className='text-red-600'>*</span>
                            ) : null}
                        </Label>
                        <div className='relative'>
                            <Input
                                name={formItem.name}
                                type={showPassword ? "text" : "password"}
                                onChange={handleChange}
                                value={values[formItem.name]}
                                onBlur={handleBlur}
                                placeholder={t(formItem.placeholder || "")}
                                className='pr-10 py-3'
                            />
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                                onClick={() => setShowPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                        {touched[formItem.name] && errors[formItem.name] ? (
                            <p className='text-red-500 text-sm'>
                                {errors[formItem.name] as string}
                            </p>
                        ) : null}
                    </div>
                );

            case "select":
                return (
                    <div className='space-y-2 w-full'>
                        <Label htmlFor={formItem.name} className='flex gap-1'>
                            <p>{t(formItem.label)}</p>
                            {formItem.required ? (
                                <span className='text-red-600'>*</span>
                            ) : null}
                        </Label>
                        <CustomSelectComponent
                            name={formItem.name}
                            value={values[formItem.name] || ""}
                            options={formItem.options ? formItem.options.map(opt => ({
                                value: opt.value,
                                label: <span>{opt.label}</span>
                            })) : []}
                            onChange={(selected) => {
                                setFieldValue?.(formItem.name, selected);
                            }}
                            placeholder={formItem.placeholder || `Select ${formItem.label}`}
                        />
                        {touched[formItem.name] && errors[formItem.name] ? (
                            <p className='text-red-500 text-sm'>
                                {errors[formItem.name] as string}
                            </p>
                        ) : null}
                    </div>
                );

            default:
                return <Input type='text' disabled />;
        }
    };
    return { renderFormInput };
};

export default useRenderFormItem;
