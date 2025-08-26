import { FormConfig } from "@/types/formType";

// Enhanced interface for form submission data
export interface FormSubmissionData {
    // All form field values
    formValues: Record<string, any>;
    
    // Form validation status
    validation: {
        isValid: boolean;
        errors: Record<string, string>;
        requiredFieldsCount: number;
        filledRequiredFieldsCount: number;
        missingRequiredFields: string[];
    };
    
    // Form configuration metadata
    formMetadata: {
        totalFields: number;
        requiredFields: string[];
        optionalFields: string[];
        fieldTypes: Record<string, string>;
        fieldGroups: Record<string, string[]>;
        stepStructure: Array<{
            title: string;
            fieldCount: number;
            requiredFieldCount: number;
            fields: string[];
        }>;
        dynamicRequiredFields: string[];
        fieldDependencies: Record<string, any>;
    };
    
    // Form readiness status
    formReady: {
        canSubmit: boolean;
        completionPercentage: number;
        missingFields: string[];
        readyForSubmission: boolean;
    };
    
    // Timestamp and metadata
    submissionMetadata: {
        timestamp: string;
        formConfig: string;
        totalSteps: number;
        currentStep: number;
    };
}

// Main function to collect comprehensive form data
export const collectFormSubmissionData = (formValues: any, config: FormConfig): FormSubmissionData => {
    // Collect all field values
    const allFieldValues = { ...formValues };
    
    // Get all fields from config
    const allFields = config.steps.flatMap((step: any) => step.fields);
    
    // Collect field metadata
    const fieldTypes: Record<string, string> = {};
    const fieldGroups: Record<string, string[]> = {};
    const requiredFields: string[] = [];
    const optionalFields: string[] = [];
    const dynamicRequiredFields: string[] = [];
    const fieldDependencies: Record<string, any> = {};
    
    allFields.forEach((field: any) => {
        fieldTypes[field.key] = field.type;
        
        if (field.group) {
            if (!fieldGroups[field.group]) {
                fieldGroups[field.group] = [];
            }
            fieldGroups[field.group].push(field.key);
        }
        
        // Check static required fields
        if (field.required) {
            requiredFields.push(field.key);
        } else {
            optionalFields.push(field.key);
        }
        
        // Check dynamic required fields (using callbacks)
        if (field.isRequired && typeof field.isRequired === 'function') {
            try {
                const dependentValues = field.getDependentValue ? field.getDependentValue(formValues) : {};
                const isDynamicallyRequired = field.isRequired(dependentValues);
                
                if (isDynamicallyRequired) {
                    dynamicRequiredFields.push(field.key);
                    if (!requiredFields.includes(field.key)) {
                        requiredFields.push(field.key);
                    }
                }
                
                // Store dependencies for this field
                if (field.getDependentValue) {
                    fieldDependencies[field.key] = dependentValues;
                }
            } catch (error) {
                console.warn(`Error checking dynamic requirement for field ${field.key}:`, error);
            }
        }
        
        // Store dependencies for fields that have them
        if (field.getDependentValue) {
            fieldDependencies[field.key] = field.getDependentValue(formValues);
        }
    });
    
    // Calculate validation status including dynamic fields
    const missingRequiredFields = requiredFields.filter(fieldKey => {
        const value = formValues[fieldKey];
        return value === undefined || value === null || value === '';
    });
    
    const filledRequiredFieldsCount = requiredFields.length - missingRequiredFields.length;
    const isValid = missingRequiredFields.length === 0;
    const completionPercentage = requiredFields.length > 0 
        ? Math.round((filledRequiredFieldsCount / requiredFields.length) * 100) 
        : 100;
    
    // Build step structure
    const stepStructure = config.steps.map((step: any) => ({
        title: step.title,
        fieldCount: step.fields.length,
        requiredFieldCount: step.fields.filter((f: any) => f.required).length,
        fields: step.fields.map((f: any) => f.key)
    }));
    
    // Check form readiness
    const canSubmit = isValid;
    const readyForSubmission = canSubmit && completionPercentage === 100;
    
    return {
        formValues: allFieldValues,
        validation: {
            isValid,
            errors: {}, // You can enhance this with actual validation errors
            requiredFieldsCount: requiredFields.length,
            filledRequiredFieldsCount,
            missingRequiredFields
        },
        formMetadata: {
            totalFields: allFields.length,
            requiredFields,
            optionalFields,
            fieldTypes,
            fieldGroups,
            stepStructure,
            dynamicRequiredFields,
            fieldDependencies
        },
        formReady: {
            canSubmit,
            completionPercentage,
            missingFields: missingRequiredFields,
            readyForSubmission
        },
        submissionMetadata: {
            timestamp: new Date().toISOString(),
            formConfig: config.steps.map((s: any) => s.title).join(' > '),
            totalSteps: config.steps.length,
            currentStep: 1 // For single-step forms
        }
    };
};

// Utility function to analyze form data
export const analyzeFormData = (submissionData: FormSubmissionData) => {
    const analysis = {
        // Field type breakdown
        fieldTypeBreakdown: Object.values(submissionData.formMetadata.fieldTypes).reduce((acc: any, type) => {
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {}),
        
        // Group breakdown
        groupBreakdown: Object.entries(submissionData.formMetadata.fieldGroups).reduce((acc: any, [group, fields]) => {
            acc[group] = fields.length;
            return acc;
        }, {}),
        
        // Validation summary
        validationSummary: {
            totalFields: submissionData.formMetadata.totalFields,
            requiredFields: submissionData.validation.requiredFieldsCount,
            optionalFields: submissionData.formMetadata.optionalFields.length,
            filledRequired: submissionData.validation.filledRequiredFieldsCount,
            missingRequired: submissionData.validation.missingRequiredFields.length,
            completionRate: submissionData.formReady.completionPercentage
        },
        
        // Form readiness analysis
        readinessAnalysis: {
            canSubmit: submissionData.formReady.canSubmit,
            readyForSubmission: submissionData.formReady.readyForSubmission,
            missingFields: submissionData.formReady.missingFields,
            nextSteps: submissionData.formReady.readyForSubmission 
                ? "Form is ready for submission" 
                : `Complete these fields: ${submissionData.formReady.missingFields.join(', ')}`
        }
    };
    
    return analysis;
};

// Function to prepare API payload
export const prepareApiPayload = (submissionData: FormSubmissionData) => {
    const { formValues, formMetadata, validation } = submissionData;
    
    // Create a clean payload with only the form values
    const payload: Record<string, any> = {
        // Basic form data
        ...formValues,
        
        // Metadata for tracking
        _metadata: {
            submissionTimestamp: submissionData.submissionMetadata.timestamp,
            formVersion: submissionData.submissionMetadata.formConfig,
            totalFields: formMetadata.totalFields,
            requiredFieldsCount: validation.requiredFieldsCount,
            completionPercentage: submissionData.formReady.completionPercentage
        }
    };
    
    // Remove any undefined or null values and clean up signature data
    Object.keys(payload).forEach(key => {
        if (payload[key] === undefined || payload[key] === null) {
            delete payload[key];
        } else if (payload[key] && typeof payload[key] === 'object' && payload[key]._fieldType === 'digitalSignature') {
            // For digital signatures, keep only the actual signature data for API submission
            payload[key] = payload[key]._signatureData;
        }
    });
    
    return payload;
};

// Function to get user-friendly display values for live preview
export const getDisplayValue = (value: any, fieldType: string, fieldLabel?: string): string => {
    if (!value) return '';
    
    // Handle digital signature fields
    if (fieldType === 'digitalSignature' && typeof value === 'object' && value._fieldType === 'digitalSignature') {
        return value._displayText || `✓ ${fieldLabel || 'Signature'} captured`;
    }
    
    // Handle other field types
    if (typeof value === 'string') {
        // If it's a data URL (base64), show a friendly message
        if (value.startsWith('data:')) {
            return `✓ ${fieldLabel || 'File'} uploaded`;
        }
        return value;
    }
    
    if (typeof value === 'object') {
        // Handle lookup fields that return objects
        if (value.label) {
            return value.label;
        }
        if (value.name) {
            return value.name;
        }
        // For arrays of objects (multi-select)
        if (Array.isArray(value) && value.length > 0) {
            if (typeof value[0] === 'object' && value[0].label) {
                return value.map((item: any) => item.label).join(', ');
            }
            return value.join(', ');
        }
        return JSON.stringify(value);
    }
    
    return String(value);
};

// Function to get clean form values for display (without internal metadata)
export const getCleanFormValues = (formValues: Record<string, any>, fieldTypes: Record<string, string>): Record<string, any> => {
    const cleanValues: Record<string, any> = {};
    
    Object.entries(formValues).forEach(([key, value]) => {
        const fieldType = fieldTypes[key];
        
        if (fieldType === 'digitalSignature' && typeof value === 'object' && value._fieldType === 'digitalSignature') {
            // For digital signatures, show the display text instead of the object
            cleanValues[key] = value._displayText || `✓ Signature captured`;
        } else if (fieldType === 'fileUpload' && Array.isArray(value)) {
            // For file uploads, show file names
            cleanValues[key] = value.map((file: any) => file.name || 'File uploaded').join(', ');
        } else if (fieldType === 'fileUpload' && value && typeof value === 'object') {
            // Single file upload
            cleanValues[key] = value.name || 'File uploaded';
        } else if (typeof value === 'object' && value && value.label) {
            // Lookup fields
            cleanValues[key] = value.label;
        } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0].label) {
            // Multi-select lookup fields
            cleanValues[key] = value.map((item: any) => item.label).join(', ');
        } else {
            // Regular values
            cleanValues[key] = value;
        }
    });
    
    return cleanValues;
};

// Main function that processes form submission with just the value parameter
export const processFormSubmission = (value: any, config: FormConfig) => {
    // Collect comprehensive form data
    const submissionData = collectFormSubmissionData(value, config);
    
    // Analyze the form data
    const analysis = analyzeFormData(submissionData);
    
    // Get clean form values for display (user-friendly)
    const cleanFormValues = getCleanFormValues(submissionData.formValues, submissionData.formMetadata.fieldTypes);
    
    // Log comprehensive data
    console.log("=== COMPLETE FORM SUBMISSION DATA ===");
    console.log("Form Values (Raw):", submissionData.formValues);
    console.log("Form Values (Display):", cleanFormValues);
    console.log("Validation Status:", submissionData.validation);
    console.log("Form Metadata:", submissionData.formMetadata);
    console.log("Form Readiness:", submissionData.formReady);
    console.log("Submission Metadata:", submissionData.submissionMetadata);
    console.log("=== FORM ANALYSIS ===");
    console.log("Field Type Breakdown:", analysis.fieldTypeBreakdown);
    console.log("Group Breakdown:", analysis.groupBreakdown);
    console.log("Validation Summary:", analysis.validationSummary);
    console.log("Readiness Analysis:", analysis.readinessAnalysis);
    console.log("=== END FORM SUBMISSION DATA ===");
    
    // Check if form is ready for submission
    if (!submissionData.formReady.readyForSubmission) {
        console.error("Form is not ready for submission:", submissionData.formReady);
        alert(`Form is not complete. Please fill in all required fields.\nMissing: ${submissionData.formReady.missingFields.join(', ')}`);
        return { 
            success: false, 
            data: submissionData, 
            analysis,
            cleanFormValues // Include clean values for display
        };
    }
    
    // Prepare data for API submission
    const apiPayload = prepareApiPayload(submissionData);
    
    return { 
        success: true, 
        data: submissionData, 
        analysis, 
        apiPayload,
        cleanFormValues // Include clean values for display
    };
};
