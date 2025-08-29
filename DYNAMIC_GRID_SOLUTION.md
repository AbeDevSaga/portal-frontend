# Dynamic Grid Solution for Hidden Fields

## 🎯 **Problem Solved**

Previously, when fields were hidden using the `isHide` callback, they still took up grid space because they were rendered as hidden divs. This caused layout issues where hidden fields would leave empty spaces in the grid.

## 🚀 **Solution Implemented**

I've implemented a **dynamic grid system** that automatically adjusts when fields are hidden, ensuring that hidden fields don't take up grid space and visible fields flow naturally.

## 🔧 **Key Components**

### 1. **Dynamic Grid Layout Utility** (`src/common/utils/dynamic-form/dynamicGridLayout.ts`)

- **`getAutoFlowGridClasses()`**: Main function that returns appropriate grid classes based on field visibility
- **`getGridContainerClasses()`**: Returns CSS Grid container classes with auto-flow
- **`calculateDynamicGridLayout()`**: Advanced function for complex grid positioning

### 2. **Updated FieldRenderer** (`src/common/components/dynamic-form/FieldRenderer.tsx`)

- Now accepts `formValues` prop for dynamic visibility calculation
- Uses `getAutoFlowGridClasses()` to determine grid classes
- Hidden fields get the `hidden` class instead of taking up grid space

### 3. **Updated DynamicForm** (`src/common/components/dynamic-form/DynamicFrom.tsx`)

- Passes `formValues` to all field renderers
- Updated function signatures to support dynamic grid calculation
- Maintains backward compatibility

### 4. **Updated FormArrayField** (`src/common/components/dynamic-form/FormArrayField.tsx`)

- Also uses the new dynamic grid system
- Ensures consistency across all form components

## 🎨 **How It Works**

### **Before (Problem)**
```tsx
// Hidden fields still took up grid space
if (isFieldHidden) {
    return <div style={{ display: "none" }}></div>; // ❌ Takes grid space
}
```

### **After (Solution)**
```tsx
// Hidden fields get no grid space
const getGridClasses = (field: FieldConfig) => {
    return getAutoFlowGridClasses(field, formValues); // ✅ Returns "hidden" for hidden fields
};
```

### **CSS Grid Auto-flow**
```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
    auto-rows: auto; /* Automatically adjusts row heights */
}
```

## 📖 **Usage Examples**

### **Basic Implementation**
```tsx
import { getGridContainerClasses } from "@/common/utils/dynamic-form/dynamicGridLayout";

<div className={getGridContainerClasses()}>
    {fields.map((field) => (
        <FieldRenderer
            key={field.key}
            field={field}
            formValues={formValues} // Required for dynamic behavior
        />
    ))}
</div>
```

### **Field Configuration**
```tsx
const fieldConfig: FieldConfig = {
    type: "input",
    key: "conditionalField",
    gridCols: 6,
    isHide: (dependentValues: any) => {
        return dependentValues?.fieldType !== "type1";
    },
    getDependentValue: (formValues: any) => ({
        fieldType: formValues.fieldType,
    }),
};
```

## 🔍 **Technical Details**

### **Grid Class Mapping**
```tsx
const gridMap: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    6: "col-span-6",
    12: "col-span-12",
};
```

### **Visibility Logic**
```tsx
export function getAutoFlowGridClasses(field: FieldConfig, formValues: Record<string, any> = {}): string {
    // Check if field should be hidden
    if (field.isHide) {
        const dependentValues = field.getDependentValue ? field.getDependentValue(formValues) : null;
        if (field.isHide(dependentValues)) {
            return "hidden"; // Hidden fields get no grid space
        }
    }

    // For visible fields, use the original gridCols approach
    const gridCols = field.gridCols || 12;
    return gridMap[gridCols] || "col-span-12";
}
```

## ✅ **Benefits**

1. **🚫 No Grid Space Wasted**: Hidden fields don't take up grid space
2. **🔄 Automatic Reflow**: Grid automatically adjusts when fields appear/disappear
3. **⚡ Performance**: Uses CSS Grid auto-flow for optimal performance
4. **🎨 Seamless**: Works with existing form configurations
5. **📱 Responsive**: Maintains responsive behavior across devices

## 🧪 **Testing**

- **Unit Tests**: Created comprehensive tests in `dynamicGridLayout.test.ts`
- **Demo Component**: Created `DynamicGridDemo.tsx` to showcase the system
- **Integration**: Updated all existing form components

## 📚 **Documentation**

- **Utility Documentation**: Complete API reference in `src/common/utils/dynamic-form/README.md`
- **Main README**: Updated main dynamic form README with usage examples
- **Code Comments**: Comprehensive inline documentation

## 🔮 **Future Enhancements**

- **Animation Support**: Smooth transitions when fields appear/disappear
- **Advanced Grid Patterns**: Support for complex grid layouts
- **Layout Persistence**: Remember user's preferred layout
- **Performance Optimization**: Memoization for expensive calculations

## 🚨 **Breaking Changes**

**None** - The solution is fully backward compatible. Existing forms will continue to work without modification.

## 📋 **Migration Guide**

### **For Existing Forms**
No changes required - the system automatically works with existing configurations.

### **For New Forms**
Simply use the new grid container classes:

```tsx
// Old way (still works)
<div className="grid grid-cols-12 gap-4">

// New way (recommended)
<div className={getGridContainerClasses()}>
```

### **For Custom Field Renderers**
Ensure you pass `formValues` to `FieldRenderer`:

```tsx
<FieldRenderer
    key={field.key}
    field={field}
    formValues={formValues} // Add this prop
/>
```

## 🎉 **Result**

The dynamic grid system now automatically handles hidden fields, ensuring optimal use of grid space and a better user experience. Fields that are hidden no longer leave empty spaces, and the layout automatically adjusts as fields appear and disappear based on form values.
