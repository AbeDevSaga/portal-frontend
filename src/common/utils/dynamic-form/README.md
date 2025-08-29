# Dynamic Grid Layout System

This utility provides a dynamic grid layout system that automatically adjusts when fields are hidden, ensuring that hidden fields don't take up grid space and visible fields flow naturally.

## 🎯 **Key Features**

- **🚫 No Grid Space for Hidden Fields**: Hidden fields automatically don't take up grid space
- **🔄 Dynamic Layout Adjustment**: Grid automatically reflows when fields appear/disappear
- **⚡ CSS Grid Auto-flow**: Uses modern CSS Grid with auto-flow for optimal performance
- **🎨 Seamless Integration**: Works with existing form configurations without breaking changes

## 🚀 **How It Works**

The system uses CSS Grid's `auto-flow` feature combined with dynamic visibility detection:

1. **Field Visibility Check**: Each field's `isHide` callback is evaluated against current form values
2. **Dynamic Grid Classes**: Hidden fields get the `hidden` class, visible fields get appropriate `col-span-*` classes
3. **Automatic Reflow**: CSS Grid automatically adjusts the layout when fields are hidden/shown

## 📖 **Usage**

### 1. **Basic Implementation**

```tsx
import { getAutoFlowGridClasses, getGridContainerClasses } from "@/common/utils/dynamic-form/dynamicGridLayout";

// In your form component
<div className={getGridContainerClasses()}>
    {fields.map((field) => (
        <FieldRenderer
            key={field.key}
            field={field}
            formValues={formValues} // Pass current form values
        />
    ))}
</div>
```

### 2. **Field Configuration**

Fields can use the `isHide` callback to conditionally hide themselves:

```tsx
const fieldConfig: FieldConfig = {
    type: "input",
    key: "conditionalField",
    label: "Conditional Field",
    gridCols: 6,
    getDependentValue: (formValues: any) => ({
        fieldType: formValues.fieldType,
    }),
    isHide: (dependentValues: any) => {
        return dependentValues?.fieldType !== "type1";
    },
};
```

### 3. **Grid Container Classes**

Choose the appropriate grid container class based on your needs:

```tsx
// Standard grid with auto-flow
getGridContainerClasses() // Returns: "grid grid-cols-12 gap-4 auto-rows-auto"

// Grid with minimum row heights
getGridContainerClassesWithRows() // Returns: "grid grid-cols-12 gap-4 auto-rows-min"
```

## 🔧 **Advanced Features**

### **Dynamic Grid Positioning**

For more complex layouts, you can use the advanced positioning system:

```tsx
import { calculateDynamicGridLayout, getDynamicGridClasses } from "@/common/utils/dynamic-form/dynamicGridLayout";

// Calculate layout for a group of fields
const layout = calculateDynamicGridLayout(fields, formValues);

// Apply dynamic positioning
const gridClasses = getDynamicGridClasses(field, layout);
```

### **Custom Grid Templates**

Create custom grid templates for specific use cases:

```tsx
import { getGridTemplateClasses } from "@/common/utils/dynamic-form/dynamicGridLayout";

const layout = calculateDynamicGridLayout(fields, formValues);
const templateClasses = getGridTemplateClasses(layout);
```

## 📱 **Responsive Behavior**

The system automatically handles responsive behavior:

- **Mobile**: Fields stack vertically (full width)
- **Tablet**: Fields use specified grid columns
- **Desktop**: Fields maintain grid layout with proper spacing

## 🎨 **Styling Customization**

### **Custom Grid Classes**

You can override the default grid classes:

```tsx
// In your CSS
.custom-grid {
    @apply grid gap-6;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

### **Field-Specific Styling**

Fields can have custom styling while maintaining grid behavior:

```tsx
const fieldConfig: FieldConfig = {
    // ... other config
    className: "custom-field-class", // Custom CSS class
    gridCols: 6,
};
```

## 🔍 **Debugging**

### **Visibility Debugging**

To debug field visibility, check the browser's developer tools:

```tsx
// Add this to your field configuration for debugging
isHide: (dependentValues: any) => {
    const shouldHide = dependentValues?.fieldType !== "type1";
    console.log('Field visibility:', { shouldHide, dependentValues });
    return shouldHide;
},
```

### **Grid Layout Debugging**

Enable grid debugging in CSS:

```css
.debug-grid {
    outline: 1px solid red;
}

.debug-grid > * {
    outline: 1px solid blue;
}
```

## 📋 **Best Practices**

1. **Always Pass formValues**: Ensure `formValues` is passed to `FieldRenderer` for dynamic behavior
2. **Use Consistent Grid Columns**: Stick to the supported values: 1, 2, 3, 4, 6, 12
3. **Test Field Dependencies**: Verify that `getDependentValue` returns the expected data structure
4. **Handle Edge Cases**: Consider what happens when all fields in a row are hidden

## 🚨 **Common Issues**

### **Fields Not Hiding**

- Check that `formValues` is being passed correctly
- Verify `isHide` callback logic
- Ensure `getDependentValue` returns the right data

### **Layout Breaking**

- Hidden fields should use the `hidden` class
- Ensure grid container has proper CSS Grid classes
- Check for conflicting CSS that might override grid behavior

### **Performance Issues**

- Avoid complex calculations in `isHide` callbacks
- Use memoization for expensive operations
- Consider debouncing rapid form value changes

## 🔮 **Future Enhancements**

- **Animation Support**: Smooth transitions when fields appear/disappear
- **Advanced Grid Patterns**: Support for complex grid layouts
- **Responsive Breakpoints**: Field-specific responsive behavior
- **Layout Persistence**: Remember user's preferred layout

## 📚 **Examples**

See `DynamicGridDemo.tsx` for a complete working example of the dynamic grid system.

# InputSearch BaseURL Configuration

The `inputSearch` field type now supports a custom `baseUrl` property that allows you to override the default environment variable base URL for API calls.

## Usage

### 1. Using Custom Base URL
```typescript
{
    type: "inputSearch",
    key: "hospitalNotificationId",
    label: "Hospital Notification ID",
    inputSearchConfig: {
        isExternal: true,
        baseUrl: "https://api.example.com", // Custom base URL
        apiEndpoint: "/resident/residents",
        // ... other config
    }
}
```
**Result:** API calls will be made to `https://api.example.com/resident/residents`

### 2. Using Environment Variable (Default Behavior)
```typescript
{
    type: "inputSearch",
    key: "hospitalNotificationId",
    label: "Hospital Notification ID",
    inputSearchConfig: {
        isExternal: true,
        // No baseUrl specified - uses environment variable
        apiEndpoint: "/resident/residents",
        // ... other config
    }
}
```
**Result:** API calls will be made to `${NEXT_PUBLIC_CRRSA_BACKEND_API_URL}/resident/residents`

### 3. Using Local API Routes
```typescript
{
    type: "inputSearch",
    key: "localSearch",
    label: "Local Search",
    inputSearchConfig: {
        isExternal: false, // Use local API routes
        apiEndpoint: "search/residents",
        // ... other config
    }
}
```
**Result:** API calls will be made to `/api/search/residents`

## Search Format Options

The `inputSearch` field now supports two different search formats through the `searchFormat` property:

### Query Parameter Format (Default)
```typescript
{
    type: "inputSearch",
    key: "searchQuery",
    label: "Search Query",
    inputSearchConfig: {
        searchFormat: "query", // Default behavior
        apiEndpoint: "/hospital-notifications",
        searchKey: "search",
        // ... other config
    }
}
```
**Result:** API calls will be made to `/hospital-notifications?search="search_term"`

### Path Parameter Format
```typescript
{
    type: "inputSearch",
    key: "searchPath",
    label: "Search Path",
    inputSearchConfig: {
        searchFormat: "path", // Path parameter format
        apiEndpoint: "/hospital-notifications/{search}", // With placeholder
        searchKey: "search",
        // ... other config
    }
}
```
**Result:** API calls will be made to `/hospital-notifications/search_term`

#### Path Format Placeholders
The path format supports several placeholder patterns that will be automatically replaced with the search term:
- `{search}` - Generic search placeholder
- `{id}` - ID placeholder
- `{term}` - Term placeholder
- `{query}` - Query placeholder
- `{value}` - Value placeholder

If no placeholder is found, the search term will be appended to the endpoint.

## Priority Order
1. **Custom baseUrl** (if specified in inputSearchConfig)
2. **Environment variable** (NEXT_PUBLIC_CRRSA_BACKEND_API_URL)
3. **Local API route** (/api/...)

## Benefits
- **Flexibility**: Override base URLs per field without changing environment variables
- **Multiple APIs**: Use different external APIs for different fields
- **Development**: Easily switch between development, staging, and production APIs
- **Testing**: Test with mock APIs or different endpoints
- **Search Formats**: Support both query parameter and path parameter search patterns
