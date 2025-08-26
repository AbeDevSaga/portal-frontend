import { useState, useEffect, useCallback } from 'react';
import { FieldConfig } from '@/common/types/formType';
import { isFormValid, getValidationErrors, getVisibleRequiredFields } from '@/common/utils/dynamicFormValidation';

export const useDynamicFormValidation = (fields: FieldConfig[], formValues: any) => {
    const [isValid, setIsValid] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [visibleRequiredFields, setVisibleRequiredFields] = useState<string[]>([]);

    // Update validation state when form values change
    useEffect(() => {
        const valid = isFormValid(fields, formValues);
        const errors = getValidationErrors(fields, formValues);
        const requiredFields = getVisibleRequiredFields(fields, formValues);
        
        setIsValid(valid);
        setValidationErrors(errors);
        setVisibleRequiredFields(requiredFields);
    }, [fields, formValues]);

    // Check if a specific field is valid
    const isFieldValid = useCallback((fieldKey: string): boolean => {
        return !validationErrors[fieldKey];
    }, [validationErrors]);

    // Get error message for a specific field
    const getFieldError = useCallback((fieldKey: string): string | undefined => {
        return validationErrors[fieldKey];
    }, [validationErrors]);

    // Check if submit button should be enabled
    const canSubmit = useCallback((): boolean => {
        return isValid;
    }, [isValid]);

    // Get count of visible required fields
    const getRequiredFieldsCount = useCallback((): number => {
        return visibleRequiredFields.length;
    }, [visibleRequiredFields]);

    // Get count of filled required fields
    const getFilledRequiredFieldsCount = useCallback((): number => {
        return visibleRequiredFields.filter(fieldKey => {
            const value = formValues[fieldKey];
            return value !== undefined && value !== null && value !== '';
        }).length;
    }, [visibleRequiredFields, formValues]);

    return {
        isValid,
        validationErrors,
        visibleRequiredFields,
        isFieldValid,
        getFieldError,
        canSubmit,
        getRequiredFieldsCount,
        getFilledRequiredFieldsCount
    };
};
