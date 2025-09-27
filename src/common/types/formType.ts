export type FieldType =
  | "input"
  | "textarea"
  | "select"
  | "radio"
  | "date"
  | "number"
  | "email"
  | "password"
  | "fileUpload"
  | "phone"
  | "lookup"
  | "checkbox"
  | "digitalSignature"
  | "inputSearch"
  | "formArray"
  | "payment"
  | "detail"
  | "array";

export interface Option {
  id?: string;
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
  type:
    | "required"
    | "min"
    | "max"
    | "email"
    | "pattern"
    | "minDate"
    | "maxDate"
    | "minAge"
    | "button"; // <-- new type for controlling Add button
  value?: number | string | Date | "dynamic";
  label?: string;
  message: string;
  condition?: (formValues: any) => boolean; // Optional condition function to make validator conditional

  // New properties for Add Button control
  button?: boolean; // If true, this validator applies to the add button
  maxItems?: number; // Maximum items allowed when button is true
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
  // Grid layout configuration
  gridCols?: 1 | 2 | 3 | 4 | 6 | 12; // Number of grid columns this field should span
  gridRow?: number; // Optional row positioning
  // Custom styling
  className?: string; // Optional CSS classes for custom field styling
  labelClassName?: string; // Optional CSS classes for custom label styling
  // Default value for any field type
  defaultValue?: any | ((dependentValue: any) => any); // Default value for the field
  // File upload specific properties
  multiple?: boolean;
  maxFileSize?: number; // in bytes
  minFiles?: number;
  maxFiles?: number;
  allowedTypes?: string[]; // e.g., ['image/*', '.pdf', '.doc']
  showPreview?: boolean; // Whether to show file preview
  // Select specific properties
  searchable?: boolean; // For react-select
  clearable?: boolean; // For react-select
  disabled?: boolean; // For any field type
  digitalSignatureConfig?: DigitalSignatureConfig;
  // FormArray specific properties
  formArrayConfig?: FormArrayConfig;
  // Dynamic field behavior callbacks (available for all field types)
  getDependentValue?: (formValues: any) => any; // Get value from dependent field
  getDependentKey?: (formValues: any) => any; // Get key from dependent field
  getDescription?: (dependentValue: any) => string; // Dynamic description based on dependent value
  isDisabled?: (dependentValue: any) => boolean; // Dynamic disabled state based on dependent value
  getPlaceholder?: (dependentValue: any) => string; // Dynamic placeholder based on dependent value
  isHide?: (dependentValue: any) => boolean; // Dynamic visibility based on dependent value
  isRequired?: (dependentValue: any) => boolean; // Dynamic requirement based on dependent value
  getLength?: (formValues: any) => any; // Get value from dependent field

  actionButton?: {
    label: string;
    onClick?: (val: string) => void;
  };

  //create inner fileds

  fields?: FieldConfig[];
  // Lookup specific properties
  lookupConfig?: {
    isExternal?: boolean;
    baseUrl?: string; // Custom base URL for the API endpoint (overrides environment variable)
    apiEndpoint: string;
    method?: "GET" | "POST";
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
    getDependentKey?: (formValues: any) => any; // Get key from dependent field
  };
  // InputSearch specific properties
  inputSearchConfig?: {
    isExternal?: boolean; // Whether to use external API or local API route
    baseUrl?: string; // Custom base URL for the API endpoint (overrides environment variable)
    apiEndpoint: string;
    method?: "GET" | "POST";
    headers?: Record<string, string>;
    searchKey?: string; // Default: 'search'
    searchFormat?: "query" | "path"; // Default: 'query' - whether to send search term as query parameter or path parameter
    valueKey?: string; // Default: 'id'
    labelKey?: string; // Default: 'name'
    minSearchLength?: number; // Minimum characters before searching (default: 3)
    debounceMs?: number; // Debounce search requests (default: 300)
    cacheResults?: boolean; // Whether to cache API results
    transformResponse?: (data: any) => any[]; // Custom transformation function
    transformRequest?: (request: any, dependentValue: any) => any; // Transform API request based on dependent value
    placeholder?: string; // Placeholder for the search input
    noOptionsMessage?: string; // Message when no options are found
    loadingMessage?: string; // Message while loading
    additionalParams?: Record<string, any>; // Additional query parameters to include in the request
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
  title?: string; // Optional title for the form
  description?: string; // Optional description for the form
  showTitle?: boolean; // Whether to show the title section (default: true)
  // 🆕 New: Global grouping configuration
  grouping?: {
    group?: string;
    defaultGroup?: string;
    groups?: {
      name: string;
      label: string;
      order: number;
    }[];
  }[];
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

export interface DigitalSignatureConfig {
  canvasWidth?: number; // Width of the signature canvas
  canvasHeight?: number; // Height of the signature canvas
  penColor?: string; // Color of the pen
  penWidth?: number; // Width of the pen stroke
  backgroundColor?: string; // Background color of the canvas
  showClearButton?: boolean; // Whether to show clear button
  showSaveButton?: boolean; // Whether to show save button
  required?: boolean; // Whether signature is required
  placeholder?: string; // Placeholder text when no signature
  validationMessage?: string; // Custom validation message
}

export interface FormArrayConfig {
  // Configuration for the form array field
  minItems?: number; // Minimum number of items required
  maxItems?: number; // Maximum number of items allowed
  addButtonText?: string; // Text for the add button
  removeButtonText?: string; // Text for the remove button
  groupTitle?: string; // Title for each group (e.g., "Item {index}")
  groupFields: FieldConfig[]; // Fields that make up each group
  allowEmpty?: boolean; // Whether to allow empty groups
  defaultGroupCount?: number; // Number of groups to show by default
}
