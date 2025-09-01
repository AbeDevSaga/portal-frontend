import { FieldConfig, FormConfig, StepConfig } from "@/common/types/formType";
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

// Enhanced schema generator with dynamic requirements and visibility support
export function generateEnhancedSchema(config: FormConfig) {
    const shape: Record<string, Schema<any> | Yup.Lazy<any>> = {};

    config.steps?.forEach((step: StepConfig) => {
        step.fields.forEach((field: FieldConfig) => {
            let schema: Schema<any> | Yup.Lazy<any>;

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
                                    if (validator.value === "dynamic") {
                                        // For dynamic max date, use a custom test that calculates current date at validation time
                                        schema = (schema as Yup.DateSchema).test(
                                            `dynamic-max-date-${field.key}`,
                                            validator.message,
                                            function (value: any) {
                                                if (!value) return true; // Let required validation handle empty values
                                                const maxDate = new Date();
                                                maxDate.setHours(23, 59, 59, 999); // Set to end of today
                                                const selectedDate = new Date(value);
                                                if (selectedDate > maxDate) {
                                                    return this.createError({ message: validator.message });
                                                }
                                                return true;
                                            }
                                        );
                                    } else {
                                        const maxDate = validator.value ? new Date(validator.value as string) : undefined;
                                        if (maxDate && !isNaN(maxDate.getTime())) {
                                            schema = (schema as Yup.DateSchema).max(maxDate, validator.message);
                                        } else {
                                            console.warn(`Invalid maxDate value for ${field.key}:`, validator.value);
                                        }
                                    }
                                }
                                break;
                        }
                    } catch (error) {
                        console.warn(`Error applying validator ${validator.type} to field ${field.key}:`, error);
                    }
                });
            }

            // Handle dynamic requirements and visibility
            // Create a conditional validation that considers both isHide and isRequired
            const baseRequiredCheck = field.required && !field.validators?.some(v => v.type === "required");
            
            if (baseRequiredCheck || field.isRequired || field.isHide) {
                // Use Yup.lazy to evaluate requirements dynamically based on current form values
                schema = Yup.lazy((value, context) => {
                    const formValues = context?.parent || {};
                    
                    // Get dependent values if the field has getDependentValue function
                    let dependentValues = null;
                    if (field.getDependentValue) {
                        try {
                            dependentValues = field.getDependentValue(formValues);
                        } catch (error) {
                            console.warn(`Error getting dependent values for field ${field.key}:`, error);
                        }
                    }
                    
                    // Check if field is hidden
                    const isHidden = field.isHide ? field.isHide(dependentValues) : false;
                    
                    // Check if field is dynamically required
                    const isDynamicallyRequired = field.isRequired ? field.isRequired(dependentValues) : false;
                    
                    // Final requirement check: hidden fields are never required
                    const isFieldRequired = !isHidden && (field.required || isDynamicallyRequired);
                    
                    // Create the appropriate schema based on field type
                    let dynamicSchema: Schema<any>;
                    switch (field.type) {
                        case "number":
                            dynamicSchema = Yup.number().typeError("Must be a valid number");
                            break;
                        case "date":
                            dynamicSchema = Yup.date().typeError("Must be a valid date");
                            break;
                        case "lookup":
                            dynamicSchema = Yup.mixed();
                            break;
                        default:
                            dynamicSchema = Yup.string();
                    }
                    
                    // Apply validators from field configuration
                    if (field.validators) {
                        field.validators.forEach((validator) => {
                            try {
                                // Check if validator has a condition function
                                if (validator.condition) {
                                    // For conditional validators, we need to check the condition at validation time
                                    // We'll wrap the validator in a test that checks the condition first
                                    const originalValidator = validator;
                                    
                                    dynamicSchema = dynamicSchema.test(
                                        `conditional-${validator.type}-${field.key}`,
                                        validator.message,
                                        function (value: any) {
                                            try {
                                                const formValues = this.parent;
                                                const shouldApplyValidator = originalValidator.condition!(formValues);
                                                
                                                // If condition is false, skip this validator (return true)
                                                if (!shouldApplyValidator) {
                                                    return true;
                                                }
                                                
                                                // If condition is true, apply the original validator logic
                                                switch (originalValidator.type) {
                                                    case "maxDate":
                                                        if (field.type === "date" && value) {
                                                            let maxDate: Date | undefined;
                                                            
                                                            // Handle dynamic date calculation
                                                            if (originalValidator.value === "dynamic") {
                                                                maxDate = new Date();
                                                                maxDate.setHours(23, 59, 59, 999); // Set to end of today
                                                            } else {
                                                                maxDate = originalValidator.value ? new Date(originalValidator.value as string) : undefined;
                                                            }
                                                            
                                                            if (maxDate && !isNaN(maxDate.getTime())) {
                                                                const selectedDate = new Date(value);
                                                                if (selectedDate > maxDate) {
                                                                    return this.createError({ message: originalValidator.message });
                                                                }
                                                            }
                                                        }
                                                        return true;
                                                    case "minDate":
                                                        if (field.type === "date" && value) {
                                                            const minDate = originalValidator.value ? new Date(originalValidator.value as string) : undefined;
                                                            if (minDate && !isNaN(minDate.getTime())) {
                                                                const selectedDate = new Date(value);
                                                                if (selectedDate < minDate) {
                                                                    return this.createError({ message: originalValidator.message });
                                                                }
                                                            }
                                                        }
                                                        return true;
                                                    case "required":
                                                        if (!value || (typeof value === 'string' && value.trim() === '')) {
                                                            return this.createError({ message: originalValidator.message });
                                                        }
                                                        return true;
                                                    case "min":
                                                        if (field.type === "number") {
                                                            if (value < (originalValidator.value as number)) {
                                                                return this.createError({ message: originalValidator.message });
                                                            }
                                                        } else if (["input", "textarea", "password"].includes(field.type)) {
                                                            if (value && value.length < (originalValidator.value as number)) {
                                                                return this.createError({ message: originalValidator.message });
                                                            }
                                                        }
                                                        return true;
                                                    case "max":
                                                        if (field.type === "number") {
                                                            if (value > (originalValidator.value as number)) {
                                                                return this.createError({ message: originalValidator.message });
                                                            }
                                                        } else if (["input", "textarea", "password"].includes(field.type)) {
                                                            if (value && value.length > (originalValidator.value as number)) {
                                                                return this.createError({ message: originalValidator.message });
                                                            }
                                                        }
                                                        return true;
                                                    default:
                                                        return true;
                                                }
                                            } catch (error) {
                                                console.warn(`Error in conditional validator ${originalValidator.type} for field ${field.key}:`, error);
                                                return true; // Don't fail validation on errors
                                            }
                                        }
                                    );
                                    
                                    return; // Skip the normal validator processing for conditional validators
                                }
                                
                                // Normal validator processing for non-conditional validators
                                switch (validator.type) {
                                    case "required":
                                        // Only apply required validation if field is not hidden
                                        if (!isHidden) {
                                            if (field.type === "number") {
                                                dynamicSchema = (dynamicSchema as Yup.NumberSchema).required(validator.message);
                                            } else if (field.type === "date") {
                                                dynamicSchema = (dynamicSchema as Yup.DateSchema).required(validator.message);
                                            } else if (field.type === "lookup") {
                                                dynamicSchema = (dynamicSchema as Yup.MixedSchema).required(validator.message)
                                                    .test('is-valid-lookup', 'Please select a valid option', (value: any) => {
                                                        if (!value) return false;
                                                        if (typeof value === 'object' && value !== null) {
                                                            return value.value || value.id;
                                                        }
                                                        return typeof value === 'string' && value.trim().length > 0;
                                                    });
                                            } else {
                                                dynamicSchema = (dynamicSchema as Yup.StringSchema).required(validator.message);
                                            }
                                        }
                                        break;
                                    case "min":
                                        if (field.type === "number") {
                                            dynamicSchema = (dynamicSchema as Yup.NumberSchema).min(validator.value as number, validator.message);
                                        } else if (["input", "textarea", "password"].includes(field.type)) {
                                            dynamicSchema = (dynamicSchema as Yup.StringSchema).min(validator.value as number, validator.message);
                                        }
                                        break;
                                    case "max":
                                        if (field.type === "number") {
                                            dynamicSchema = (dynamicSchema as Yup.NumberSchema).max(validator.value as number, validator.message);
                                        } else if (["input", "textarea", "password"].includes(field.type)) {
                                            dynamicSchema = (dynamicSchema as Yup.StringSchema).max(validator.value as number, validator.message);
                                        }
                                        break;
                                    case "pattern":
                                        if (["input", "textarea", "password"].includes(field.type)) {
                                            const regex = new RegExp(validator.value as string);
                                            dynamicSchema = (dynamicSchema as Yup.StringSchema).matches(regex, validator.message);
                                        }
                                        break;
                                    case "minDate":
                                        if (field.type === "date") {
                                            const minDate = validator.value ? new Date(validator.value as string) : undefined;
                                            if (minDate && !isNaN(minDate.getTime())) {
                                                dynamicSchema = (dynamicSchema as Yup.DateSchema).min(minDate, validator.message);
                                            }
                                        }
                                        break;
                                    case "maxDate":
                                        if (field.type === "date") {
                                            if (validator.value === "dynamic") {
                                                // For dynamic max date, use a custom test that calculates current date at validation time
                                                dynamicSchema = dynamicSchema.test(
                                                    `dynamic-max-date-${field.key}`,
                                                    validator.message,
                                                    function (value: any) {
                                                        if (!value) return true; // Let required validation handle empty values
                                                        const maxDate = new Date();
                                                        maxDate.setHours(23, 59, 59, 999); // Set to end of today
                                                        const selectedDate = new Date(value);
                                                        if (selectedDate > maxDate) {
                                                            return this.createError({ message: validator.message });
                                                        }
                                                        return true;
                                                    }
                                                );
                                            } else {
                                                const maxDate = validator.value ? new Date(validator.value as string) : undefined;
                                                if (maxDate && !isNaN(maxDate.getTime())) {
                                                    dynamicSchema = (dynamicSchema as Yup.DateSchema).max(maxDate, validator.message);
                                                }
                                            }
                                        }
                                        break;
                                }
                            } catch (error) {
                                console.warn(`Error applying validator ${validator.type} to field ${field.key}:`, error);
                            }
                        });
                    }
                    
                    // Apply dynamic requirement if field is not hidden
                    if (isFieldRequired && !field.validators?.some(v => v.type === "required")) {
                        if (field.type === "number") {
                            dynamicSchema = (dynamicSchema as Yup.NumberSchema).required("This field is required");
                        } else if (field.type === "date") {
                            dynamicSchema = (dynamicSchema as Yup.DateSchema).required("This field is required");
                        } else if (field.type === "lookup") {
                            dynamicSchema = (dynamicSchema as Yup.MixedSchema).required("This field is required")
                                .test('is-valid-lookup', 'Please select a valid option', (value: any) => {
                                    if (!value) return false;
                                    if (typeof value === 'object' && value !== null) {
                                        return value.value || value.id;
                                    }
                                    return typeof value === 'string' && value.trim().length > 0;
                                });
                        } else {
                            dynamicSchema = (dynamicSchema as Yup.StringSchema).required("This field is required");
                        }
                    }
                    
                    return dynamicSchema;
                });
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
