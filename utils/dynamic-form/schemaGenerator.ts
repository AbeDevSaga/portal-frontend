import { FieldConfig, FormConfig, StepConfig } from "@/types/formType";
import * as Yup from "yup";
import type { Schema } from "yup";

export function generateSchema(config: FormConfig) {
    const shape: Record<string, Schema<any>> = {};

    config.steps?.forEach((step: StepConfig) => {
        step.fields.forEach((field: FieldConfig) => {
            let schema: Schema<any> = Yup.mixed();

            // Start with the base schema based on field type
            switch (field.type) {
                case "number":
                    schema = Yup.number().typeError("Must be a valid number");
                    break;
                case "email":
                    schema = Yup.string().email("Invalid email format");
                    break;
                case "phone":
                    schema = Yup.string();
                    break;
                case "date":
                    schema = Yup.date().typeError("Must be a valid date");
                    break;
                case "select":
                case "radio":
                case "fileUpload":
                    schema = Yup.mixed();
                    break;
                case "textarea":
                case "input":
                case "password":
                default:
                    schema = Yup.string();
            }

            // Apply validators
            field?.validators?.forEach((validator) => {
                switch (validator.type) {
                    case "required":
                        if (field.type === "number") {
                            schema = (schema as Yup.NumberSchema).required(validator.message);
                        } else if (field.type === "date") {
                            schema = (schema as Yup.DateSchema).required(validator.message);
                        } else {
                            schema = (schema as Yup.StringSchema).required(validator.message);
                        }
                        break;
                        
                    case "min":
                        if (field.type === "number") {
                            schema = (schema as Yup.NumberSchema).min(validator.value as number, validator.message);
                        } else if (field.type === "input" || field.type === "textarea" || field.type === "password") {
                            schema = (schema as Yup.StringSchema).min(validator.value as number, validator.message);
                        }
                        break;
                        
                    case "max":
                        if (field.type === "number") {
                            schema = (schema as Yup.NumberSchema).max(validator.value as number, validator.message);
                        } else if (field.type === "input" || field.type === "textarea" || field.type === "password") {
                            schema = (schema as Yup.StringSchema).max(validator.value as number, validator.message);
                        }
                        break;
                        
                    case "pattern":
                        if (field.type === "input" || field.type === "textarea" || field.type === "password" || field.type === "phone") {
                            schema = (schema as Yup.StringSchema).matches(
                                new RegExp(validator.value as string),
                                validator.message
                            );
                        }
                        break;
                        
                    case "email":
                        // Email validation is already handled in the base schema
                        // This is for additional email-specific validations if needed
                        if (field.type === "email") {
                            schema = (schema as Yup.StringSchema).email(validator.message);
                        } else if (field.type === "input" && validator.type === "email") {
                            // For input fields with email validator
                            schema = (schema as Yup.StringSchema).email(validator.message);
                        }
                        break;

                    case "minDate":
                        if (field.type === "date") {
                            schema = (schema as Yup.DateSchema).min(validator.value as Date, validator.message);
                        }
                        break;

                    case "maxDate":
                        if (field.type === "date") {
                            schema = (schema as Yup.DateSchema).max(validator.value as Date, validator.message);
                        }
                        break;
                }
            });

            // Handle required field without explicit validator
            if (field.required && !field.validators?.some(v => v.type === "required")) {
                if (field.type === "number") {
                    schema = (schema as Yup.NumberSchema).required("This field is required");
                } else if (field.type === "date") {
                    schema = (schema as Yup.DateSchema).required("This field is required");
                } else if (field.type === "lookup") {
                    // For lookup fields, use mixed type with custom test
                    schema = (schema as Yup.MixedSchema).required("This field is required")
                        .test('is-valid-lookup', 'Please select a valid option', (value: any) => {
                            if (!value) return false;
                            // Handle both object and simple value cases
                            if (typeof value === 'object' && value !== null) {
                                return value.value || value.id;
                            }
                            return typeof value === 'string' && value.trim().length > 0;
                        });
                } else {
                    // For other field types, check if schema is string-based before casting
                    if (schema instanceof Yup.string) {
                        schema = (schema as Yup.StringSchema).required("This field is required");
                    } else {
                        // For mixed types, use custom test
                        schema = (schema as Yup.MixedSchema).required("This field is required");
                    }
                }
            }

            shape[field.key] = schema;
        });
    });

    return Yup.object().shape(shape);
}

// Enhanced schema generator with better error handling
export function generateEnhancedSchema(config: FormConfig) {
    const shape: Record<string, Schema<any>> = {};

    config.steps?.forEach((step: StepConfig) => {
        step.fields.forEach((field: FieldConfig) => {
            let schema: Schema<any>;

            // Create base schema with proper type handling
            switch (field.type) {
                case "number":
                    schema = Yup.number()
                        .typeError("Must be a valid number")
                        .transform((value, originalValue) => {
                            // Handle empty strings and convert to null for optional fields
                            if (originalValue === "" || originalValue === null || originalValue === undefined) {
                                return field.required ? undefined : null;
                            }
                            return value;
                        });
                    break;
                    
                case "email":
                    schema = Yup.string()
                        .email("Invalid email format")
                        .transform((value) => value?.trim());
                    break;
                    
                case "phone":
                    schema = Yup.string()
                        .transform((value) => value?.trim());
                    break;
                    
                case "date":
                    schema = Yup.date()
                        .typeError("Must be a valid date")
                        .transform((value, originalValue) => {
                            // Handle empty strings and convert to null for optional fields
                            if (originalValue === "" || originalValue === null || originalValue === undefined) {
                                return field.required ? undefined : null;
                            }
                            return value;
                        });
                    break;
                    
                case "select":
                case "radio":
                    schema = Yup.string();
                    break;
                    
                case "lookup":
                    // Lookup fields return objects, so use mixed type
                    schema = Yup.mixed();
                    break;
                    
                case "fileUpload":
                    schema = Yup.mixed();
                    break;
                    
                case "textarea":
                case "input":
                case "password":
                default:
                    // Only apply string transformations if the field type supports it
                    if (["textarea", "input", "password", "email", "phone"].includes(field.type)) {
                        schema = Yup.string()
                            .transform((value) => typeof value === 'string' ? value?.trim() : value);
                    } else {
                        // For unknown field types, use mixed to avoid errors
                        schema = Yup.mixed();
                    }
                    break;
            }

            // Apply validators in order
            if (field.validators && field.validators.length > 0) {
                field.validators.forEach((validator) => {
                    try {
                        switch (validator.type) {
                            case "required":
                                if (field.type === "number") {
                                    schema = (schema as Yup.NumberSchema).required(validator.message);
                                } else if (field.type === "date") {
                                    schema = (schema as Yup.DateSchema).required(validator.message);
                                } else {
                                    schema = (schema as Yup.StringSchema).required(validator.message);
                                }
                                break;
                                
                            case "min":
                                if (field.type === "number") {
                                    schema = (schema as Yup.NumberSchema).min(validator.value as number, validator.message);
                                } else if (["input", "textarea", "password"].includes(field.type)) {
                                    schema = (schema as Yup.StringSchema).min(validator.value as number, validator.message);
                                }
                                break;
                                
                            case "max":
                                if (field.type === "number") {
                                    schema = (schema as Yup.NumberSchema).max(validator.value as number, validator.message);
                                } else if (["input", "textarea", "password"].includes(field.type)) {
                                    schema = (schema as Yup.StringSchema).max(validator.value as number, validator.message);
                                }
                                break;
                                
                            case "pattern":
                                if (["input", "textarea", "password", "phone"].includes(field.type)) {
                                    schema = (schema as Yup.StringSchema).matches(
                                        new RegExp(validator.value as string),
                                        validator.message
                                    );
                                }
                                break;
                                
                            case "email":
                                // Email validation is handled in base schema
                                if (field.type === "email") {
                                    schema = (schema as Yup.StringSchema).email(validator.message);
                                } else if (field.type === "input" && validator.type === "email") {
                                    // For input fields with email validator
                                    schema = (schema as Yup.StringSchema).email(validator.message);
                                }
                                break;

                            case "minDate":
                                if (field.type === "date") {
                                    const minDate = validator.value ? new Date(validator.value as string) : undefined;
                                    if (minDate && !isNaN(minDate.getTime())) {
                                        schema = (schema as Yup.DateSchema).min(minDate, validator.message);
                                    } else {
                                        console.warn(`Invalid minDate value for ${field.key}:`, validator.value);
                                    }
                                }
                                break;

                            case "maxDate":
                                if (field.type === "date") {
                                    const maxDate = validator.value ? new Date(validator.value as string) : undefined;
                                    if (maxDate && !isNaN(maxDate.getTime())) {
                                        schema = (schema as Yup.DateSchema).max(maxDate, validator.message);
                                    } else {
                                        console.warn(`Invalid maxDate value for ${field.key}:`, validator.value);
                                    }
                                }
                                break;
                        }
                    } catch (error) {
                        console.warn(`Error applying validator ${validator.type} to field ${field.key}:`, error);
                    }
                });
            }

            // Handle required field without explicit validator
            if (field.required && !field.validators?.some(v => v.type === "required")) {
                if (field.type === "number") {
                    schema = (schema as Yup.NumberSchema).required("This field is required");
                } else if (field.type === "date") {
                    schema = (schema as Yup.DateSchema).required("This field is required");
                } else {
                    schema = (schema as Yup.StringSchema).required("This field is required");
                }
            }

            shape[field.key] = schema;
        });
    });

    return Yup.object().shape(shape);
}

// Utility function to validate a single field
export function validateField(field: FieldConfig, value: any): string | null {
    try {
        const fieldSchema = generateSchema({
            steps: [{
                title: "temp",
                fields: [field]
            }]
        });
        
        fieldSchema.validateSyncAt(field.key, { [field.key]: value });
        return null; // No error
    } catch (error: any) {
        return error.message;
    }
}

// Utility function to validate form data against config
export function validateFormData(config: FormConfig, data: Record<string, any>): Record<string, string[]> {
    try {
        const schema = generateSchema(config);
        schema.validateSync(data, { abortEarly: false });
        return {}; // No errors
    } catch (error: any) {
        const errors: Record<string, string[]> = {};
        
        if (error.inner) {
            error.inner.forEach((err: any) => {
                if (err.path) {
                    if (!errors[err.path]) {
                        errors[err.path] = [];
                    }
                    errors[err.path].push(err.message);
                }
            });
        }
        
        return errors;
    }
}
