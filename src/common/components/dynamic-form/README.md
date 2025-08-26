# Dynamic Form Components

This directory contains reusable form components with live preview functionality that can be used across all pages in the project. The components now integrate with Redux for **completely dynamic form state management** that works for any page/route based on their individual `formConfig`.

## 🎯 **Key Feature: Universal Dynamic System**

**One Redux slice, infinite form configurations!** Each page defines its own `formConfig` and the system automatically adapts:

- ✅ **No hardcoded configurations** - works with any `FormConfig`
- ✅ **Automatic state initialization** - Redux adapts to each form structure
- ✅ **Independent form states** - each page manages its own form data
- ✅ **Seamless switching** - can switch between different form types
- ✅ **Type-safe** - full TypeScript support for all configurations

## 🆕 **NEW: Enhanced Live Preview with Step-Based Display & Accordion Support**

The `LivePreview` component now supports **three display modes** with automatic accordion support:

### 1. **Accordion Preview (Recommended for Multi-Step Forms)**
When you pass the `config` prop **AND** `stepperData` is not empty, the preview automatically shows:
- **🎯 Collapsible accordion items** for each step
- **🔢 Step indicators** with numbered badges
- **📋 Field labels as keys** with their corresponding values
- **📱 Better mobile experience** with expandable sections
- **⚡ Real-time updates** as you type

```tsx
<LivePreview
    title="Form Preview"
    formValues={formValues}
    groupMap={groupMap}
    allFields={allFields}
    config={formConfig}  // 🆕 This enables step-based preview!
    // If stepperData is not empty, accordion mode is automatically activated
/>
```

**Result with Accordion:**
```
┌─ [1] Personal Information ▼ ──────────────────────┐
│ First Name: John                                  │
│ Last Name: Doe                                    │
└────────────────────────────────────────────────────┘

┌─ [2] Contact Information ▼ ───────────────────────┐
│ Email: john.doe@example.com                       │
│ Phone: +1-555-0123                                │
└────────────────────────────────────────────────────┘

┌─ [3] Preferences ▼ ───────────────────────────────┐
│ Language: English                                 │
│ Newsletter: Yes                                   │
└────────────────────────────────────────────────────┘
```

### 2. **Step-Based Preview (Without Stepper)**
When you pass the `config` prop **BUT** `stepperData` is empty, the preview shows:
- **Step titles as headers** with horizontal lines
- **Field labels as keys** with their corresponding values
- **Organized by steps** for better readability
- **Horizontal separators** between steps

### 3. **Group-Based Preview (Fallback)**
When no `config` is provided, falls back to the original grouped display based on `groupMap`.

## 🎯 **Automatic Accordion Detection**

The component automatically detects whether to use accordions based on your `formConfig`:

```tsx
export const formConfig: FormConfig = {
    // 🎯 WITH stepperData = Accordion mode activated
    stepperData: [
        { label: "Personal Info", content: "Personal Info" },
        { label: "Contact Info", content: "Contact Info" },
        { label: "Review", content: "Review" },
    ],
    steps: [
        // ... your steps
    ],
};

// Result: Accordion preview with collapsible steps
```

```tsx
export const formConfig: FormConfig = {
    // 📋 WITHOUT stepperData = Regular step preview
    stepperData: [], // Empty array
    steps: [
        // ... your steps
    ],
};

// Result: Regular step preview with horizontal separators
```

## 🎨 **Accordion Features**

When accordion mode is activated, each step includes:

- **🔢 Step Number Badge**: Circular badge showing step order
- **📋 Step Title**: Clear, readable step name
- **📱 Expand/Collapse**: Click to show/hide step content
- **🎨 Visual Indicators**: Plus/minus icons for expand/collapse state
- **⚡ Smooth Animations**: Smooth accordion transitions
- **📱 Mobile Optimized**: Touch-friendly expand/collapse

## 🚀 **NEW: Dynamic Field Grouping System**

**🆕 No more hardcoded `groupMap` and `allFields`!** The system now automatically generates field grouping from your `formConfig`:

### **Before (Hardcoded - ❌):**
```tsx
// ❌ OLD WAY - Hardcoded in each page
const groupMap: Record<string, string> = {
    fathername: "Personal Details",
    grandfathername: "Personal Details",
    sex: "Personal Details",
    // ... more hardcoded mappings
};

const allFields = formConfig.steps.flatMap((step) => step.fields);
```

### **After (Dynamic - ✅):**
```tsx
// ✅ NEW WAY - Automatically generated from formConfig
import { generateFieldGrouping } from "@/common/utils/dynamic-form/fieldGrouping";

const { allFields, groupMap } = generateFieldGrouping(formConfig);
// No more hardcoded values!
```

### **Multiple Grouping Strategies Available:**

#### **1. Config-Based Grouping (Recommended)**
```tsx
const { allFields, groupMap } = generateFieldGrouping(formConfig);
```
Uses explicit group definitions from your `formConfig`.

#### **2. Advanced Grouping**
```tsx
const { allFields, groupMap } = generateAdvancedFieldGrouping(formConfig);
```
Custom group labels and ordering with fallback to config-based.

#### **3. Step-Based Grouping**
```tsx
const { allFields, groupMap } = generateStepBasedGrouping(formConfig);
```
Each step becomes a group automatically.

#### **4. Automatic Grouping**
```tsx
const { allFields, groupMap } = generateAutomaticGrouping(formConfig);
```
AI-powered field grouping based on field names and types.

### **Enhanced FormConfig with Grouping:**
```tsx
export const formConfig: FormConfig = {
    // 🆕 Global grouping configuration
    grouping: {
        defaultGroup: "Personal Information",
        groups: [
            { name: "Personal Information", label: "Personal Information", order: 1 },
            { name: "Contact Information", label: "Contact Information", order: 2 },
        ],
    },
    steps: [
        {
            title: "Personal Information",
            group: "Personal Information", // 🆕 Step-level grouping
            groupOrder: 1,
            fields: [
                {
                    type: "input",
                    key: "firstName",
                    label: "First Name",
                    group: "Personal Information", // 🆕 Field-level grouping
                    groupOrder: 1,
                    // ... other properties
                },
            ],
        },
    ],
};
```

## Components

### 1. LivePreview
A standalone component that displays a live preview of form data with **step-based organization** and customizable styling.

**Props:**
- `title`: The title displayed in the preview header
- `subtitle`: Optional subtitle
- `avatarSrc`: Source for the avatar image
- `avatarAlt`: Alt text for the avatar
- `formValues`: Object containing the current form values
- `groupMap`: Mapping of field keys to group names for organization
- `allFields`: Array of field objects with `key` and `label` properties
- `className`: Additional CSS classes
- `style`: Custom inline styles
- **🆕 `config`**: FormConfig object for step-based preview (optional)

**Features:**
- **🎯 Step-Based Display**: Automatically organizes fields by steps when `config` is provided
- **📋 Field Labels**: Shows field labels as keys with their values
- **🔗 Horizontal Separators**: Clean visual separation between steps
- **📱 Responsive Layout**: Adapts to different screen sizes
- **🎨 Customizable Styling**: Full control over appearance

**Usage with Step-Based Preview:**
```tsx
import { LivePreview } from '@/common/components/dynamic-form';

<LivePreview
    title="User Registration"
    formValues={formValues}
    groupMap={groupMap}
    allFields={allFields}
    config={formConfig}        // 🆕 Enable step-based preview
/>
```

**Usage with Group-Based Preview:**
```tsx
<LivePreview
    title="User Registration"
    formValues={formValues}
    groupMap={groupMap}
    allFields={allFields}
    // No config = group-based preview
/>
```

### 2. FormWithSidePreview
A layout component that provides a side-by-side view with the form on the left and live preview on the right.

**Props:**
- `formContent`: React node containing the form
- `formValues`: Object containing the current form values
- `groupMap`: Mapping of field keys to group names
- `allFields`: Array of field objects
- `previewTitle`: Title for the preview section
- `layout`: Layout ratio - "2-1", "1-1", or "3-1" (default: "2-1")
- **🆕 `config`**: FormConfig object for step-based preview (optional)
- All other props from LivePreview

**Usage:**
```tsx
import { FormWithSidePreview } from '@/common/components/dynamic-form';

<FormWithSidePreview
    formContent={<YourForm />}
    formValues={formValues}
    groupMap={groupMap}
    allFields={allFields}
    previewTitle="Preview Title"
    layout="2-1"
    config={formConfig}        // 🆕 Enable step-based preview
/>
```

### 3. DynamicForm
A dynamic form component that automatically adapts to **any** form configuration and integrates with Redux.

**Props:**
- `config`: FormConfig object defining the form structure
- `handleSubmit`: Function called when form is submitted
- `formStyle`: Optional CSS classes for form styling
- `initialValues`: Optional initial values (merged with Redux state)
- `autoInitialize`: Whether to auto-initialize Redux state (default: true)

**Features:**
- **🎯 Universal**: Works with ANY form configuration automatically
- **🔄 Automatic Redux Integration**: Uses `useDynamicForm` hook for state management
- **🧠 Smart Stepper Logic**: Handles multi-step vs single form automatically
- **📊 Form Info Display**: Shows total steps, fields, and data status
- **🔄 Reset Functionality**: Reset button to clear form data
- **⚡ Real-time Updates**: Form values are automatically synced with Redux

**Usage:**
```tsx
import { DynamicForm } from '@/common/components/dynamic-form';

<DynamicForm
    config={formConfig}        // Your page's unique config
    handleSubmit={handleSubmit}
    formStyle="grid grid-cols-2 gap-4"
    autoInitialize={true}      // Auto-setup Redux
/>
```

### 4. DynamicFormWithPreview
An enhanced version of DynamicForm that includes built-in live preview functionality with **step-based organization**.

**Props:**
- All props from DynamicForm
- `showPreview`: Boolean to show/hide preview (default: true)
- `previewTitle`: Title for the preview
- All other props from LivePreview

**Features:**
- **🎯 Step-Based Preview**: Automatically organizes preview by steps when config is provided
- **📋 Field Labels**: Shows field labels with their values
- **🔗 Visual Separators**: Clean horizontal lines between steps
- **🔄 Real-time Updates**: Preview updates as you type

**Usage:**
```tsx
import { DynamicFormWithPreview } from '@/common/components/dynamic-form';

<DynamicFormWithPreview
    config={formConfig}
    handleSubmit={handleSubmit}
    formStyle="grid grid-cols-2 gap-4"
    showPreview={true}
    previewTitle="Form Preview"
    groupMap={groupMap}
    allFields={allFields}
    autoInitialize={true}
/>
```

## 🚀 **Redux Integration - Universal & Dynamic**

### useDynamicForm Hook
A custom hook that provides easy access to dynamic form functionality for **any** form configuration:

```tsx
import { useDynamicForm } from '@/hooks/useDynamicForm';

const {
    formValues,           // Current form values from Redux
    updateFieldValue,     // Update a single field
    setFormData,          // Set multiple fields
    resetFormData,        // Reset form to initial state
    clearFormData,        // Clear all form data
    hasFormData,          // Check if form has data
    totalSteps,           // Total number of steps
    totalFields,          // Total number of fields
    getCurrentStepData,   // Get data for specific step
    isCurrentStepValid,   // Validate current step
    formMetadata,         // Form configuration metadata
} = useDynamicForm({ 
    config: formConfig,   // Your page's unique config
    autoInitialize: true, // Auto-setup Redux
    defaultValues: {}     // Optional default values
});
```

### Redux Actions - Universal for All Forms
The following actions work with **any** form configuration:

- `initializeForm({ config })` - Initialize form with any configuration
- `setFormConfig({ config })` - Switch to different form configuration
- `updateField({ key, value })` - Update single field
- `setData(data)` - Set multiple fields
- `resetForm({ config })` - Reset to initial state for current config
- `clearForm()` - Clear all data
- `updateMultipleFields(data)` - Update multiple fields
- `removeFields({ keys })` - Remove specific fields
- `batchUpdateFields({ updates, config })` - Batch update with validation
- `initializeWithDefaults({ config, defaultValues })` - Initialize with defaults

## 📋 **Form Configuration - Define Once, Use Everywhere**

### **🆕 Enhanced FormConfig with Grouping:**
```tsx
export const formConfig: FormConfig = {
    // 🆕 Global grouping configuration
    grouping: {
        defaultGroup: "Personal Information",
        groups: [
            { name: "Personal Information", label: "Personal Information", order: 1 },
            { name: "Contact Information", label: "Contact Information", order: 2 },
        ],
    },
    steps: [
        {
            title: "Personal Information",
            group: "Personal Information", // 🆕 Step-level grouping
            groupOrder: 1,
            fields: [
                {
                    type: "input",
                    key: "firstName",
                    label: "First Name",
                    group: "Personal Information", // 🆕 Field-level grouping
                    groupOrder: 1,
                    // ... other properties
                },
            ],
        },
    ],
};
```

### Stepper Logic
The dynamic form components intelligently handle stepper behavior:

- **With Stepper** (`stepperData` has items): Shows multi-step form with Next/Previous navigation
- **Without Stepper** (`stepperData` is empty or undefined): Shows all fields at once with only Submit button

### Stepper Positioning
You can control where the stepper appears:

```tsx
export const formConfig: FormConfig = {
    stepperData: [], // Empty array = no stepper
    stepperPosition: "top", // "top" | "left" | ""
    steps: [
        // ... your steps
    ]
};
```

**Positions:**
- `"top"`: Stepper appears above the form (default)
- `"left"`: Stepper appears to the left of the form in a side-by-side layout
- `""`: No stepper (when stepperData is empty)

**Left Stepper Features:**
- **Side-by-side layout**: Uses flexbox for proper spacing
- **Vertical orientation**: Step titles are displayed vertically (up and down)
- **Sticky positioning**: Stepper stays visible while scrolling
- **Responsive**: Only shows on large screens (lg: breakpoint)
- **No overlap**: Properly spaced from form content with gap-8

## 🎨 **Usage Examples - Different Pages, Different Configs**

### **🆕 Example 1: Birth Registration Page (Dynamic Grouping)**
```tsx
// app/home/birth-registration/new/page.tsx
import { generateFieldGrouping } from "@/common/utils/dynamic-form/fieldGrouping";
import { formConfig } from "./birth-form-fields";

export default function BirthRegistrationPage() {
    const formValues = useSelector((state: RootState) => state.birthSlice);
    
    // 🆕 Dynamic field grouping from formConfig - no more hardcoded values!
    const { allFields, groupMap } = generateFieldGrouping(formConfig);

    return (
        <FormWithSidePreview
            formContent={<DynamicForm config={formConfig} />}
            formValues={formValues}
            groupMap={groupMap}        // 🆕 Automatically generated!
            allFields={allFields}      // 🆕 Automatically generated!
            config={formConfig}        // 🆕 Enable step-based preview
        />
    );
}
```

### **🆕 Example 2: Sample Form Page (Advanced Grouping)**
```tsx
// app/home/sample-form/page.tsx
import { generateAdvancedFieldGrouping } from "@/common/utils/dynamic-form/fieldGrouping";

export default function SampleFormPage() {
    const { allFields, groupMap } = generateAdvancedFieldGrouping(formConfig);
    
    return (
        <DynamicForm
            config={formConfig}
            // groupMap and allFields are automatically generated!
        />
    );
}
```

### **🆕 Example 3: Form with Different Grouping Strategies**
```tsx
// Choose your grouping strategy
const { allFields, groupMap } = generateFieldGrouping(formConfig);           // Config-based
const { allFields, groupMap } = generateAdvancedFieldGrouping(formConfig);   // Advanced
const { allFields, groupMap } = generateStepBasedGrouping(formConfig);       // Step-based
const { allFields, groupMap } = generateAutomaticGrouping(formConfig);       // Automatic
```

## 🔄 **Migration Guide**

### **🆕 From Hardcoded Grouping to Dynamic Grouping**

**Before (Hardcoded - ❌):**
```tsx
// ❌ OLD WAY - Hardcoded in each page
const groupMap: Record<string, string> = {
    fathername: "Personal Details",
    grandfathername: "Personal Details",
    sex: "Personal Details",
    // ... more hardcoded mappings
};

const allFields = formConfig.steps.flatMap((step) => step.fields);
```

**After (Dynamic - ✅):**
```tsx
// ✅ NEW WAY - Automatically generated from formConfig
import { generateFieldGrouping } from "@/common/utils/dynamic-form/fieldGrouping";

const { allFields, groupMap } = generateFieldGrouping(formConfig);
// No more hardcoded values!
```

**Steps to Migrate:**
1. **Add grouping to your formConfig** (see Enhanced FormConfig section above)
2. **Replace hardcoded groupMap and allFields** with dynamic generation
3. **Choose your grouping strategy** based on your needs
4. **Enjoy automatic updates** when you change your formConfig!

### From Old Implementation
If you have existing forms with hardcoded live preview sections:

1. **Extract the form content** into a separate variable or component
2. **🆕 Use dynamic field grouping** instead of hardcoded groupMap
3. **Replace the old layout** with `FormWithSidePreview`
4. **🆕 Add config prop** for step-based preview functionality

**Before:**
```tsx
<div className='flex flex-wrap xl:grid xl:grid-cols-3 gap-10'>
    <Card className='p-5 col-span-2'>
        <YourForm />
    </Card>
    <div className='col-span-1'>
        {/* Hardcoded preview */}
    </div>
</div>
```

**After:**
```tsx
import { generateFieldGrouping } from "@/common/utils/dynamic-form/fieldGrouping";

const { allFields, groupMap } = generateFieldGrouping(formConfig);

<FormWithSidePreview
    formContent={<YourForm />}
    formValues={formValues}
    groupMap={groupMap}        // 🆕 Automatically generated!
    allFields={allFields}      // 🆕 Automatically generated!
    previewTitle="Preview Title"
    layout="2-1"
    config={formConfig}        // 🆕 Enable step-based preview
/>
```

### From Static Redux
If you have existing forms using the old Redux approach:

1. **Replace manual Redux calls** with `useDynamicForm` hook
2. **Remove manual initialValues** - they're now handled automatically
3. **Use the new actions** like `resetFormData()` instead of manual state management
4. **🆕 Add config prop** to LivePreview components for enhanced display
5. **🆕 Use dynamic field grouping** instead of hardcoded groupMap

**Before:**
```tsx
const formValues = useSelector((state: RootState) => state.birth);
const dispatch = useDispatch();

const handleReset = () => {
    dispatch(resetForm());
};
```

**After:**
```tsx
const { formValues, resetFormData } = useDynamicForm({ config: formConfig });

const handleReset = () => {
    resetFormData();
};
```

## ✨ **Benefits**

- **🎯 Universal**: Works with ANY form configuration automatically
- **🔄 Dynamic**: Redux adapts to each form structure
- **♻️ Reusable**: Same components work across different pages
- **🧠 Smart**: Automatically handles stepper vs single form logic
- **📱 Responsive**: Proper stepper positioning and layout
- **⚡ Real-time**: Form values sync across all components
- **🔄 Persistent**: State persists between form steps
- **📊 Informative**: Shows form status and metadata
- **🔄 Independent**: Each page manages its own form state
- **🚀 Scalable**: Add new forms without changing Redux logic
- **🆕 Enhanced Preview**: Step-based organization with field labels
- **🔗 Visual Clarity**: Horizontal separators between steps
- **🆕 Dynamic Grouping**: No more hardcoded groupMap and allFields
- **🆕 Single source of truth**: Change formConfig, everything updates automatically
- **🆕 Multiple Strategies**: Choose from 4 different grouping approaches
- **🎯 Smart Accordion**: Automatic accordion mode when stepperData exists
- **📱 Better UX**: Collapsible steps for cleaner, organized preview
- **🎨 Visual Enhancements**: Step numbers, smooth animations, and clear indicators

## 📚 **Examples & Documentation**

See the following files for implementation examples:
- `UsageExamples.tsx` - Complete examples of different form types
- `StepPreviewDemo.tsx` - Enhanced live preview functionality with accordion support
- **🆕 `GroupingStrategiesDemo.tsx`** - Dynamic field grouping strategies
- `app/home/birth-registration/new/page.tsx` - Birth registration form with dynamic grouping
- `app/home/sample-form/examplejson/page.tsx` - Multi-step form with advanced grouping and accordion preview
- `app/home/birthcreate/page.tsx` - Custom form with preview

## 🎉 **The Result**

Now you have a **completely dynamic form system** with **enhanced live preview** and **dynamic field grouping** where:

1. **Each page defines its own `formConfig`** in a JSON file
2. **Redux automatically adapts** to handle any form structure
3. **Components work universally** with any configuration
4. **No hardcoded dependencies** - truly flexible and scalable
5. **Type-safe** with full TypeScript support
6. **Easy to maintain** - update forms by changing config files
7. **🆕 Enhanced preview** - step-based organization with field labels
8. **🔗 Visual clarity** - horizontal separators between steps
9. **🆕 Dynamic grouping** - no more hardcoded groupMap and allFields
10. **🆕 Single source of truth** - change formConfig, everything updates automatically

**Define once, use everywhere with beautiful step-based previews and dynamic field grouping!** 🚀✨🔄

## 🧪 **FIXED: Enhanced Validation System**

### **✅ What Was Fixed:**

1. **🔢 Number Field Validation**: 
   - `min`, `max`, and `required` validations now work properly for number fields
   - Proper type conversion and validation chain
   - Real-time validation feedback

2. **📧 Email Field Validation**: 
   - **🆕 FIXED**: "test" now properly shows "Invalid email format"
   - **🆕 IMPORTANT**: Use `type: "email"` for email fields (not `type: "input"`)
   - Email validation now works correctly for both base schema and explicit validators
   - Proper format checking for email fields

3. **📞 Phone Field Validation**: 
   - **🆕 FIXED**: "12232323" now properly shows "Please enter a valid Ethiopian phone number"
   - Pattern validation now works for phone fields
   - Ethiopian phone validation with specific regex pattern

4. **📋 Schema Generator**: 
   - Fixed syntax errors and validation logic
   - Enhanced schema generation with proper type handling
   - Better error handling and validation chaining
   - **🆕 FIXED**: Pattern validation now includes phone fields
   - **🆕 FIXED**: Email validation properly applied for email fields

5. **🔄 Field Renderer**: 
   - Number fields now properly integrate with Redux
   - Proper onChange event handling
   - Validation error display

6. **⚡ Enhanced Schema Functions**:
   - `generateEnhancedSchema()` - Advanced schema with transformations
   - `validateField()` - Single field validation utility
   - `validateFormData()` - Complete form validation utility

7. **📁 Enhanced File Upload**:
   - **🆕 Dynamic File Constraints**: Configurable file size limits, file count limits
   - **🆕 File Type Validation**: Support for allowed file types and MIME types
   - **🆕 Multiple File Support**: Single or multiple file uploads
   - **🆕 File Display**: Shows selected file names, sizes, and types
   - **🆕 File Removal**: Individual file removal with proper state management
   - **🆕 Real-time Validation**: Immediate feedback on file constraints
   - **🆕 FIXED**: No more client-side exceptions - proper serialization handling

8. **🎯 Enhanced Select Fields**:
   - **🆕 React-Select Integration**: Modern, feature-rich select component
   - **🆕 Multi-Select Support**: Choose multiple options with tags
   - **🆕 Search Functionality**: Type to search through options
   - **🆕 Custom Styling**: Integrated with your design system
   - **🆕 Custom Option Rendering**: Icons, descriptions, and rich content
   - **🆕 Clearable Options**: Easy option removal
   - **🆕 Disabled Options**: Individual option disabling
   - **🆕 Keyboard Navigation**: Full keyboard accessibility

### **🎯 Validation Features Now Working:**

```tsx
// Number field with full validation
{
    type: "number",
    key: "age",
    label: "Age",
    description: "You must be at least 18 years old to proceed",
    validators: [
        { type: "required", message: "Age is required" },
        { type: "min", value: 18, message: "Must be at least 18" },
        { type: "max", value: 100, message: "Must be less than 100" },
    ],
    required: true,
}
```

### **🆕 NEW: Field Descriptions**

Every field type now supports an optional `description` property that displays helpful text below the field:

```tsx
{
    type: "input",
    key: "firstName",
    label: "First Name",
    description: "Enter your legal first name as it appears on official documents",
    validators: [
        { type: "required", message: "First name is required" },
    ],
    required: true,
}
```

**Features:**
- **📝 Helpful Text**: Display instructions, hints, or additional context
- **🎨 Consistent Styling**: Uses `text-[#7D7D7D]` color for subtle appearance
- **📱 Responsive**: Automatically adjusts spacing and layout
- **⚡ Smart Display**: Only shows when description exists and is not empty
- **🔧 All Field Types**: Works with input, select, date, file upload, etc.

**Result:**
```
First Name *                                    ← Field Label
[Input field]                                   ← Input Element
Enter your legal first name as it appears...   ← Description (in gray)
[Error message if any]                          ← Validation Error
```
