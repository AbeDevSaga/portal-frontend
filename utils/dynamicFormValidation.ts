import { FieldConfig } from "@/types/formType";

// Check if a field should be required based on its dynamic callbacks
export const isFieldRequired = (field: FieldConfig, formValues: any): boolean => {
    // If field has dynamic required logic, use it
    if (field.isRequired) {
        const dependentValues = field.getDependentValue ? field.getDependentValue(formValues) : null;
        return field.isRequired(dependentValues);
    }
    
    // Otherwise use the static required property
    return field.required || false;
};

// Check if a field should be hidden based on its dynamic callbacks
export const isFieldHidden = (field: FieldConfig, formValues: any): boolean => {
    if (field.isHide) {
        const dependentValues = field.getDependentValue ? field.getDependentValue(formValues) : null;
        return field.isHide(dependentValues);
    }
    return false;
};

// Get all visible required fields for validation
export const getVisibleRequiredFields = (fields: FieldConfig[], formValues: any): string[] => {
    return fields
        .filter(field => !isFieldHidden(field, formValues)) // Only visible fields
        .filter(field => isFieldRequired(field, formValues)) // Only required fields
        .map(field => field.key);
};

// Check if form is valid based on visible required fields
export const isFormValid = (fields: FieldConfig[], formValues: any): boolean => {
    const visibleRequiredFields = getVisibleRequiredFields(fields, formValues);
    
    return visibleRequiredFields.every(fieldKey => {
        const value = formValues[fieldKey];
        return value !== undefined && value !== null && value !== '';
    });
};

// Get validation errors for visible required fields
export const getValidationErrors = (fields: FieldConfig[], formValues: any): Record<string, string> => {
    const errors: Record<string, string> = {};
    const visibleRequiredFields = getVisibleRequiredFields(fields, formValues);
    
    visibleRequiredFields.forEach(fieldKey => {
        const value = formValues[fieldKey];
        if (value === undefined || value === null || value === '') {
            const field = fields.find(f => f.key === fieldKey);
            errors[fieldKey] = `${field?.label || fieldKey} is required`;
        }
    });
    
    return errors;
};
