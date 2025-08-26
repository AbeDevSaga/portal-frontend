"use client";
import { FormikErrors, FormikTouched, FormikHandlers } from "formik";
import { ChangeEvent, FocusEvent, FormEvent } from "react";
import useRenderFormItem from "./useRenderFormItem";

type FormValues = {
    [key: string]: any;
};
type formData = {
    label: string;
    name: string;
    type: string;
    required: boolean;
    placeholder: string;
};
type formProps = {
    values: FormValues;
    errors: FormikErrors<FormValues>;
    touched: FormikTouched<FormValues>;
    handleChange: (e: ChangeEvent<any>) => void;
    handleBlur: (e: FocusEvent<any>) => void;
    handleSubmit: (e?: FormEvent<HTMLFormElement>) => void;
    formData: formData[];
    showTitle?: boolean;
    // setFieldValue: <K extends keyof FormValues>(
    //     field: K,
    //     value: FormValues[K],
    //     shouldValidate?: boolean
    // ) => void;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
    ) => Promise<void | FormikErrors<FormValues>>;
};
const ConstructForm = ({
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    formData,
    showTitle,
    touched,
    setFieldValue,
}: formProps) => {
    const { renderFormInput } = useRenderFormItem({
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        setFieldValue,
    });

    return (
        <div className='w-full'>
            <form onSubmit={handleSubmit}>
                <div className='gap-y-8 w-full flex flex-col items-center'>
                    {formData.map((formField) => renderFormInput(formField))}
                </div>
            </form>
        </div>
    );
};

export default ConstructForm;
