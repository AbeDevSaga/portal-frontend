export type FieldType = "input" | "textarea" | "select" | "radio" | "date" | "number" | "email" | "password" | "fileUpload" | "phone" | "lookup" | "checkbox";

export interface Option {
    label: string;
    value: string;
    disabled?: boolean;
    data?: Record<string, any>; // Additional data for custom rendering
}

export interface FileMetadata {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    id: string;
}

export interface ValidatorConfig {
    type: "required" | "min" | "max" | "email" | "pattern" | "minDate" | "maxDate";
    value?: number | string | Date;
    message: string;
}

export interface OptionConfig {
    label: string;
    value: string;
    // value: string | number;
}

export interface FieldConfig {
    type: FieldType;
    key: string;
    label: string;
    placeholder?: string;
    description?: string; // Optional description to display below the field
    required?: boolean;
    validators?: ValidatorConfig[];
    options?: Option[];
    group?: string;
    groupOrder?: number;
    // File upload specific properties
    multiple?: boolean;
    maxFileSize?: number; // in bytes
    minFiles?: number;
    maxFiles?: number;
    allowedTypes?: string[]; // e.g., ['image/*', '.pdf', '.doc']
    // Select specific properties
    searchable?: boolean; // For react-select
    clearable?: boolean; // For react-select
    disabled?: boolean; // For any field type
    // Dynamic field behavior callbacks (available for all field types)
    getDependentValue?: (formValues: any) => any; // Get value from dependent field
    getDescription?: (dependentValue: any) => string; // Dynamic description based on dependent value
    isDisabled?: (dependentValue: any) => boolean; // Dynamic disabled state based on dependent value
    getPlaceholder?: (dependentValue: any) => string; // Dynamic placeholder based on dependent value
    isHide?: (dependentValue: any) => boolean; // Dynamic visibility based on dependent value
    isRequired?: (dependentValue: any) => boolean; // Dynamic requirement based on dependent value
    // Lookup specific properties
    lookupConfig?: {
        apiEndpoint: string;
        method?: 'GET' | 'POST';
        requestBody?: Record<string, any>;
        headers?: Record<string, string>;
        valueKey?: string; // Default: 'id'
        labelKey?: string; // Default: 'name'
        searchKey?: string; // For search functionality
        debounceMs?: number; // Debounce search requests
        minSearchLength?: number; // Minimum characters before searching
        cacheResults?: boolean; // Whether to cache API results
        transformResponse?: (data: any) => Option[]; // Custom transformation function
        // Dependent field functionality for API requests
        transformRequest?: (request: any, dependentValue: any) => any; // Transform API request based on dependent value
        // Default value support
        defaultValue?: any; // Default value for the lookup field (can be simple value or object)
        // Note: When a lookup field is selected, it returns the complete selected object
        // containing all properties (value, label, and any additional data)
        // Dynamic field behavior callbacks for lookup fields (can also be used at field level)
        getDependentValue?: (formValues: any) => any; // Get value from dependent field
        getDescription?: (dependentValue: any) => string; // Dynamic description based on dependent value
        isDisabled?: (dependentValue: any) => boolean; // Dynamic disabled state based on dependent value
        getPlaceholder?: (dependentValue: any) => string; // Dynamic placeholder based on dependent value
        isHide?: (dependentValue: any) => boolean; // Dynamic visibility based on dependent value
        isRequired?: (dependentValue: any) => boolean; // Dynamic requirement based on dependent value
    };
}

export interface StepConfig {
    title: string;
    fields: FieldConfig[];
    // 🆕 New: Step-level grouping information
    group?: string;
    groupOrder?: number;
    // 🆕 New: Tabular display option for fields
    tabular?: boolean; // If true, fields will be displayed in tabular/accordion format
    defaultExpanded?: boolean;
}

export interface FormConfig {
    steps: StepConfig[];
    stepperData?: {
        label: string;
        content: React.ReactNode;
    }[];
    stepperPosition?: "top" | "left" | "";
    // 🆕 New: Global grouping configuration
    grouping?: {
        defaultGroup?: string;
        groups?: {
            name: string;
            label: string;
            order: number;
        }[];
    };
}

// 🆕 New: Utility types for dynamic field grouping
export interface FieldGroup {
    name: string;
    label: string;
    order: number;
    fields: FieldConfig[];
}

export interface GroupedFields {
    [groupName: string]: FieldGroup;
}
