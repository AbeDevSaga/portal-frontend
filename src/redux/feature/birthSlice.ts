// store/formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateInitialState } from "../initialValueConstructor";
import { FormConfig } from "@/common/types/formType";

// Generic interface for form state
interface FormState {
    [key: string]: any;
}

// Dynamic initial state generator
const createDynamicInitialState = (config?: FormConfig): FormState => {
    if (!config) {
        return {};
    }
    return generateInitialState(config);
};

// Default empty state
const initialState: FormState = {};

const birthSlice = createSlice({
    name: "birth",
    initialState,
    reducers: {
        // Initialize form with a specific configuration
        initializeForm: (
            state,
            action: PayloadAction<{ config: FormConfig }>
        ) => {
            const newState = createDynamicInitialState(action.payload.config);
            return { ...state, ...newState };
        },
        
        // Update a single field
        updateField: (
            state,
            action: PayloadAction<{ key: string; value: any }>
        ) => {
            state[action.payload.key] = action.payload.value;
        },
        
        // Set multiple fields at once
        setData: (state, action: PayloadAction<Record<string, any>>) => {
            return { ...state, ...action.payload };
        },
        
        // Reset form to initial state based on current config
        resetForm: (state, action: PayloadAction<{ config: FormConfig }>) => {
            const newState = createDynamicInitialState(action.payload.config);
            return { ...state, ...newState };
        },
        
        // Clear all form data
        clearForm: () => {
            return {};
        },
        
        // Update multiple fields
        updateMultipleFields: (
            state,
            action: PayloadAction<Record<string, any>>
        ) => {
            return { ...state, ...action.payload };
        },
        
        // Remove specific fields
        removeFields: (
            state,
            action: PayloadAction<{ keys: string[] }>
        ) => {
            const newState = { ...state };
            action.payload.keys.forEach(key => {
                delete newState[key];
            });
            return newState;
        },

        // Set form configuration for the current page/route
        setFormConfig: (
            state,
            action: PayloadAction<{ config: FormConfig }>
        ) => {
            // Clear existing state and initialize with new config
            const newState = createDynamicInitialState(action.payload.config);
            return { ...state, ...newState };
        },

        // Batch update multiple fields with validation
        batchUpdateFields: (
            state,
            action: PayloadAction<{ 
                updates: Record<string, any>;
                config: FormConfig;
            }>
        ) => {
            const { updates, config } = action.payload;
            const validKeys = config.steps.flatMap(step => 
                step.fields.map(field => field.key)
            );
            
            // Only update fields that exist in the current config
            const validUpdates: Record<string, any> = {};
            Object.entries(updates).forEach(([key, value]) => {
                if (validKeys.includes(key)) {
                    validUpdates[key] = value;
                }
            });
            
            return { ...state, ...validUpdates };
        },

        // Initialize form with default values from config
        initializeWithDefaults: (
            state,
            action: PayloadAction<{ 
                config: FormConfig;
                defaultValues?: Record<string, any>;
            }>
        ) => {
            const { config, defaultValues = {} } = action.payload;
            const configState = createDynamicInitialState(config);
            
            // Merge config defaults with provided defaults
            const mergedState = { ...configState, ...defaultValues };
            return { ...state, ...mergedState };
        },
    },
});

export const { 
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
} = birthSlice.actions;

export default birthSlice.reducer;
