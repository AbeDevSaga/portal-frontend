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
