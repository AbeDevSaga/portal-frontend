import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { 
    initializeForm, 
    updateField, 
    setData, 
    resetForm, 
    clearForm, 
    updateMultipleFields, 
    removeFields,
    setFormConfig,
    batchUpdateFields,
    initializeWithDefaults,
} from '@/redux/feature/birthSlice';
import { FormConfig } from '@/common/types/formType';

interface UseDynamicFormProps {
    config: FormConfig;
    autoInitialize?: boolean;
    defaultValues?: Record<string, any>;
}

export const useDynamicForm = ({ 
    config, 
    autoInitialize = true, 
    defaultValues = {} 
}: UseDynamicFormProps) => {
    const dispatch = useDispatch();
    const formValues = useSelector((state: RootState) => state.birthSlice);

    // Initialize form with configuration
    const initialize = useCallback(() => {
        dispatch(initializeForm({ config }));
    }, [dispatch, config]);

    // Initialize with default values
    const initializeWithDefaultsHandler = useCallback(() => {
        dispatch(initializeWithDefaults({ config, defaultValues }));
    }, [dispatch, config, defaultValues]);

    // Set form configuration (useful for switching between different forms)
    const setFormConfiguration = useCallback((newConfig: FormConfig) => {
        dispatch(setFormConfig({ config: newConfig }));
    }, [dispatch]);

    // Update a single field
    const updateFieldValue = useCallback((key: string, value: any) => {
        dispatch(updateField({ key, value }));
    }, [dispatch]);

    // Set multiple fields at once
    const setFormData = useCallback((data: Record<string, any>) => {
        dispatch(setData(data));
    }, [dispatch]);

    // Reset form to initial state
    const resetFormData = useCallback(() => {
        dispatch(resetForm({ config }));
    }, [dispatch, config]);

    // Clear all form data
    const clearFormData = useCallback(() => {
        dispatch(clearForm());
    }, [dispatch]);

    // Update multiple fields
    const updateMultipleFieldValues = useCallback((data: Record<string, any>) => {
        dispatch(updateMultipleFields(data));
    }, [dispatch]);

    // Remove specific fields
    const removeFormFields = useCallback((keys: string[]) => {
        dispatch(removeFields({ keys }));
    }, [dispatch]);

    // Batch update with validation
    const batchUpdateFormFields = useCallback((updates: Record<string, any>) => {
        dispatch(batchUpdateFields({ updates, config }));
    }, [dispatch, config]);

    // Get all field keys from config
    const getFieldKeys = useCallback(() => {
        return config.steps.flatMap(step => step.fields.map(field => field.key));
    }, [config]);

    // Check if form has any data
    const hasFormData = useCallback(() => {
        const fieldKeys = getFieldKeys();
        return fieldKeys.some(key => formValues[key] && formValues[key] !== '');
    }, [formValues, getFieldKeys]);

    // Get form data for specific fields
    const getFormDataForFields = useCallback((keys: string[]) => {
        const result: Record<string, any> = {};
        keys.forEach(key => {
            if (key in formValues) {
                result[key] = formValues[key];
            }
        });
        return result;
    }, [formValues]);

    // Get form data for current step (useful for multi-step forms)
    const getCurrentStepData = useCallback((stepIndex: number) => {
        if (stepIndex >= 0 && stepIndex < config.steps.length) {
            const currentStep = config.steps[stepIndex];
            const stepFields = currentStep.fields.map(field => field.key);
            return getFormDataForFields(stepFields);
        }
        return {};
    }, [config.steps, getFormDataForFields]);

    // Validate if all required fields in current step are filled
    const isCurrentStepValid = useCallback((stepIndex: number) => {
        if (stepIndex >= 0 && stepIndex < config.steps.length) {
            const currentStep = config.steps[stepIndex];
            return currentStep.fields.every(field => {
                if (!field.required) return true;
                const value = formValues[field.key];
                return value && value !== '';
            });
        }
        return false;
    }, [config.steps, formValues]);

    // Auto-initialize on mount if enabled
    useEffect(() => {
        if (autoInitialize) {
            if (Object.keys(defaultValues).length > 0) {
                initializeWithDefaultsHandler();
            } else {
                initialize();
            }
        }
    }, [autoInitialize, initialize, initializeWithDefaultsHandler, defaultValues]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Optionally clear form data when component unmounts
            // Uncomment the next line if you want this behavior
            // clearFormData();
        };
    }, [clearFormData]);

    return {
        // State
        formValues,
        
        // Actions
        initialize,
        initializeWithDefaults: initializeWithDefaultsHandler,
        setFormConfiguration,
        updateFieldValue,
        setFormData,
        resetFormData,
        clearFormData,
        updateMultipleFieldValues,
        removeFormFields,
        batchUpdateFormFields,
        
        // Utilities
        getFieldKeys,
        hasFormData,
        getFormDataForFields,
        getCurrentStepData,
        isCurrentStepValid,
        
        // Configuration info
        config,
        totalSteps: config.steps.length,
        totalFields: config.steps.reduce((acc, step) => acc + step.fields.length, 0),
        
        // Form metadata
        formMetadata: {
            hasStepper: config.stepperData && config.stepperData.length > 0,
            stepperPosition: config.stepperPosition || "top",
            isMultiStep: config.steps.length > 1,
        },
    };
};
