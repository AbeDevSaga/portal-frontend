import { FieldConfig } from "@/common/types/formType";

export interface DynamicGridPosition {
    colStart: number;
    colEnd: number;
    rowStart: number;
    rowEnd: number;
    isVisible: boolean;
}

export interface DynamicGridLayout {
    [fieldKey: string]: DynamicGridPosition;
}

/**
 * Calculates dynamic grid positions for fields based on their visibility and grid configuration
 * This ensures that hidden fields don't take up grid space and visible fields flow naturally
 */
export function calculateDynamicGridLayout(
    fields: FieldConfig[],
    formValues: Record<string, any> = {}
): DynamicGridLayout {
    const layout: DynamicGridLayout = {};
    let currentRow = 1;
    let currentCol = 1;
    const maxCols = 12;

    // First pass: determine which fields are visible
    const visibleFields = fields.filter(field => {
        if (!field.isHide) return true;
        const dependentValues = field.getDependentValue ? field.getDependentValue(formValues) : null;
        return !field.isHide(dependentValues);
    });

    // Second pass: calculate grid positions for visible fields only
    visibleFields.forEach((field, index) => {
        const gridCols = field.gridCols || 12;
        
        // Check if current field would exceed the row
        if (currentCol + gridCols - 1 > maxCols) {
            // Move to next row
            currentRow++;
            currentCol = 1;
        }

        // Calculate grid position
        const colStart = currentCol;
        const colEnd = currentCol + gridCols - 1;
        const rowStart = currentRow;
        const rowEnd = currentRow;

        layout[field.key] = {
            colStart,
            colEnd,
            rowStart,
            rowEnd,
            isVisible: true
        };

        // Update position for next field
        currentCol += gridCols;
        
        // If we've filled the row, move to next row
        if (currentCol > maxCols) {
            currentRow++;
            currentCol = 1;
        }
    });

    // Add hidden fields with no grid space
    fields.forEach(field => {
        if (!layout[field.key]) {
            layout[field.key] = {
                colStart: 0,
                colEnd: 0,
                rowStart: 0,
                rowEnd: 0,
                isVisible: false
            };
        }
    });

    return layout;
}

/**
 * Generates CSS grid classes for a field based on its dynamic position
 */
export function getDynamicGridClasses(field: FieldConfig, layout: DynamicGridLayout): string {
    const position = layout[field.key];
    
    if (!position || !position.isVisible) {
        return "hidden"; // Hidden fields get no grid space
    }

    // Use CSS Grid positioning for precise control
    return `col-start-${position.colStart} col-end-${position.colEnd + 1} row-start-${position.rowStart}`;
}

/**
 * Generates CSS Grid template columns and rows based on the layout
 */
export function getGridTemplateClasses(layout: DynamicGridLayout): string {
    const maxRow = Math.max(...Object.values(layout).map(pos => pos.rowEnd), 0);
    
    if (maxRow === 0) return "grid-cols-12";
    
    return `grid-cols-12 grid-rows-${maxRow}`;
}

/**
 * Alternative approach using CSS Grid auto-flow for simpler layouts
 * This is more flexible and handles edge cases better
 */
export function getFlexibleGridClasses(field: FieldConfig, layout: DynamicGridLayout): string {
    const position = layout[field.key];
    
    if (!position || !position.isVisible) {
        return "hidden";
    }

    // For flexible layout, we can use the original gridCols approach
    // but ensure hidden fields don't take space
    const gridCols = field.gridCols || 12;
    
    const gridMap: Record<number, string> = {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        6: "col-span-6",
        12: "col-span-12",
    };

    return gridMap[gridCols] || "col-span-12";
}

/**
 * Simple and reliable approach using CSS Grid auto-flow
 * This automatically handles hidden fields without complex calculations
 */
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
    
    const gridMap: Record<number, string> = {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        6: "col-span-6",
        12: "col-span-12",
    };

    return gridMap[gridCols] || "col-span-12";
}

/**
 * Enhanced grid container classes that work with auto-flow
 * This ensures the grid automatically adjusts when fields are hidden
 */
export function getGridContainerClasses(): string {
    return "grid grid-cols-12 gap-4 auto-rows-auto";
}

/**
 * Alternative grid container with more control over row heights
 */
export function getGridContainerClassesWithRows(): string {
    return "grid grid-cols-12 gap-4 auto-rows-min";
}
